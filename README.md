# Sandra Kaminski Website

This project is an ecommerce site using Contentful for contentEntry management, with a  Vite-React frontend using Typescript, and netlify for hosting. Stripe payments are processed via the netlify functions directory using golang. The site is broken down into contentEntry types which are assembled in contentEntryful via assembly, each component for contentEntry types can be found under the `blocks` directory. Custom pages which don't rely on contentEntryful are found under the `views` directory. 

The shopping cart and add to cart function is organised in a context provider, using localstorage to hold the state, the information is taken from the Products entry in contentEntryful, and the product ID is matched with stripe products to charge the client accordingly in the payment netlify function. 

Comments on articles, and reviews on shop items are serverside CRUD functions using mongoDB to hold the info. They can also be founf on the netlify functions directory. 

## Getting started: 
- Run `npm install` to install all dependencies
- `npm run dev` to start the project, this can be found under port `5173` 

## Netlify

To run Netlify (including Go functions) locally, install the Netlify CLI:

```bash
npm install netlify-cli -g

netlify login
```

Once configured, run the web app using `yarn ndev` command instead of `yarn dev`:

```bash
npm run ndev
```

Alternatively, using the `netlify` CLI:

```bash
netlify env:import functions/.env
netlify dev
```

For more commands and information, see:
    1. [Netlify CLI](https://cli.netlify.com/commands)
    2. [local Netlify development](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) for more detail.

### Go Functions

To add imports switch to the function directory (`/functions/<function>`) and run `go get github.com/xxx/xxx`. For example:

```bash
cd functions/registration

go get github.com/aws/aws-lambda-go/lambda
```

See [Build with Go](https://docs.netlify.com/functions/build-with-go/) for more detail.

### Configuring environment

```bash
netlify init
```

Netlify configuration can be found in `Library/Preferences/netlify/config.json`

## Unit testing 

This project uses Vitest to manage unit testing. Each content type has a unit test associated with it.

To run the tests enter `npm run test` in the command terminal