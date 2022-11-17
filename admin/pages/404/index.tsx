import styles from "./style.module.scss";
import Head from "next/head";
import Link from "next/link";
import LogoWithName from "@/shared/assets/images/logoWithName.svg";
import Button from "@/shared/components/Button";

export default function NotFound() {
  return (
    <div className={styles.NotFound}>
      <Head>
        <title>صفحه مورد نظر شما وجود ندارد</title>
      </Head>
      <div className={styles.Header}>
        <Link href="/">
          <a className={styles.Logo}>
            <LogoWithName />
          </a>
        </Link>
      </div>
      <div className={styles.Content}>
        <div className={styles.ErrorNumber}>404</div>
        <h1>این صفحه در دسترس نیست</h1>
        <p>
          این صفحه موجود نیست یا پاک شده است!
          <br />
          پیشنهاد می‌کنیم به صفحه اصلی برگردید.
        </p>
        <div className={styles.Buttons}>
          <Link href="/">
            <Button varient="gradient">بازگشت به چاپ روم</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
