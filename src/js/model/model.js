import {
	API_KEY,
	API_URL,
	DAILY_API_URL,
	CURRENT_WEATHER,
	DAILY_WEATHER,
	HOURLY_WEATHER,
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
	weeks: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	],
};

const selectType = function (data, type) {
	let nestedData;

	switch (type) {
		case CURRENT_WEATHER:
			nestedData = data.current;
			break;
		case DAILY_WEATHER:
			nestedData = data.daily;
			break;
		case HOURLY_WEATHER:
			nestedData = data.hourly;
		break;
	}
	
	return nestedData;
};

const createWeatherObject = function (data) {

	return {
		today: state.weeks[unixTimeStampToTime(data.dt, "day")],
		sunrise: unixTimeStampToTime(data.sunrise),
		sunset: unixTimeStampToTime(data.sunset),
		temp: kelvinToCelsius(data.temp),
		feelsLike: kelvinToCelsius(data.feels_like),
		uvi: data.uvi,
		windDeg: data.wind_deg,
		windSpeed: data.wind_speed,
		weatherDescription: data.weather[0].description,
		humidity: data.humidity,
		time: data.dt,
		details: [{
				label: "Temprature",
				icon: "thermometer",
				value: `${kelvinToCelsius(data.temp)}°c`,
				className: "icon-temprature",
			},
			{
				label: "UV Index",
				icon: "sun-1",
				value: data.uvi,
				className: "icon-sun",
			},
			{
				label: "Wind",
				icon: "wind",
				value: `${data.wind_speed}km/h`,
				className: "icon-wind",
			},
			{
				label: "Humidity",
				icon: "humidity",
				value: `${data.humidity}%`,
				className: "icon-humidity",
			},
		],
	};
};

const createDailyWeatherObject = function (data) {

	console.log(data);

	// return data.map((element) => {
	// 	return console.log(createWeatherObject(element, DAILY_WEATHER));
	// });
};

export const loadCurrentWeatherResults = async function (query) {
	try {
		const _ = state.search;
		const data = await AJAX(`${API_URL}?q=${query}&appid=${API_KEY}`);

		[_.query, _.lat, _.lon] = [query, data.coord.lat, data.coord.lon];
	} catch (error) {
		console.error(`${error}☠🐱‍🐉`);
		throw error;
	}
};

export const loadDailyWeatherResults = async function (
	lat,
	lon,
	exclude = "minutely"
) {
	try {
		const data = await AJAX(
			`${DAILY_API_URL}?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`
		);

		const currentData = selectType(data, CURRENT_WEATHER);
		state.currentWeather = createWeatherObject(currentData);

		const dailyData = selectType(data, DAILY_WEATHER);
		state.dailyWeather = createDailyWeatherObject(dailyData);
	} catch (error) {
		throw error(error);
	}
};