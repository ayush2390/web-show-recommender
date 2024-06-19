import { CheerioCrawler, log, Dataset } from "crawlee";

const crawler = new CheerioCrawler({
  requestHandler: async ({ request, parseWithCheerio, pushData }) => {
    log.info(`Processing: ${request.url}`);

    // Use parseWithCheerio for efficient HTML parsing
    const $ = await parseWithCheerio();

    // Extract genre and shows directly from the HTML structure
    const data = $('[data-uia="collections-row"]')
      .map((_, el) => {
        const genre = $(el)
          .find('[data-uia="collections-row-title"]')
          .text()
          .trim();
        const items = $(el)
          .find('[data-uia="collections-title"]')
          .map((_, itemEl) => $(itemEl).text().trim())
          .get();
        return { genre, items };
      })
      .get();

    // Prepare data for pushing
    const genres = data.map((d) => d.genre);
    const shows = data.map((d) => d.items);

    await pushData({
      genre: genres,
      shows: shows,
    });
  },

  // Limit crawls for efficiency
  // maxRequestsPerCrawl: 20,
});

await crawler.run(["https://www.netflix.com/in/browse/genre/1191605"]);
await Dataset.exportToJSON("results");
