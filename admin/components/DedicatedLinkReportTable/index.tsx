import styles from "./style.module.scss";
import { FormattedDate, FormattedNumber, FormattedTime } from "react-intl";
import { DedicatedLinkReport } from "@/shared/types";

interface DedicatedLinkReportTableProps {
  dedicatedLinkReports: DedicatedLinkReport[];
}

export default function DedicatedLinkReportTable({
  dedicatedLinkReports,
}: DedicatedLinkReportTableProps) {
  return (
    <table className={styles.DedicatedLinkReportTable}>
      <thead>
        <tr>
          <th>تاریخ</th>
          <th>کاربر</th>
          <th>خریدار</th>
          <th>شماره سفارش</th>
          <th>مبلغ سفارش</th>
          <th>پورسانت کاربر</th>
          <th>لینک کاربر</th>
        </tr>
      </thead>
      <tbody>
        {dedicatedLinkReports.map((dedicatedLinkReport) => (
          <tr key={dedicatedLinkReport.orderId}>
            <td>
              <span className={styles.MobileLabel}>تاریخ:</span>
              <span className={styles.Date}>
                <span>
                  <FormattedDate value={dedicatedLinkReport.date} />
                </span>
                <span>
                  <FormattedTime value={dedicatedLinkReport.date} hour12 />
                </span>
              </span>
            </td>
            <td>
              <span className={styles.MobileLabel}>کاربر:</span>
              <div>
                <div className={styles.UserName}>
                  {dedicatedLinkReport.user.name}
                </div>
                <div>
                  <FormattedNumber
                    value={parseInt(dedicatedLinkReport.user.phoneNumber)}
                    useGrouping={false}
                    minimumIntegerDigits={11}
                  />
                </div>
              </div>
            </td>
            <td>
              <span className={styles.MobileLabel}>خریدار:</span>
              <div>
                <div className={styles.UserName}>
                  {dedicatedLinkReport.buyer.name}
                </div>
                <div>
                  <FormattedNumber
                    value={parseInt(dedicatedLinkReport.buyer.phoneNumber)}
                    useGrouping={false}
                    minimumIntegerDigits={11}
                  />
                </div>
              </div>
            </td>
            <td>
              <span className={styles.MobileLabel}>شماره سفارش:</span>
              <FormattedNumber
                value={dedicatedLinkReport.orderId}
                useGrouping={false}
              />
            </td>
            <td>
              <span className={styles.MobileLabel}>مبلغ سفارش:</span>
              <FormattedNumber value={dedicatedLinkReport.amount} /> تومان
            </td>
            <td>
              <span className={styles.MobileLabel}>پورسانت کاربر:</span>
              <span className={styles.Commission}>
                <span>
                  <FormattedNumber
                    value={dedicatedLinkReport.referralBenefit}
                  />{" "}
                  تومان
                </span>
                <span>
                  {"("}
                  <FormattedNumber
                    value={dedicatedLinkReport.referralCommission / 100}
                    style="percent"
                  />
                  {")"}
                </span>
              </span>
            </td>
            <td>
              <span className={styles.MobileLabel}>لینک کاربر:</span>
              <span className={styles.Link}>
                {dedicatedLinkReport.referralSlug}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
