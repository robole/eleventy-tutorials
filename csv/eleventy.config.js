const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");
const { parse } = require("csv-parse/sync");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
  config.addDataExtension("csv", (contents) => {
    const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      delimiter: ";",
      trim: true,
    });

    return records;
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
