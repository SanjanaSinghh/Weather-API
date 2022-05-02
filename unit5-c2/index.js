let apiKey = "3d4dff5515c3d3a103ef0450fb3cf1fa";
document.querySelector("#form").addEventListener("submit", season);
async function season(event) {
    event.preventDefault();
    try {
        let city = document.querySelector("#city").value
        let sanj = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        let data = await sanj.json();
        displayData(data);
    } catch (error) {
        console.log(error);
    }
}
function displayData(data) {
    document.querySelector("#city").value = null;
    let images = ["https://www.freeiconspng.com/uploads/sunny-icon-17.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBmE4Op7nZYwHw0GLd93HW8O74m2gIcTSqLsqw-VBNK0R9C33CRoU0jl1NzfZQ2ptmXB4&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThjKLX_013XxV-PU20cDeGrQGXES2zUC8jIYA8qFcL9-5EBK0iiTcisJiNegFJBGFgAvE&usqp=CAU"]
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    document.querySelector("#container").innerHTML = null;
    for (let i = 0; i <= 6; i++) {
        let div = createTag("div");
        let name = createTag("h2");
        name.innerText = days[i];
        let temp = createTag("p");
        temp.innerText = data.list[i].main.temp + "°";
        let image = createTag("img");
        if (+data.list[i].main.temp > 30) {
            image.src = images[0];
        } else if (+data.list[i].main.temp > 20 && +data.list[i].main.temp < 25) {
            image.src = images[1]
        } else {
            image.src = images[2];
        }
        let lowTemp = createTag("p");
        lowTemp.innerText = data.list[i].main.temp_min + "°";
        let wind = createTag("p");
        wind.innerText = data.list[i].wind.speed + "Km/h";

        div.append(name, temp, image, lowTemp, wind);
        document.querySelector("#container").append(div);
    }
}
function createTag(tag) {
    return document.createElement(tag);
}