# Sandra Kaminski Website

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