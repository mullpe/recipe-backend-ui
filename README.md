# UI for Zerops recipes
Small Angular application with file upload used to showcase functionality of Zerops framework recipes (example apps).

Can be added to existing project using "Import service to project" with following YAML.

```
services:
  - hostname: app
    type: static
    buildFromGit: https://github.com/zeropsio/recipe-backend-ui
    enableSubdomainAccess: true
```

### Used in recipes
- [Zerops x Nest.js](https://github.com/zeropsio/recipe-nestjs)
- [Zerops x Django](https://github.com/zeropsio/recipe-django)
