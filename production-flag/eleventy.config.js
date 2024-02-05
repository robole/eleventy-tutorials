const production = require("./_data/production");

module.exports = function (config) {
  // To do something in production only
  if (production) {
    // e.g. minify HTML files
  }

  return {
    templateFormats: ["njk", "md"],
  };
};
