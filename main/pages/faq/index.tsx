import styles from "./style.module.scss";
import { ReactElement, useState } from "react";
import ExpandMoreIcon from "@/shared/assets/icons/expandMore.svg";
import Layout from "@/main/components/Layout";

const accordions: [string, string][] = [
  [
    "شرایط استفاده از کد تخفیف خرید چیست؟",
    "مسئولیت کیفری و حقوقی فایل آپلود شده به عهده سفارش دهنده میباشد و چاپ روم هیچگونه مسئولیتی در قبال آنها ندارد.",
  ],
  [
    "شرایط استفاده از کد تخفیف خرید چیست؟",
    "هرگونه کتاب یا جزوه که با شئونات اسلامی و فرهنگی مغایرت داشته باشد، از طرف چاپ روم لغو میگردد و با سفارش دهنده طبق قانون عمل می شود.",
  ],
  [
    "شرایط استفاده از کد تخفیف خرید چیست؟",
    "چاپ روم موظف به چاپ و پرینت فایل آپلود شده میباشد، لذا در انتخاب فایل در هنگام سفارش دقت کافی داشته باشید.",
  ],
  [
    "شرایط استفاده از کد تخفیف خرید چیست؟",
    "توجه کنید میزان صفحات انتخابی شما در هنگام سفارش با فایل آپلود شده، توسط سایت به طور اتوماتیک، محاسبه میگردد که در صورت عدم تطابق میتوانید توضیحات خود را در قسمت مربوطه به هنگام سفارش ذکر کنید در غیر اینصورت سفارش شما لغو میگردد.",
  ],
  [
    "شرایط استفاده از کد تخفیف خرید چیست؟",
    "هر پکیج شامل تعداد برگ و زمان محدود میباشد، با توجه به میزان مصرف خود، هر پکیج را انتخاب کنید. در صورت اتمام زمان، پکیج انتخابی غیر قابل استفاده میگردد و چاپ روم هیچ گونه مسئولیتی در قبال آن پکیج ندارد.",
  ],
  [
    "شرایط استفاده از کد تخفیف خرید چیست؟",
    "پکیج های تخفیف دار، شامل پرینت میباشد و قیمت صحافی به طور جداگانه از کاربر دریافت میشود.",
  ],
];

export default function FrequentlyAskedQuestions() {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null
  );

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>پاسخ به پرسش‌های متداول</h1>
      <div className={styles.Content}>
        {accordions.map(([question, answer], index) => (
          <div
            key={index}
            className={styles.Accordion}
            data-open={openAccordionIndex === index}
          >
            <div
              className={styles.QuestionContainer}
              onClick={() =>
                setOpenAccordionIndex(
                  openAccordionIndex === index ? null : index
                )
              }
            >
              <div className={styles.Question}>{question}</div>
              <ExpandMoreIcon />
            </div>
            <div className={styles.Answer}>{answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

FrequentlyAskedQuestions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
