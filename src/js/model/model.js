import {
	API_KEY,
	API_URL
} from "../config/config";
import {
	AJAX
} from "../helper/helper";

// State 
export const state = {
	weatherData: null,
	search: {
		query: "",
	}
}

export const loadWeatherResults = async function (query) {
	try {
		const data = await AJAX(`${API_URL}?q=${query}&appid=${API_KEY}`);
		return data;
	} catch (error) {
		console.error(`${error}☠🐱‍🐉`);
		throw error;
	}
};