'use client'

import { createContext, useState } from "react";
import { ToastChild } from "../ToastContainer";

interface Props {
    children: React.ReactNode;
}

interface ToastContext {
  toasts: ToastChild[],
  setToasts: React.Dispatch<React.SetStateAction<ToastChild[]>>;
}

export const ToastContext = createContext<ToastContext>({toasts: [], setToasts: () => undefined});

const ToastContextProvider: React.FC<Props> = ({children}) => {
  const [toasts, setToasts] = useState<ToastChild[]>([]);
  return (
    <ToastContext.Provider value={{toasts, setToasts}}>{children}</ToastContext.Provider>
  );
};

export default ToastContextProvider;