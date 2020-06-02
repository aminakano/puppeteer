const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com");
  await page.pdf({ path: "img/hn.pdf", format: "A4" });
  await browser.close();
})()

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://google.com");
//   await page.pdf({ path: "img/google.pdf", format: "Letter" });
//   await browser.close();
// })();