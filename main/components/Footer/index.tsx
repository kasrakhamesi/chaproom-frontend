import styles from "./style.module.scss";
import Link from "next/link";
import AddressesIcon from "@/main/assets/icons/addresses.svg";
import CaillIcon from "@/main/assets/icons/call.svg";
import MailIcon from "@/main/assets/icons/mail.svg";
import AparatIcon from "@/main/assets/icons/aparat.svg";
import InstagramIcon from "@/main/assets/icons/instagram.svg";
import BottomButtons from "@/main/components/BottomButtons";
import { FormattedNumber } from "react-intl";

export default function Footer() {
  return (
    <div className={styles.footer__main}>
      <div className={styles.footer}>
        <div className={styles.footer__mainlogo}>
          <div className={styles.footer__mainlogo__img}>
            <img
              src="/assets/images/footerLogo.svg"
              alt="Footer Logo"
              width={106}
              height={146}
            />
          </div>
        </div>
        <div className={styles.footer__table}>
          <div className={styles.table__callus}>
            <h5>تماس با ما</h5>
            <ul>
              <li>
                <a href="tel:02191090772">
                  <span>
                    {" "}
                    <CaillIcon />
                  </span>{" "}
                  <FormattedNumber value={21} minimumIntegerDigits={3} />-
                  <FormattedNumber value={91090772} useGrouping={false} />
                </a>
              </li>
              <li>
                <a href="tel:03191090414">
                  <span>
                    <CaillIcon />
                  </span>{" "}
                  <FormattedNumber value={31} minimumIntegerDigits={3} />-
                  <FormattedNumber value={91090414} useGrouping={false} />
                </a>
              </li>
              <li>
                <a href="mailto:info@chaproom.com">
                  <span>
                    <MailIcon />
                  </span>{" "}
                  <span>info@chaproom.com</span>
                </a>
              </li>
              <li>
                <a
                  href="http://maps.google.com/?q=1200 تهران، خیابان فخر راضی"
                  target="_blank"
                >
                  <span>
                    <AddressesIcon />
                  </span>{" "}
                  <span>تهران ، میدان انقلاب</span>
                </a>
              </li>
              <li>
                <a
                  href="http://maps.google.com/?q=1200 اصفهان، خیابان پروین"
                  target="_blank"
                >
                  <span>
                    <AddressesIcon />
                  </span>{" "}
                  <span> اصفهان ، خیابان احمدآباد</span>
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.table__guide}>
            <h5>راهنما</h5>
            <ul>
              <li>
                <Link href="/blog">وبلاگ</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions"> قوانین و مقررات</Link>
              </li>
              <li>
                <Link href="/">راهنمای ثبت سفارش</Link>
              </li>
              <li>
                <Link href="/faq"> پاسخ به پرسش‌های متداول</Link>
              </li>
            </ul>
          </div>
          <div className={styles.table__helpfullinks}>
            <h5>لینک های مفید</h5>
            <ul>
              <li>
                <a href="asd">شابک</a>
              </li>
              <li>
                <a href="asd">فیپا</a>
              </li>
              <li>
                <a href="asd">مجوز وزارت ارشاد</a>
              </li>
              <li>
                <a href="asd">قیمت چاپ کتاب</a>
              </li>
              <li>
                <a href="asd">طراحی جلد کتاب</a>
              </li>
              <li>
                <a href="asd">تبدیل پایان نامه به کتاب</a>
              </li>
              <li>
                <a href="asd">چاپ کتاب با تیراژ پایین</a>
              </li>
              <li>
                <a href="asd">پرینت رنگی</a>
              </li>
              <li>
                <a href="asd">پرینت سیاه سفید</a>
              </li>
              <li>
                <a href="asd"> ویرایشگر آنلاین فایل های PDF</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__symbols}>
          <div>
            <img
              src="/assets/images/enamad.png"
              alt="نماد اعتماد الکترونیکی"
              width={82}
              height={89}
            />
          </div>
          <div>
            <img
              src="/assets/images/samandehi.png"
              alt="نماد ساماندهی"
              width={74}
              height={74}
            />
          </div>
        </div>
        <div className={styles.footer__rights}>
          <h4>چاپ روم را در شبکه‌های اجتماعی دنبال کنید</h4>
          <ul>
            <li>
              <a href="https://www.instagram.com/chap.room/" target="_blank">
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href="https://www.aparat.com/chaproom" target="_blank">
                <AparatIcon />
              </a>
            </li>
          </ul>
          <h4>کلیه حقوق این وبسایت متعلق به چاپ روم می باشد.</h4>
        </div>
        <div className={styles.BottomButtonsPlaceholder}>
          <BottomButtons />
        </div>
      </div>
    </div>
  );
}
