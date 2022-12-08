# Sandra Kaminski Website

This project is an ecommerce site using Contentful for content management, with a  Vite-React frontend using Typescript, and netlify for hosting. Stripe payments are processed via the netlify functions directory using golang. The site is broken down into content types which are assembled in contentful via assembly, each component for content types can be found under the `blocks` directory. Custom pages which don't rely on contentful are found under the `views` directory. 
The shopping cart and add to cart function is organised in a context provider, using localstorage to hold the state, the information is taken from the Products entry in contentful, and the product ID is matched with stripe products to charge the client accordingly in the payment netlfy function. 

## Getting started: 
- Run `yarn` to install all dependencies
- `yarn dev` to start the project, this can be found under port `5173` 

## Netlify

To run Netlify (including Go functions) locally, install the Netlify CLI:

```bash
npm install netlify-cli -g

netlify login
```

Once configured, run the web app using `yarn ndev` command instead of `yarn dev`:

```bash
yarn ndev
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