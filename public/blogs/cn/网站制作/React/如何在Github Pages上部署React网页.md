# 如何在Github Pages上部署React网页

Github Pages不支持直接使用JSX或现代ES6模块。
如果要在GitHub Pages上部署，别忘了先进行构建。

以下是一些我跟着解决此问题的有用教程。（非常感谢这些教程的作者）

注意：从`gh-pages`分支部署页面，有些项目在运行`npm run build`时将构建目录从`build`改为`dist`，为了应对这种情况，请使用`"deploy": "gh-pages -d dist"`。

### 部署React应用
https://github.com/gitname/react-gh-pages

### 对于单页应用（解决刷新404问题）
https://github.com/rafgraph/spa-github-pages