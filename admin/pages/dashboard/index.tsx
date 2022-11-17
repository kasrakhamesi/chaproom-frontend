import styles from "./style.module.scss";
import { ReactElement } from "react";
import Head from "next/head";
import Avatar from "@/shared/components/Dashboard/Avatar";
import DashboardLayout from "@/admin/components/Layout";
import DashboardNavLinks from "@/admin/components/NavLinks";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import BarChart from "@/admin/components/BarChart";
import IranMap from "@/admin/components/IranMap";

export default function DashboardMain() {
  return (
    <>
      <Head>
        <title>داشبورد</title>
      </Head>
      <SectionHeader title="داشبورد" hideBackToSiteButton />
      <div className={styles.Container}>
        <div className={styles.NonMobile}>
          <div className={styles.ContentContainer}>
            <div>
              <SectionContent>
                <ContentHeader title="فروش" />
                <BarChart
                  data={{
                    "05/10": 4,
                    "05/11": 5,
                    "05/12": 6,
                    "05/13": 8,
                    "05/14": 10,
                    "05/15": 8,
                    "05/16": 6,
                    "05/17": 8,
                    "05/18": 13,
                    "05/19": 15,
                    "05/20": 20,
                    "05/21": 18,
                    "05/22": 14,
                    "05/23": 13,
                  }}
                />
              </SectionContent>
              <SectionContent>
                <ContentHeader title="کاربران" />
                <BarChart
                  data={{
                    "05/10": 4,
                    "05/11": 5,
                    "05/12": 6,
                    "05/13": 8,
                    "05/14": 10,
                    "05/15": 8,
                    "05/16": 6,
                    "05/17": 8,
                    "05/18": 13,
                    "05/19": 15,
                    "05/20": 20,
                    "05/21": 18,
                    "05/22": 14,
                    "05/23": 13,
                  }}
                />
              </SectionContent>
            </div>
            <div>
              <SectionContent>
                <ContentHeader title="سفارش ها" />
                <BarChart
                  data={{
                    "05/10": 4,
                    "05/11": 5,
                    "05/12": 6,
                    "05/13": 8,
                    "05/14": 10,
                    "05/15": 8,
                    "05/16": 6,
                    "05/17": 8,
                    "05/18": 13,
                    "05/19": 15,
                    "05/20": 20,
                    "05/21": 18,
                    "05/22": 14,
                    "05/23": 13,
                  }}
                />
              </SectionContent>
              <SectionContent>
                <ContentHeader title="کاربر سفارش" />
                <BarChart
                  data={{
                    "05/10": 4,
                    "05/11": 5,
                    "05/12": 6,
                    "05/13": 8,
                    "05/14": 10,
                    "05/15": 8,
                    "05/16": 6,
                    "05/17": 8,
                    "05/18": 13,
                    "05/19": 15,
                    "05/20": 20,
                    "05/21": 18,
                    "05/22": 14,
                    "05/23": 13,
                  }}
                />
              </SectionContent>
            </div>
            <SectionContent>
              <ContentHeader title="سفارش بر اساس استان" />
              <IranMap
                data={{
                  "آذربایجان شرقی": 4,
                  "آذربایجان غربی": 5,
                  اردبیل: 6,
                  اصفهان: 8,
                  ایلام: 10,
                  بوشهر: 8,
                  تهران: 6,
                  "چهارمحال بختیاری": 8,
                  "خراسان جنوبی": 13,
                  "خراسان رضوی": 15,
                  "خراسان شمالی": 20,
                  خوزستان: 18,
                  زنجان: 14,
                  سمنان: 13,
                  "سیستان و بلوچستان": 12,
                  فارس: 14,
                  قزوین: 10,
                  قم: 8,
                  کرج: 10,
                  کردستان: 13,
                  کرمان: 15,
                  کرمانشاه: 16,
                  "کهکیلویه و بویراحمد": 18,
                  گلستان: 17,
                  گیلان: 20,
                  لرستان: 18,
                  مازندران: 14,
                  مرکزی: 17,
                  هرمزگان: 15,
                  همدان: 18,
                  یزد: 13,
                }}
              />
            </SectionContent>
          </div>
        </div>
        <div className={styles.Mobile}>
          <div className={styles.User}>
            {/* <Avatar user={data} />
            <div className={styles.Meta}>
              <div className={styles.UserRole}>
                {{
                  superAdmin: "سوپر ادمین",
                  admin: "ادمین",
                  agent: "نمایندگی",
                }[data.role.name]}
              </div>
              <div className={styles.Name}>{data.state.currentUser.name}</div>
            </div> */}
          </div>
          <div className={styles.Welcome}>خوش‌آمدی!</div>
          <DashboardNavLinks />
        </div>
      </div>
    </>
  );
}

DashboardMain.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
