import styles from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Address } from "@/shared/types";
import { deleteAddress, getAddresses } from "@/main/api";
import DataLoader from "@/shared/components/DataLoader";
import AddressView from "@/shared/components/Dashboard/AddressView";
import Radio from "@/shared/components/Radio";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";
import AreaButton from "@/shared/components/Dashboard/AreaButton";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Button from "@/shared/components/Button";

interface AddressStageProps {
  selectedAddressId: number | null;
  setSelectedAddressId: (addressId: number | null) => void;
  actions: {
    back: () => void;
    new: () => void;
    edit: (addressId: number) => void;
    finish: () => void;
  };
}

export default function AddressStage({
  selectedAddressId,
  setSelectedAddressId,
  actions,
}: AddressStageProps) {
  const [data, setData] = useState<Address[]>([]);

  const [pendingAddressDeleteRequest, setPendingAddressDeleteRequest] =
    useState<number | null>(null);

  useEffect(() => {
    if (selectedAddressId === null && data[0]) setSelectedAddressId(data[0].id);
  }, [data]);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <DataLoader
      load={() => getAddresses(0)}
      setData={({ addresses }) => setData(addresses)}
      reloadRef={reloadRef}
    >
      <div className={styles.AddressSelect}>
        {data.map((address) => (
          <div key={address.id}>
            <Radio
              checked={address.id === selectedAddressId}
              onChecked={() => setSelectedAddressId(address.id)}
            />
            <AddressView
              address={address}
              onEdit={() => actions.edit(address.id)}
              onDelete={() => setPendingAddressDeleteRequest(address.id)}
            />
          </div>
        ))}
      </div>
      <WarningConfirmDialog
        open={pendingAddressDeleteRequest !== null}
        onClose={() => {
          setPendingAddressDeleteRequest(null);
        }}
        onConfirm={() =>
          deleteAddress(pendingAddressDeleteRequest!)
            .then((message) => {
              toast.success(message);
              setPendingAddressDeleteRequest(null);
              if (reloadRef.current) reloadRef.current();
            })
            .catch(toast.error)
        }
        message="از حذف این آدرس مطمئن هستید؟"
        confirmButtonText="حذف"
      />
      <AreaButton title="ایجاد آدرس جدید +" onClick={actions.new} />
      <BottomActions>
        <Button onClick={actions.back}>مرحله قبل</Button>
        <Button
          varient="filled"
          style={{ minWidth: 150 }}
          onClick={actions.finish}
          disabled={!data.map((item) => item.id).includes(selectedAddressId!)}
        >
          مرحله بعد
        </Button>
      </BottomActions>
    </DataLoader>
  );
}
