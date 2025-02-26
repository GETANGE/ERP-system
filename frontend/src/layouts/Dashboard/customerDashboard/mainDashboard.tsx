import { useState } from "react";
import Notification from "@/components/dashboard/notification";
import SearchBar from "@/components/dashboard/searchBar";
import { Bell } from "lucide-react"

const CustomerDashboard = () => {
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    setNotification({ message: `Results for: "${query}"`, type: "success" });
  };

  return (
    <div className="ml-5 mt-5 flex flex-col space-y-4">
      <div className="flex justify-between max-w-max">
          <h1 className="text-black font-bold text-xl">Dashboard</h1>

          {/* Search Bar */}
          <div className="w-full max-w-md flex justify-between">
            <SearchBar onSearch={handleSearch} />
            <Bell className="text-black"/>
          </div>
      </div>

      {/* Notification  appears below Search Bar */}
      <div className="w-full max-w-md">
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
