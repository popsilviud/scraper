const puppeteer = require('puppeteer');
const writeFile = require('./writeFile.js');

let scrape = async() => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    //open page
    await page.goto('', 'networkidle0');

    //open results
    await page.click('#oMainContent_ctl00_cauta');
    await page.waitFor(1000);

    const result = await page.evaluate(() =>{
        let data = []; // Create am empty array to store cinema objects
        
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
        return data;
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    writeFile(value);
    console.log(value);
});
