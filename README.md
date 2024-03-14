# gatling-js-poc

## Using a private NPM registry on AWS CodeArtifact

Environment variables used in projects .npmrc (replace with the correct values):

```shell
export AWS_CODEARTIFACT_DOMAIN="mydomain"
export AWS_CODEARTIFACT_OWNER="000000000000"
export AWS_CODEARTIFACT_REGION="eu-west-3"
export NODE_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain "$AWS_CODEARTIFACT_DOMAIN" --domain-owner "$AWS_CODEARTIFACT_OWNER" --query authorizationToken --output text)
```
