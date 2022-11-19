import styles from "./style.module.scss";
import { useState } from "react";
import { AdminUserRole } from "@/shared/types";
import { getDashboard } from "@/admin/api";
import DataLoader from "@/shared/components/DataLoader";
import DashboardNavLinks from "@/admin/components/NavLinks";
import Avatar from "@/shared/components/Dashboard/Avatar";

export default function DashboardSidebar() {
  const [adminData, setAdminData] = useState<{
    avatar: string | null;
    name: string;
    phoneNumber: string;
    role: AdminUserRole;
  }>({
    avatar: null,
    name: "",
    phoneNumber: "",
    role: {
      name: "admin",
    },
  });

  const [sidebarData, setSidebarData] = useState<{
    countOfInProgressOrders: number;
    countOfPendingCooperations: number;
    countOfPendingWithdrawals: number;
  }>({
    countOfInProgressOrders: 0,
    countOfPendingCooperations: 0,
    countOfPendingWithdrawals: 0,
  });

  return (
    <div className={styles.Sidebar}>
      <DataLoader
        load={() => getDashboard()}
        setData={(data) => {
          setAdminData(data.admin);
          setSidebarData(data.sidebarData);
        }}
      >
        <div className={styles.User}>
          <Avatar user={{ name: adminData.name, avatar: adminData.avatar }} />
          <div className={styles.Meta}>
            <div>{adminData.name}</div>
            <div className={styles.UserRole}>
              {
                {
                  superAdmin: "سوپر ادمین",
                  admin: "ادمین",
                  agent: "نمایندگی",
                }[adminData.role.name]
              }
            </div>
          </div>
        </div>
        <DashboardNavLinks sidebarData={sidebarData} />
      </DataLoader>
    </div>
  );
}
