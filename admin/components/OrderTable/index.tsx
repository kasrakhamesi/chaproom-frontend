import styles from "./style.module.scss";
import { FormattedDate, FormattedNumber, FormattedTime } from "react-intl";
import { Order } from "@/shared/types";

interface OrderTableProps {
  orders: Order[];
  onSeeOrderDetails: (orderId: number) => void;
  onCancelOrder: (orderId: number) => void;
  onConfirmOrder: (orderId: number) => void;
  onMarkOrderSent: (orderId: number) => void;
  itemsStatus: "canceled" | "pending" | "preparing" | "sent" | null;
}

export default function OrderTable({
  orders,
  onSeeOrderDetails,
  onCancelOrder,
  onConfirmOrder,
  onMarkOrderSent,
  itemsStatus,
}: OrderTableProps) {
  return (
    <table className={styles.OrderTable} data-items-status={itemsStatus}>
      <thead>
        <tr>
          <th>شماره سفارش</th>
          <th>تاریخ سفارش</th>
          <th>مبلغ سفارش</th>
          {itemsStatus === null && <th>وضعیت</th>}
          <th>جزییات</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>
              <span className={styles.MobileLabel}>شماره سفارش:</span>
              <FormattedNumber value={order.id} useGrouping={false} />
            </td>
            <td>
              <span className={styles.MobileLabel}>تاریخ سفارش:</span>
              <span className={styles.Date}>
                <span>
                  <FormattedDate value={order.date} />
                </span>
                <span>
                  <FormattedTime value={order.date} hour12 />
                </span>
              </span>
            </td>
            <td>
              <span className={styles.MobileLabel}>مبلغ سفارش:</span>
              <FormattedNumber value={order.amount} /> تومان
            </td>
            {itemsStatus === null && (
              <td>
                <span className={styles.MobileLabel}>وضعیت:</span>
                {(() => {
                  switch (order.status) {
                    case "pending":
                      return (
                        <span className={styles.Pending}>در انتظار بررسی</span>
                      );
                    case "preparing":
                      return (
                        <span className={styles.Preparing}>
                          در حال آماده سازی
                        </span>
                      );
                    case "sent":
                      return (
                        <a
                          href="/"
                          target="_blank"
                          className={styles.TrackingLink}
                        >
                          رهگیری مرسوله
                        </a>
                      );
                    case "canceled":
                      return (
                        <span className={styles.Canceled}>
                          لغو شده
                          <br />
                          بازگشت وجه به کیف پول
                        </span>
                      );
                  }
                })()}
              </td>
            )}
            <td>
              <button
                className={styles.SeeDetailsButton}
                onClick={() => onSeeOrderDetails(order.id)}
              >
                مشاهده
              </button>
            </td>
            <td>
              <div className={styles.ButtonList}>
                {order.status === "canceled" ? (
                  <span className={styles.Canceled}>لغو شده</span>
                ) : order.status === "sent" ? (
                  <span className={styles.Sent}>ارسال شده</span>
                ) : order.status === "pending" ? (
                  <>
                    <button
                      className={styles.CancelButton}
                      onClick={() => onCancelOrder(order.id)}
                    >
                      رد کردن
                    </button>
                    <button
                      className={styles.ConfirmButton}
                      onClick={() => onConfirmOrder(order.id)}
                    >
                      تایید کردن
                    </button>
                  </>
                ) : (
                  order.status === "preparing" && (
                    <button
                      className={styles.MarkAsSentButton}
                      onClick={() => onMarkOrderSent(order.id)}
                    >
                      ارسال شد
                    </button>
                  )
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
