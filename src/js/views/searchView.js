import View from "./View";

class SearchView extends View{
	_parentElement = document.querySelector(".nav__search .form");

	getQuery(){
		const query = this._parentElement.querySelector(".input-group__control").value;
		this._clearInput();
		return query;
	}

	_clearInput(){
		this._parentElement.querySelector(".input-group__control").value = "";
	}

	addHandlerSearch(handler){
		this._parentElement.addEventListener("submit", function(event) {
			event.preventDefault();
			handler();
		});
	}
}

export default new SearchView();