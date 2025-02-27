import { DollarSign, Package, Quote, TrendingUp } from "lucide-react";

const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://fly.storage.tigris.dev/calendery/image-user6.jpg",
      describe: "Added more products to the system"
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "https://c1.wallpaperflare.com/preview/280/171/607/african-american-portrait-woman-female.jpg",
      describe: "Updated stock levels for warehouse"
    },
    {
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      avatar: "https://nextluxury.com/wp-content/uploads/Drop-Fade-_jjdavis93.jpg",
      describe: "Reviewed recent sales reports"
    },
    {
      name: "Emily Williams",
      email: "emily.williams@example.com",
      avatar: "https://i.pinimg.com/736x/93/0c/dc/930cdcc1b9672dc8f3e90294b72a88b8.jpg",
      describe: "Added new suppliers to the system"
    }
  ];
  
const SideTrend = () => {
  return (
    <div className="bg-white ml-3 rounded-lg p-4 flex flex-col space-y-6">
        <h1 className="text-black font-semibold">Recent Activity</h1>
        <h2 className="text-black mt-2">Today</h2>

        {users.map((user, index) => (
            <div key={index} className="flex items-center space-x-3 p-1 rounded-lg bg-gray-100">
                <img src={user.avatar} alt="user avatar" className="w-10 h-10 rounded-full"/>
                <div>
                    <p className="text-sm font-medium text-black">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.describe}</p>
                </div>
            </div>
        ))}

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col">
          <div className="flex items-center mb-2">
            <Package size={16} className="text-blue-600 mr-1" />
            <h3 className="text-sm font-semibold text-gray-700">New Orders</h3>
          </div>
          <p className="text-xl font-bold text-blue-700">15</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex flex-col">
          <div className="flex items-center mb-2">
            <Package size={16} className="text-green-600 mr-1" />
            <h3 className="text-sm font-semibold text-gray-700">Restocked</h3>
          </div>
          <p className="text-xl font-bold text-green-700">32</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex flex-col">
          <div className="flex items-center mb-2">
            <DollarSign size={16} className="text-purple-600 mr-1" />
            <h3 className="text-sm font-semibold text-gray-700">Sales</h3>
          </div>
          <p className="text-xl font-bold text-purple-700">Ksh 5,210</p>
        </div>
      </div>

      {/* Trending Products */}
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
        <div className="flex items-center mb-3">
          <TrendingUp size={16} className="text-amber-600 mr-2" />
          <h2 className="font-semibold text-gray-800">Trending Products</h2>
        </div>
        <ul className="space-y-2">
          {["Apple MacBook Pro", "Sony WH-1000XM4", "Nike Air Max 2023"].map((product, index) => (
            <li key={index} className="flex items-center">
              <span className="text-amber-500 mr-2">🔥</span>
              <span className="text-sm text-gray-700">{product}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Motivational Quote */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="flex items-center mb-2">
          <Quote size={16} className="text-gray-600 mr-2" />
          <h3 className="text-sm font-semibold text-gray-700">Daily Inspiration</h3>
        </div>
        <p className="text-sm italic text-gray-600">
          "Success is not final; failure is not fatal: it is the courage to continue that counts."
        </p>
        <p className="text-xs text-right mt-1 text-gray-500">- Winston Churchill</p>
      </div>
    </div>
  );
};

export default SideTrend;
