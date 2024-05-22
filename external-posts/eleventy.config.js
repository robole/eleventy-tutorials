const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
  config.addCollection("posts", (collection) => {
    let localPosts = collection.getFilteredByGlob("content/posts/**/*.md");

    let externalPosts = transformExternalPosts(
      collection.getAll()[0].data.externalPosts
    );

    let allPosts = [...localPosts, ...externalPosts];

    let sortedPosts = allPosts.sort(
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

function transformExternalPosts(posts) {
  return posts.map((post) => {
    let transformedPost = post;
    transformedPost.date = new Date(post.date);
    return transformedPost;
  });
}
