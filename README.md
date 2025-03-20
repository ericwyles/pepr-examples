# pepr-examples

### Description

These examples show running two different pepr modules in the same cluster, alongside the pepr module that comes with UDS Core. The two modules are:

- **my-module-a** -- checks for new configmaps containing the `evil-a` annotation in the `my-module-a` namespace and rejects them
- **my-module-b** -- checks for new configmaps containing the `evil-b` annotation in the `my-module-b` namespace and rejects them

### Building and Testing

To build these modules you need to have npm and uds cli. A `tasks.yaml` is included with commands to build and test.

| Command     | Description     |
| ------------- | ------------- |
| uds run cluster | Sets up a new uds cluster using uds package `k3d-core-slim-dev`  |
| uds run rebuild | Cleans, builds, and deploys both modules to the cluster. Modules build as two different zarf packages using `npx pepr build -z chart` from each one |
| uds run test | Applys test yamls to demonstrate functionality is working as expected |
| uds run all | Runs `cluster`, `rebuild`, and `test` in order |

