"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modal/card-modal";
import { ProModal } from "../modal/pro-modal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};
