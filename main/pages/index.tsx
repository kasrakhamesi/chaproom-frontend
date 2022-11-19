import styles from "./style.module.scss";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FormattedNumber } from "react-intl";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { Tariffs } from "@/shared/types";
import {
  getTariffs,
  isLoggedIn,
  reportReferralView,
  sendCooperationRequest,
} from "@/main/api";
import ExpandMoreIcon from "@/shared/assets/icons/expandMore.svg";
import GiftImage from "@/main/assets/images/gift.svg";
import CalculatorImage from "@/main/assets/images/calculator.svg";
import DataLoader from "@/shared/components/DataLoader";
import PrintPriceCalculator from "@/main/components/PrintPriceCalculator";
import BookPrintingImage from "@/main/assets/images/bookPrinting.svg";
import Layout from "@/main/components/Layout";
import Button from "@/shared/components/Button";
import PostageImage from "@/main/assets/images/postage.svg";
import PriceImage from "@/main/assets/images/price.svg";
import SupportImage from "@/main/assets/images/support.svg";
import PostageSpeedImage from "@/main/assets/images/postageSpeed.svg";
import Select from "@/shared/components/Select";
import TextInput from "@/shared/components/TextInput";
import VideoGalleryBG from "@/main/assets/images/videoGalleryBG.svg";
import MonitorImage from "@/main/assets/images/monitor.svg";
import CirclePauseIcon from "@/main/assets/icons/circlePause.svg";
import CirclePlayIcon from "@/main/assets/icons/circlePlay.svg";
import OurCustomers from "@/main/components/OurCustomers";

