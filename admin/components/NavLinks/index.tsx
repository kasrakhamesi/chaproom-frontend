import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { logout } from "@/admin/api";
import NavLink from "@/shared/components/NavLink";
import NavigateBeforeIcon from "@/shared/assets/icons/navigateBefore.svg";
import DashboardIcon from "@/shared/assets/icons/dashboard.svg";
import UsersIcon from "@/admin/assets/icons/users.svg";
import OrdersIcon from "@/shared/assets/icons/orders.svg";
import DiscountIcon from "@/admin/assets/icons/discount.svg";
import CooperationRequestsIcon from "@/admin/assets/icons/cooperationRequests.svg";
import FinancialRecordsIcon from "@/admin/assets/icons/financialRecords.svg";
import WithdrawalRequestsIcon from "@/admin/assets/icons/withdrawalRequests.svg";
import PricesIcon from "@/shared/assets/icons/money.svg";
import BlogIcon from "@/admin/assets/icons/blog.svg";
import MarketingReportIcon from "@/admin/assets/icons/marketingReport.svg";
import CustomerReportIcon from "@/admin/assets/icons/customerReport.svg";
import ProfileIcon from "@/shared/assets/icons/profile.svg";
import LogoutIcon from "@/shared/assets/icons/logout.svg";

export default function DashboardNavLinks() {
  const router = useRouter();

  return (
    <>
      <NavLink href="/dashboard" end>
        <a className={[styles.NavLink, styles.DashboardLink].join(" ")}>
          <DashboardIcon />
          <div className={styles.Text}>داشبورد</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/users">
        <a className={styles.NavLink}>
          <UsersIcon />
          <div className={styles.Text}>کاربران</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/orders">
        <a className={styles.NavLink}>
          <OrdersIcon />
          <div className={styles.Text}>سفارش ها</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/discounts">
        <a className={styles.NavLink}>
          <DiscountIcon />
          <div className={styles.Text}>کدهای تخفیف</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/cooperation-requests">
        <a className={styles.NavLink}>
          <CooperationRequestsIcon />
          <div className={styles.Text}>درخواست های همکاری</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/financial-records">
        <a className={styles.NavLink}>
          <FinancialRecordsIcon />
          <div className={styles.Text}>سوابق مالی</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/withdrawal-requests">
        <a className={styles.NavLink}>
          <WithdrawalRequestsIcon />
          <div className={styles.Text}>درخواست های برداشت</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/tariffs">
        <a className={styles.NavLink}>
          <PricesIcon />
          <div className={styles.Text}>تعرفه ها</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/blog">
        <a className={styles.NavLink}>
          <BlogIcon />
          <div className={styles.Text}>بلاگ</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/marketing-reports">
        <a className={styles.NavLink}>
          <MarketingReportIcon />
          <div className={styles.Text}>گزارش بازاریابی</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/customer-reports">
        <a className={styles.NavLink}>
          <CustomerReportIcon />
          <div className={styles.Text}>گزارش مشتریان</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <div className={styles.Spacer} />
      <NavLink href="/dashboard/profile">
        <a className={styles.NavLink}>
          <ProfileIcon />
          <div className={styles.Text}>پروفایل</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <a
        className={styles.NavLink}
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        <LogoutIcon />
        خروج
      </a>
    </>
  );
}
