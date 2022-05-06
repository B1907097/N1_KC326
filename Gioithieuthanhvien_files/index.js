import * as JQuery from '/modules/jquery.min.js'

// get person info in json file
const Person = await (await fetch("/info/info.json")).json()

let webReady = false
setTimeout(() => {webReady = true}, 3000)


// switch to member info when user hover in member sidebar
for (const mem of document.querySelectorAll('.thanhvien')) mem.addEventListener('mouseover', event => {

	let name = event.target.id == '' ? event.target.parentElement.id : event.target.id
	name = name === '' ? event.target.parentElement.parentElement.id : name

	setMemInfo(name)
})

// return to assinged task table when user move pointer out member sidebar
for (const mem of document.querySelectorAll('.thanhvien')) mem.addEventListener('mouseout', () => {
	
	const isOverTableInfo = document.querySelector('.thongtin:hover') !== null

	if (isOverTableInfo === false) setAssignedTaskTable()
})

// return to assinged task table when user move pointer out info table
document.querySelector('#thongtin').addEventListener('mouseout', () => {

	const isOverTableInfo = document.querySelector('.thongtin:hover') !== null

	if (isOverTableInfo == false) setAssignedTaskTable()
})


const setAssignedTaskTable = () => {
	
	document.querySelector('.textleftt').hidden = false
	document.querySelector('#giangvien').hidden = false
	
	document.querySelector('#thongtin').hidden = true
	document.querySelector('#phancong').hidden = false
	document.querySelector('#textleft').innerHTML = 'Phân công công việc'	
	if (webReady)  window.history.pushState('', '', '/info/');
}




const setMemInfo = name => {
	

	const person = Person[name]

	if (person === undefined) return
	
	window.history.pushState('', '', '/info/#' + name);

	document.querySelector('.textleftt').hidden = true
	document.querySelector('#giangvien').hidden = true

	document.querySelector('#thongtin').hidden = false
	document.querySelector('#phancong').hidden = true

	document.querySelector('#textleft').innerHTML = 'Thông tin cá nhân'
	document.querySelector('#avt').src = 'img/' + name + '.jpg'
	document.querySelector('#hoten').innerHTML = person['hoten']


	for (const _person of document.querySelectorAll('.thongtin-text td')) {

		switch (_person.id) {
			case 'baitap1':
				_person.querySelector('a').innerHTML = person['baitap1']
				_person.querySelector('a').href = person['baitap1']
				break

			case 'baitap2':
				_person.querySelector('a').innerHTML = person['baitap2']
				_person.querySelector('a').href = person['baitap2']
				break

			default:
				_person.innerHTML = person[_person.id]
		}
	}
}

window.onhashchange = () => {
	const hashURL = window.location.hash.substring(1)
	if (hashURL !== '') setMemInfo(hashURL)
}


const hashURL = window.location.hash.substring(1)
if (hashURL !== '') setMemInfo(hashURL)
