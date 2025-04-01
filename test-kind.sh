kind delete cluster --name test-kind-cluster
kind create cluster --name test-kind-cluster

kubectl rollout status deployment -n kube-system

kubectl apply -f test-request-limits.yaml
kubectl describe pod pod-no-request-cpu -n test-namespace
