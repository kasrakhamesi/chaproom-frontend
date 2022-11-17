import styles from "./style.module.scss";
import { PropsWithChildren } from "react";
import Header from "@/main/components/Header";
import Footer from "@/main/components/Footer";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.Container}>
      <Header />
      <div className={styles.Content}>{children}</div>
      <Footer />
    </div>
  );
}
