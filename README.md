# technopedia-search

## Build setup

Two environment variables are needed to store the user and key to the Technopedia API:

- API_USER
- API_KEY

The simplest way to create these locally in dev is to create a file called `.env` in the project root folder and add them to it.

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deployment

GitHub actions are configured to deploy on each PR and merge to master.

Or you can manually generate the static site locally and deploy it:

```bash
npm run generate
firebase deploy
```