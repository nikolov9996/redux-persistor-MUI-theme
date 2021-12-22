import axios from "axios";
import { CURRENT, FORECAST, WEATHER_BASE_URL } from "../../app/constants";

const weatherAPI = axios.create({
    baseURL: WEATHER_BASE_URL,
    timeout: 5000,
});

export const getForecast = async (city, days) => {
    const data = await weatherAPI.get(`${FORECAST}?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&days=${days}`);
    console.log(data)
}

export const getCurrent = async (city) => {
    try {
        const { data } = await weatherAPI.get(`${CURRENT}?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}`);
        return data;
    } catch (error) {
        console.log(error)
    }
}
