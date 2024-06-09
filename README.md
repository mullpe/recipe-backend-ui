# UI for Zerops recipes
Small Angular application running on **Zerops static apps service**. Includes file upload used to showcase functionality of various Zerops framework recipes (example apps).

Can be added to existing project using "Import service to project" with following YAML.

```yaml
services:
  - hostname: app
    type: static
    buildFromGit: https://github.com/zeropsio/recipe-backend-ui
    enableSubdomainAccess: true
```

### Used in recipes
- [Zerops x Nest.js](https://github.com/zeropsio/recipe-nestjs)
- [Zerops x Django](https://github.com/zeropsio/recipe-django)
