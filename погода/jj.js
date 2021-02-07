let vvod = document.getElementsByClassName("seach_strok");
let gde = document.getElementsByClassName("text_main");
let tempp = document.getElementsByClassName("text_temp");
let body = document.getElementsByClassName("text_body");
let hym = document.getElementsByClassName("text_hym");
let picm = document.getElementsByClassName("pic_big");
let bot = document.getElementsByClassName("text_bot");
let picb = document.getElementsByClassName("pic_bot");


vvod[0].addEventListener('keydown', zap);
let city = "minsk";
async function gg(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c026b7e260ea6a4cea507080c2ca5e3f&units=metric`;

    const res = await fetch(url);
    const wth = await res.json();
    console.log(wth);
    if (wth != undefined) {
        dannie(wth);
        gde[2].innerHTML = city;
    }
}

function zap(e) {
    if (e.keyCode === 13) {
        city = vvod[0].value;
        gg(city);
        vvod[0].value = "";
    }
}

function dannie(wth) {
    let country = wth.city.country;
    let temp = wth.list[0].main.temp;
    let feel = wth.list[0].main.feels_like;
    let wind = wth.list[0].wind.speed;
    let humidity = wth.list[0].main.humidity;
    let sunrise = new Date(wth.city.sunrise * 1000).toLocaleTimeString();
    let sunset = new Date(wth.city.sunset * 1000).toLocaleTimeString().split(":", 2);
    let pic = wth.list[0].weather[0].main;
    gde[1].innerHTML = country;
    tempp[0].innerHTML = `${temp.toFixed()}&deg;C`;
    body[0].innerHTML = `Feels like: ${feel.toFixed()}&deg;<br> <br> Sunrice: ${sunrise} <br> Sunset: ${sunset}`;
    hym[0].innerHTML = `Humidity: ${humidity}%<br><br><br> Wind: ${wind} kph`;
    switch (pic) {
        case "Rain":
            picm[0].innerHTML = `<img src="rain.png" alt="" class="pic_big">`;
            break;
        case "Clouds":
            picm[0].innerHTML = `<img src="cloud.png" alt="" class="pic_big">`;
            break;
        case "Clear":
            picm[0].innerHTML = `<img src="sun.png" alt="" class="pic_big">`;
            break;
        case "Snow":
            picm[0].innerHTML = `<img src="snow.png" alt="" class="pic_big">`;
            break;

    }
    let day = 5;
    for (i = 0; i < 5; i++) {
        let den = new Date(wth.list[i * 8].dt * 1000 - 1).toDateString().split(" ")[0];
        bot[i].innerHTML = den;
        let temp_b = wth.list[i * 8].main.temp;
        bot[day].innerHTML = `${temp_b.toFixed()}&deg;C`;
        day++;
        pic = wth.list[i * 8].weather[0].main;
        switch (pic) {
            case "Rain":
                picb[i * 2].innerHTML = `<img src="rain.png" alt="" class="pic_bot">`;
                break;
            case "Clouds":
                picb[i * 2].innerHTML = `<img src="cloud.png" alt="" class="pic_bot">`;
                break;
            case "Clear":
                picb[i * 2].innerHTML = `<img src="sun.png" alt="" class="pic_bot">`;
                break;
            case "Snow":
                picb[i * 2].innerHTML = `<img src="snow.png" alt="" class="pic_bot">`;
                break;
        }
    }
}