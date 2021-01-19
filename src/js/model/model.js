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
	currentWeather: null,
	search: {},
	dailyWeather: {},
	hourlyWeather: {},
	weeks: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

const createWeatherObject = function(data){

	const {current} = data;

	console.log([unixTimeStampToTime(current.dt, "hours")]);

	return {
		today: state.weeks[unixTimeStampToTime(current.dt, "day")],
		sunrise: unixTimeStampToTime(current.sunrise),
		sunset: unixTimeStampToTime(current.sunset),
		temp: kelvinToCelsius(current.temp),
		feelsLike: kelvinToCelsius(current.feels_like),
		uvi: current.uvi,
		windDeg: current.wind_deg,
		windSpeed: current.wind_speed,
		weatherDescription: current.weather[0].description,
		humidity: current.humidity,
		time: current.dt,
		details: [
			{
				label: "Temprature",
				icon: "thermometer",
				value: `${kelvinToCelsius(current.temp)}°c`,
				className: "icon-temprature"
			},
			{
				label: "UV Index",
				icon: "sun-1",
				value: current.uvi,
				className: "icon-sun"
			}, {
				label: "Wind",
				icon: "wind",
				value: `${current.wind_speed}km/h`,
				className: "icon-wind",
			}, {
				label: "Humidity",
				icon: "humidity",
				value: `${current.humidity}%`,
				className: "icon-humidity"
			}
		],
	};
};

const createWeeklyWeatherObject = function(data){
	const {daily} = data;

	return daily.map(element => {
		return {
			day: unixTimeStampToTime(element.dt, "day"),
			sunrise: unixTimeStampToTime(element.sunrise),
			sunset: unixTimeStampToTime(element.sunset),
		};
	});
}

export const loadCurrentWeatherResults = async function (query) {
	try {
		const data = await AJAX(`${API_URL}?q=${query}&appid=${API_KEY}`);
		state.search.query = query;
		state.search.lat = data.coord.lat;
		state.search.lon = data.coord.lon;
	} catch (error) {
		console.error(`${error}☠🐱‍🐉`);
		throw error;
	}
};

export const loadDailyWeatherResults = async function (lat, lon, exclude = "minutely") {
	try {
		const data = await AJAX(`${DAILY_API_URL}?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`);
		state.currentWeather = createWeatherObject(data);
		console.log(data);
		console.log(state.currentWeather.today);
		// createWeeklyWeatherObject(data);


	} catch(error) {
		throw error(error);
	}
}