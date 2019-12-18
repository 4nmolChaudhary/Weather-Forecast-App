const key = "82005d27a116c2880c8f0fcb866998a0";
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const icon = document.querySelector('.icon');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const loc = document.querySelector('.loc');
const stats = document.querySelectorAll('.box h2');
window.addEventListener("load", () => {
    let long;
    let lat;
    let x = new Date();
    let h;
    x.getHours() > 12 ? h = x.getHours() - 12 : h = x.getHours();
    date.textContent = `${months[x.getMonth()]} ${x.getDate()}, ${weekdays[x.getDay()]}`;
    h.toString().length === 1 ? h = "0" + h + '' : h;
    time.textContent = `${h}:${x.getMinutes()} ${x.getHours() > 11 ? 'PM' : 'AM'}`;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            console.log(api);
            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                icon.innerHTML = `<img src="icons/${data.weather[0].icon}.svg"/>`;
                temp.textContent = `${Math.floor(data.main.temp - 273)}°c`;
                desc.textContent = `${data.weather[0].main}`;
                loc.textContent = `${data.name},${data.sys.country}`;
                stats[0].textContent = `${Math.floor(data.wind.speed * 3.6)} km/h`;
                stats[1].textContent = `${data.main.humidity} %`;
                stats[2].textContent = `${data.clouds.all} %`;
                stats[3].textContent = `${Math.floor(data.visibility / 1000)} km`;
                stats[4].textContent = `${data.main.pressure} hPa`;
                stats[5].textContent = `${Math.floor((data.main.temp - 273) * (9 / 5) + 32)}°F`;
                stats[6].textContent = `${Math.floor(data.main.temp_min - 273)}°c`;
                stats[7].textContent = `${Math.floor(data.main.temp_max - 273)}°c`;
                let sr = new Date(data.sys.sunrise * 1000);
                let h;
                sr.getHours() > 12 ? h = sr.getHours() - 12 : h = sr.getHours();
                h.toString().length === 1 ? h = "0" + h + '' : h;
                document.querySelectorAll('.Sun h2')[0].textContent =
                    `Sunrise : ${h}:${sr.getMinutes()} ${sr.getHours() > 11 ? 'PM' : 'AM'}`;

                let ss = new Date(data.sys.sunset * 1000);
                ss.getHours() > 12 ? h = ss.getHours() - 12 : h = ss.getHours();
                h.toString().length === 1 ? h = "0" + h + '' : h;
                document.querySelectorAll('.Sun h2')[1].textContent =
                    `Sunset  : ${h}:${ss.getMinutes()} ${ss.getHours() > 11 ? 'PM' : 'AM'}`;

            })
        });
    }
    else {
        console.log("please enable location!!");
    }
});