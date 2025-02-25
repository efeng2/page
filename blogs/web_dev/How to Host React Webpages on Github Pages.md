# How to Host React Webpages on Github Pages
2025-02-25

GitHub Pages does not support JSX or modern ES6 modules directly.
If deploying to GitHub Pages, don't forget to build first.
Here are some useful tutorials I followed to solve this problem. (Huge thanks to the authors)

Note: deploy pages from `gh-pages` branch, some vites when running `npm run build` change `build` to `dist`, to account for this do `"deploy": "gh-pages -d dist"`.

### Deploying a React App

1. https://github.com/gitname/react-gh-pages

### For Single Page Apps (Fixing Refresh 404 Problems)

2. https://github.com/rafgraph/spa-github-pages