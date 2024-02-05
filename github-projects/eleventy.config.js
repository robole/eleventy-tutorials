/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
  config.addFilter("find_repo", (array, url) => {
    let result = array.find((item) => item.html_url === url);
    return result;
  });

  config.addPassthroughCopy("style.css");

  return {
    templateFormats: ["njk", "md"],
  };
};
