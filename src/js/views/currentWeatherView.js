import View from "./View";
import icons from "../../images/icons.svg";

class CurrentWeatherView extends View {
	_parentElement = document.querySelector("#current-weather");

	_generateDetails() {

		const details = [...this._data.details];

		const transformedDetails = details.map(element => {
			return `
			<div class="weather-detail">
				<div class="weather-detail__icon">
					<svg class="${element.className}">
						<use href="${icons}#${element.icon}"></use>
					</svg>
				</div><!-- end weather-detail__icon -->
				<div class="weather-detail__info">
					<h5>${element.label}</h5>
					<p>${element.value}</p>
				</div><!-- end .weather-detail__info -->
			</div><!-- end weather-detail -->`;
		})
		.join("");

		return transformedDetails;
	}

	_generateMarkup(){
		return `
		<div class="col-5">
			<div class="card card--temp">
				<div class="card__wrap">
					<div class="card__body">
						<h3> <small>${this._data.today}</small><small>${this._data.weatherDescription}</small>
						${this._data.temp}°<span class="unit">c</span></h3>
					</div><!-- end .card__body -->
					<div class="card__footer">
						<p>Data provided by <a href="https://openweathermap.org/"
								target="_blank">OpenWeather</a></p>
					</div><!-- end .card__footer -->
				</div><!-- end .card__wrap -->
			</div><!-- end .card -->
		</div>
		<div class="col-3">
			<div class="weather-details">
				<div class="weather-details__title">
					<h4>Details</h4>
				</div><!-- end .weather-details__title -->
				${this._generateDetails()}
			</div><!-- end .weather-details -->
		</div>
		<div class="col-4">
			<div class="weathery-bars">
				<div class="weathery-bars__item">
					<h5>Today</h5>
					<div class="weathery-bar active">
						<span>Clear</span><span>32° / 12°</span>
					</div><!-- end weathery-bar -->
				</div><!-- end weathery-bars__item -->
				<div class="weathery-bars__item">
					<h5>Tomorrow</h5>
					<div class="weathery-bar">
						<span>Haze</span> <span>32° / 12°</span>
					</div><!-- end weathery-bar -->
				</div><!-- end weathery-bars__item -->
				<div class="weathery-bars__item">
					<h5>Sunday</h5>
					<div class="weathery-bar">
						<span>Haze</span> <span>32° / 12°</span>
					</div><!-- end weathery-bar -->
				</div><!-- end weathery-bars__item -->
			</div><!-- end .weathery-bars -->
		</div>
		`;
	}
}

export default new CurrentWeatherView();