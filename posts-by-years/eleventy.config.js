const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
  config.addCollection("postsByYearAsc", (collection) => {
    let posts = collection.getFilteredByGlob("content/posts/**/*.md");

    const postsByYear = Object.groupBy(posts, ({ date }) =>
      new Date(date).getFullYear()
    );

    return postsByYear;
  });

  config.addCollection("postsByYearDesc", (collection) => {
    let posts = collection
      .getFilteredByGlob("content/posts/**/*.md")
      .sort((a, b) => b.date - a.date);

    const postsByYearUnsorted = Object.groupBy(posts, ({ date }) =>
      new Date(date).getFullYear()
    );

    let postsByYear = [];

    let years = Object.keys(postsByYearUnsorted).sort((a, b) => b - a);

    years.forEach((year) => {
      postsByYear.push([year, postsByYearUnsorted[year]]);
    });

    // let postsByYear = Object.fromEntries(
    //   Object.entries(postsByYearUnsorted).sort().reverse()
    // );

    console.log(postsByYear);

    return postsByYear;
  });

  config.addFilter("simpleDate", (date) => {
    const dt = DateTime.fromJSDate(date);
    return dt.toFormat("dd LLL yyyy");
  });

  config.addPassthroughCopy("style.css");
  config.addPlugin(syntaxHighlightPlugin);

  return {
    templateFormats: ["njk", "md"],
  };
};
