import { useState } from "react";
import toast from "react-hot-toast";
import { Address } from "@/shared/types";
import { getAddress, updateAddress } from "@/main/api";
import DataLoader from "@/shared/components/DataLoader";
import AddressForm from "@/shared/components/Dashboard/AddressForm";

interface EditAddressesStageProps {
  addressId: number;
  actions: {
    finish: () => void;
  };
}

export default function EditAddressesStage({
  addressId,
  actions,
}: EditAddressesStageProps) {
  const [data, setData] = useState<Address>();

  return (
    <DataLoader load={() => getAddress(addressId)} setData={setData}>
      <AddressForm
        inputsVarient="shadow"
        defaultValues={data}
        onCancel={actions.finish}
        onSave={(addressData) =>
          updateAddress(addressId, addressData)
            .then((message) => {
              toast.success(message);
              actions.finish();
            })
            .catch(toast.error)
        }
      />
    </DataLoader>
  );
}
