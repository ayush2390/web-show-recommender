import { PlaywrightCrawler } from "crawlee";

const crawler = new PlaywrightCrawler({
  requestHandler: async ({ page, request, enqueueLinks, pushData }) => {
    console.log(`Processing: ${request.url}`);
    console.log(request.label);

    const titles = await page.$$eval(
      "span.nm-collections-row-name",
      (elements) => {
        // Map the text content of each element
        return elements.map((el) => el.textContent.trim());
      }
    );
    // console.log(titles);
    const shows = await page.$$eval(
      "span.nm-collections-title-name",
      (elements) => {
        // Map the text content of each element
        return elements.map((el) => el.textContent.trim());
      }
    );

    let allShows = [];
    let totalShows = [];
    shows.map((show) => {
      if (allShows.length == 40) {
        totalShows.push(allShows);
        allShows = [];
      }
      allShows.push(show);
    });

    await pushData({
      genre: titles,
      shows: totalShows,
    });
  },

  // Let's limit our crawls to make our tests shorter and safer.
  maxRequestsPerCrawl: 20,
});

await crawler.run(["https://www.netflix.com/in/browse/genre/1191605"]);
