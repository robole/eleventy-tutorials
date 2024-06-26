const fetch = require("@11ty/eleventy-fetch");
let parser = require("fast-xml-parser");

module.exports = async function () {
  let url = `https://blog.logrocket.com/author/rob-oleary/feed/`;
  let response;

  try {
    response = await fetch(url, {
      duration: "1w",
      type: "text",
    });
  } catch (error) {
    console.error(`Fetch failed in logrocket.js. ${error}`);
  }

  let feed;

  const result = parser.XMLValidator.validate(response);

  if (result === true) {
    const xmlparser = new parser.XMLParser();
    feed = xmlparser.parse(response);
  } else {
    console.error(
      `logrocket.js - XML is invalid. Reason: ${result.err.msg}`,
      result
    );
  }

  let posts = feed.rss.channel.item;

  let transformedPosts = posts.map((post) => {
    let transformedPost = {};
    transformedPost.date = new Date(post.pubDate);
    transformedPost.url = post.link;
    transformedPost.data = {};
    transformedPost.data.title = post.title;
    return transformedPost;
  });

  return transformedPosts;
};
