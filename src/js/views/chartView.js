import View from "./View";
import Chart from "chart.js";

class ChartView extends View  {
    _parentElement = document.getElementsByClassName("weather-dash__chart");

    _generateMarkup(data){

        const ctx = this._parentElement.getElementsById("chart").getContext("2d");

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
                datasets: [{
                    label: "Oates",
                    data: [{x:12, y: 20}]
                }]
            }
        })
    }
}

export default new ChartView();