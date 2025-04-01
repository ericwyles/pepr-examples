k3d cluster delete pepr-dev
k3d cluster create pepr-dev --k3s-arg '--debug@server:0' --wait

kubectl rollout status deployment -n kube-system

kubectl apply -f test-request-limits.yaml
kubectl describe pod pod-no-request-cpu -n test-namespace
