import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { FormattedNumber } from "react-intl";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import toast from "react-hot-toast";
import { isLoggedIn, register, registerConfirm, resendCode } from "@/main/api";
import {
  useValidation,
  validateInt,
  validateLength,
  validateNotEmpty,
  validatePasswordRepeat,
  validatePhoneNumber,
} from "@/shared/utils/validation";
import LogoWithName from "@/shared/assets/images/logoWithName.svg";
import ArrowForwardIcon from "@/shared/assets/icons/arrowForward.svg";
import Image from "@/shared/assets/images/printing.svg";
import TextInput from "@/shared/components/TextInput";
import ErrorList from "@/shared/components/ErrorList";
import Button from "@/shared/components/Button";
import CheckBox from "@/shared/components/CheckBox";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [agreeTermsAndConditions, setAgreeTermsAndConditions] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [confirmCodeExpirationDate, setConfirmCodeExpirationDate] =
    useState<null | Date>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const formValidation = useValidation(
    {
      name: [validateNotEmpty()],
      phoneNumber: [validatePhoneNumber()],
      password: [validateLength({ min: 8 })],
      passwordRepeat: [
        validateLength({ min: 8 }),
        validatePasswordRepeat(password),
      ],
    },
    {
      name,
      phoneNumber,
      password,
      passwordRepeat,
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

  useEffect(() => {
    isLoggedIn()
      .then((userData) => {
        if (userData) router.replace("/dashboard");
      })
      .catch(() => {});
  }, []);

  return (
    <div className={styles.Register}>
      <Head>
        <title>ثبت نام</title>
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
                <div className={styles.Title}>ثبت نام</div>
                <div className={styles.SubTitle}>
                  برای ثبت نام اطلاعات خود را وارد کنید
                </div>
              </div>
              <div className={styles.Column}>
                <TextInput
                  inputProps={{ placeholder: "نام و نام خانوادگی" }}
                  varient="shadow"
                  value={name}
                  onChange={setName}
                />
                <ErrorList errors={formValidation.errors.name} />
              </div>
              <div className={styles.Column}>
                <TextInput
                  inputProps={{ type: "number", placeholder: "شماره موبایل" }}
                  varient="shadow"
                  value={phoneNumber}
                  onChange={(newValue) =>
                    setPhoneNumber(newValue.substring(0, 11))
                  }
                />
                <ErrorList errors={formValidation.errors.phoneNumber} />
              </div>
              <div className={styles.Column}>
                <TextInput
                  inputProps={{
                    type: "password",
                    placeholder: "رمز عبور",
                  }}
                  varient="shadow"
                  value={password}
                  onChange={setPassword}
                />
                <ErrorList errors={formValidation.errors.password} />
              </div>
              <div className={styles.Column}>
                <TextInput
                  inputProps={{
                    type: "password",
                    placeholder: "تکرار رمز عبور",
                  }}
                  varient="shadow"
                  value={passwordRepeat}
                  onChange={setPasswordRepeat}
                />
                <ErrorList errors={formValidation.errors.passwordRepeat} />
              </div>
              <div className={styles.CheckBoxWithLabel}>
                <CheckBox
                  checked={agreeTermsAndConditions}
                  onChange={setAgreeTermsAndConditions}
                />
                <span>
                  با{" "}
                  <Link href="#">
                    {/* TODO */}
                    <a>قوانین و مقررات</a>
                  </Link>{" "}
                  چاپ روم موافق هستم
                </span>
              </div>
              <div className={styles.Column}>
                <Button
                  varient="gradient"
                  onClick={() => {
                    setIsSubmitting(true);
                    register(
                      name,
                      phoneNumber,
                      password,
                      localStorage.getItem("referralSlug")
                    )
                      .then(({ message, expireAt }) => {
                        toast.success(message);
                        setConfirmCodeExpirationDate(expireAt);
                      })
                      .catch(toast.error)
                      .finally(() => setIsSubmitting(false));
                  }}
                  loading={isSubmitting}
                  disabled={
                    isSubmitting ||
                    !formValidation.isValid ||
                    !agreeTermsAndConditions
                  }
                >
                  ارسال کد تأیید
                </Button>
                <div className={styles.BottomNote}>
                  حساب کاربری دارید؟{" "}
                  <Link href="/login">
                    <a>وارد شوید</a>
                  </Link>
                </div>
              </div>
            </>
          ) : (
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
                  varient="shadow"
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
              <Button
                varient="gradient"
                onClick={() => {
                  setIsSubmitting(true);
                  registerConfirm(phoneNumber, parseInt(confirmCode))
                    .then(() => router.push("/dashboard"))
                    .catch(toast.error)
                    .finally(() => setIsSubmitting(false));
                }}
                loading={isSubmitting}
                disabled={isSubmitting || !confirmCodeValidation.isValid}
              >
                ثبت نام
              </Button>
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
