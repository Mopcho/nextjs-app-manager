import '@/styles/global.css';
import GlassPane from "@/components/GlassPane/GlassPane";
import Sidebar from '@/components/Sidebar/Sidebar';
import { Hamburger } from '@/components/Hamburger/Hamburger';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
      <head />
      <body className="h-[100vh] max-h-[100%] w-[100dvw] rainbow-mesh">
        <div className='p-6 h-full w-full'>
        <GlassPane className="p-6 w-full h-full">
          <div className='flex gap-5 w-full h-full items-center flex-col md:flex-row lg:flex-row xl:flex-row'>
            <Sidebar />
            <Hamburger />
            {children}
          </div>
        </GlassPane>
        </div>
        
        <div id='modal'></div>
        <div id='modal-sidebar'></div>
      </body>
    </html>
    )

}