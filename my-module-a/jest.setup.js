const { K8s, kind } = require("kubernetes-fluent-client");

module.exports = async () => {
  await K8s(kind.Namespace).Apply({
    metadata: {
      name: "module-a-validate",
      labels: {
        "istio-injection": "disabled",
        "zarf.dev/agent": "ignore",
      },
    },
  });
}