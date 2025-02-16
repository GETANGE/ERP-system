import { Home, Inbox, FileText, Settings, Wallet, LogOutIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

// Sample user profile data 
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://fly.storage.tigris.dev/calendery/image-user6.jpg",
}

// Menu items.
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inventory", url: "#", icon: Inbox },
  { title: "Invoices", url: "#", icon: FileText },
  { title: "Expenses", url: "#", icon: Wallet },
  { title: "Settings", url: "#", icon: Settings },
]

export function AppSidebar() {
  return (
    <div className="bg-gray-100 text-black h-screen flex flex-col">
      <Sidebar className="flex flex-col h-full">
        <SidebarContent className="flex-grow">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl mt-5">Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="p-4">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="mb-5 flex items-center space-x-3">
                      <a href={item.url} className="flex items-center space-x-2">
                        <item.icon className="w-5 h-5 text-gray-700" />
                        <span className="text-sm">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer - User Profile */}
        <SidebarFooter className="p-4 border-t flex items-center space-x-3">
            <div className="flex ">
                <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                <div className="ml-3">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
            </div>
          <LogOutIcon className="w-5 h-5 text-gray-500 ml-auto" />
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}