import React from "react";
import { useState } from "react";
const [city, setCity] = useState("");

  const handleSearch = () => {
    console.log("Searching weather for:", city);
    
  };

const Forest: React.FC = () => {
    return(
        <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-grow px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
                  >
                    Search
                  </button>
                </div>
    )
}
export default Forest;