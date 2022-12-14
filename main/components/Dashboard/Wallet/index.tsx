import styles from "./style.module.scss";
import { useState } from "react";
import { FormattedNumber } from "react-intl";
import ExpandMoreIcon from "@/shared/assets/icons/expandMore.svg";
import IncreasBalanceDialog from "@/main/components/Dashboard/IncreasBalanceDialog";
import WithdrawBalanceDialog from "@/main/components/Dashboard/WithdrawBalanceDialog";
import { walletDeposit, walletWithdrawal } from "@/main/api";
import toast from "react-hot-toast";

interface WalletProps {
  marketingBalance: number;
  walletBalance: number;
  setBalance: (walletBalance: number, marketingBalance: number) => void;
}

export default function Wallet({
  marketingBalance,
  walletBalance,
  setBalance,
}: WalletProps) {
  const [walletExpanded, setWalletExpanded] = useState(false);
  const [showIncreasBalanceDialog, setShowIncreasBalanceDialog] =
    useState(false);
  const [showWithdrawBalanceDialog, setShowWithdrawBalanceDialog] =
    useState(false);

  return (
    <div
      className={
        walletExpanded
          ? styles.Wallet + " " + styles.WalletExpanded
          : styles.Wallet
      }
    >
      <div
        className={styles.WalletOverview}
        onClick={() => {
          setWalletExpanded(!walletExpanded);
        }}
      >
        <span>موجودی: </span>
        <span>
          <FormattedNumber value={walletBalance + marketingBalance} />{" "}
        </span>
        تومان
        <div className={styles.Spacer} />
        <ExpandMoreIcon className={styles.ExpandMoreIcon} />
      </div>
      <div className={styles.WalletDetails}>
        <div>
          <span>موجودی کیف پول:</span>
          <div className={styles.Spacer} />
          <span>
            <FormattedNumber value={walletBalance} />
          </span>{" "}
          تومان
        </div>
        <div>
          <span>موجودی فروش بازاریابی:</span>
          <div className={styles.Spacer} />
          <span>
            <FormattedNumber value={marketingBalance} />
          </span>{" "}
          تومان
        </div>
        <button
          className={styles.IncreasBalance}
          onClick={() => setShowIncreasBalanceDialog(true)}
        >
          افزایش موجودی
        </button>
        <button
          className={styles.WithdrawBalance}
          onClick={() => setShowWithdrawBalanceDialog(true)}
        >
          برداشت موجودی
        </button>
      </div>
      <IncreasBalanceDialog
        open={showIncreasBalanceDialog}
        onClose={() => setShowIncreasBalanceDialog(false)}
        onSubmit={(amount) =>
          walletDeposit(amount)
            .then((paymentUrl) => {
              window.location.href = paymentUrl;
            })
            .catch(toast.error)
        }
      />
      <WithdrawBalanceDialog
        open={showWithdrawBalanceDialog}
        onClose={() => setShowWithdrawBalanceDialog(false)}
        onSubmit={(accountHolderName, iban) =>
          walletWithdrawal(accountHolderName, iban)
            .then((message) => {
              toast.success(message);
              setShowWithdrawBalanceDialog(false);
              setBalance(0, 0);
            })
            .catch(toast.error)
        }
      />
    </div>
  );
}
