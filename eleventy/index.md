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

## Setting up the GitHub Action

We followed these guides:

- [11ty guide by Lea Tortay](https://www.linkedin.com/pulse/eleventy-github-pages-lea-tortay/),
- [GitHub pages deployment by Daniel Marino](https://iamdanielmarino.com/posts/deploying-my-eleventy-site-to-github-pages/)
- [generating GitHub Deployment keys](https://github.com/marketplace/actions/github-pages-action#%EF%B8%8F-create-ssh-deploy-key)

Be sure to ensure that the `source` branch under `Settings/Pages` is set to `gh-pages`.

## Testing Locally

See [Eleventy usage][2] for more details.

[2]: https://www.11ty.dev/docs/usage/

1. Setup eleventy locally

```sh
npm install @11ty/eleventy
```

1. Serve the site locally to your local brower.

```sh
npx @11ty/eleventy --serve
```

1. Note that the site rebuilds via GitHub action automatically when a branch is merged.

## Resolving GitHub Dependabot Alerts

Use the `npm update` and `npm audit` commands to update any JavaScript libraries
that `11ty` depends on.

```shell
npm update
npm audit fix
```

This recipe should result in updates to `package-lock.json` and `package.json`,
which should be checked into `git` and merge to the `main` branch.

> It may be necessary to use `npm audit fix --force`. If so, be sure to double
> check that the pages still render correctly.
