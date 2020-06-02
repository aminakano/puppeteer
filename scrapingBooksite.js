const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const URL =
    "http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html";
  await page.goto(URL);
  await page.waitFor(1000);

  await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    const price = document.querySelector(".price_color").innerHTML;
    const data = [];
    console.log({ title, price });
    data.push({title, price})
    return data;
  })
  // (await browser).close();
  
})()