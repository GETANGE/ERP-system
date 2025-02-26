import { Link, useLocation } from "react-router-dom";
import {   
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "../ui/sidebar";

interface SidebarItem {
    title: string;
    url: string;
    icon: React.ElementType;
}

interface SidebarSectionProps {
    title: string;
    label?: string;
    items: SidebarItem[];
}

export const SidebarSection = ({ title, label, items }: SidebarSectionProps) => {
    const location = useLocation(); // Get current route for active styling

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="mt-5">{label ?? title}</SidebarGroupLabel> 
            <SidebarGroupContent>
                <SidebarMenu className="p-4">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild className="mb-2 flex items-center space-x-3">
                                <Link
                                    to={item.url}
                                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                                        location.pathname === item.url ? "text-white" : "text-gray-300"
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
