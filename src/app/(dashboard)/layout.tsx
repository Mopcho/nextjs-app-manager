import '@/styles/global.css';
import GlassPane from "@/components/GlassPane/GlassPane";
import Sidebar from '@/components/Sidebar/Sidebar';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="p-6 w-full h-full">
          <div className='flex gap-5 w-full h-full items-center'>
          <Sidebar />
          {children}
          </div>
        </GlassPane>
        <div id='modal'></div>
      </body>
    </html>
    )

}