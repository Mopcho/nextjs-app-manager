import ToastContextProvider from "../ToastContainer/ToastProvider/ToastProvidet";

interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({children}) => {
  return (
    <ToastContextProvider>
        {children}
    </ToastContextProvider>
  );
};

export default Providers;