window.onload = function (){

    //Variables 
    const userCity = document.getElementById("user-city");
    const time = document.getElementById("time");
    const button = document.getElementById("user-submit");
    const city = document.getElementById("city");
    const viewingConditions = document.getElementById("viewing");


    // Click event to fetch API data when user inputs a city name
    button.onclick = function (){

        const userCityInput = userCity.value;
        const APIKey = "93175d02626703632f146ae6aa84ee66";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&appid=` + APIKey + "&units=metric";

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function (){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    //Get data from API and assign itot variables
                    const data = xhr.response;
                    console.log(data);


                    //Output API data to DOM
                    const iconcode = data.weather[0].icon;
                    const iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

                city.innerHTML = data.name + ", " + data.sys.country;
                viewingConditions.innerHTML = data.weather[0].description + `<img src = ${iconUrl}></img>`;

                //Handle errors fetching API
                } else {
                    location.innerHTML = "API call was unsuccessful";
                    console.log(xhr.status);
                }
            }
        }
        xhr.open('GET', url);
        xhr.responseType = "json";
        xhr.send(null);
    }
}

//second api which retrieves moon phase data
const url2 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto?unitGroup=metric&key=W2NMT57B6CPNFDBPAJD5MCQKG&contentType=json";

let xhr = new XMLHttpRequest();

//function to retieve api data for moon phases

xhr.onreadystatechange = function (){
    if (xhr.readyState === 4){
        if (xhr.status === 200){
            //Get data from API and assign itot variables
            const data = xhr.response;
            console.log(data);

            //Output API data to DOM
            const moonPhase = document.getElementById("moon-phase");

            //if statements to check code value (0-1) for moon phase based on moon phase output by api. The webpage will display the name of the phase and an image icon of the phase accordingly.
           if (data.currentConditions.moonphase === 0){
            moonPhase.innerHTML = "It is currently a New Moon" + "<br>" +`<img src = '/images/new-moon.png' class="moonimg"></img>`;
           } else if (data.currentConditions.moonphase < 0.25) {
            moonPhase.innerHTML = "It is currently a Waxing Crescent" + "<br>" +`<img src = '/images/waxing-crescent.png' class="moonimg"></img>`;
           }  else if (data.currentConditions.moonphase === 0.25) {
            moonPhase.innerHTML = "It is currently a First Quarter" + "<br>" +`<img src = '/images/first-quarter.png' class="moonimg"></img>`;
           }  else if (data.currentConditions.moonphase < 0.5) {
            moonPhase.innerHTML = "It is currently a Waxing Gibbous" + "<br>" +`<img src = '/images/waxing-gibbus.png' class="moonimg"></img>`;
           }  else if (data.currentConditions.moonphase === 0.5) {
            moonPhase.innerHTML = "It is currently a Full Moon" + "<br>" +`<img src = '/images/full-moon.png' class="moonimg"></img>`;
           }  else if (data.currentConditions.moonphase < 0.75) {
            moonPhase.innerHTML = "It is currently a Waning Gibbous " + "<br>" +`<img src = 'https://github.com/Andrew-Rezk/Moon-phases-viewer-api-/blob/main/images/waning-crescent.png' class="moonimg"></img>`;
           }  else if (data.currentConditions.moonphase === 0.75) {
            moonPhase.innerHTML = "It is currently a Last Quarter" + "<br>" +`<img src = '/images/last-quarter.png' class="moonimg"></img>`;
           }  else if (data.currentConditions.moonphase > 0.75) {
            moonPhase.innerHTML = "It is currently a Waning Crescent" + "<br>" +`<img src = '/images/waning-crescent.png' class="moonimg"></img>`;
           }  

        //Handle errors fetching API
        } else {
            location.innerHTML = "API call was unsuccessful";
            console.log(xhr.status);
        }
    }
}
xhr.open('GET', url2);
xhr.responseType = "json";
xhr.send(null);


