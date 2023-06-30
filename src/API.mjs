class weatherData {
    constructor(city, mainObj, wind, weather, dt)
    {
        this.city = city
        this.mainObj = mainObj
        this.wind = wind
        this.weather = weather
        this.dt = dt
    }
}

class openWetherAPI {
    constructor()
    {
        this.apiKey = "08efd5663387b49ddd50dd8b0a1d4a3a";
        this.apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";
    }

    async APIRequest(city) {
        try {
          const response = await fetch(`${this.apiUrl}&q=${city}&appid=${this.apiKey}`);
      
          if (!response.ok) {
            throw new Error("Unable to fetch weather data.");
          }
      
          return await response.json();

        } catch (error) {
            return document.querySelector(".error").innerHTML = "Error: Invalid city name"
        }
    }

    async getWeatherInfo(city) {
        if (this.APIRequest(city) instanceof Error)
        {
            return new weatherData(
                city,
                {temp: "None", humidity: "None", pressure: "None"},
                "None",
                "None",
                "None"
            )
        } else {
            let {name, main, wind, weather,dt} = await this.APIRequest(city)
            return new weatherData(name, main, wind.speed, weather[0].main, dt)
        }
    }
}

export {weatherData, openWetherAPI};
