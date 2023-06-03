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
        <GlassPane className="w-full h-full flex items-center">
          <Sidebar />
          {children}
        </GlassPane>
      </body>
    </html>
    )

}