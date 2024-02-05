const fetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  let user = "robole";
  let url = `https://api.github.com/users/${user}/repos?per_page=100`;

  try {
    let json = await fetch(url, {
      duration: "2d",
      type: "json",
      fetchOptions: {
        headers: {
          Accept: "application/vnd.github+jso",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    });

    return json;
  } catch (error) {
    console.error(`Fetch failed in github.js. ${error}`);
  }
};
