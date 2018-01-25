/*xmlhttp Code refereed from the solutions of practical 6. These codes are aimed to import the data from external Json file*/
xmlhttp = new XMLHttpRequest();
url = 'json/Daily.json';
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        dailyData = JSON.parse(xmlhttp.responseText);
    }
}
xmlhttp.open('GET', url, true);
xmlhttp.send();

xmlhttp1 = new XMLHttpRequest();
url = './json/Detailed.json';
xmlhttp1.onreadystatechange = function () {
    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200)
        detailedData = JSON.parse(xmlhttp1.responseText);
}
xmlhttp1.open('GET', url, true);
xmlhttp1.send();

function dayDisplay() {
    var p, div, h2, h3, img, form, input, label, button, span;
    var days = getDays() - 1;
    /*Remove the all the divs that display just now*/
    var d = document.getElementById('display');
    while (d.hasChildNodes()) {
        d.removeChild(d.lastChild);
    }
    d = document.getElementById('detail');
    while (d.hasChildNodes()) {
        d.removeChild(d.lastChild);
    }
    var inf = {0: 'Pressure',1: 'Humidity',2: 'Wind Speed'};
    div = document.createElement('div');
    div.className = 'phw';
    document.getElementById('display').appendChild(div);
    /*Create 3 checkboxes*/
    for (i = 0; i <= 2; i++) {
        label = document.createElement('label');
        label.className = 'container';
        label.appendChild(document.createTextNode(inf[i]));
        input = document.createElement('input');
        input.type = 'checkbox';
        input.setAttribute('onclick', 'phwDisplay(' + days + ',' + i + ')');
        span = document.createElement('span');
        span.className = 'checkmark';
        label.appendChild(input);
        label.appendChild(span);
        div.appendChild(label);
    }
    for (i = 0; i <= days; i++) {
        div = document.createElement('div');
        div.className = 'daily-display';
        div.setAttribute('onclick', 'detailDisplay(' + i + ')');
        document.getElementById('display').appendChild(div);
        try { /*Error handling*/
            t = getData(i); /*Get the daily data of ith day*/
        } catch (e) {
            window.alert('Sorry, cannot read the Daily.json file! Please make sure open this in brackets preview and check the path of Daily.json!');
            return;
        }
        /*Time*/
        h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode(t[5]));
        div.appendChild(h3);
        /*Description*/
        h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode(t[0]));
        div.appendChild(h3);
        /*Image*/
        img = new Image();
        img.src = t[1];
        div.appendChild(img);
        /*Average Temperature*/
        h2 = document.createElement('h2');
        h2.appendChild(document.createTextNode(t[2] + '℃'));
        div.appendChild(h2);
        /*MIN~MAX Temperature*/
        p = document.createElement('p');
        p.appendChild(document.createTextNode(t[3] + '~' + t[4] + '℃  '));
        div.appendChild(p);
        p = document.createElement('p');
        /*Clouds*/
        p.appendChild(document.createTextNode('Clouds:' + t[9] + '%'));
        div.appendChild(p);
        p = document.createElement('p');
        p.appendChild(document.createTextNode('Rain:' + t[10] + 'mm'));
        div.appendChild(p);
        divChild = document.createElement('div');
        divChild.className = 'phw-display';
        div.appendChild(divChild);
        /*Humidity, Pressure and Wind Speed*/
        for (k = 6; k <= 8; k++) {
            p = document.createElement('p');
            p.appendChild(document.createTextNode(inf[k - 6] + ': ' + t[k]));
            divChild.appendChild(p);
            p.style.display = 'none';
        }
    }
    /*Automatically scroll*/
    window.scroll(0, 2000);
}

/*Fulfill the fuctions of 3 checkboxes*/
function phwDisplay(i, j) {
    var div = document.getElementsByClassName('phw-display');
    for (k = 0; k <= i; k++) {
        if (div[k].childNodes[j].style.display == 'none') {
            div[k].childNodes[j].style.display = 'block';
        } else {
            div[k].childNodes[j].style.display = 'none';
        }
    }
}

/*Get the general data of nth day*/
function getData(n) { 
    var j = dailyData.list[n];
    var ave = Math.round(j.temp.day);
    var max = Math.round(j.temp.max);
    var min = Math.round(j.temp.min);
    var pre = j.pressure + 'hPa';
    var hum = j.humidity + '%';
    var src = './image/' + j.weather[0].icon + '.png'; /*Get the icon of a day*/
    var desc = j.weather[0].description;
    var speed = j.speed + 'm/s';
    var clouds = j.clouds + '%';
    var rain = j.rain;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dateTime = new Date(parseInt(j.dt) * 1000);
    var month = months[dateTime.getMonth()];
    var time = dateTime.getDate() + ' ' +month;
    var clouds = j.clouds;
    var rain = j.rain;
    return [desc, src, ave, min, max, time, pre, hum, speed, clouds, rain];
}

/**Get the days that user choose*/
function getDays() {
    var myselect = document.getElementById("selection");
    var index = myselect.selectedIndex;
    var days = myselect.options[index].value;
    return days;
}

/*Display detailed Json file*/
function detailDisplay(i) {
    i += 19;
    var d = document.getElementById('detail');
    while (d.hasChildNodes()) {
        d.removeChild(d.lastChild);
    }
    try {
        var final = detailedData.list.length;
    } catch (e) {
        window.alert('Sorry, cannot read the Detailed.json file! Please check the path of Detailed.json!');
        return;
    }
    var time, ave, pre, src, wind, img, h, p, temp, dateTime, hum, desc, clouds, table, tr, th, td, rain, caption;
    table = document.createElement('table');
    tr = document.createElement('tr');
    caption = document.createElement('caption');
    caption.appendChild(document.createTextNode('Detail weather of Dublin condition in ' + i + ' Oct'));
    table.appendChild(caption);
    var s = ['Time', 'General', 'Temperature(℃)', 'Humidity(%)', 'Pressure(hPa)', 'Clouds(%)', 'Rain(mm)','Wind Speed(m/s)']
    for (j = 0; j <= 7; j++) {
        th = document.createElement('th');
        th.appendChild(document.createTextNode(s[j]));
        tr.appendChild(th);
    }
    table.appendChild(tr);
    for (j = 0; j < final; j++) {
        if (detailedData.list[j].dt_txt.slice(8, 10) == i) {
            var div = document.createElement('div');
            div.className = 'detail-Display';
            d.appendChild(div);
            temp = detailedData.list[j];
            dateTime = new Date(parseInt(temp.dt) * 1000);
            time = dateTime.getHours() + ':00  ';
            ave = Math.round(temp.main.temp);
            pre = temp.main.pressure;
            src = './image/' + temp.weather[0].icon + '.png';
            hum = temp.main.humidity;
            wind = temp.wind.speed;
            desc = temp.weather[0].main;
            clouds = temp.clouds.all;
            /*Error handling: if the rain data in Json is undefined, output 'No rain'*/
            (temp.rain['3h'] == undefined) ? (rain = 'No rain') : (rain = Math.round(temp.rain['3h'] * 100) / 100);
            s = [time, desc, ave, hum, pre, clouds, rain, wind];
            tr = document.createElement('tr');
            for (k = 0; k <= 7; k++) {
                td = document.createElement('td');
                td.appendChild(document.createTextNode(s[k]));
                if (k == 1) {
                    img = document.createElement('img');
                    img.src = src;
                    td.appendChild(img);
                }
                tr.appendChild(td);
            }
        }
        table.appendChild(tr);
    }
    div.appendChild(table);
    window.scroll(0, 2000);
}