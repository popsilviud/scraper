const puppeteer = require('puppeteer');

let scrape = async() => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    //open page
    await page.goto('');
    await page.waitFor(1000);

    //open results
    await page.click('#oMainContent_ctl00_cauta');

    const result = await page.evaluate(() =>{
        //return something
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value);
});
