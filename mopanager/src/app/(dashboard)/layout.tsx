import GlassPane from "@/components/GlassPane/GlassPane";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="w-screen h-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>;
      </main>
    )

}