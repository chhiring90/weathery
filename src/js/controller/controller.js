import { AJAX } from "../helper/helper";
import { API_URL} from "../config/config";
import * as model from "../model/model";
import searchView from "../views/searchView";
import currentWeatherView from "../views/currentWeatherView";


const controlSearchResults = async function(){
	try {

		// 1) Get search query
		const query = searchView.getQuery();

		// 2) load weather results
		await model.loadCurrentWeatherResults(query);

		// 3) load daily weather results
		// await model.loadDailyWeatherResults(query); 

		// 4) render weather results
		currentWeatherView.render(model.state.weatherData);

	} catch(error){
		console.error(error, "controlSearchResults 🐱‍🐉");
	}
}


const init = function() {
	searchView.addHandlerSearch(controlSearchResults);
}

init();
