import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (true) { // TODO check user logedin
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [])

  return <></>;
}
