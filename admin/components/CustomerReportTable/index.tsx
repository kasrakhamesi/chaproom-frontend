import styles from "./style.module.scss";
import { CustomerReport } from "@/shared/types";
import { FormattedDate, FormattedNumber, FormattedTime } from "react-intl";

interface CustomerReportTableProps {
  customerReports: CustomerReport[];
  onSeeUserOrderList: (userId: number) => void;
}

export default function CustomerReportTable({
  customerReports,
  onSeeUserOrderList,
}: CustomerReportTableProps) {
  return (
    <table className={styles.CustomerReportTable}>
      <thead>
        <tr>
          <th>کاربر</th>
          <th>تاریخ ثبت نام</th>
          <th>تاریخ اولین سفارش</th>
          <th>تاریخ آخرین سفارش</th>
          <th>کل مبلغ پرداختی</th>
          <th>موجودی</th>
          <th>سفارش ها</th>
        </tr>
      </thead>
      <tbody>
        {customerReports.map((customerReport) => (
          <tr key={customerReport.id}>
            <td>
              <span className={styles.MobileLabel}>کاربر:</span>
              <div>
                <div className={styles.UserName}>{customerReport.name}</div>
                <div>
                  <FormattedNumber
                    value={parseInt(customerReport.phoneNumber)}
                    useGrouping={false}
                    minimumIntegerDigits={11}
                  />
                </div>
              </div>
            </td>
            <td>
              <span className={styles.MobileLabel}>تاریخ ثبت نام:</span>
              <span className={styles.Date}>
                <span>
                  <FormattedDate value={customerReport.registrationDate} />
                </span>
                <span>
                  <FormattedTime
                    value={customerReport.registrationDate}
                    hour12
                  />
                </span>
              </span>
            </td>
            <td>
              <span className={styles.MobileLabel}>تاریخ اولین سفارش:</span>
              <span className={styles.Date}>
                <span>
                  <FormattedDate value={customerReport.firstOrderDate} />
                </span>
                <span>
                  <FormattedTime value={customerReport.firstOrderDate} hour12 />
                </span>
              </span>
            </td>
            <td>
              <span className={styles.MobileLabel}>تاریخ آخرین سفارش:</span>
              <span className={styles.Date}>
                <span>
                  <FormattedDate value={customerReport.lastOrderDate} />
                </span>
                <span>
                  <FormattedTime value={customerReport.lastOrderDate} hour12 />
                </span>
              </span>
            </td>
            <td>
              <span className={styles.MobileLabel}>کل مبلغ پرداختی:</span>
              <FormattedNumber value={customerReport.totalPaidAmount} /> تومان
            </td>
            <td>
              <span className={styles.MobileLabel}>موجودی:</span>
              <div className={styles.UserWallet}>
                <div>
                  <FormattedNumber
                    value={
                      customerReport.walletBalance +
                      customerReport.marketingBalance
                    }
                  />{" "}
                  تومان
                </div>
                <div>
                  <div>
                    <span>کیف پول:</span>
                    <span>
                      <FormattedNumber value={customerReport.walletBalance} />{" "}
                      تومان
                    </span>
                  </div>
                  <div>
                    <span>بازاریابی:</span>
                    <span>
                      <FormattedNumber
                        value={customerReport.marketingBalance}
                      />{" "}
                      تومان
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <button
                className={styles.SeeUserOrdersButton}
                onClick={() => onSeeUserOrderList(customerReport.id)}
              >
                مشاهده
                <span className={styles.MobileLabel}>سفارش ها</span>
              </button>
              <div className={styles.CountOfOrders}>
                {customerReport.countOfOrders}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
