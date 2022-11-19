import styles from "./style.module.scss";
import { useState } from "react";
import { FormattedNumber } from "react-intl";
import { getDashboard } from "@/main/api";
import DataLoader from "@/shared/components/DataLoader";
import DashboardNavLinks from "@/main/components/Dashboard/NavLinks";
import Wallet from "@/main/components/Dashboard/Wallet";
import Avatar from "@/shared/components/Dashboard/Avatar";

export default function DashboardSidebar() {
  const [data, setData] = useState<{
    marketingBalance: number;
    walletBalance: number;
    avatar: string | null;
    name: string;
    phoneNumber: string;
  }>({
    marketingBalance: 0,
    walletBalance: 0,
    avatar: null,
    name: "",
    phoneNumber: "",
  });

  return (
    <div className={styles.Sidebar}>
      <DataLoader load={() => getDashboard()} setData={setData}>
        <Wallet
          marketingBalance={data.marketingBalance}
          walletBalance={data.walletBalance}
          setBalance={(walletBalance: number, marketingBalance: number) => {
            setData({
              ...data,
              walletBalance,
              marketingBalance,
            });
          }}
        />
        <DashboardNavLinks />
        <div className={styles.User}>
          <Avatar user={{ name: data.name, avatar: data.avatar }} />
          <div className={styles.Meta}>
            <div>{data.name}</div>
            <div className={styles.PhoneNumber}>
              <FormattedNumber
                value={parseInt(data.phoneNumber)}
                useGrouping={false}
                minimumIntegerDigits={11}
              />
            </div>
          </div>
        </div>
      </DataLoader>
    </div>
  );
}
