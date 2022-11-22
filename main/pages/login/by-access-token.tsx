import { useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { request, setAccessToken } from "@/main/api";
import Loader from "@/shared/components/Loader";

export default function LoginByAcessToken() {
  const router = useRouter();
  const acessToken = router.query.accessToken as string;

  useEffect(() => {
    if (router.isReady) {
      setAccessToken(acessToken);
      request({
        method: "GET",
        url: "/users/profile",
        needAuth: true,
        redirectIfNotLogin: false,
      })
        .then(({ data }) => ({
          marketingBalance: data.marketingBalance,
          walletBalance: data.walletBalance,
          avatar: data.avatar,
          name: data.name,
          phoneNumber: data.phoneNumber,
        }))
        .then((userData) => {
          localStorage.setItem("userData", JSON.stringify(userData));
          router.replace("/dashboard");
        })
        .catch((message) => {
          toast.error(message);
          router.replace("/login");
        });
    }
  }, [router.isReady]);

  return <Loader />;
}