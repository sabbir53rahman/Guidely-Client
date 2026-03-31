"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { setCredentials, setLoading } from "@/redux/features/auth/authSlice";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const token = getCookie("token");
    if (token) {
      dispatch(setCredentials({ user: null, accessToken: token }));
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return <>{children}</>;
}
