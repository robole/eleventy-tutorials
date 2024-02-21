const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");
const { groupBy } = require("./utilities");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
  config.addCollection("postsByYearAscVersion21", (collection) => {
    let posts = collection.getFilteredByGlob("content/posts/**/*.md");

    const postsByYear = Map.groupBy(posts, ({ date }) =>
      new Date(date).getFullYear()
    );

    return postsByYear;
  });

  config.addCollection("postsByYearDescVersion21", (collection) => {
    let posts = collection
      .getFilteredByGlob("content/posts/**/*.md")
      .sort((a, b) => b.date - a.date);

    const postsByYear = groupBy(posts, (post) =>
      new Date(post.date).getFullYear()
    );

    return postsByYear;
  });

  config.addCollection("postsByYearAsc", (collection) => {
    let posts = collection.getFilteredByGlob("content/posts/**/*.md");

    const postsByYear = groupBy(posts, (post) =>
      new Date(post.date).getFullYear()
    );

    return postsByYear;
  });

  config.addCollection("postsByYearDesc", (collection) => {
    let posts = collection
      .getFilteredByGlob("content/posts/**/*.md")
      .sort((a, b) => b.date - a.date);

    const postsByYear = groupBy(posts, (post) =>
      new Date(post.date).getFullYear()
    );

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
