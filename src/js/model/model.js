import {
	API_KEY,
	API_URL,
	DAILY_API_URL
} from "../config/config";
import {
	AJAX,
	kelvinToCelsius,
	unixTimeStampToTime
} from "../helper/helper";

// State 
export const state = {
	weatherData: null,
	search: {
		query: "",
	},
	dailyWeather: [],
};

const createWeatherObject = function(data){

	const weatherData = {
		id: data.id,
		name: data.name,
		coord: {
			lat: data.lat,
			lon: data.lon
		},
		avgTemp: kelvinToCelsius(data.main.temp),
		maxTemp: kelvinToCelsius(data.main.temp_max),
		minTemp: kelvinToCelsius(data.main.temp_min),
		feelsLike: kelvinToCelsius(data.main.feels_like),
		sunrise: unixTimeStampToTime(data.sys.sunrise),
		sunset: unixTimeStampToTime(data.sys.sunset),
		weatherDescription: data.weather[0].description,
		humidity: data.main.humidity,
		wind: {
			speed: data.wind.speed,
			deg: data.wind.deg
		}
	};

	return weatherData;
}

export const loadCurrentWeatherResults = async function (query) {
	try {
		const data = await AJAX(`${API_URL}?q=${query}&appid=${API_KEY}`);
		state.weatherData = createWeatherObject(data);

		console.log(state.weatherData);

	} catch (error) {
		console.error(`${error}☠🐱‍🐉`);
		throw error;
	}
};

export const loadDailyWeatherResults = async function (query) {
	try {
		const data = await AJAX(`${DAILY_API_URL}?q=${query}&cnt=${7}&appid=${API_KEY}`);
		state.dailyWeather = data;

		console.log(data, "load daily weather results");
	} catch(error) {
		console.error(error);
		throw error(error);
	}
}