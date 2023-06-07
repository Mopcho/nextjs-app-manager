import '@/styles/global.css';
import GlassPane from "@/components/GlassPane/GlassPane";
import Sidebar from '@/components/Sidebar/Sidebar';
import { Hamburger } from '@/components/Hamburger/Hamburger';
import ToastContainer from '@/components/ToastContainer/ToastContainer';
import Providers from '@/components/Providers/Providers';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
      <head />
      <body className="h-[100dvh] w-[100dvw] rainbow-mesh">
        <Providers>
        <div className='p-6 h-full w-full'>
          <GlassPane className="p-6 w-full h-full">
            <div className='flex gap-5 w-full h-full items-center flex-col md:flex-row lg:flex-row xl:flex-row'>
              <Sidebar />
              <Hamburger />
                {children}
            </div>
          </GlassPane>
        </div>
        <ToastContainer></ToastContainer>
        <div id='modal'></div>
        <div id='modal-sidebar'></div>
        </Providers>
      </body>
    </html>
    )

}