const apiKey = "3e2b75af014827ce1a8e65f32486c631";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const errorMessage = document.querySelector(".error-message");

    async function checkWeather(city) {
        if (!city) {
            showError("Please enter a city name.");
            return;
        }
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            const data = await response.json();

            if (response.ok) {
               
                showError("");

                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr";

                
                if (data.weather[0].main === "Clouds"){
                    weatherIcon.src = "images/clouds.png";
                } else if (data.weather[0].main === "Clear"){
                    weatherIcon.src = "images/clear.png";
                } else if (data.weather[0].main === "Rain"){
                    weatherIcon.src = "images/rain.png";
                } else if (data.weather[0].main === "Drizzle"){
                    weatherIcon.src = "images/drizzle.png";
                } else if (data.weather[0].main === "Mist"){
                    weatherIcon.src = "images/mist.png";
                }
            } else {
                showError("City not found. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            showError("Unable to fetch weather data. Please try again later.");
        }
    }

    // Display or hide error messages
    function showError(message) {
        if (message) {
            errorMessage.textContent = message;
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
        }
    }

    // Search button click event
    searchButton.addEventListener("click", () => {
        checkWeather(searchBox.value.trim());
    });

    // "Enter" key press event on the input field
    searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            checkWeather(searchBox.value.trim());
        }
    });
});