export default function Home() {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (router.asPath === "/auth") return;

    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "");
      if (userData) setIsUserLoggedIn(true);
    } catch {}

    isLoggedIn()
      .then((userData) => setIsUserLoggedIn(!!userData))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.ref) {
        localStorage.setItem("referralSlug", `ref=${router.query.ref}`);
        router.replace("/");
        reportReferralView(`ref=${router.query.ref}`);
      }
    }
  }, [router.isReady]);

  const [tariffs, setTariffs] = useState<Tariffs>({
    print: {},
    binding: {},
  } as Tariffs);

  const videoGalleryList = {
    "معرفی چاپ روم":
      "https://www.aparat.com/video/video/embed/videohash/M4YnX/vt/frame",
    "راهنمای ثبت سفارش":
      "https://www.aparat.com/video/video/embed/videohash/rP64U/vt/frame",
    "راهنمای پیگیری سفارش":
      "https://www.aparat.com/video/video/embed/videohash/rP64U/vt/frame", // TOOD
    "همکاری در فروش":
      "https://www.aparat.com/video/video/embed/videohash/kQgJK/vt/frame",
  };
  const [selectedVideo, setSelectedVideo] =
    useState<keyof typeof videoGalleryList>("معرفی چاپ روم");
  const [cooperationPhoneNumber, setCooperationPhoneNumber] = useState("");
  const [isSendingCooperationRequest, setIsSendingCooperationRequest] =
    useState(false);

  return (
    <div className={styles.Container}>
      <Head>
        <title>صفحه اصلی</title>
      </Head>
      <div className={styles.Introduction}>
        <div />
        <div>
          <h1>چاپ روم</h1>
          <h1>سامانه چاپ و پرینت آنلاین و ارزان</h1>
          <p>
            استارت آپ چاپ روم با بهره گیری از دستگاه های صنعتی روز دنیا، خدمات
            چاپ آنلاین را با کیفیت بالا و قیمت باور نکردنی به سراسر کشور ارائه
            میکند.
          </p>
          <div>
            <Link href={isUserLoggedIn ? "/dashboard/orders/new" : "/auth"}>
              <Button varient="gradient">سفارش پرینت</Button>
            </Link>
            <Link href="/tariffs">
              <Button varient="outlined">تعرفه پرینت</Button>
            </Link>
          </div>
        </div>
        <div>
          <div className={styles.Steps}>
            <div>
              <span>
                <FormattedNumber value={1} />
              </span>{" "}
              <span>ثبت سفارش</span>
            </div>
            <div>
              <span>
                <FormattedNumber value={2} />
              </span>{" "}
              <span>آپلود فایل</span>
            </div>
            <div>
              <span>
                <FormattedNumber value={3} />
              </span>{" "}
              <span>فرآیند چاپ</span>
            </div>
            <div>
              <span>
                <FormattedNumber value={4} />
              </span>{" "}
              <span>ارسال سفارش</span>
            </div>
          </div>
          <div className={styles.Images}>
            <div>
              <div>
                <div>
                  <img src="/assets/images/newOrder.svg" alt="New Order" />
                </div>
                <div>
                  <img src="/assets/images/uploading.svg" alt="Uploading" />
                </div>
                <div>
                  <img src="/assets/images/printing.svg" alt="Printing" />
                </div>
                <div>
                  <img
                    src="/assets/images/bikeDelivery.svg"
                    alt="Bike Delivery"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ReadMore}>
          بیشتر بخوانید
          <ExpandMoreIcon />
        </div>
      </div>
      <div className={styles.Gift}>
        <GiftImage />
        <div>
          <h1>هدیه اولین سفارش</h1>
          <p>
            با ثبت نام در چاپ روم{" "}
            <span className={styles.Highlight}>30 صفحه پرینت رایگان</span> در
            اولین سفارش هدیه بگیرید.
          </p>
          <Button varient="gradient">دریافت کد هدیه</Button>
        </div>
      </div>
      <div className={styles.Calculator}>
        <h1>سفارش پرینت</h1>
        <div>
          <div>
            <DataLoader load={() => getTariffs()} setData={setTariffs}>
              <PrintPriceCalculator printTariffs={tariffs.print} />
            </DataLoader>
          </div>
          <div>
            <CalculatorImage />
          </div>
        </div>
      </div>
      <div className={styles.BookPrinting}>
        <h1>سفارش چاپ کتاب</h1>
        <div>
          <div>
            <BookPrintingImage />
          </div>
          <div>
            <div>
              <div className={styles.Title}>
                از منوی زیر خدمات مورد نظر خود را انتخاب کنید
              </div>
              <div className={styles.Input}>
                <Select
                  value={null}
                  onChange={() => {}}
                  options={{}}
                  varient="shadow-without-bg"
                  placeholder="قطع کتاب"
                  readOnly
                  height={48}
                />
              </div>
              <div className={styles.Input}>
                <Select
                  value={null}
                  onChange={() => {}}
                  options={{}}
                  varient="shadow-without-bg"
                  placeholder="جنس کاغذ"
                  readOnly
                  height={48}
                />
              </div>
              <div className={styles.Input}>
                <Select
                  value={null}
                  onChange={() => {}}
                  options={{}}
                  varient="shadow-without-bg"
                  placeholder="نوع صحافی"
                  readOnly
                  height={48}
                />
              </div>
              <div className={styles.Row}>
                <div className={styles.Input}>
                  <TextInput
                    inputProps={{ type: "number", placeholder: "تعداد صفحه" }}
                    varient="shadow-without-bg"
                    height={48}
                  />
                </div>
                <div className={styles.Input}>
                  <TextInput
                    inputProps={{
                      type: "number",
                      placeholder: "تیراژ (حداقل 50 نسخه)",
                    }}     
                    height={48}
                    varient="shadow-without-bg"
                  />
                </div>
              </div>
              <div className={styles.Row}>
                <div>
                  <span>قیمت هر کتاب: </span>
                  <span>
                    <FormattedNumber value={56000} /> تومان
                  </span>
                </div>
                <div>
                  <span>قیمت کل: </span>
                  <span>
                    <FormattedNumber value={560000} /> تومان
                  </span>
                </div>
              </div>
              <div className={styles.SubmitButton}>
                <Button varient="gradient" style={{ padding: "0 30px" }}>
                  مشاوره رایگان
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Features}>
        <h1>چرا چاپ روم؟</h1>
        <div>
          <div>
            <PostageImage />
            <h2>ارسال رایگان</h2>
            <p>
              جهت رفاه حال مشتریان سفارشات بالای{" "}
              <FormattedNumber value={2000} /> برگ در هرجای ایران به صورت رایگان
              ارسال خواهد شد.
            </p>
          </div>
          <div>
            <PriceImage />
            <h2>
              <FormattedNumber value={1} />/<FormattedNumber value={8} /> قیمت
              مصوب
            </h2>
            <p>
              چاپ روم با استفاده از بهترین پرینترها، کاغذهای اورجینال، پایان
              نامه، جزوه و یا کتاب شما را با قیمت حداقل{" "}
              <FormattedNumber value={1} />/<FormattedNumber value={8} /> قیمت
              مصوب .چاپ و تکثیر می‌کند
            </p>
          </div>
          <div>
            <SupportImage />
            <h2>پشتیبانی 24 ساعته</h2>
            <p>
              پشتیبانان چاپ روم آماده ارائه خدمات پشتیبانی به شما هستند. لذا جهت
              پاسخگویی به سوالات یا مشکلات خود می‌توانید با .پشتیبانان ما ارتباط
              برقرار کنید
            </p>
          </div>
          <div>
            <PostageSpeedImage />
            <h2>سرعت و کیفیت</h2>
            <p>
              یکی از مزایای مهم خدمات چاپ روم استفاده از مواد اولیه باکیفیت در
              صنعت چاپ می‌باشد. علاوه بر این سفارشات شما در کمترین زمان .ارسال
              خواهد شد
            </p>
          </div>
        </div>
      </div>
      <div className={styles.VideoGallery}>
        <h1>گالری ویدیو</h1>
        <div>
          <VideoGalleryBG />
          <div>
            <div>
              <MonitorImage />
              <iframe src={videoGalleryList[selectedVideo]} />
            </div>
          </div>
        </div>
        <div>
          {Object.keys(videoGalleryList).map((key) => (
            <div
              key={key}
              onClick={() =>
                setSelectedVideo(key as keyof typeof videoGalleryList)
              }
              className={key === selectedVideo ? styles.Selected : ""}
            >
              <div></div>
              <div>{key}</div>
              <div>
                {key === selectedVideo ? (
                  <CirclePauseIcon />
                ) : (
                  <CirclePlayIcon />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.Cooperation}>
        <div>
          <div></div>
          <div>
            <h1>همکاری با موسسات و سازمان‌ها</h1>
            <p>
              پلتفرم چاپ‌روم به منظور کاهش هزینه و اتلاف وقت آماده عقد قرارداد
              متناسب با حجم سفارشات با قیمت توافقی می‌باشد.
            </p>
            <strong>
              برای کسب اطلاعات بیشتر شماره تماس خود را در کادر زیر وارد کنید
            </strong>
            <div>
              <TextInput
                inputProps={{ type: "number", placeholder: "09xxxxxxxxx" }}
                varient="shadow"
                value={cooperationPhoneNumber}
                onChange={(newValue) =>
                  setCooperationPhoneNumber(newValue.substring(0, 11))
                }
              />
              <Button
                onClick={() => {
                  setIsSendingCooperationRequest(true);
                  sendCooperationRequest(cooperationPhoneNumber)
                    .then(toast.success)
                    .catch(toast.error)
                    .finally(() => setIsSendingCooperationRequest(false));
                }}
                loading={isSendingCooperationRequest}
                disabled={
                  isSendingCooperationRequest ||
                  cooperationPhoneNumber.length !== 11 ||
                  !cooperationPhoneNumber.startsWith("09") ||
                  isNaN(parseInt(cooperationPhoneNumber))
                }
              >
                ثبت
              </Button>
            </div>
          </div>
        </div>
      </div>
      <OurCustomers />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
