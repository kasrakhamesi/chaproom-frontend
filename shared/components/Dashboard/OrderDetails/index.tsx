import styles from "./style.module.scss";
import { Order } from "@/shared/types";
import {
  FormattedDate,
  FormattedNumber,
  FormattedTime,
  useIntl,
} from "react-intl";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const intl = useIntl();

  return (
    <div className={styles.OrderDetails} key={order.id}>
      <div>
        <div className={styles.Label}>خلاصه سفارش:</div>
        {order.printFolders.map((printFolder, index) => (
          <div key={index}>
            <div>پوشه {index + 1}:</div>
            <div>
              {[
                {
                  blackAndWhite: "سیاه و سفید",
                  normalColor: "رنگی معمولی",
                  fullColor: "تمام رنگی",
                }[printFolder.printColor],
                { a4: "A4", a5: "A5", a3: "A3" }[printFolder.printSize],
                { singleSided: "یک رو", doubleSided: "دو رو" }[
                  printFolder.printSide
                ],
                ...(printFolder.bindingOptions === null
                  ? []
                  : [
                      "صحافی",
                      {
                        springNormal: "فنر با طلق معمولی",
                        springPapco: "فنر با طلق پاپکو",
                        stapler: "منگنه",
                      }[printFolder.bindingOptions.bindingType],
                      printFolder.bindingOptions.bindingMethod !==
                      "countOfFiles"
                        ? {
                            allFilesTogether: "هر فایل جدا",
                            eachFileSeparated: "همه فایل ها با هم",
                          }[printFolder.bindingOptions.bindingMethod]
                        : `${intl.formatNumber(
                            printFolder.bindingOptions.countOfFiles || 0
                          )} فایل`,
                      {
                        colorful: "جلد رنگی",
                        blackAndWhite: "جلد سیاه و سفید",
                      }[printFolder.bindingOptions.coverColor],
                    ]),
                `${intl.formatNumber(printFolder.countOfCopies || 1)} نسخه`,
              ].join(" / ")}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className={styles.Label}>فایل ها:</div>
        {order.printFolders.map((printFolder, index) => {
          const uploadedPages = printFolder.printFiles.reduce(
            (result, item) => result + item.countOfPages,
            0
          );

          return (
            <div key={index}>
              <div>پوشه {index + 1}:</div>
              <div>
                <span>
                  <FormattedNumber value={printFolder.printFiles.length} /> فایل
                </span>
                <a href={printFolder.filesUrl} target="_blank">
                  دانلود
                </a>
                <span
                  className={
                    uploadedPages === printFolder.countOfPages
                      ? styles.Match
                      : styles.NotMatch
                  }
                >
                  مجموع: <FormattedNumber value={printFolder.countOfPages} />{" "}
                  صفحه
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div className={styles.Label}>توضیحات سفارش:</div>
        {order.printFolders.map((printFolder, index) => (
          <div key={index}>
            <div>پوشه {index + 1}:</div>
            <div>
              {printFolder.description ? printFolder.description : "(ندارد)"}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className={styles.Label}>تاریخ سفارش:</div>
        <div>
          <span>
            <FormattedDate value={order.date} />
          </span>
          <span>
            <FormattedTime value={order.date} hour12 />
          </span>
        </div>
      </div>
      <div>
        <div className={styles.Label}>تحویل گیرنده:</div>
        <div>{order.recipientName}</div>
      </div>
      <div>
        <div className={styles.Label}>شماره تماس تحویل گیرنده:</div>
        <div>{order.recipientPhoneNumber}</div>
      </div>
      <div>
        <div className={styles.Label}>کدپستی تحویل گیرنده:</div>
        <div>{order.recipientPostalCode}</div>
      </div>
      <div>
        <div className={styles.Label}>نشانی تحویل گیرنده:</div>
        <div>{order.recipientDeliveryAddress}</div>
      </div>
      <div>
        <div className={styles.Label}>مبلغ سفارش:</div>
        <div>
          <FormattedNumber value={order.amount} /> تومان
        </div>
      </div>
      <div>
        <div className={styles.Label}>مبلغ تخفیف:</div>
        <div>
          {order.discountAmount ? (
            <>
              <FormattedNumber value={order.discountAmount} /> تومان
            </>
          ) : (
            "---"
          )}
        </div>
      </div>
      <div>
        <div className={styles.Label}>روش پرداخت:</div>
        <div>
          {!!order.gatewayPaidAmount && (
            <div>
              <div>درگاه پرداخت:</div>
              <div>
                <FormattedNumber value={order.gatewayPaidAmount} /> تومان
              </div>
            </div>
          )}
          {!!order.walletPaidAmount && (
            <div>
              <div>کیف پول:</div>
              <div>
                <FormattedNumber value={order.walletPaidAmount} /> تومان
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className={styles.Label}>وضعیت سفارش:</div>
        <div>
          <div>
            <div>
              {
                {
                  canceled: "لغو شده",
                  pending: "در انتظار بررسی",
                  preparing: "در حال آماده سازی",
                  sent: "ارسال شده",
                }[order.status]
              }
            </div>
            {order.status === "canceled" && <div>{order.cancelReason}</div>}
          </div>
          <div>
            <div>
              <FormattedDate value={order.lastUpdateDate} />
            </div>
            <div>
              <FormattedTime value={order.lastUpdateDate} hour12 />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.Label}>کد رهگیری پستی:</div>
        <div>{order.trackingNumber ? order.trackingNumber : "---"}</div>
      </div>
      <div>
        <div className={styles.Label}>تاریخ ارسال:</div>
        <div>
          {order.postageDate ? (
            <>
              <span>
                <FormattedDate value={order.postageDate} />
              </span>
              <span>
                <FormattedTime value={order.postageDate} hour12 />
              </span>
            </>
          ) : (
            "---"
          )}
        </div>
      </div>
      <div>
        <div className={styles.Label}>نحوه ارسال:</div>
        <div>{order.postageMethod ? order.postageMethod : "---"}</div>
      </div>
    </div>
  );
}
