import {
	async
} from "regenerator-runtime";

import {
	TIMEOUT_SEC,
	MILLISECOND,
	KELVIN_UNIT
} from "../config/config";

const timeOut = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long`))
		}, s * 1000);
	});
};

export const AJAX = async function (url, uploadData) {

	try {
		const fetchPro = fetch(url);
		const res = await Promise.race([fetchPro, timeOut(TIMEOUT_SEC)]);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message}(${res.status})`);
		return data;
	} catch (error) {
		console.log(error, "☠☠");
		throw error;
	};
};

export const kelvinToCelsius = function(number){
	return Math.round(number - KELVIN_UNIT);
};

export const unixTimeStampToTime = function(number, formatted) {
	let date = new Date(number * MILLISECOND);
	let day = date.getDay();
	let hours = date.getHours();
	let minutes =  `0${date.getMinutes()}`;
	let seconds = `0${date.getSeconds()}`;
	let formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

	switch(formatted){
		case "date":
			return date;
		case "day":
			return day;
		case "hours":
			return hours;
		case "minutes":
			return minutes.substr(-2);
		case "seconds":
			return seconds.substr(-2);
		default:
			return formattedTime;
	}
};