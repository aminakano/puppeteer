const puppeteer = require("puppeteer");

let bookingURL =
  "https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1FCAEoggI46AdIM1gEaKkBiAEBmAEJuAEHyAEP2AEB6AEB-AELiAIBqAIDuAL54dD2BcACAdICJGI4MTg3YTdjLWRjZjgtNDc3Ni05Y2RjLTM4YmQ2M2MwYmFlMdgCBuACAQ&sid=ea6c2655dbd5e1db4afec0833c2c51df&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.en-gb.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaKkBiAEBmAEJuAEHyAEP2AEB6AEB-AELiAIBqAIDuAL54dD2BcACAdICJGI4MTg3YTdjLWRjZjgtNDc3Ni05Y2RjLTM4YmQ2M2MwYmFlMdgCBuACAQ%3Bsid%3Dea6c2655dbd5e1db4afec0833c2c51df%3Bsb_price_type%3Dtotal%26%3B&ss=D%C3%BCsseldorf%2C+North+Rhine-Westphalia%2C+Germany&is_ski_area=&checkin_year=2020&checkin_month=6&checkin_monthday=2&checkout_year=2020&checkout_month=6&checkout_monthday=7&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1&ss_raw=dusse&ac_position=0&ac_langcode=en&ac_click_type=b&dest_id=-1762397&dest_type=city&iata=DUS&place_id_lat=51.223202&place_id_lon=6.77892&search_pageview_id=3d3d9ebcd5de015f&search_selected=true&search_pageview_id=3d3d9ebcd5de015f&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(bookingURL);

  // get hotel details
  let hotelData = await page.evaluate(() => {
    let hotels = [];
    // get the hotel elements
    let hotelsElms = document.querySelectorAll(
      "div.sr_property_block[data-hotelid]"
    );
    // get the hotel data
    hotelsElms.forEach((hotelelement) => {
      let hotelJson = {};
      try {
        hotelJson.name = hotelelement.querySelector(
          "span.sr-hotel__name"
        ).innerText;
        hotelJson.reviews = hotelelement.querySelector(
          ".bui-review-score__text"
        ).innerText;
        hotelJson.rating = hotelelement.querySelector(
          "span.review-score-badge"
        ).innerText;
        if (hotelelement.querySelector("strong.price")) {
          hotelJson.price = hotelelement.querySelector(
            "strong.price"
          ).innerText;
        }
      } catch (exception) {}
      hotels.push(hotelJson);
    });
    return hotels;
  });

  console.dir(hotelData);
})();