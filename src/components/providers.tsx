"use client";

import { store } from "@/lib/store";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
