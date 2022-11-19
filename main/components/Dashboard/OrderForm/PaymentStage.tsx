import styles from "./style.module.scss";
import { useState } from "react";
import { FormattedNumber } from "react-intl";
import ZarinpalLogo from "@/main/assets/images/zarinpal.svg";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Button from "@/shared/components/Button";
import Radio from "@/shared/components/Radio";
import CheckBox from "@/shared/components/CheckBox";
import TextInput from "@/shared/components/TextInput";
import { calculateOrderPrice } from "@/main/api";
import toast from "react-hot-toast";
import DataLoader from "@/shared/components/DataLoader";

interface PaymentStageProps {
  actions: {
    back: () => void;
    finish: (
      discountCode: string | null,
      paidWithWallet: boolean
    ) => Promise<any>;
  };
}

export default function PaymentStage({ actions }: PaymentStageProps) {
  const [data, setData] = useState<{
    discountAmount: number;
    userBalance: number;
    foldersAmount: number[];
    postageFee: number;
  }>({
    discountAmount: 0,
    userBalance: 0,
    foldersAmount: [],
    postageFee: 0,
  });
  const [paidWithWallet, setPaidWithWallet] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountCodeInputText, setDiscountCodeInputText] = useState("");

  const total =
    data.foldersAmount.reduce((result, value) => result + value, 0) +
    data.postageFee;
  const withDiscount =
    discountCode !== null ? total - data.discountAmount : total;
  const walletUsage = paidWithWallet
    ? Math.min(data.userBalance, withDiscount)
    : 0;
  const payable = withDiscount - walletUsage;

  const [isCheckingDiscountCode, setIsCheckingDiscountCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amountPayableView = (
    <div className={styles.AmountPayable}>
      <div>مبلغ قابل پرداخت:</div>
      <div>
        {payable ? (
          <>
            <span>
              <FormattedNumber value={payable} />
            </span>{" "}
            تومان
          </>
        ) : (
          "رایگان"
        )}
      </div>
    </div>
  );

  return (
    <DataLoader
      load={() => calculateOrderPrice(discountCode)}
      setData={setData}
    >
      <div className={styles.Payment}>
        <div className={styles.OrderDetails}>
          <div className={styles.FoldersAmount}>
            {data.foldersAmount.map((amount, index) => (
              <div className={styles.Amount} key={index}>
                <div>
                  پوشه <FormattedNumber value={index + 1} />:
                </div>
                <div>
                  <FormattedNumber value={amount} /> تومان
                </div>
              </div>
            ))}
          </div>
          <div className={styles.DiscountCode}>
            <TextInput
              inputProps={{
                placeholder: "کد تخفیف",
              }}
              varient="shadow"
              value={discountCodeInputText}
              onChange={setDiscountCodeInputText}
              readOnly={discountCode !== null}
            />
            <Button
              varient="filled"
              style={{ minWidth: 100 }}
              onClick={() => {
                if (discountCode === null) {
                  setIsCheckingDiscountCode(true);
                  calculateOrderPrice(discountCodeInputText)
                    .then((data) => {
                      setData(data);
                      setDiscountCode(discountCodeInputText);
                    })
                    .catch(toast.error)
                    .finally(() => setIsCheckingDiscountCode(false));
                } else {
                  setDiscountCode(null);
                }
              }}
              loading={isCheckingDiscountCode}
              disabled={isCheckingDiscountCode}
            >
              {discountCode === null ? "اعمال" : "حذف"}
            </Button>
          </div>
          <div>
            <div className={styles.Amount}>
              <div>هزینه ارسال:</div>
              <div>
                <FormattedNumber value={data.postageFee} /> تومان
              </div>
            </div>
            <div className={styles.Amount}>
              <div>مجموع:</div>
              <div>
                <FormattedNumber value={total} /> تومان
              </div>
            </div>
            {discountCode !== null && data.discountAmount && (
              <div className={styles.Amount}>
                <div>کسر کد تخفیف:</div>
                <div>
                  <FormattedNumber value={data.discountAmount} /> تومان
                </div>
              </div>
            )}
            {paidWithWallet && (
              <div className={styles.Amount}>
                <div>کسر از کیف پول:</div>
                <div>
                  <FormattedNumber value={walletUsage} /> تومان
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.PaymentMethod}>
          <div className={styles.Title}>شیوه پرداخت</div>
          <div className={styles.List}>
            <div>
              <div>
                <Radio checked={true} onChecked={() => {}} />
                درگاه پرداخت زرین پال
              </div>
              <div>
                <ZarinpalLogo />
              </div>
            </div>
            <div className={styles.Separator}></div>
            <div>
              <div>
                <CheckBox
                  checked={paidWithWallet}
                  onChange={setPaidWithWallet}
                />
                کیف پول
              </div>
              <div>
                موجودی: <FormattedNumber value={data.userBalance} /> تومان
              </div>
            </div>
            <div className={styles.Separator}></div>
          </div>
        </div>
      </div>
      <div className={styles.AmountPayableMobileContainer}>
        {amountPayableView}
      </div>
      <BottomActions
        start={
          <div className={styles.AmountPayableContainer}>
            {amountPayableView}
          </div>
        }
      >
        <Button onClick={actions.back}>مرحله قبل</Button>
        <Button
          varient="filled"
          style={{ minWidth: 110 }}
          onClick={() => {
            setIsSubmitting(true);
            actions
              .finish(discountCode, paidWithWallet)
              .finally(() => setIsSubmitting(false));
          }}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          پرداخت
        </Button>
      </BottomActions>
    </DataLoader>
  );
}
