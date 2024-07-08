# vue-last

## 创建

pnpm create vue@latest

```shell
# 根据具体情况可以选择npm yarn pnpm
# 下面选择pnpm为例
pnpm create vue@latest

# 选择根据提示选择
Vue.js - The Progressive JavaScript Framework

√ 请输入项目名称： ... vue-project
√ 是否使用 TypeScript 语法？ ... 否 / #是
√ 是否启用 JSX 支持？ ... 否 / #是
√ 是否引入 Vue Router 进行单页面应用开发？ ... 否 / #是
√ 是否引入 Pinia 用于状态管理？ ... 否 / #是
√ 是否引入 Vitest 用于单元测试？ ... #否 / 否
√ 是否要引入一款端到端（End to End）测试工具？ » #不需要
√ 是否引入 ESLint 用于代码质量检测？ ... 否 / #是
√ 是否引入 Prettier 用于代码格式化？ ... 否 / #是

```

## Eslint & prettier 配置

1. 安装 vscode 的 Eslint 和 prettier 插件
2. 依赖

```js
/*
eslint-config-airbnb-base airbnb 规范
eslint-import-resolver-typescript 解决@别名识别问题
eslint-plugin-import 如果是npm yarn需要安装
*/
pnpm i eslint-config-airbnb-base eslint-plugin-import eslint-import-resolver-typescript  -D

```

```json
{
  "eslint-import-resolver-typescript": "^3.6.1",
  "eslint-plugin-import": "^2.29.1",
  "eslint-config-airbnb-base": "^15.0.0"
}
```

3. 根目录下新建.vscode/settings.json 保存自动格式化当前文件

## styleLint

```shell
pnpm i stylelint stylelint-config-standard stylelint-config-recommended-scss stylelint-config-recommended-vue postcss postcss-html postcss-scss stylelint-config-recess-order stylelint-config-html -D
```

scripts

```shell
 "lint:stylelint": "stylelint  \"**/*.{css,scss,vue,html}\" --fix",
```

依赖

```json
{
  "postcss-html": "^1.7.0", // 解析 HTML (类似 HTML) 的 PostCSS 语法
  "postcss-scss": "^4.0.9", // PostCSS 的 SCSS 解析器
  "stylelint": "^16.6.1",
  "stylelint-config-html": "^1.1.0", // 共享 HTML (类似 HTML) 配置，捆绑 postcss-html 并对其进行配置
  "stylelint-config-recess-order": "^5.0.1", // 提供优化样式顺序的配置
  "stylelint-config-recommended-scss": "^14.0.0", // 扩展 stylelint-config-recommended 共享配置并为 SCSS 配置其规则
  "stylelint-config-recommended-vue": "^1.5.0", // 扩展 stylelint-config-recommended 共享配置并为 Vue 配置其规则
  "stylelint-config-standard": "^36.0.1" // Stylelint 标准共享配置
}
```

.stylelintrc.cjs 文件

## 命名规范

scripts

```shell
"spellcheck": "cspell lint --dot --gitignore --color --cache --show-suggestions \"src/**/*.@(html|js|cjs|mjs|ts|tsx|css|scss|md|vue)\"",
```

依赖

```json
{
  "cspell": "^8.9.1"
}
```

自定义配置文件
.cspell/custom-words.txt

cspell.json

```json
{
  "import": ["@cspell/dict-lorem-ipsum/cspell-ext.json"],
  "caseSensitive": false,
  "dictionaries": ["custom-words"],
  "dictionaryDefinitions": [
    {
      "name": "custom-words",
      "path": "./.cspell/custom-words.txt",
      "addWords": true
    }
  ],
  "ignorePaths": [
    "**/node_modules/**",
    "**/dist/**",
    "**/lib/**",
    "**/docs/**",
    "**/stats.html",
    "**/detect.ts"
  ]
}
```

## 代码提交检查

`Husky + Lint-staged + Commitlint + Commitizen + cz-git 来配置 Git 提交代码规范。`
核心内容是配置 Husky 的 pre-commit 和 commit-msg 两个钩子:

- pre-commit：Husky + Lint-staged 整合实现 Git 提交前代码规范检测/格式化 (前提：ESlint + Prettier + Stylelint 代码统一规范)；
- commit-msg: Husky + Commitlint + Commitizen + cz-git 整合实现生成规范化且高度自定义的 Git commit message。

scripts

```shell
  "prepare": "husky install",
  "commit": "git-cz",
```

package.json

```json
{
  "lint-staged": {
    "*.{js,cjs,ts,tsx,html,vue,json,scss,sass,css}": [
      "cspell lint --dot --gitignore --color --cache --show-suggestions --no-must-find-files"
    ],
    "*.{cjs,json}": ["prettier --write"],
    "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{vue,html}": ["eslint --fix", "prettier --write", "stylelint --fix --allow-empty-input"],
    "*.{scss,sass,css}": ["stylelint --fix --allow-empty-input", "prettier --write"]
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

commitlint.config.cjs

依赖

```json
{
  "@commitlint/cli": "^19.3.0",
  "@commitlint/config-conventional": "^19.2.2",
  "commitizen": "4.3.0",
  "husky": "8.0.3",
  "lint-staged": "^15.2.0",
  "cz-git": "^1.9.3"
}
```

```shell
git init
npx husky-init
```

新建commit-msg文件
新建pre-commit文件

## Project Setup

```sh
pnpm i
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
