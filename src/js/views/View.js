
export default class View {
	_errorMessage = "We could not find your location's weather! Please try another one.";
	_message = "Let's make our day brighter. Have fun!";
	_data;

	render(data, render = true){
		if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
	
		this._data = data;
		const markup = this._generateMarkup();

		if(!render) return markup;

		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	_clear(){
		this._parentElement.innerHTML = "";
	}

	update(data){
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
		this._data = data;
		const newMarkup = this._generateMarkup();

		const newDOM = document.createRange().createContextualFragment(newMarkup);

		const newElements = Array.from(newDOM.querySelectorAll("*"));
		const curElements = Array.from(this._parentElement.querySelectorAll("*"));

		newElements.forEach((newEl, i) => {
			const curEl = curElements[i];

			// Updates changes Text
			if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ""){
				curEl.textContent = newEl.textContent;
			}

			// Updates changed Attributes
			if(!newEl.isEqualNode(curEl))
			Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
		});
	}

	renderError(message = this._errorMessage){
		const markup = ``;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderSpiiner(){
		const markup = `<div class="spinner"></div>`;

		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}
}