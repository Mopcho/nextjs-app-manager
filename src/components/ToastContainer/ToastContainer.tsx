'use client';

import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { ToastContext } from "./ToastProvider/ToastProvidet";
import { Timeout } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Bell, Eye } from "react-feather";
import clsx from "clsx";

interface Props {
  autoCLose?: number;
}

const icons = { AlertTriangle, CheckCircle, Bell, Eye };

export interface ToastChild {
  id: number;
  time: number;
  content: string;
  timer?: Timeout;
  icon?: keyof typeof icons;
}

const ToastContainer: React.FC<Props> = ({autoCLose}) => {
  const {toasts, setToasts} = useContext(ToastContext);

  useEffect(() => {
    toasts.map((toast) => {
      if (!toast.timer) {
        const newTimer = new Timeout(() => {
          // Remove the toast after some time
          const newToasts = toasts.filter(filterToast => filterToast.id !== toast.id);
          setToasts(oldToasts => newToasts);
        }, 5000);

        // Populate the current toast's timer with the one we created
        const newToasts = toasts.filter(filterToast => filterToast.id !== toast.id);
        toast.timer = newTimer;

        setToasts([...newToasts, toast]);
      }
    });
  }, [setToasts, toasts]);

  const pauseToastTimer = (id: number) => {
    const timer = toasts.find(singleToast => singleToast.id === id)?.timer;

    timer?.pause();
  }

  const resumeToastTimer = (id: number) => {
    const timer = toasts.find(singleToast => singleToast.id === id)?.timer;

    timer?.run();
  }


  return (
    <>
      {toasts.length > 0 ? (
        <div id="toast-container" className="hover:cursor-pointer absolute top-4 right-4 flex flex-col gap-6">
          {toasts.map((child) => (
            <div
            className="flex justify-center items-center bg-white rounded-lg w-96 h-20 text-gray-500"
            key={child.id}
            onMouseLeave={() => resumeToastTimer(child.id)}
            onMouseEnter={() => pauseToastTimer(child.id)}
            >
              <span className={clsx(child.icon === 'AlertTriangle' && 'text-red-600',
                child.icon === 'CheckCircle' && 'text-green-600',
                "w-full h-full inline-flex items-center justify-center gap-2")}>
                  {child.icon === 'AlertTriangle' && <AlertTriangle></AlertTriangle>}
                  {child.icon === 'CheckCircle' && <CheckCircle></CheckCircle>}
                  {child.icon === 'Bell' && <Bell></Bell>}
                  {child.icon === 'Eye' && <Eye></Eye>}
                  {child.content}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {/* <div id="toast-container" className="hover:cursor-pointer absolute top-0 right-0 flex flex-col gap-6">
        <div className="flex justify-center items-center bg-white rounded-lg w-96 h-20 text-gray-500">
          <span className="w-full h-full inline-flex items-center justify-center">asohdipuasbdiupasbuUASUD</span>
        </div>
      </div> */}
    </>
  );
};

export const useToast = () => {
  const {toasts, setToasts} = useContext(ToastContext);

  const triggerToast = (content: string, time: number, icon?: keyof typeof icons) => {
    const id = Math.floor(Math.random() * 100);
    setToasts([...toasts, {content, time, id, icon}]);
  }

  return {triggerToast};
}

export default ToastContainer;