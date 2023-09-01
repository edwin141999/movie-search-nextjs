"use client";
import { Provider } from "react-redux";
import { makeStore } from "./store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={makeStore}>{children}</Provider>;
}
