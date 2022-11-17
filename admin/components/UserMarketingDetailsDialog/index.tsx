import styles from "./style.module.scss";
import { useState } from "react";
import Dialog from "@/shared/components/Dialog";
import CopyableText from "@/shared/components/CopyableText";
import { FormattedNumber } from "react-intl";
import DataLoader from "@/shared/components/DataLoader";
import { getUserMarketing } from "@/admin/api";

interface UserMarketingDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  userId: number | null;
}

export default function UserMarketingDetailsDialog({
  open,
  onClose,
  userId,
}: UserMarketingDetailsDialogProps) {
  const [data, setData] = useState<{
    referral: {
      commission: number;
      slug: string;
      sellCount: number;
      viewCount: number;
      totalSale: number;
      benefit: number;
    };
    discount: {
      totalSales: number;
      benefit: number;
      timesUsed: number;
      data: {
        value: number;
        code: "XCKFR353";
      }[];
    };
  }>({
    referral: {
      commission: 10,
      slug: "",
      sellCount: 0,
      viewCount: 0,
      totalSale: 0,
      benefit: 0,
    },
    discount: {
      data: [],
      totalSales: 0,
      benefit: 0,
      timesUsed: 0,
    },
  });

  return (
    <Dialog open={open} onClose={onClose} title="اطلاعات بازاریابی">
      <DataLoader
        load={() => {
          if (userId !== null) return getUserMarketing(userId);
        }}
        deps={[userId]}
        setData={setData}
      >
        <div className={styles.Container}>
          <div className={styles.DedicatedLink}>
            <div className={styles.Title}>لینک اختصاصی شما</div>
            <CopyableText text={`https://chaproom.ir/?${data!.referral.slug}`}>
              <div style={{ color: "#7d00ff" }}>
                https://chaproom.ir/?{data!.referral.slug}
              </div>
            </CopyableText>
            <div className={styles.Status}>
              <div>
                <div>تعداد مشاهده</div>
                <div>
                  <FormattedNumber value={data!.referral.viewCount} />
                </div>
              </div>
              <div className={styles.Separator} />
              <div>
                <div>تعداد فروش</div>
                <div>
                  <FormattedNumber value={data!.referral.sellCount} />
                </div>
              </div>
              <div className={styles.Separator} />
              <div>
                <div>کل فروش</div>
                <div>
                  <FormattedNumber value={data!.referral.totalSale} /> تومان
                </div>
              </div>
              <div className={styles.Separator} />
              <div>
                <div>سهم کاربر</div>
                <div>
                  <FormattedNumber value={data!.referral.benefit} /> تومان
                </div>
              </div>
            </div>
          </div>
          <div className={styles.Separator} />
          <div className={styles.DedicatedDiscountCodes}>
            <div className={styles.Title}>کدهای تخفیف اختصاصی شما</div>
            <div className={styles.DiscountCodes}>
              {data!.discount.data.map((item) => (
                <div key={item.value}>
                  <span>
                    کد تخفیف{" "}
                    <FormattedNumber value={item.value / 100} style="percent" />
                  </span>
                  <CopyableText text="HGVFCD">
                    <div style={{ color: "#7d00ff" }}>{item.code}</div>
                  </CopyableText>
                </div>
              ))}
            </div>
            <div className={styles.Status}>
              <div>
                <div>دفعات استفاده</div>
                <div>
                  <FormattedNumber value={data!.discount.timesUsed} />
                </div>
              </div>
              <div className={styles.Separator} />
              <div>
                <div>کل فروش</div>
                <div>
                  <FormattedNumber value={data!.discount.totalSales} /> تومان
                </div>
              </div>
              <div className={styles.Separator} />
              <div>
                <div>سهم کاربر</div>
                <div>
                  <FormattedNumber value={data!.discount.benefit} /> تومان
                </div>
              </div>
            </div>
          </div>
        </div>
      </DataLoader>
    </Dialog>
  );
}
