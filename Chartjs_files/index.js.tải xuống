import { getFieldIngoreNull } from '/modules/thingspeak.js'
import * as JQuery from '/modules/jquery.min.js'


const chartXLength = 20
const updateInterval = 3000

const tickColor  = 'black'
const gridColor  = 'black'
const labelColor = 'black'
const chartColor = '#010c1e'

/* tạo chart */
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'A0 ADC data',
			data: [],
			borderColor: chartColor,
			borderWidth: 2,
			showLine: true
		}]
	},
	options: {
		maintainAspectRatio: false,
		responsive: true,
		interaction: {
			intersect: false,
			mode: 'index',
		},
		scales: {
			x: {
				ticks: {
					color: tickColor 
				},
				grid: {
					color: gridColor
				}
			},
			y: {
				ticks: {
					color: tickColor
				},
				grid: {
					color: gridColor
				}
			}
		},
		plugins: {
			legend: {
				labels: {
					color: labelColor
				}
			}
		}
		
	},
	// scaleFontColor: "red"
})



const genChartData = async (length) => {

	let rawData = await getFieldIngoreNull('field3', 3)

	if (rawData.length < length) {

		if (arrayIsEquals(chart.data.datasets[0].data, rawData) == false) {
			chart.data.labels.length = 0
			chart.data.datasets[0].data.length = 0

			chart.data.labels.push(...Array.from(Array(rawData.length).keys()))
			chart.data.datasets[0].data.push(...rawData)
		}
	} else {
		let newXArray = rawData.slice(rawData.length - length)

		if (arrayIsEquals(chart.data.datasets[0].data, newXArray) == false) {

			chart.data.labels.length = 0
			chart.data.datasets[0].data.length = 0

			chart.data.labels.push(...Array.from(Array(length).keys()))
			chart.data.datasets[0].data.push(...newXArray)
		}
	}

	chart.update()

}

genChartData(chartXLength)

setInterval(() => {
	genChartData(chartXLength)
}, updateInterval)

for (const color of document.querySelectorAll('.colorpicker')) color.addEventListener('click', event => {
	for (const color of document.querySelectorAll('.colorpicker')) color.setAttribute('class', 'colorpicker')
	event.target.setAttribute('class', 'colorpicker active')
	
	chart.data.datasets[0].borderColor = '#' + event.target.id
	chart.update()
})


const arrayIsEquals = (arr1, arr2) => {

	if (arr1.length != arr2.length) { return false }

	let result = true

	arr1.forEach((arr1Element, idx) => {
		if (arr1Element != arr2[idx]) {
			result = false
		}
	})
	return result
}
