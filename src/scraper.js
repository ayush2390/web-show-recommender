
import { CheerioCrawler, log, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
  requestHandler: async ({ request, parseWithCheerio, pushData }) => {
    log.info(`Processing: ${request.url}`);

    // Use parseWithCheerio for efficient HTML parsing
    const $ = await parseWithCheerio();

    // Extract genre titles
    const titles = $('.nm-collections-row-name')
      .map((_, el) => $(el).text().trim())
      .get();

    // Extract show titles
    const shows = $('.nm-collections-title-name')
      .map((_, el) => $(el).text().trim())
      .get();

    // Prepare data for pushing
    const allShows = [];
    let genreShows = [];
    shows.forEach((show) => {
      genreShows.push(show);
      if (genreShows.length === 40) {
        allShows.push(genreShows);
        genreShows = [];
      }
    });
    if (genreShows.length > 0) {
      allShows.push(genreShows);
    }

    await pushData({
      genre: titles,
      shows: allShows,
    });
  },

  // Limit crawls for efficiency
  // maxRequestsPerCrawl: 20,
});

await crawler.run(['https://www.netflix.com/in/browse/genre/1191605']);
await Dataset.exportToJSON('results');
