import * as model from "../model/model";
import searchView from "../views/searchView";
import currentWeatherView from "../views/currentWeatherView";

const controlSearchResults = async function(){
	try {

		// 1) Get search query
		const query = searchView.getQuery();

		// 2) load weather results
		await model.loadCurrentWeatherResults(query);

		// 4) 
		currentWeatherView.renderSpiiner();

		// 3) load daily weather results
		await model.loadDailyWeatherResults(model.state.search.lat,model.state.search.lon);

		// 5) render weather results
		currentWeatherView.render(model.state.currentWeather);

	} catch(error){
		console.error(error, "controlSearchResults 🐱‍🐉");
	}
}


const init = function() {
	searchView.addHandlerSearch(controlSearchResults);
}

init();
