const { DateTime } = require("luxon");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
  config.addCollection("posts", (collection) => {
    let posts = collection
      .getFilteredByGlob("content/posts/**/*.md")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  });

  config.addFilter("byYear", (posts) => {
    let stats = new Map();

    for (const post of posts) {
      let year = new Date(post.date).getFullYear();

      if (stats.has(year) === false) {
        stats.set(year, 0);
      }

      let currentValue = stats.get(year);
      let newValue = currentValue + 1;
      stats.set(year, newValue);
    }

    return stats;
  });

  config.addFilter("simpleDate", (date) => {
    const dt = DateTime.fromJSDate(date);
    return dt.toFormat("dd LLL yyyy");
  });

  config.addPassthroughCopy("style.css");

  return {
    templateFormats: ["njk", "md"],
  };
};
