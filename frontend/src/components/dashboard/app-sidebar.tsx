import { ShoppingCart, Layers, Truck, CreditCard, Package, BarChart2, LayoutDashboard, Archive, Settings, LifeBuoy, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { SidebarSection } from "./sideBar-section";

// Sample user profile data 
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://fly.storage.tigris.dev/calendery/image-user6.jpg",
}

// Menu items.
const items = [
  { title: "Orders", url: "#", icon: ShoppingCart }, 
  { title: "Category", url: "#", icon: Layers }, 
  { title: "Suppliers", url: "#", icon: Truck }, 
  { title: "Billing", url: "#", icon: CreditCard }, 
  { title: "Delivery", url: "#", icon: Package },
  { title: "Reports", url: "#", icon: BarChart2 }, 
];


// Menu discover
const item_1 = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard }, 
  { title: "Inventory", url: "#", icon: Archive },
];


// Menu settings
const setting = [
  { title: "Settings", url: "#", icon: Settings }, 
  { title: "Help", url: "#", icon: LifeBuoy }, 
  { title: "Logout", url: "#", icon: LogOut }, 
];

export function AppSidebar() {
  return (
    <div className="bg-black h-screen flex flex-col">
      <Sidebar className="flex flex-col h-full">
        <SidebarContent className="flex-grow">
        <SidebarGroupLabel className="text-xl mt-5">BizEdge</SidebarGroupLabel>
          <SidebarSection title="DISCOVER" items={item_1}/>
          <SidebarSection title="INVENTORY" items={items}/>
          <SidebarSection title="SETTINGS" items={setting}/>
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
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}