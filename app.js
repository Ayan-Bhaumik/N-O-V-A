const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Boss...");
    } else {
        speak("Good Evening Boss...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing NOVA...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes('hey') || lowerCaseMessage.includes('hey nova') || lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hello nova')) {
        speak("Hello Boss, How May I Help You?");
    } else if (lowerCaseMessage.includes("what's your name")) {
        speak("I am your virtual assistant. You can call me NOVA, or just ask me anything you need!");
    } else if (lowerCaseMessage.includes("open google")) {
        openWebsite("https://google.com", "Google");
    } else if (lowerCaseMessage.includes("open youtube")) {
        openWebsite("https://youtube.com", "Youtube");
    } else if (lowerCaseMessage.includes("open facebook")) {
        openWebsite("https://facebook.com", "Facebook");
    } else if (lowerCaseMessage.includes("open instagram")) {
        openWebsite("https://www.instagram.com", "Instagram");
    } else if (lowerCaseMessage.includes('what is') || lowerCaseMessage.includes('who is') || lowerCaseMessage.includes('what are')) {
        searchOnGoogle(message);
    } else if (lowerCaseMessage.includes('wikipedia')) {
        searchOnWikipedia(message);
    } else if (lowerCaseMessage.includes('time')) {
        getTime();
    } else if (lowerCaseMessage.includes('date')) {
        getDate();
    } else if (lowerCaseMessage.includes('calculator')) {
        openCalculator();
    } else if (lowerCaseMessage.includes('amazon')) {
        openWebsite("https://www.amazon.com", "Amazon");
    } else if (lowerCaseMessage.includes('jio cinema')) {
        openWebsite("https://www.jiocinema.com", "Jio Cinema");
    } else if (lowerCaseMessage.includes('flipkart')) {
        openWebsite("https://www.flipkart.com", "Flipkart");
    } else if (lowerCaseMessage.includes('crunchyroll')) {
        openWebsite("https://www.crunchyroll.com", "Crunchyroll");
    } else if (lowerCaseMessage.includes('hotstar')) {
        openWebsite("https://www.hotstar.com", "Hotstar");
    } else if (lowerCaseMessage.includes('how are you')) {
        speak("Thank you for asking! I'm here to assist you.");
    } else if (lowerCaseMessage.includes('what can you do')) {
        speak("I can help you with tasks such as searching the web, providing information, setting reminders, and much more. Just let me know what you need!");
    } else if (lowerCaseMessage.includes('thank you')) {
        speak("You're welcome! Let me know if there's anything else I can help with.");
    } else if (lowerCaseMessage.includes('goodbye') || lowerCaseMessage.includes('bye')) {
        speak("Goodbye! Take care.");
    } else if (lowerCaseMessage.includes('refresh')) {
        refreshPage();
    } else {
        searchOnGoogle(message);
    }
    
}

function openWebsite(url, name) {
    window.open(url, "_blank");
    speak(`Opening ${name}...`);
}

function searchOnGoogle(query) {
    window.open(`https://www.google.com/search?q=${query.replace(" ", "+")}`, "_blank");
    speak(`Searching Google for ${query}...`);
}

function searchOnWikipedia(topic) {
    window.open(`https://en.wikipedia.org/wiki/${topic.replace("wikipedia", "").trim()}`, "_blank");
    speak(`Searching Wikipedia for ${topic}...`);
}

function getTime() {
    const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    speak(`The current time is ${time}`);
}

function getDate() {
    const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
    speak(`Today's date is ${date}`);
}

function openCalculator() {
    window.open('Calculator:///');
    speak("Opening Calculator...");
}


