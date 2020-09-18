# Frontend Development Challenge

This repo is a light version of the [TheOrg](https://theorg.com) web app.

## The challenge

- Look at the supplied Figma design 🌄, you might need to sign up to inspect the various design elements and get CSS hints
- The design has 5 different sections. The challenge is to select 2 or 3 of the sections in the design and build them into the web app as best as possible using the [Demo.js](./src/routes/demo/Demo.js) and [Demo.css](./src/routes/demo/Demo.css) files.

_The challenge should not take more than 3-4 hours._

#### It's worth noting that:

- Everything can be done in the Demo files listed above, but to make the code more readable you're very welcome to split out the layout and add additional supporting components in the [./components](./src/components) folder.
- The illustrations and assets in the design are included [here](./src/routes/demo/assets). They can however be exported from Figma again if other formats or sizes are required.
- Data for Section 2 (Join these transparent brands) is included as a prop on the Demo component.

## Getting started

#### 1. Get the source code

You can clone this repo or download the code as a zip from Github.

#### 2. Run `npm install`

This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### 3. Run `npm start`

This command will build the app from the source files (`/src`) into the output
`/build` folder. As soon as the initial build completes, it will start the
Node.js server (`node build/server.js`) and [Browsersync](https://browsersync.io/)
with [HMR](https://webpack.github.io/docs/hot-module-replacement) on top of it.

#### 4. Run `npm run lint`

This will ensure that there are no javascript or css errors in the project.

#### 5. Submit your work

Remove the `./node_modules` and `./build` files if present and send the project as a zip file.

#### Note about Flowtypes and VSCode

_For the peeps using VSCode as editor._
The project uses [Flowtypes]() and in order to not conflict with the builtin Typescript plugins of VSCode
please follow [this](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode) guide to enable it.

## Any questions or problems

Don't hesitate to contact andreas@theorg.com ✌️
