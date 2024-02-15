/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
  config.addPassthroughCopy("img");

  return {
    templateFormats: ["njk", "md"],
  };
};
