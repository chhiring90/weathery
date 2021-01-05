import {
	async
} from "regenerator-runtime";

import {
	TIMEOUT_SEC
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

		console.log(data);

	} catch (error) {
		console.log(error, "☠☠");
		throw error;
	}
}