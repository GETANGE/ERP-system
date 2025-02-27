import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Outlet } from "react-router-dom"

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-gray-200 w-full h-screen">
      <AppSidebar />
      <main className="w-full h-screen">
        <SidebarTrigger />
        <Outlet/>
        {children}
      </main>
    </SidebarProvider>
  )
}