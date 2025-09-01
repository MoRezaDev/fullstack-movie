"use client";

import { cn } from "@/lib/functions";
import { SetStateAction, useState } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isMountedStyle?: boolean;
  setIsMountedStyle?: React.Dispatch<SetStateAction<boolean>>;
};

const mountedStyle = {
  animation: "modalExpand 0.3s ease-in-out",
};
const unMountedStyle = {
  animation: "modalCollapse 0.3s ease-in-out",
  animationFillMode: "forwards",
};
export default function Modal({
  isOpen,
  children,
  onClose,
  isMountedStyle,
  setIsMountedStyle,
}: ModalProps) {
  return (
    <div
      style={isMountedStyle ? mountedStyle : unMountedStyle}
      onClick={() => {
        setIsMountedStyle && setIsMountedStyle(false);
      }}
      onAnimationEnd={() => {
        if (!isMountedStyle) onClose();
      }}
      className={cn(
        "fixed bg-black/70 z-1000  inset-0 w-full transition duration-200  flex items-start justify-center  animate-modal"
      )}
    >
      {children}
    </div>
  );
}
