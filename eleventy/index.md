---
title: GitHub Pages with Eleventy
layout: layout.njk
---

## Essential Files

- `.github/workflows/eleventy.yml` a GitHub Action that converts the Markdown files in this repository into an HTML site checked into the `gh-pages` branch.
- `package.json` tells our GitHub Action how to setup our site generator `eleventy/11ty`.
- `.eleventy.js` configures the `11ty` site generator.
- `.eleventyignore` tells `11ty` files to not use when building the HTML site.
- `.nojekyll` tells GitHub that we are not using the Jekyll site generator.
- `_includes/layout.njk` our first template file used by `11ty` to add the HTML header and footer to each page.

## Testing Locally

See [Eleventy usage][2] for more details.

[2]: https://www.11ty.dev/docs/usage/

1. Setup eleventy locally

```sh
npm install -g @11ty/eleventy
```

1. Serve the site locally to your local brower.

```sh
npx @11ty/eleventy --serve
```

1. Note that the site rebuilds via GitHub action automatically when a branch is merged.
