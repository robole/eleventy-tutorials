const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
  config.addCollection("posts", (collection) => {
    let posts = collection.getFilteredByGlob("content/posts/**/*.md");

    let sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sortedPosts;
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
