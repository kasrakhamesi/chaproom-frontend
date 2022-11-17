import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { FormattedNumber } from "react-intl";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import {
  isLoggedIn,
  passwordReset,
  passwordResetConfirmCode,
  passwordResetSet,
  resendCode,
} from "@/admin/api";
import {
  useValidation,
  validatePhoneNumber,
  validateInt,
  validateLength,
  validatePasswordRepeat,
} from "@/shared/utils/validation";
import LogoWithName from "@/shared/assets/images/logoWithName.svg";
import ArrowForwardIcon from "@/shared/assets/icons/arrowForward.svg";
import Image from "@/shared/assets/images/thinking.svg";
import TextInput from "@/shared/components/TextInput";
import ErrorList from "@/shared/components/ErrorList";
import Button from "@/shared/components/Button";

export default function ForgotPassword() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [confirmCodeExpirationDate, setConfirmCodeExpirationDate] =
    useState<null | Date>(null);
  const [passwordResetToken, setPasswordResetToken] = useState<null | string>(
    null
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const formValidation = useValidation(
    {
      phoneNumber: [validatePhoneNumber()],
    },
    {
      phoneNumber,
    }
  );

  const confirmCodeValidation = useValidation(
    {
      confirmCode: [
        validateLength({ length: 6 }),
        validateInt({ unsigned: true }),
      ],
    },
    {
      confirmCode,
    }
  );

  const newPasswordValidation = useValidation(
    {
      newPassword: [validateLength({ min: 8 })],
      newPasswordRepeat: [
        validateLength({ min: 8 }),
        validatePasswordRepeat(newPassword),
      ],
    },
    {
      newPassword,
      newPasswordRepeat,
    }
  );

  useEffect(() => {
    isLoggedIn()
      .then(() => {
        router.replace("/dashboard");
      })
      .catch(() => {});
  }, []);

  return (
    <div className={styles.ForgotPassword}>
      <Head>
        <title>فراموشی رمز عبور</title>
      </Head>
      <div className={styles.Header}>
        <Link href="/">
          <a className={styles.Logo}>
            <LogoWithName />
          </a>
        </Link>
        <Link href="/">
          <a className={styles.MobileBackButton}>
            <ArrowForwardIcon />
          </a>
        </Link>
      </div>
      <div className={styles.Content}>
        <div className={styles.Form}>
          {confirmCodeExpirationDate === null ? (
            <>
              <div className={styles.Column}>
                <div className={styles.Title}>فراموشی رمز عبور</div>
                <div className={styles.SubTitle}>
                  شماره موبایلی که با آن ثبت نام کرده‌اید را وارد نمایید
                </div>
              </div>
              <div className={styles.Column}>
                <TextInput
                  inputProps={{ type: "number", placeholder: "شماره موبایل" }}
                  value={phoneNumber}
                  onChange={(newValue) =>
                    setPhoneNumber(newValue.substring(0, 11))
                  }
                />
                <ErrorList errors={formValidation.errors.phoneNumber} />
              </div>
              <div className={styles.Column}>
                <Button
                  varient="gradient"
                  onClick={() => {
                    setIsSubmitting(true);
                    passwordReset(phoneNumber)
                      .then(({ message, expireAt }) => {
                        toast.success(message);
                        setConfirmCodeExpirationDate(expireAt);
                      })
                      .catch(toast.error)
                      .finally(() => setIsSubmitting(false));
                  }}
                  loading={isSubmitting}
                  disabled={isSubmitting || !formValidation.isValid}
                >
                  ارسال کد تأیید
                </Button>
                <div className={styles.BottomNote}>
                  <Link href="/login">
                    <a>بازگشت به صفحه ورود</a>
                  </Link>
                </div>
              </div>
            </>
          ) : passwordResetToken === null ? (
            <>
              <div className={styles.Column}>
                <div className={styles.Title}>تایید شماره موبایل</div>
                <div className={styles.SubTitle}>
                  کد 6 رقمی به شماره{" "}
                  <FormattedNumber
                    value={parseInt(phoneNumber)}
                    minimumIntegerDigits={11}
                    useGrouping={false}
                  />{" "}
                  ارسال شد.
                </div>
              </div>
              <div className={styles.Column}>
                <TextInput
                  inputProps={{ type: "number", placeholder: "کد تأیید" }}
                  value={confirmCode}
                  onChange={(newValue) =>
                    setConfirmCode(newValue.substring(0, 6))
                  }
                  suffix={<CountDown date={confirmCodeExpirationDate} />}
                />
                <ErrorList errors={confirmCodeValidation.errors.confirmCode} />
              </div>
              <div className={styles.ConfirmCodeActions}>
                <button
                  onClick={() => {
                    setIsResending(true);
                    resendCode(phoneNumber)
                      .then(({ message, expireAt }) => {
                        toast.success(message);
                        setConfirmCodeExpirationDate(expireAt);
                      })
                      .catch(toast.error)
                      .finally(() => setIsResending(false));
                  }}
                  disabled={isResending}
                >
                  ارسال مجدد
                </button>
                <button
                  onClick={() => {
                    setConfirmCode("");
                    setConfirmCodeExpirationDate(null);
                  }}
                >
                  بازگشت
                </button>
              </div>
              <div className={styles.Column}>
                <Button
                  varient="gradient"
                  onClick={() => {
                    setIsSubmitting(true);
                    passwordResetConfirmCode(phoneNumber, parseInt(confirmCode))
                      .then(({ message, passwordResetToken }) => {
                        toast.success(message);
                        setPasswordResetToken(passwordResetToken);
                      })
                      .catch(toast.error)
                      .finally(() => setIsSubmitting(false));
                  }}
                  loading={isSubmitting}
                  disabled={isSubmitting || !confirmCodeValidation.isValid}
                >
                  تایید کد
                </Button>
                <div className={styles.BottomNote}>
                  <Link href="/login">
                    <a>بازگشت به صفحه ورود</a>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.Column}>
                <div className={styles.Title}>رمز عبور جدید</div>
                <div className={styles.SubTitle}>
                  لطفا رمز عبور جدید خود را وارد نمایید
                </div>
              </div>
              <div className={styles.Column}>
                <TextInput
                  inputProps={{
                    type: "password",
                    placeholder: "رمز عبور",
                  }}
                  value={newPassword}
                  onChange={setNewPassword}
                />
                <ErrorList errors={newPasswordValidation.errors.newPassword} />
              </div>
              <div className={styles.Column}>
                <TextInput
                  inputProps={{
                    type: "password",
                    placeholder: "تکرار رمز عبور",
                  }}
                  value={newPasswordRepeat}
                  onChange={setNewPasswordRepeat}
                />
                <ErrorList
                  errors={newPasswordValidation.errors.newPasswordRepeat}
                />
              </div>
              <div className={styles.Column}>
                <Button
                  varient="gradient"
                  onClick={() => {
                    setIsSubmitting(true);
                    passwordResetSet(passwordResetToken, newPassword)
                      .then(({ data }) => {
                        toast.success(data.message);
                        router.push(
                          data.token?.access ? "/dashboard" : "/login"
                        );
                      })
                      .catch(toast.error)
                      .finally(() => setIsSubmitting(false));
                  }}
                  loading={isSubmitting}
                  disabled={isSubmitting || !newPasswordValidation.isValid}
                >
                  بازیابی رمز عبور
                </Button>
                <div className={styles.BottomNote}>
                  <Link href="/login">
                    <a>بازگشت به صفحه ورود</a>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.Image}>
          <Image />
        </div>
      </div>
    </div>
  );
}

interface CountDownProps {
  date: Date;
}

function CountDown({ date }: CountDownProps) {
  function getRemaningTime() {
    return Math.floor((date.getTime() - new Date().getTime()) / 1000);
  }
  const [remaningTime, setRemaningTime] = useState(getRemaningTime());

  useEffect(() => {
    const update = () => {
      const remaningTime = getRemaningTime();
      if (remaningTime > 0) {
        setRemaningTime(remaningTime);
      } else {
        setRemaningTime(0);
        clearInterval(interval);
      }
    };

    const interval = setInterval(update, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <>
      {remaningTime === 0 ? (
        "منقضی شده"
      ) : (
        <>
          <FormattedNumber
            value={Math.floor(remaningTime / 60)}
            minimumIntegerDigits={2}
          />
          :
          <FormattedNumber
            value={Math.floor(remaningTime % 60)}
            minimumIntegerDigits={2}
          />
        </>
      )}
    </>
  );
}
