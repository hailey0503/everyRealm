import React, { useEffect } from 'react';
import clsx from 'clsx';

interface ToastProps {
  message: string;
  level: 'Info' | 'Success' | 'Warning' | 'Error';
  duration?: number;
  onClose: () => void;
}

const VARIANTS = {
  Info: {
    base: "bg-white border-blue-500",
    iconstyle: "text-blue-500 ",
    name: "Info",
  },

  Error: {
    base: "bg-white border-red-500 ",
    iconstyle: "text-red-500 ",
    name: "Error",
  },

  Warning: {
    base: "bg-white border-yellow-500",
    iconstyle: "text-yellow-500 ",
    name: "Warning",
  },

  Success: {
    base: "bg-white border-green-500",
    iconstyle: "text-green-500 ",
    name: "Success",
  },
};

const Toast: React.FC<ToastProps> = ({ message, level, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const Var = level
    ? VARIANTS[level]
    : {
      base: "bg-white border-gray-600 ",
      iconstyle: "",

    };
  console.log('v', Var)

  return (
    <div className="top-0 right-0 fixed z-50 w-full md:max-w-sm p-4 md:p-4 max-h-screen overflow-hidden pointer-events-none">
      <div className="flex-1 flex-col fade w-full mr-8 justify-end pointer-events-none">
        <div className="flex py-1 w-full transform transition-all duration-300 pointer-events-auto">
          <div className={clsx(
            "flex w-full visible flex-row shadow-lg",
            "border-l-4 rounded-md duration-100 cursor-pointer",
            "transform transition-all hover:scale-102",
            Var.base,
            level && "max-h-40"
          )}>
            <div className="flex flex-row p-2 flex-no-wrap w-full bg-[#CCD5AE] ">
              <p className={clsx(
                "-mt-0.5 my-auto break-all flex",
                "text-sm",
                "text-[#3A98B9]"
              )}>{message}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Toast;
