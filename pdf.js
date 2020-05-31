const puppeteer = require("puppeteer");

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    ignoreHTTPSErrors: true,
  });
  const page = browser.newPage();
  await page.goto("https://news.ycombinator.com", {
    waitUntil: "networkidle2",
  });
  await page.pdf({ path: "img/hn.pdf", format: "A4" });

  page.close();
}

main();