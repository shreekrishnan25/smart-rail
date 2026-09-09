/* =========================================
   SMARTTRAIN JAVASCRIPT
========================================= */


/* =========================================
   TRAIN DATA
========================================= */

const trains = [

    {
        number: "16842",
        name: "Intercity Express",
        from: "Coimbatore",
        to: "Chennai",
        departure: "07:30 AM",
        arrival: "03:15 PM",
        delay: 0
    },

    {
        number: "12084",
        name: "Coimbatore Intercity",
        from: "Coimbatore",
        to: "Salem",
        departure: "08:00 AM",
        arrival: "10:30 AM",
        delay: 3
    },

    {
        number: "12678",
        name: "Chennai Superfast",
        from: "Chennai",
        to: "Salem",
        departure: "09:00 AM",
        arrival: "02:30 PM",
        delay: 8
    },

    {
        number: "12674",
        name: "Cheran Express",
        from: "Coimbatore",
        to: "Chennai",
        departure: "10:00 PM",
        arrival: "06:30 AM",
        delay: 12
    },

    {
        number: "12675",
        name: "Kovai Express",
        from: "Chennai",
        to: "Coimbatore",
        departure: "06:10 AM",
        arrival: "02:00 PM",
        delay: 5
    },

    {
        number: "22637",
        name: "West Coast Express",
        from: "Chennai",
        to: "Coimbatore",
        departure: "01:00 PM",
        arrival: "09:00 PM",
        delay: 0
    },

    {
        number: "12673",
        name: "Cheran Express",
        from: "Chennai",
        to: "Coimbatore",
        departure: "10:30 PM",
        arrival: "06:30 AM",
        delay: 7
    },

    {
        number: "12081",
        name: "Coimbatore Intercity",
        from: "Coimbatore",
        to: "Erode",
        departure: "08:00 AM",
        arrival: "09:15 AM",
        delay: 2
    },

    {
        number: "12082",
        name: "Erode Express",
        from: "Erode",
        to: "Coimbatore",
        departure: "06:30 PM",
        arrival: "07:45 PM",
        delay: 0
    },

    {
        number: "12677",
        name: "Salem Express",
        from: "Chennai",
        to: "Salem",
        departure: "07:00 AM",
        arrival: "01:30 PM",
        delay: 4
    }
{
    number: "66621",
    name: "Salem - Erode MEMU",
    from: "Salem",
    to: "Erode",
    departure: "06:15 AM",
    arrival: "07:25 AM",
    delay: 0
},
];


/* =========================================
   GET HTML ELEMENTS
========================================= */

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");

const swapBtn = document.getElementById("swap");
const searchBtn = document.getElementById("searchBtn");

const results = document.getElementById("results");

const trackTrain = document.getElementById("trackTrain");
const trackRoute = document.getElementById("trackRoute");

const speedElement = document.getElementById("speed");
const distanceElement = document.getElementById("distance");
const etaElement = document.getElementById("eta");
const delayElement = document.getElementById("delay");

const movingTrain = document.getElementById("movingTrain");

const heroTrain = document.getElementById("heroTrain");
const heroEta = document.getElementById("heroEta");
const heroDelay = document.getElementById("heroDelay");

const weatherGrid = document.getElementById("weatherGrid");


/* =========================================
   SEARCH TRAIN
========================================= */

searchBtn.addEventListener("click", searchTrains);


function searchTrains() {

    const from = fromSelect.value;
    const to = toSelect.value;


    /* SAME STATION */

    if (from === to) {

        results.innerHTML = `
            <div class="train-result">
                <div>
                    <b>⚠️ Please select different stations.</b>
                    <span>
                        From and To stations cannot be the same.
                    </span>
                </div>
            </div>
        `;

        return;
    }


    /* FIND TRAINS */

    const matchingTrains = trains.filter(train =>

        train.from === from &&
        train.to === to

    );


    /* NO TRAIN */

    if (matchingTrains.length === 0) {

        results.innerHTML = `
            <div class="train-result">

                <div>
                    <b>❌ No trains found</b>

                    <span>
                        No trains available for
                        ${from} → ${to}
                    </span>
                </div>

            </div>
        `;

        return;
    }


    /* SHOW RESULTS */

    results.innerHTML = matchingTrains.map((train, index) => {

        const delayText =
            train.delay > 0
                ? `+${train.delay} min delay`
                : "On Time";


        return `

            <div class="train-result">

                <div>

                    <small>TRAIN</small>

                    <b>
                        ${train.number}
                    </b>

                    <span>
                        ${train.name}
                    </span>

                </div>


                <div>

                    <small>DEPARTURE</small>

                    <b>
                        ${train.departure}
                    </b>

                    <span>
                        ${train.from}
                    </span>

                </div>


                <div>

                    <small>ARRIVAL</small>

                    <b>
                        ${train.arrival}
                    </b>

                    <span>
                        ${train.to}
                    </span>

                </div>


                <div>

                    <span class="${train.delay > 0 ? "delay" : ""}">
                        ${delayText}
                    </span>

                    <button
                        class="primary"
                        onclick="trackTrainNow(${trains.indexOf(train)})"
                        style="margin-top:10px;"
                    >
                        Track Train
                    </button>

                </div>

            </div>

        `;

    }).join("");

}


