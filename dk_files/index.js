import {getLastedFieldValue, sendField, sendFieldDispatch} from '/modules/thingspeak.js'

const ledImgON  = '/img/lightbulb-on.svg'
const ledImgOFF = '/img/lightbulb-off.svg'



// update led icon status in field 1
const updateLedsField1 = async () => {
	let data = await getLastedFieldValue('field1', 1)
	
	document.querySelectorAll('.led-btn').forEach((led, idx) => {
		led.src = data & (0x1<<idx) ? ledImgON : ledImgOFF
	})
}
updateLedsField1()



// ================= event click led icon in field 1 ==============================
for (const led of document.querySelectorAll('.led-btn')) led.addEventListener('click', event => {
	
	event.target.src = event.target.src.includes(ledImgON) ? ledImgOFF : ledImgON
	
	let data = 0
	document.querySelectorAll('.led-btn').forEach((led, idx) => {
		data |= (led.src.includes(ledImgON) ? 0x1 : 0x0) << idx
	})
		
	sendFieldDispatch('field1', data)
})


// ================= event click button toggle all in field 1 ==============================
for (const button of document.querySelectorAll('.led-ctrlall-btn')) button.addEventListener('click', event => {
	const isON = event.target.id == 'ON'
	
	sendFieldDispatch('field1', isON ? 0xF : 0x0)
	for(const led of document.querySelectorAll('.led-btn')) led.src = isON ? ledImgON : ledImgOFF
})




const updateledField2 = async () => {
	let data = await getLastedFieldValue('field2', 2)
	
	document.querySelector('.slider').value = data
	document.querySelector('.rangeIndicator').innerHTML = data
	
	document.querySelector('.led-brightness').src = data <= 0 ? ledImgOFF : ledImgON
}
updateledField2()

document.querySelector('.slider').addEventListener('change', event => {
	sendFieldDispatch('field2', event.target.value)
	document.querySelector('.rangeIndicator').innerHTML = event.target.value
	document.querySelector('.led-brightness').src = event.target.value <= 0 ? ledImgOFF : ledImgON
})

document.querySelector('.led-brightness').addEventListener('click', event => {
	event.target.src = event.target.src.includes(ledImgON) ? ledImgOFF : ledImgON
	document.querySelector('.slider').value = event.target.src.includes(ledImgON) * 1023
	
})

	







