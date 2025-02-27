interface Product {
    title: string;
    quantity: number;
    trend: string;
    updated: string;
  }
  
  const ProductTrends = ({ title, quantity, trend, updated }: Product) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs h-42">
        <h2 className="text-gray-700 font-semibold">{title}</h2>

        <div className="flex justify-between items-center mt-2">
          <h1 className="text-2xl font-bold text-black">{quantity}</h1>
          
          <div className="flex items-center space-x-2">
            <span 
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                trend === "up"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {trend === "up" ? "📈 Rising" : "📉 Falling"}
            </span>
          </div>
        </div>
  
        {/* Updated Time */}
        <p className="text-gray-500 text-xs mt-2">Last updated: {updated}</p>
      </div>
    );
  };
  
  export default ProductTrends;
  