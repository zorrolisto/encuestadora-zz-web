import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthVerifier() {
  const r = useRouter();
  useEffect(() => {
    verifyLogin();
  }, []);
  useEffect(() => {
    verifyLogin();
  }, [router]);
  return null;
}
