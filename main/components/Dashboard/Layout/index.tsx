import styles from "./style.module.scss";
import { PropsWithChildren } from "react";
import { SidebarDataProvider } from "@/main/context/sidebarData";
import DashboardSidebar from "@/main/components/Dashboard/Sidebar";

export default function DashboardLayout({ children }: PropsWithChildren<{}>) {
  return (
    <SidebarDataProvider>
      <div className={styles.Container}>
        <div className={styles.SidebarContainer}>
          <DashboardSidebar />
        </div>
        <div className={styles.ContentContainer}>{children}</div>
      </div>
    </SidebarDataProvider>
  );
}
