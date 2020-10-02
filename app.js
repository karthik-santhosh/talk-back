const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const info = document.querySelector('.info');

const time = new Date;
const greet = [
	'whats your main focus today',
	'hello there',
	'hi, how its goin',
	'have a nice day',
	'what about today\'s weather',
	'there is no secret ingredient'
];
const error = [
	'sorry, i did not get that',
	'sorry, my speech service is down',
	'checkout the keywords, to get better experience'
];

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition);


//click to start
btn.addEventListener('click', () =>{
	recognition.start();
});

//input
recognition.onresult = (event) =>{
	const index = event.resultIndex;
	const transcript = event.results[index][0].transcript;
	readOut(transcript);
};

//reply through voice
function readOut(trans) {
	//web speech API
	const voice = new SpeechSynthesisUtterance();
	
	voice.text = error[Math.floor(Math.random() * error.length)];
	info.textContent = voice.text; 


	if(trans.includes('time')){
			voice.text = time;
			info.textContent = voice.text;
		};

	//search for+ " "
	if (trans.includes('search for')){
		voice.text = "here is what i found";
		let list = trans.split(' ');
		const search = list.slice(1 && 2);
		window.location.href = "http://google.com/search?q=" + search;
	};
	
	//location + " "
	if (trans.includes('location')){
		const place = trans.split(' ');
		const location = place.splice(1);
		voice.text = "here is the perfect results for you";
		window.location.href = 'http://google.nl/maps/place/' + location + '/&amp;';
	}

	if(trans.includes('what') || trans.includes('when') || trans.includes('where') || trans.includes('how') || trans.includes('why')){
		const question = trans;
		voice.text = "here are the best results for you";
		window.location.href = "http://google.com/search?q=" + question;
	};

	//talk back
	if(trans.includes('talk back')){
		voice.text = greet[Math.floor(Math.random() * greet.length)];
	};

	//play song
	if(trans.includes('play song')){
		const songs = trans.split(' ');
		const music = songs.slice(2);
		voice.text = "";
		window.location.href = "http://youtube.com/search?q=" + music;
	};

	//about talk back
	if(trans.includes('about TalkBack') || trans.includes('about talk back') || trans.includes('about Talk Back')){
		voice.text = "talk back was developed by karthik santhosh, its using web speech recognition or speech synthesis api and also the google search engine";
	}

	voice.rate = 1;
	voice.pitch = 1;
	voice.volume = 1;
	window.speechSynthesis.speak(voice);
};

//reference
recognition.onstart = () => {
	console.log("mic on");
	info.textContent = "you could speak right now";
};


recognition.onspeechend = () => {
	console.log("mic off");
	info.textContent = "mic off";
};