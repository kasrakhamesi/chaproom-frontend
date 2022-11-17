import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { isLoggedIn, login } from "@/main/api";
import {
  useValidation,
  validateLength,
  validatePhoneNumber,
} from "@/shared/utils/validation";
import LogoWithName from "@/shared/assets/images/logoWithName.svg";
import ArrowForwardIcon from "@/shared/assets/icons/arrowForward.svg";
import Image from "@/shared/assets/images/printing.svg";
import TextInput from "@/shared/components/TextInput";
import ErrorList from "@/shared/components/ErrorList";
import Button from "@/shared/components/Button";

export default function Login() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    isLoggedIn()
      .then((userData) => {
        if (userData) router.replace("/dashboard");
      })
      .catch(() => {});
  }, []);

  const formValidation = useValidation(
    {
      phoneNumber: [validatePhoneNumber()],
      password: [validateLength({ min: 8 })],
    },
    {
      phoneNumber,
      password,
    }
  );

  return (
    <div className={styles.Login}>
      <Head>
        <title>ورود</title>
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
          <div className={styles.Column}>
            <div className={styles.Title}>ورود</div>
            <div className={styles.SubTitle}>
              لطفا وارد حساب کاربری خود شوید
            </div>
          </div>
          <div className={styles.Column}>
            <TextInput
              inputProps={{ type: "number", placeholder: "شماره موبایل" }}
              varient="shadow"
              value={phoneNumber}
              onChange={(newValue) => setPhoneNumber(newValue.substring(0, 11))}
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
            <Link href="/forgot-password">
              <a>فراموشی رمز عبور</a>
            </Link>
          </div>
          <div className={styles.Column}>
            <Button
              varient="gradient"
              onClick={() => {
                setIsSubmitting(true);
                login(phoneNumber, password)
                  .then(() =>
                    router.query.redirectTo
                      ? router.push(router.query.redirectTo as string)
                      : router.push("/dashboard")
                  )
                  .catch(toast.error)
                  .finally(() => setIsSubmitting(false));
              }}
              loading={isSubmitting}
              disabled={isSubmitting || !formValidation.isValid}
            >
              ورود
            </Button>
            <div className={styles.BottomNote}>
              حساب کاربری ندارید؟{" "}
              <Link href="/register">
                <a>ثبت نام کنید</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.Image}>
          <Image />
        </div>
      </div>
    </div>
  );
}
