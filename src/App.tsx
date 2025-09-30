import { useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaThermometerEmpty } from "react-icons/fa";
import { fetchWeatherByCity } from "./services/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async (cityName: string) => {
    try {
      setLoading(true);
      const data = await fetchWeatherByCity(cityName);

      const first = data.list[0];
      setWeather({
        description: first.weather[0].description,
        main: first.weather[0].main,
        clouds: first.clouds.all,
        temp: first.main.temp,
        city: data.city.name,
        country: data.city.country,
      });
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      getWeather(city);
    } else {
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
      <div className="w-full max-w-lg bg-black/40 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg text-white">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          <TiWeatherPartlySunny className="inline-block mr-2 text-yellow-400" />
          Weather App
        </h1>

        {/* Search input */}
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => {
              const value = e.target.value;
              setCity(value);
              if (value.trim() === "") {
                setWeather(null);
              }
            }}
            className="flex-grow px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-semibold transition 
              ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {/* Loading spinner */}
        {loading && (
          <div className="mt-10 flex justify-center">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Weather result */}
        {weather && !loading && (
          <div className="mt-8 sm:mt-10 w-full rounded-xl bg-white/10 p-6 sm:p-8 text-center shadow-lg backdrop-blur-md">
            <h2 className="text-xl sm:text-2xl font-semibold">
              {weather.city}, {weather.country}
            </h2>
            <p className="text-base sm:text-lg text-gray-200">
              {weather.main} ({weather.description})
            </p>
            <p className="mt-2 text-lg sm:text-xl font-bold">
              <FaThermometerEmpty className="inline-block text-yellow-400" />
              {weather.temp}°C
            </p>
            <p className="mt-2 text-lg sm:text-xl font-bold">
              Cloudiness: {weather.clouds}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
