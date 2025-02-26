import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Outlet } from "react-router-dom"

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-gray-200">
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet/>
        {children}
      </main>
    </SidebarProvider>
  )
}
