import { useState } from "react";
import Notification from "@/components/dashboard/notification";
import SearchBar from "@/components/dashboard/searchBar";
import { Bell } from "lucide-react"
import ProductTrends from "@/components/dashboard/customer/totalProduct";
import SideTrend from "@/components/dashboard/customer/sideTrend";

const CustomerDashboard = () => {
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    setNotification({ message: `Results for: "${query}"`, type: "success" });
  };

  const currentDate = new Date(Date.now()).toLocaleString();

  return (
    <div className="ml-5 flex flex-col space-y-4 ">
        <div className="flex items-center justify-between w-full px-4 py-">
          <h1 className="text-black font-bold text-xl">Dashboard</h1>

          {/* Search Bar and Notification Icon */}
          <div className="flex items-center space-x-4 mr-20">
            <SearchBar onSearch={handleSearch} />
            <Bell className="w-6 h-6 text-black cursor-pointer" />
          </div>
        </div>

      {/* Notification Section */}
      <div className="w-full max-w-md">
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>

      {/* Main Section */}
      <section className="flex flex-grow w-full h-full">
        <main className="w-[70%] h-full">
          <div className="flex  pb-4 space-x-4">
            <ProductTrends 
                title={"Total Products"} 
                quantity={4892} 
                trend={"up"} 
                updated={currentDate}
            />
            <ProductTrends 
                title={"Available Products"} 
                quantity={4892} 
                trend={"up"} 
                updated={currentDate}
            />
            <ProductTrends 
                title={"Last stock"} 
                quantity={4892} 
                trend={"down"} 
                updated={currentDate}
            />
            <ProductTrends 
                title={"Out of stock"} 
                quantity={4892} 
                trend={"down"} 
                updated={currentDate}
            />
          </div>
          <div className=" w-full rounded-lg h-80 flex justify-between">
            <section className="w-[54%] bg-white rounded-lg "></section>
            <section className="w-[45%] bg-white rounded-lg "></section>
          </div>
          <div className=" w-full rounded-lg h-80 mt-3 flex justify-between">
            <section className="w-[49%] bg-white rounded-lg "></section>
            <section className="w-[49%] bg-white rounded-lg "></section>
          </div>
        </main>
        <main className="w-[30%] h-full ">
          <SideTrend />
        </main>
      </section>

    </div>
  );
};

export default CustomerDashboard;