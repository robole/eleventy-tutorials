<h1 align="center">
  <br>
    <img align="center" alt="A cartoon possum is floating on a balloon with a black circle in the background and the text 'tutorials' above it" src=".img/logo.png" width="200">
  <br>
	<br>
  Eleventy tutorials
  <br>
  <br>
</h1>
<h4 align="center">To-the-point tutorials on Eleventy 🎯</h4>
<br>

Tutorials on the [Eleventy](https://www.11ty.dev/) static site generator.

Each tutorial is a self-contained eleventy project.

## Conventions

I use eleventy's default settings most of the time for simplicity. The default project folder looks like this:

```
default-elventy-project/
|- _data/    <- global data files
|
|- _includes/ <- includes and layouts
|
|- _site/ <- the output folder for the generated website
|
|- eleventy.config.js   <- eleventy config file
```

The one exception is that I use nunjucks templating instead of Liquid because it is more popular, and has more a few powerful features.

If I stray from these conventions, I will mention in the tutorial.

## Running tutorials

Open one of the tutorial subfolders. Then, run `npm install` (or equivalent for your favourite package manager) to install the dependencies. Then, you can run the website locally with `npm run dev`.

## Tutorials

<!-- TOC -->
**Tutorial List**
1. [GitHub projects](#github-projects)
1. [Group posts by year](#group-posts-by-year)
1. [Favicon to differentiate between dev and production build modes](#favicon-to-differentiate-between-dev-and-production-build-modes)
1. [Production flag](#production-flag)
<!-- /TOC -->

### GitHub projects

A *projects* page that is populated with data fetched from the GitHub API.

![projects page](/.img/github-projects-screenshot.png)

We provide a list of repositories that we want to feature in *_data/projects.json* in the following format:

```json
[
  {
    "title": "Eleventy Tutorials",
    "repository": "https://github.com/robole/eleventy-tutorials"
  },
  {
    "title": "Snippets Ranger",
    "repository": "https://github.com/robole/vscode-snippets-ranger"
  }
]
```

We use the GitHub API to provide the additional fields: *description*, *language*, and *star count*.

You can read [this tutorial](https://www.roboleary.net/webdev/2024/02/07/eleventy-fetch.html) for a walkthrough.

The project is in the [github-projects](/github-projects/) folder.

### Group posts by year

It is popular to group posts by year for a blog or archive. I will show you how to do this in ascending or descending order.

![a blog page with the posts grouped by year from newest to oldest. there are 5 posts grouped into 3 groups: 2024, 2023, and 2022.](.img/group-posts-by-year.png)

The project is in the [group-posts-by-year](/group-posts-by-year/) folder.

### Favicon to differentiate between dev and production build modes

Show a different favicon if the project is run in dev mode or production mode. This gives a clear visual indicator of what version of your website you are seeing in the browser.

![favicon is different in dev mode and prod mode](.img/favicon-dev-prod.png)

You can read [this tutorial](https://www.roboleary.net/2024/02/15/eleventy-favicon-modes.html) for a walkthrough.

The project is in the [favicon-dev](/favicon-dev/) folder.

### Production flag

A production flag is useful for activites that you only want to happen in production such as minifying assets. This project adds a `production` variable that can be used everywhere.

The demo changes the `title` of the homepage if it is run in dev mode or production mode.

![title is different in dev mode and prod mode](.img/production-flag-title-modes.png)

You can read [this tutorial](https://www.roboleary.net/webdev/2024/01/24/eleventy-production-flag.html) for a walkthrough.

The project is in the [production-flag](/production-flag/) folder.
