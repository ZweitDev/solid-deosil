import * as k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
//kc.loadFromCluster();
kc.loadFromDefault();

export const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
