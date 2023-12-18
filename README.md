# OpenAPI API Client Generation and Compilation

Generate an API client from an OpenAPI schema in YAML format and create a rtk-query api client. This package streamlines this process and ensures a smooth workflow.

## Dependencies

1. **Node.js and npm:** Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

## Installation

```bash
  npm install @layer5/rtk-query-codegen
```

## Usage

Run the script using the following command:

```bash
rtk-query-codegen -i /path/to/schema.yml -o /path/to/generated-api.js -c /path/to/codegen-config.json
```

## Config File Options

### Simple usage

```
 {
  apiFile: string
  schemaFile: string
  apiImport?: string
  exportName?: string
  argSuffix?: string
  responseSuffix?: string
  hooks?:
    | boolean
    | { queries: boolean; lazyQueries: boolean; mutations: boolean }
  tag?: boolean
  outputFile: string
  filterEndpoints?:
    | string
    | RegExp
    | EndpointMatcherFunction
    | Array<string | RegExp | EndpointMatcherFunction>
  endpointOverrides?: EndpointOverrides[]
  flattenArg?: boolean
}
```

### Filtering endpoints

If you only want to include a few endpoints, you can use the `filterEndpoints` config option to filter your endpoints.

```
 {
  // ...
  // should only have endpoints loginUser, placeOrder, getOrderById, deleteOrder
  filterEndpoints: ['loginUser', /Order/],
}
```

### Endpoint overrides

If an endpoint is generated as a mutation instead of a query or the other way round, you can override that.

```
{
  // ...
  "endpointOverrides": [
    {
      "pattern": "loginUser",
      "type": "mutation"
    }
  ]
}
```

### Generating hooks

Setting `hooks: true` will generate `useQuery` and `useMutation` hook exports. If you also want `useLazyQuery` hooks generated or more granular control, you can also pass an object in the shape of: `{ queries: boolean; lazyQueries: boolean; mutations: boolean }`.

### Multiple output files

```

  schemaFile: 'https://petstore3.swagger.io/api/v3/openapi.json',
  apiFile: './src/store/emptyApi.ts',
  outputFiles: {
    './src/store/user.ts': {
      filterEndpoints: [/user/i],
    },
    './src/store/order.ts': {
      filterEndpoints: [/order/i],
    },
    './src/store/pet.ts': {
      filterEndpoints: [/pet/i],
    },
  },
}
```

## The Api.js file

The api.js file contains the generated api endpoints , it injects them into the base rtk client . And then exports all the hooks to use them .
If we need to override an api endpoint we can injectEnpoints in a separate file .

## Troubleshooting

- If any of the steps fail, the script will exit with a non-zero status code, indicating a failure. Review the error messages to diagnose and resolve any issues.

- Ensure that the Bash script is executable by running `chmod +x generate-api.sh`.

## Important Notes

- Make sure the OpenAPI schema (`schema.yml`) is updated with latest changes and doesnt contain any breaking changes .

- Always validate and test the generated API client to ensure it functions as expected.

<div>&nbsp;</div>

## Join the Layer5 community!

<a name="contributing"></a><a name="community"></a>
Our projects are community-built and welcome collaboration. 👍 Be sure to see the <a href="https://docs.google.com/document/d/17OPtDE_rdnPQxmk2Kauhm3GwXF1R5dZ3Cj8qZLKdo5E/edit">Layer5 Community Welcome Guide</a> for a tour of resources available to you and jump into our <a href="http://slack.layer5.io">Slack</a>!

<p style="clear:both;">
<a href ="https://layer5.io/community/meshmates"><img alt="MeshMates" src=".github/readme/images/layer5-community-sign.png" style="margin-right:10px; margin-bottom:15px;" width="28%" align="left"/></a>
<h3>Find your MeshMate</h3>

<p>MeshMates are experienced Layer5 community members, who will help you learn your way around, discover live projects and expand your community network. 
Become a <b>Meshtee</b> today!</p>

Find out more on the <a href="https://layer5.io/community">Layer5 community</a>. <br />
<br /><br /><br /><br />

</p>

<div>&nbsp;</div>

<a href="https://slack.meshery.io">

<picture align="right">
  <source media="(prefers-color-scheme: dark)" srcset=".github/readme/images//slack-dark-128.png"  width="110px" align="right" style="margin-left:10px;margin-top:10px;">
  <source media="(prefers-color-scheme: light)" srcset=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:5px;">
  <img alt="Shows an illustrated light mode meshery logo in light color mode and a dark mode meshery logo dark color mode." src=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:13px;">
</picture>
</a>

<a href="https://meshery.io/community"><img alt="Layer5 Community" src=".github/readme/images//community.svg" style="margin-right:8px;padding-top:5px;" width="140px" align="left" /></a>

<p>
✔️ <em><strong>Join</strong></em> any or all of the weekly meetings on <a href="https://calendar.google.com/calendar/b/1?cid=bGF5ZXI1LmlvX2VoMmFhOWRwZjFnNDBlbHZvYzc2MmpucGhzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20">community calendar</a>.<br />
✔️ <em><strong>Watch</strong></em> community <a href="https://www.youtube.com/playlist?list=PL3A-A6hPO2IMPPqVjuzgqNU5xwnFFn3n0">meeting recordings</a>.<br />
✔️ <em><strong>Access</strong></em> the <a href="https://drive.google.com/drive/u/4/folders/0ABH8aabN4WAKUk9PVA">Community Drive</a> by completing a community <a href="https://layer5.io/newcomer">Member Form</a>.<br />
✔️ <em><strong>Discuss</strong></em> in the <a href="https://discuss.layer5.io">Community Forum</a>.<br />
✔️<em><strong>Explore more</strong></em> in the <a href="https://layer5.io/community/handbook">Community Handbook</a>.<br />
</p>
<p align="center">
<i>Not sure where to start?</i> Grab an open issue with the <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+org%3Alayer5io+org%3Ameshery+org%3Aservice-mesh-performance+org%3Aservice-mesh-patterns+label%3A%22help+wanted%22+">help-wanted label</a>.</p>
