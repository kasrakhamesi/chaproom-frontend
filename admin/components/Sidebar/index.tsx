import styles from "./style.module.scss";
import { useState } from "react";
import { AdminUserRole } from "@/shared/types";
import { getProfile } from "@/admin/api";
import DataLoader from "@/shared/components/DataLoader";
import DashboardNavLinks from "@/admin/components/NavLinks";
import Avatar from "@/shared/components/Dashboard/Avatar";

export default function DashboardSidebar() {
  const [data, setData] = useState<{
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

  return (
    <div className={styles.Sidebar}>
      <DataLoader load={() => getProfile()} setData={setData}>
        <div className={styles.User}>
          <Avatar user={{ name: data.name, avatar: data.avatar }} />
          <div className={styles.Meta}>
            <div>{data.name}</div>
            <div className={styles.UserRole}>
              {
                {
                  superAdmin: "سوپر ادمین",
                  admin: "ادمین",
                  agent: "نمایندگی",
                }[data.role.name]
              }
            </div>
          </div>
        </div>
        <DashboardNavLinks />
      </DataLoader>
    </div>
  );
}
