import { useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaThermometerEmpty } from "react-icons/fa";
import { fetchWeatherByCity } from "./services/weather";

function App() {
  const [city, setCity] = useState(""); // User input
  const [weather, setWeather] = useState<any>(null); // Store weather response

  // Function to fetch weather
  const getWeather = async (cityName: string) => {
    try {
      const data = await fetchWeatherByCity(cityName);
      console.log("Weather", data);

      // Pick first forecast item
      const first = data.list[0];

      // Store weather + country info
      setWeather({
        description: first.weather[0].description,
        main: first.weather[0].main,
        clouds: first.clouds.all,
        temp: first.main.temp,
        city: data.city.name,       // City from API
        country: data.city.country, // Country code (e.g. NG, US, FR)
      });
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  // Search button click
  const handleSearch = () => {
    if (city.trim() !== "") {
      getWeather(city);
    }else{
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
      <div className="w-full max-w-md bg-black/40 backdrop-blur-lg p-10 rounded-2xl shadow-lg text-white">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">
          <TiWeatherPartlySunny className="inline-block mr-2 text-yellow-400" />
          Weather App
        </h1>

        {/* Search input */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => {
                const value = e.target.value
                setCity(value);
                if( value.trim() === ""){
                  setWeather(null);
                }
            }
              }
            
            className="flex-grow px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Search
          </button>
        </div>

        {/* Weather result */}
        {weather && (
          <div className="mt-10 w-full max-w-md rounded-xl bg-white/10 p-6 text-center shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-semibold">
              {weather.city}, {weather.country}
            </h2>
            <p className="text-lg text-gray-200">
              {weather.main} ({weather.description})
            </p>
            <p className="mt-2 text-xl font-bold">
              <FaThermometerEmpty className="inline-block text-yellow-400" />
              {weather.temp}°C
            </p>
            <p className="mt-2 text-xl font-bold">
              Cloudiness: {weather.clouds}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
