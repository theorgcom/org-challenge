# Frontend Code Challenge

This repo is a light version of the [TheOrg](https://theorg.com) web app.

## The challenge

- Look at [the supplied Figma design](https://www.figma.com/file/wiWRVlKWuY4itW89sYnhzy/Code-Challenge%3A-Splash-Page?node-id=0%3A1) 🌄, you might need to sign up to inspect the various design elements and get CSS hints
- The challenge is to build the desgin into the web app as best as possible. The [Demo.tsx](./src/routes/demo/Demo.tsx) file can be used as a starting point.

_The challenge should not take more than 3-4 hours._

#### It's worth noting that:

- Everything can be done with the supplied files, but to make the code more readable you're very welcome to split out the layout and add additional supporting components in the [./components](./src/components) folder.
- The data for the brands is supplied via an Apollo graphql hook that can be imported as: `import { useAllBrandsQuery } from '@app/apollo/types';`.

## Getting started

#### 1. Get the source code

You can clone this repo or download the code as a zip from Github.

#### 2. Run `npm install`

This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### 3. Run `npm start`

This command will build the app from the source files (`/src`) into the output
`/build` folder. As soon as the initial build completes, it will start the
Node.js server (`node build/server.tsx`) and [Browsersync](https://browsersync.io/)
with [HMR](https://webpack.github.io/docs/hot-module-replacement) on top of it.

#### 4. Run `npm run lint`

This will ensure that there are no javascript or css errors in the project.

#### 5. Submit your work

Remove the `./node_modules` and `./build` files if present and send the project as a zip file.

## Any questions or problems

Don't hesitate to contact us with any questions ✌️
