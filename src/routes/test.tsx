import { V1Pod } from "@kubernetes/client-node";
import { createResource } from "solid-js";
import { k8sApi } from "~/lib/k8s";

async function getK8sResources() {
    "use server";
    try {
        const response = await k8sApi.listNamespacedPod({
            namespace: "kube-system",
        });
        const newResponse = structuredClone(response);
        return newResponse;
    } catch (error) {
        console.error("Error fetching pods:", error);
        throw error; // Trigger the error boundary
    }
}

export default function Route() {
    const [pods, { mutate, refetch }] = createResource(async () => {
        return await getK8sResources();
    });

    return (
        <>
            <h1 class="text-red-300">Test</h1>
            <p>Data</p>
            <pre>{JSON.stringify(pods(), null, 2)}</pre>
        </>
    );
}
