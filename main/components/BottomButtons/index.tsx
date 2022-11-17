import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isLoggedIn } from "@/main/api";
import NavLink from "@/shared/components/NavLink";
import OrdersIcon from "@/shared/assets/icons/orders.svg";
import Logo from "@/shared/assets/images/logo.svg";
import PricesIcon from "@/shared/assets/icons/money.svg";

export default function BottomButtons() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "");
      if (userData) setIsUserLoggedIn(true);
    } catch {}

    isLoggedIn()
      .then((userData) => setIsUserLoggedIn(!!userData))
      .catch(() => {});
  }, []);

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.BottomButtons}>
          <Link href={isUserLoggedIn ? "/dashboard/orders/new" : "/auth"}>
            <div className={styles.NavLink}>
              <OrdersIcon />
              <div>سفارش پرینت</div>
            </div>
          </Link>
          <NavLink href="/" end>
            <div className={styles.NavLink}>
              <Logo />
              <div>چاپ روم</div>
            </div>
          </NavLink>
          <NavLink href="/tariffs" end>
            <div className={styles.NavLink}>
              <PricesIcon />
              <div>تعرفه پرینت</div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className={styles.Placeholder} />
    </>
  );
}
