import styles from "./style.module.scss";
import { PropsWithChildren } from "react";
import StickyBox from "react-sticky-box";
import DashboardSidebar from "@/admin/components/Sidebar";

export default function DashboardLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.Container}>
      <div className={styles.SidebarContainer}>
        <StickyBox offsetTop={50} offsetBottom={50}>
          <DashboardSidebar />
        </StickyBox>
      </div>
      <div className={styles.ContentContainer}>{children}</div>
    </div>
  );
}
