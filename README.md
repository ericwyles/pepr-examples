# pepr-examples

### Description

These examples show running two different pepr modules in the same cluster, alongside the pepr module that comes with UDS Core. The two modules are:

| Module     | Description     |
| ------------- | ------------- |
| my-module-a | Rejects Configmaps with the `evil-a` annotation in the `my-module-a` namespace. |
| my-module-b | Rejects Configmaps with the `evil-b` annotation in the `my-module-b` namespace. |

### Building and Testing

To build these modules you need to have npm and uds cli. A `tasks.yaml` is included with commands to build and test.

Run commands using `uds run`

| Command     | Description     |
| ------------- | ------------- |
| cluster | Sets up a new uds cluster using uds package `k3d-core-slim-dev`  |
| rebuild | Cleans, builds, and deploys both modules to the cluster. Modules build as two different zarf packages using `npx pepr build -z chart` from each one |
| test | Applys test yamls to demonstrate functionality is working as expected |
| all | Runs `cluster`, `rebuild`, and `test` in order |

Checking out this repo and running `uds run all` should fully demonstrate!
