import styles from "./style.module.scss";
import DefaultAvatar from "@/shared/assets/images/avatar.svg";

interface AvatarProps {
  user: {
    name: string;
    avatar: string | null;
  };
}

export default function Avatar({ user }: AvatarProps) {
  return (
    <div className={styles.Avatar}>
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} />
      ) : (
        <div className={styles.DefaultAvatar}>
          <DefaultAvatar />
        </div>
      )}
    </div>
  );
}
