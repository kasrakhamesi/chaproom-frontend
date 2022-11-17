import styles from "./style.module.scss";
import { FormattedNumber } from "react-intl";
import InfoIcon from "@/admin/assets/icons/info.svg";
import LoginIcon from "@/admin/assets/icons/login.svg";
import EditIcon from "@/shared/assets/icons/edit.svg";
import DeletetIcon from "@/shared/assets/icons/delete.svg";
import IconButton from "@/shared/components/IconButton";

interface UserTableProps {
  users: {
    id: number;
    name: string;
    phoneNumber: string;
    marketingBalance: number;
    walletBalance: number;
    countOfOrders: number;
  }[];
  onSeeUserMarketingDetails: (userId: number) => void;
  onSeeUserOrderList: (userId: number) => void;
  onSeeUserAddressList: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
  onLoginAsUser: (userId: number) => void;
  onEditUser: (userId: number) => void;
}

export default function UserTable({
  users,
  onSeeUserMarketingDetails,
  onSeeUserOrderList,
  onSeeUserAddressList,
  onDeleteUser,
  onLoginAsUser,
  onEditUser,
}: UserTableProps) {
  return (
    <table className={styles.UserTable}>
      <thead>
        <tr>
          <th>کاربر</th>
          <th>موجودی</th>
          <th>آدرس ها</th>
          <th>سفارش ها</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <span className={styles.MobileLabel}>کاربر:</span>
              <div>
                <div className={styles.UserName}>{user.name}</div>
                <div>
                  <FormattedNumber
                    value={parseInt(user.phoneNumber)}
                    useGrouping={false}
                    minimumIntegerDigits={11}
                  />
                </div>
              </div>
            </td>
            <td>
              <span className={styles.MobileLabel}>موجودی:</span>
              <div className={styles.UserWallet}>
                <div>
                  <FormattedNumber
                    value={user.walletBalance + user.marketingBalance}
                  />{" "}
                  تومان
                </div>
                <div>
                  <div>
                    <span>کیف پول:</span>
                    <span>
                      <FormattedNumber value={user.walletBalance} /> تومان
                    </span>
                  </div>
                  <span className={styles.Spacer} />
                  <div>
                    <span
                      className={styles.UserMarketing}
                      onClick={() => onSeeUserMarketingDetails(user.id)}
                    >
                      <InfoIcon />
                    </span>
                    <span>بازاریابی:</span>
                    <span>
                      <FormattedNumber value={user.marketingBalance} /> تومان
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <button
                className={styles.SeeUserAddressesButton}
                onClick={() => onSeeUserAddressList(user.id)}
              >
                مشاهده
                <span className={styles.MobileLabel}>آدرس ها</span>
              </button>
            </td>
            <td>
              <button
                className={styles.SeeUserOrdersButton}
                onClick={() => onSeeUserOrderList(user.id)}
              >
                مشاهده
                <span className={styles.MobileLabel}>سفارش ها</span>
              </button>
              <div className={styles.CountOfOrders}>{user.countOfOrders}</div>
            </td>
            <td>
              <span className={styles.MobileLabel}>عملیات:</span>
              <div className={styles.OperationButtons}>
                <div className={styles.LoginButton}>
                  <IconButton
                    varient="none"
                    size={34}
                    onClick={() => onLoginAsUser(user.id)}
                  >
                    <LoginIcon />
                  </IconButton>
                </div>
                <div className={styles.EditButton}>
                  <IconButton
                    varient="none"
                    size={34}
                    onClick={() => onEditUser(user.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
                <div className={styles.DeleteButton}>
                  <IconButton
                    varient="none"
                    size={34}
                    onClick={() => onDeleteUser(user.id)}
                  >
                    <DeletetIcon />
                  </IconButton>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
