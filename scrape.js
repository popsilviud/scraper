const puppeteer = require('puppeteer');
const url = require('./getUrl.js');
const writeFile = require('./writeFile.js');

let scrape = async() => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    //open page
    await page.goto(url(), 'networkidle0');

    //open results
    await page.click('#oMainContent_ctl00_cauta');
    await page.waitFor(1000);

    const map = await page.evaluate(() =>{
        let elements = document.querySelectorAll('#oMainContent_ctl00_dgSali > tbody > tr:nth-child(1) > td > a');
        return elements;
    });

    const result = await page.evaluate(() =>{
        let data = []; // Create am empty array to store cinema objects
        let bla = [];

        let screens = document.querySelectorAll('#oMainContent_ctl00_dgSali > tbody > tr:nth-child(1) > td > a');
        var q = 2;
        screens.forEach(async screen =>{
            //#oMainContent_ctl00_dgSali > tbody > tr:nth-child(1) > td > a:nth-child(2)
            let next = document.querySelector('#oMainContent_ctl00_dgSali > tbody > tr:nth-child(1) > td > a:nth-child('+ q + ')').innerText;
            bla.push(next);
            q++;
        });

        let cinemas = document.querySelectorAll('.film_cadru');
        var i = 3;

        cinemas.forEach(cinema => {
                //#oMainContent_ctl00_dgSali > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > span.film_titluri
                let selector = '#oMainContent_ctl00_dgSali > tbody > tr:nth-child(' + i + ')';  
                let name = document.querySelector(selector + ' > td > table > tbody > tr > td:nth-child(1) > span.film_titluri').innerText;
                //#oMainContent_ctl00_dgSali > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > span:nth-child(3)
                let adress = document.querySelector(selector + ' > td > table > tbody > tr > td:nth-child(1) > span:nth-child(3)').innerText;
                //#oMainContent_ctl00_dgSali > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > span:nth-child(4)
                let details = document.querySelector(selector + ' > td > table > tbody > tr > td:nth-child(1) > span:nth-child(4)').innerText;
                //#oMainContent_ctl00_dgSali > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > span.film_detalii
                let seats = document.querySelector(selector + ' > td > table > tbody > tr > td:nth-child(1) > span.film_detalii').innerText;
                data.push({name, adress, details, seats});
                i++;
        });

        data.push(bla);
        return data;
    });

    browser.close();
    return result;
    //return result;
};

scrape().then((value) => {
    writeFile(value);
    console.log(value);
});
