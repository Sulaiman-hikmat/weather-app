import {api} from "../utils/api";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherByCity = async (city: string) => {
    try {
        const response = await api.get(`/forecast?q=${city}&appid=${API_KEY}&units=metric`
);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};