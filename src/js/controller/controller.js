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
		console.log(query);
		await model.loadWeatherResults(query);

		// 3) render weather results
		currentWeatherView.render(model.state.weatherData);

	} catch(error){
		console.error(error, "controlSearchResults 🐱‍🐉");
	}
}


const init = function() {
	searchView.addHandlerSearch(controlSearchResults);
}

init();
