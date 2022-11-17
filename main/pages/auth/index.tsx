import styles from "./style.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { isLoggedIn } from "@/main/api";
import LogoWithName from "@/shared/assets/images/logoWithName.svg";
import ArrowForwardIcon from "@/shared/assets/icons/arrowForward.svg";
import Image from "@/main/assets/images/auth.svg";
import Button from "@/shared/components/Button";
import BottomButtons from "@/main/components/BottomButtons";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    isLoggedIn()
      .then((userData) => {
        if (userData) router.replace("/dashboard");
      })
      .catch(() => {});
  }, []);

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
        <div className={styles.Buttons}>
          <Link href="/login">
            <Button varient="gradient">ورود</Button>
          </Link>
          <Link href="/register">
            <Button varient="outlined">ثبت نام</Button>
          </Link>
          <div className={styles.BottomButtonsPlaceholder}>
            <BottomButtons />
          </div>
        </div>
        <div className={styles.Image}>
          <Image />
        </div>
      </div>
    </div>
  );
}
