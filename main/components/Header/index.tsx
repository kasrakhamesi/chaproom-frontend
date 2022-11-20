import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isLoggedIn } from "@/main/api";
import ProfileFilledIcon from "@/main/assets/icons/personFilled.svg";
import LogoWithName from "@/shared/assets/images/logoWithName.svg";
import ButtonList from "@/shared/components/ButtonList";
import Button from "@/shared/components/Button";
import NavLink from "@/shared/components/NavLink";
import SmallLoader from "@/shared/components/SmallLoader";
import IconButton from "@/shared/components/IconButton";
import Avatar from "@/shared/components/Dashboard/Avatar";
import DashboardIcon from "@/shared/assets/icons/dashboard.svg";
import LogoutIcon from "@/shared/assets/icons/logout.svg";
import ArrowUp from "@/shared/assets/icons/arrowUp.svg";
import ArrowDown from "@/shared/assets/icons/arrowDown.svg";
import { logout } from "@/main/api";
import { useRouter } from "next/router";
export default function Header() {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [showMenu, toggleMenu] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<{
    avatar: string | null;
    name: string;
  } | null>(null);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "");
      if (userData) {
        setUser(userData);
        setIsLoadingUser(false);
      }
    } catch {}

    isLoggedIn()
      .then((userData) => {
        setUser(userData);
      })
      .catch(() => {})
      .finally(() => setIsLoadingUser(false));

    setIsFirstRender(false);
  }, []);

  return (
    <>
      <div className={styles.Header}>
        <div className={styles.Start}>
          <Link href="/">
            <a className={styles.Logo}>
              <LogoWithName />
            </a>
          </Link>
        </div>
        <div className={styles.Center}>
          <div className={styles.NavLinks}>
            <NavLink href="/" end>
              <a>خانه</a>
            </NavLink>
            <NavLink href="/tariffs" end>
              <a>تعرفه و سفارش پرینت</a>
            </NavLink>
            <NavLink href="/about-us" end>
              <a>درباره ما</a>
            </NavLink>
            <NavLink href="/contact-us" end>
              <a>تماس با ما</a>
            </NavLink>
            <NavLink href="/work-with-us" end>
              <a>همکاری با ما</a>
            </NavLink>
          </div>
        </div>
        <div className={styles.End}>
          {isLoadingUser ? (
            !isFirstRender ? (
              <SmallLoader />
            ) : undefined
          ) : user === null ? (
            <>
              <div className={styles.UserAuth}>
                <ButtonList>
                  <Link href="/login">
                    <Button>
                      <ProfileFilledIcon /> ورود
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button varient="filled">ثبت نام</Button>
                  </Link>
                </ButtonList>
              </div>
              <div className={styles.UserAuthMobile}>
                <Link href="/auth">
                  <div className={styles.LoginButton}>
                    <IconButton size={54}>
                      <ProfileFilledIcon />
                    </IconButton>
                    وارد حساب کاربری خود شوید!
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <div>
              <div className={styles.User}>
                <div className={styles.UserAvatar}>
                  <Avatar user={user} />
                </div>
                <div className={styles.userMenu}>
                  <div
                    style={
                      showMenu
                        ? { borderRadius: "20px 20px 0 0" }
                        : { borderRadius: "20px" }
                    }
                  >
                    <button
                      className={styles.toggleMenu}
                      onClick={() => toggleMenu(!showMenu)}
                    >
                      <span>{showMenu ? <ArrowUp /> : <ArrowDown />}</span>
                      <span>{user.name}</span>
                    </button>
                  </div>
                  {showMenu && (
                    <>
                      <div>
                        <div>
                          <span>
                            <DashboardIcon />
                          </span>
                          <Link href="/dashboard"> مشاهده حساب کاربری</Link>
                        </div>
                        <div>
                          <span>
                            <LogoutIcon />
                          </span>
                          <a
                            onClick={() => {
                              logout();
                              router.push("/login");
                            }}
                          >
                            {" "}
                            خروج
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
