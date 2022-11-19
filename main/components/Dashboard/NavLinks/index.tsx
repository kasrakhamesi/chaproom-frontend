import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { logout } from "@/main/api";
import NavLink from "@/shared/components/NavLink";
import NavigateBeforeIcon from "@/shared/assets/icons/navigateBefore.svg";
import DashboardIcon from "@/shared/assets/icons/dashboard.svg";
import OrdersIcon from "@/shared/assets/icons/orders.svg";
import AddressesIcon from "@/main/assets/icons/addresses.svg";
import TransactionsIcon from "@/main/assets/icons/transactions.svg";
import MarketingIcon from "@/shared/assets/icons/money.svg";
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
      <NavLink href="/dashboard/orders">
        <a className={styles.NavLink}>
          <OrdersIcon />
          <div className={styles.Text}>سفارش ها من</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/addresses">
        <a className={styles.NavLink}>
          <AddressesIcon />
          <div className={styles.Text}>آدرس ها من</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/transactions">
        <a className={styles.NavLink}>
          <TransactionsIcon />
          <div className={styles.Text}>تراکنش های انجام شده</div>
          <div className={styles.Arrow}>
            <NavigateBeforeIcon />
          </div>
        </a>
      </NavLink>
      <NavLink href="/dashboard/marketing">
        <a className={styles.NavLink}>
          <MarketingIcon />
          <div className={styles.Text}>پنل بازاریابی</div>
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
