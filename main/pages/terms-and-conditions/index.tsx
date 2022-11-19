import styles from "./style.module.scss";
import { ReactElement } from "react";
import { FormattedNumber } from "react-intl";
import Layout from "@/main/components/Layout";

const terms = [
  "مسئولیت کیفری و حقوقی فایل آپلود شده به عهده سفارش دهنده میباشد و چاپ روم هیچگونه مسئولیتی در قبال آنها ندارد.",
  "هرگونه کتاب یا جزوه که با شئونات اسلامی و فرهنگی مغایرت داشته باشد، از طرف چاپ روم لغو میگردد و با سفارش دهنده طبق قانون عمل می شود.",
  "چاپ روم موظف به چاپ و پرینت فایل آپلود شده میباشد، لذا در انتخاب فایل در هنگام سفارش دقت کافی داشته باشید.",
  "توجه کنید میزان صفحات انتخابی شما در هنگام سفارش با فایل آپلود شده، توسط سایت به طور اتوماتیک، محاسبه میگردد که در صورت عدم تطابق میتوانید توضیحات خود را در قسمت مربوطه به هنگام سفارش ذکر کنید در غیر اینصورت سفارش شما لغو میگردد.",
  "هر پکیج شامل تعداد برگ و زمان محدود میباشد، با توجه به میزان مصرف خود، هر پکیج را انتخاب کنید. در صورت اتمام زمان، پکیج انتخابی غیر قابل استفاده میگردد و چاپ روم هیچ گونه مسئولیتی در قبال آن پکیج ندارد.",
  "پکیج های تخفیف دار، شامل پرینت میباشد و قیمت صحافی به طور جداگانه از کاربر دریافت میشود.",
];

export default function TermsAndConditions() {
  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>قوانین و مقررات</h1>
      <div className={styles.OrderedList}>
        {terms.map((term, index) => (
          <div key={index}>
            <div>
              <FormattedNumber value={index + 1} />.
            </div>
            <div>{term}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

TermsAndConditions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
