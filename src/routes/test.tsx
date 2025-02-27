import { createResource, For } from "solid-js";
import { k8sApi } from "~/lib/k8s";
import { Metadata } from "~/components/k8s/Metadata";

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
    const [pods, { mutate, refetch }] = createResource(getK8sResources);

    return (
        <>
            <h1 class="italic">Kubernetes Attributes</h1>
            <p>Pulled directly from k8s API</p>
            {/* <pre>{JSON.stringify(pods(), null, 2)}</pre> */}
            {pods() && (
                <For each={pods()!.items}>
                    {(item) => (
                        <Metadata
                            metadata={{
                                creationTimestamp:
                                    item.metadata?.creationTimestamp!.toISOString()!,
                                generateName: item.metadata?.generateName!,
                                labels: item.metadata?.labels!,
                            }}
                        />
                    )}
                </For>
            )}
            {pods() && <pre>{JSON.stringify(pods(), null, 2)}</pre>}
        </>
    );
}
