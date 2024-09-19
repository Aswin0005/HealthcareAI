const puppeteer = require('puppeteer');

export async function scrapeYouTube(query) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const searchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      query
    )}`;

    await page.goto(searchURL, { waitUntil: 'networkidle2' });

    // Extract video details
    const results = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('ytd-video-renderer'));
      return items
        .map((item) => {
          const title = item.querySelector('#video-title')?.textContent.trim();
          const url = `https://www.youtube.com${item
            .querySelector('#video-title')
            ?.getAttribute('href')}`;
          return { title, url };
        })
        .filter((video) => video.title && video.url); // Filter out incomplete results
    });

    await browser.close();
    return results.slice(0, 5); // Limit to top 5 results
  } catch (error) {
    console.error('Error scraping YouTube:', error);
    return [];
  }
}

// Example usage
(async () => {
  const query = 'managing work stress';
  const videos = await scrapeYouTube(query);
  console.log(videos);
})();