/* =========================================
   TRACK TRAIN
========================================= */

function trackTrainNow(index) {

    const train = trains[index];

    if (!train) return;


    /* TRAIN NAME */

    trackTrain.textContent =
        `${train.number} • ${train.name}`;


    /* ROUTE */

    trackRoute.textContent =
        `${train.from} → ${train.to}`;


    /* ETA */

    etaElement.textContent =
        train.arrival;


    /* DELAY */

    if (train.delay > 0) {

        delayElement.textContent =
            `+${train.delay} min`;

        heroDelay.textContent =
            `+${train.delay} min delay`;

    } else {

        delayElement.textContent =
            "On Time";

        heroDelay.textContent =
            "On Time";

    }


    /* SPEED */

    const speed =
        65 + Math.floor(Math.random() * 25);

    speedElement.textContent =
        `${speed} km/h`;


    /* DISTANCE */

    const distance =
        200 + Math.floor(Math.random() * 150);

    distanceElement.textContent =
        `${distance} km`;


    /* HERO ETA */

    heroEta.textContent =
        train.arrival;


    /* MOVE TRAIN */

    movingTrain.style.left = "45%";


    /* SCROLL TO TRACKING */

    document.getElementById("tracking").scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   SWAP BUTTON
========================================= */

swapBtn.addEventListener("click", function () {

    const fromValue = fromSelect.value;
    const toValue = toSelect.value;

    fromSelect.value = toValue;
    toSelect.value = fromValue;

});


/* =========================================
   NAVIGATION
========================================= */

function goToSearch() {

    document.getElementById("search").scrollIntoView({
        behavior: "smooth"
    });

}


function goToTracking() {

    document.getElementById("tracking").scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   HERO TRAIN ANIMATION
========================================= */

let heroPosition = 10;
let heroDirection = 1;


setInterval(function () {

    heroPosition += heroDirection * 5;


    if (heroPosition >= 85) {
        heroDirection = -1;
    }


    if (heroPosition <= 10) {
        heroDirection = 1;
    }


    if (heroTrain) {

        heroTrain.style.left =
            heroPosition + "%";

    }

}, 1500);


/* =========================================
   LIVE TRAIN MOVEMENT
========================================= */

let trainPosition = 5;


setInterval(function () {

    trainPosition += 2;


    if (trainPosition > 85) {
        trainPosition = 5;
    }


    if (movingTrain) {

        movingTrain.style.left =
            trainPosition + "%";

    }

}, 2000);


/* =========================================
   LIVE SPEED
========================================= */

setInterval(function () {

    const speed =
        65 + Math.floor(Math.random() * 25);


    if (speedElement) {

        speedElement.textContent =
            `${speed} km/h`;

    }

}, 3000);


/* =========================================
   WEATHER
========================================= */

const weatherData = [

    {
        city: "Coimbatore",
        icon: "☀️",
        condition: "Sunny",
        temperature: "31°C",
        status: "Good"
    },

    {
        city: "Erode",
        icon: "🌤️",
        condition: "Partly Cloudy",
        temperature: "33°C",
        status: "Normal"
    },

    {
        city: "Salem",
        icon: "⛅",
        condition: "Cloudy",
        temperature: "32°C",
        status: "Normal"
    },

    {
        city: "Chennai",
        icon: "🌦️",
        condition: "Light Rain",
        temperature: "29°C",
        status: "Monitor"
    }

];


function loadWeather() {

    weatherGrid.innerHTML =
        weatherData.map(weather => `

            <div class="weather-card">

                <div class="weather-icon">
                    ${weather.icon}
                </div>

                <h3>
                    ${weather.city}
                </h3>

                <p>
                    ${weather.condition}
                </p>

                <strong>
                    ${weather.temperature}
                </strong>

                <small>
                    ${weather.status}
                </small>

            </div>

        `).join("");

}


/* =========================================
   INITIALIZE
========================================= */

loadWeather();

console.log("SmartTrain loaded successfully!");
console.log("Available trains:", trains.length);
