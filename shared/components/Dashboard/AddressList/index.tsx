import styles from "./style.module.scss";
import { Address } from "@/shared/types";
import AddressView from "@/shared/components/Dashboard/AddressView";

interface AddressListProps {
  addresses: Address[];
  onEditAddress: (addressId: number) => void;
  onDeleteAddress: (addressId: number) => void;
}

export default function AddressList({
  addresses,
  onEditAddress,
  onDeleteAddress,
}: AddressListProps) {
  return (
    <div className={styles.AddressList}>
      {addresses.map((address) => (
        <AddressView
          address={address}
          key={address.id}
          onEdit={() => onEditAddress(address.id)}
          onDelete={() => onDeleteAddress(address.id)}
        />
      ))}
    </div>
  );
}
