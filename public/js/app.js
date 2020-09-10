const form = document.querySelector('form');
const input = document.querySelector('input');

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

form.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const location = input.value;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				return (messageOne.textContent = data.error);
			}
			messageOne.textContent = data.location;
			messageTwo.textContent = data.forecastData;
		});
	});
});
