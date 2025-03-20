# pepr-examples

### Description

These examples show running two different pepr modules in the same cluster, alongside the pepr module that comes with UDS Core. The two modules are:

| Module     | Description     |
| ------------- | ------------- |
| my-module-a | Rejects Configmaps with the `evil-a` annotation in the `my-module-a` namespace. |
| my-module-b | Rejects Configmaps with the `evil-b` annotation in the `my-module-b` namespace. |

### Building and Testing

To build and test these modules locally, you need to have k3d, npm and uds cli. A `tasks.yaml` is included with commands to build and test.

Run commands using `uds run`

| Command     | Description     |
| ------------- | ------------- |
| cluster | Sets up a new uds cluster using uds package `k3d-core-slim-dev`  |
| rebuild | Cleans, builds, and deploys both modules to the cluster. Modules build as two different zarf packages using `npx pepr build -z chart` from each one |
| test | Applys test yamls to demonstrate functionality is working as expected |
| all | Runs `cluster`, `rebuild`, and `test` in order |

Check out this repo and run `uds run all` to fully demonstrate. The cluster takes

Output should contain messages from both modules and tests should pass because the modules are rejecting the undesired configmaps:

```
     namespace/module-a-validate unchanged                                                                            
     Error from server: error when creating "tests/module-a-fail.yaml": admission webhook "pepr-my-module-a.pepr.dev" denied the request: Module A says: No evil-a CM annotations allowed.
  ✔  Completed "./uds zarf tools kubectl apply -f tests/module-a-fail.yam..."                                         
     namespace/module-b-validate unchanged                                                                            
     Error from server: error when creating "tests/module-b-fail.yaml": admission webhook "pepr-my-module-b.pepr.dev" denied the request: Module B says: No evil-b CM annotations allowed.
  ✔  Completed "./uds zarf tools kubectl apply -f tests/module-b-fail.yam..."        
```

You can also use `uds monitor pepr` to see pepr events from the cluster.

Example:

```
> uds monitor pepr denied -t

2025-03-20T14:34:18.925900417Z   ✗ DENIED    module-b-validate/example-evil-cm-fail                                                                                             
                                             Module B says: No evil-b CM annotations allowed.

2025-03-20T14:34:18.784363001Z   ✗ DENIED    module-a-validate/example-evil-cm-fail                                                                                             
                                             Module A says: No evil-a CM annotations allowed.
```