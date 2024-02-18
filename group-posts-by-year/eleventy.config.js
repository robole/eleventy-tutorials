const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

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

/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 * Source: https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects#answer-38327540
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
function groupBy(list, keyGetter) {
  const map = new Map();

  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);

    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
