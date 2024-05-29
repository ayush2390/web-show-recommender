import { PlaywrightCrawler, log, Dataset } from "crawlee";

const crawler = new PlaywrightCrawler({
  requestHandler: async ({ request, parseWithCheerio, pushData }) => {
    log.info(`Processing: ${request.url}`);
    console.log(request.label);

    // Use parseWithCheerio for efficient HTML parsing
    const $ = await parseWithCheerio();

    // Extract genre titles
    const titles = $(".nm-collections-row-name")
      .map((_, el) => $(el).text().trim())
      .get();

    // Extract show titles
    const shows = $(".nm-collections-title-name")
      .map((_, el) => $(el).text().trim())
      .get();

    // Prepare data for pushing
    const allShows = [];
    let chunk = [];
    shows.forEach((show) => {
      chunk.push(show);
      if (chunk.length === 40) {
        allShows.push(chunk);
        chunk = [];
      }
    });
    if (chunk.length > 0) {
      allShows.push(chunk);
    }

    // await Dataset.pushData({ titles, allShows });
    await Dataset.pushData({
      genre: titles,
      shows: allShows,
    });
  },

  // Limit crawls for efficiency
  maxRequestsPerCrawl: 20,
});

await crawler.run(["https://www.netflix.com/in/browse/genre/1191605"]);
await Dataset.exportToJSON("results");
