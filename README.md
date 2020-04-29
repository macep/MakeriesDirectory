# JustGotMade
> A pure Vue.js client aggregating data from JustGotMade API and WordPress backend (via WP REST API) for modern style progressive single-page app.
It also manages the users with Auth0 from custom made login/registration components and pushes user information to MailChimp

## Prerequisites
To get this application up and running on a local environment there are a few things that you need, some of which only once.
First off, you'll need to install the base environment. The rest of it is on Webpack, used for the project automated tasks, bundling and more.
 
* Node.js - `http://nodejs.org/` (I recommend latest LTS version. Make sure NPM is also included when installing) 
* Vue-CLI - `npm i -g vue-cli`
* Git - `https://git-scm.com/downloads`

## Install dependencies
`npm i`

## Build Setup
``` bash
# starts develop mode locally with hot reload at localhost:8080
npm run dev

# build for production unminified
npm run build

# build for production with minification
npm run build --production

# build for production and view the bundle analyzer report
npm run build --report
```

## Repository
##### Clone the repository for first time. It will create a directory containing the project in the current directory
  `git clone https://github.com/macep/MakeriesDirectory.git`
  
##### Update the repo just before every time you want to make changes (recommended)
  `git pull` from project's root directory 

##### Save made changes and update the remote repo as well
  `git add .` from project root - adds all changes to the stage for a new commit
  
  `git commit -am "custom message here explaining the changes"` saves the changes
  
  `git push` pushes the new commit/s to the remote origin


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
