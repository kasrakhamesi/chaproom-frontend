import styles from "./style.module.scss";
import { FormattedDate, FormattedNumber, FormattedTime } from "react-intl";
import { CooperationRequest } from "@/shared/types";

interface CooperationRequestTableProps {
  cooperationRequests: CooperationRequest[];
  onAcceptCooperationRequest: (
    cooperationRequestId: number,
    cooperationRequestDescription: string | null
  ) => void;
  onRejectCooperationRequest: (
    cooperationRequestId: number,
    cooperationRequestDescription: string | null
  ) => void;
  showDescription?: boolean;
  itemsStatus: "approved" | "rejected" | "pending";
}

export default function CooperationRequestTable({
  cooperationRequests,
  onAcceptCooperationRequest,
  onRejectCooperationRequest,
  showDescription = true,
  itemsStatus,
}: CooperationRequestTableProps) {
  return (
    <table
      className={styles.CooperationRequestTable}
      data-items-status={itemsStatus}
    >
      <thead>
        <tr>
          <th>شماره موبایل</th>
          <th>تاریخ</th>
          {showDescription && <th>توضیحات</th>}
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {cooperationRequests.map((cooperationRequest) => (
          <tr key={cooperationRequest.id}>
            <td>
              <span className={styles.MobileLabel}>شماره موبایل:</span>
              <div>
                <FormattedNumber
                  value={parseInt(cooperationRequest.phoneNumber)}
                  useGrouping={false}
                  minimumIntegerDigits={11}
                />
              </div>
            </td>
            <td>
              <span className={styles.MobileLabel}>تاریخ:</span>
              <span className={styles.Date}>
                <span>
                  <FormattedDate value={cooperationRequest.date} />
                </span>
                <span>
                  <FormattedTime value={cooperationRequest.date} hour12 />
                </span>
              </span>
            </td>
            {showDescription && (
              <td>
                <span className={styles.MobileLabel}>توضیحات:</span>
                <span>{cooperationRequest.description || "---"}</span>
              </td>
            )}
            <td>
              <div className={styles.ButtonList}>
                {cooperationRequest.status !== "approved" && (
                  <button
                    className={styles.AcceptButton}
                    onClick={() =>
                      onAcceptCooperationRequest(
                        cooperationRequest.id,
                        cooperationRequest.description
                      )
                    }
                  >
                    تایید کردن
                  </button>
                )}
                {cooperationRequest.status !== "rejected" && (
                  <button
                    className={styles.RejectButton}
                    onClick={() =>
                      onRejectCooperationRequest(
                        cooperationRequest.id,
                        cooperationRequest.description
                      )
                    }
                  >
                    رد کردن
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
