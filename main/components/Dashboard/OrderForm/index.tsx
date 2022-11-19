import styles from "./style.module.scss";
import { useState } from "react";
import { FormattedNumber, useIntl } from "react-intl";
import { CircularProgressbar } from "react-circular-progressbar";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Link from "next/link";
import { newOrder } from "@/main/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import IconButton from "@/shared/components/IconButton";
import PrintFoldersStage from "@/main/components/Dashboard/OrderForm/PrintFoldersStage";
import NewPrintFolderStage from "@/main/components/Dashboard/OrderForm/NewPrintFolderStage";
import EditPrintFolderStage from "@/main/components/Dashboard/OrderForm/EditPrintFolderStage";
import AddressStage from "@/main/components/Dashboard/OrderForm/AddressStage";
import NewAddressesStage from "@/main/components/Dashboard/OrderForm/NewAddressesStage";
import EditAddressesStage from "@/main/components/Dashboard/OrderForm/EditAddressesStage";
import PaymentStage from "@/main/components/Dashboard/OrderForm/PaymentStage";
import { Address, PrintFolder } from "@/shared/types";

enum OrderFormStages {
  printFolders = "پوشه ها",
  newPrintFolder = "پوشه جدید",
  editPrintFolder = "ویرایش پوشه",
  address = "آدرس پستی",
  newAddress = "آدرس جدید",
  editAddress = "ویرایش آدرس",
  payment = "پرداخت",
}

export default function OrderForm() {
  const intl = useIntl();
  const router = useRouter();

  const [currentStage, setCurrentStage] = useState(
    OrderFormStages.printFolders
  );

  const [printFoldersData, setPrintFoldersData] = useState<PrintFolder[]>([]);
  const [addressesData, setAddressesData] = useState<Address[]>([]);

  const [currentInEditPrintFolderId, setCurrentInEditPrintFolderId] = useState<
    number | null
  >(null);
  const [currentInEditAddressId, setCurrentInEditAddressId] = useState<
    number | null
  >(null);

  const [addressId, setAddressId] = useState<number | null>(null);

  const progress = {
    [OrderFormStages.printFolders]: 1,
    [OrderFormStages.newPrintFolder]: 1,
    [OrderFormStages.editPrintFolder]: 1,
    [OrderFormStages.address]: 2,
    [OrderFormStages.newAddress]: 2,
    [OrderFormStages.editAddress]: 2,
    [OrderFormStages.payment]: 3,
  }[currentStage];

  const SemiCircleProgressBar = (
    <div className={styles.SemiCircleProgressBar}>
      <CircularProgressbar
        value={progress}
        maxValue={3}
        counterClockwise
        circleRatio={0.75}
        classes={{
          root: "",
          background: "",
          path: styles.SemiCircleProgressBarPath,
          trail: styles.SemiCircleProgressBarTrail,
          text: "",
        }}
      />
      <div className={styles.SemiCircleProgressBarText}>
        <FormattedNumber value={progress} />/<FormattedNumber value={3} />
      </div>
    </div>
  );

  return (
    <>
      <ContentHeader
        title={
          currentStage === OrderFormStages.newPrintFolder
            ? `پوشه ${intl.formatNumber(printFoldersData.length + 1)}`
            : currentStage === OrderFormStages.editPrintFolder
            ? `پوشه ${intl.formatNumber(
                (printFoldersData
                  .map((item) => item.id)
                  .indexOf(currentInEditPrintFolderId!) || 0) + 1
              )}`
            : currentStage
        }
        start={
          [
            OrderFormStages.printFolders,
            OrderFormStages.address,
            OrderFormStages.payment,
          ].includes(currentStage) && SemiCircleProgressBar
        }
        end={
          <Link href="/dashboard/orders">
            <Button varient="content-title-none">
              انصراف و بازگشت <ArrowBackIcon />
            </Button>
          </Link>
        }
      />
      <MobileContentHeader
        start={
          [
            OrderFormStages.printFolders,
            OrderFormStages.address,
            OrderFormStages.payment,
          ].includes(currentStage) && (
            <div className={styles.MobileSemiCircleProgressBar}>
              {SemiCircleProgressBar}
            </div>
          )
        }
        title={currentStage}
        end={
          <Link href="/dashboard/orders">
            <IconButton varient="outlined">
              <CloseIcon />
            </IconButton>
          </Link>
        }
      />
      {currentStage === OrderFormStages.printFolders && (
        <PrintFoldersStage
          data={printFoldersData}
          setData={setPrintFoldersData}
          actions={{
            new: () => setCurrentStage(OrderFormStages.newPrintFolder),
            edit: (printFolderId) => {
              setCurrentInEditPrintFolderId(printFolderId);
              setCurrentStage(OrderFormStages.editPrintFolder);
            },
            finish: () => setCurrentStage(OrderFormStages.address),
          }}
        />
      )}
      {currentStage === OrderFormStages.newPrintFolder && (
        <NewPrintFolderStage
          actions={{
            finish: () => setCurrentStage(OrderFormStages.printFolders),
          }}
        />
      )}
      {currentStage === OrderFormStages.editPrintFolder && (
        <EditPrintFolderStage
          printFolderId={currentInEditPrintFolderId!}
          actions={{
            finish: () => {
              setCurrentInEditPrintFolderId(null);
              setCurrentStage(OrderFormStages.printFolders);
            },
          }}
        />
      )}
      {currentStage === OrderFormStages.address && (
        <AddressStage
          data={addressesData}
          setData={setAddressesData}
          selectedAddressId={addressId}
          setSelectedAddressId={setAddressId}
          actions={{
            back: () => setCurrentStage(OrderFormStages.printFolders),
            new: () => setCurrentStage(OrderFormStages.newAddress),
            edit: (addressId) => {
              setCurrentInEditAddressId(addressId);
              setCurrentStage(OrderFormStages.editAddress);
            },
            finish: () => setCurrentStage(OrderFormStages.payment),
          }}
        />
      )}
      {currentStage === OrderFormStages.newAddress && (
        <NewAddressesStage
          actions={{
            finish: () => setCurrentStage(OrderFormStages.address),
          }}
        />
      )}
      {currentStage === OrderFormStages.editAddress && (
        <EditAddressesStage
          addressId={currentInEditAddressId!}
          actions={{
            finish: () => {
              setCurrentInEditAddressId(null);
              setCurrentStage(OrderFormStages.address);
            },
          }}
        />
      )}
      {currentStage === OrderFormStages.payment && (
        <PaymentStage
          actions={{
            back: () => setCurrentStage(OrderFormStages.address),
            finish: (discountCode, paidWithWallet) =>
              newOrder(addressId!, discountCode, paidWithWallet)
                .then(({ message, paymentUrl }) => {
                  if (message) {
                    toast.success(message);
                    router.push("/dashboard/orders", undefined, {
                      unstable_skipClientCache: true,
                    });
                  }
                  if (paymentUrl) window.location.href = paymentUrl;
                })
                .catch(toast.error),
          }}
        />
      )}
    </>
  );
}
