import styles from "./style.module.scss";
import { FormattedDate, FormattedNumber, FormattedTime } from "react-intl";
import { DedicatedDiscountCodeReport } from "@/shared/types";

interface DedicatedDiscountCodeReportTableProps {
  dedicatedDiscountCodeReports: DedicatedDiscountCodeReport[];
}

export default function DedicatedDiscountCodeReportTable({
  dedicatedDiscountCodeReports,
}: DedicatedDiscountCodeReportTableProps) {
  return (
    <table className={styles.DedicatedDiscountCodeReportTable}>
      <thead>
        <tr>
          <th>تاریخ</th>
          <th>کاربر</th>
          <th>خریدار</th>
          <th>شماره سفارش</th>
          <th>مبلغ سفارش</th>
          <th>تخفیف خریدار</th>
          <th>پورسانت کاربر</th>
          <th>لینک کاربر</th>
        </tr>
      </thead>
      <tbody>
        {dedicatedDiscountCodeReports.map((dedicatedDiscountCodeReport) => (
          <tr key={dedicatedDiscountCodeReport.orderId}>
            <td>
              <span className={styles.MobileLabel}>تاریخ:</span>
              <span className={styles.Date}>
                <span>
                  <FormattedDate value={dedicatedDiscountCodeReport.date} />
                </span>
                <span>
                  <FormattedTime
                    value={dedicatedDiscountCodeReport.date}
                    hour12
                  />
                </span>
              </span>
            </td>
            <td>
              <span className={styles.MobileLabel}>کاربر:</span>
              <div>
                <div className={styles.UserName}>
                  {dedicatedDiscountCodeReport.user.name}
                </div>
                <div>
                  <FormattedNumber
                    value={parseInt(
                      dedicatedDiscountCodeReport.user.phoneNumber
                    )}
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
                  {dedicatedDiscountCodeReport.buyer.name}
                </div>
                <div>
                  <FormattedNumber
                    value={parseInt(
                      dedicatedDiscountCodeReport.buyer.phoneNumber
                    )}
                    useGrouping={false}
                    minimumIntegerDigits={11}
                  />
                </div>
              </div>
            </td>
            <td>
              <span className={styles.MobileLabel}>شماره سفارش:</span>
              <FormattedNumber
                value={dedicatedDiscountCodeReport.orderId}
                useGrouping={false}
              />
            </td>
            <td>
              <span className={styles.MobileLabel}>مبلغ سفارش:</span>
              <FormattedNumber
                value={dedicatedDiscountCodeReport.amount}
              />{" "}
              تومان
            </td>
            <td>
              <span className={styles.MobileLabel}>تخفیف خریدار:</span>
              <span className={styles.Commission}>
                <span>
                  <FormattedNumber
                    value={dedicatedDiscountCodeReport.discountAmount}
                  />{" "}
                  تومان
                </span>
                <span>
                  (
                  <FormattedNumber
                    value={dedicatedDiscountCodeReport.discountValue / 100}
                    style="percent"
                  />
                  )
                </span>
              </span>
            </td>
            <td>
              <span className={styles.MobileLabel}>پورسانت کاربر:</span>
              <span className={styles.Commission}>
                <span>
                  <FormattedNumber
                    value={dedicatedDiscountCodeReport.discountBenefit}
                  />{" "}
                  تومان
                </span>
                <span>
                  {"("}
                  <FormattedNumber
                    value={
                      dedicatedDiscountCodeReport.discountBenefitPercentage /
                      100
                    }
                    style="percent"
                  />
                  {")"}
                </span>
              </span>
            </td>
            <td>
              <span className={styles.MobileLabel}>کد تخفیف:</span>
              <span className={styles.DiscountCode}>
                {dedicatedDiscountCodeReport.discountCode}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
