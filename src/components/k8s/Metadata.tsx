import { V1ObjectMeta } from "@kubernetes/client-node";
import { For } from "solid-js";

export interface InnerMetadataProps {
    creationTimestamp: string;
    generateName: string;
    labels: { [key: string]: string };
}

export interface MetadataProps {
    metadata: InnerMetadataProps;
}

export function Metadata(props: InnerMetadataProps) {
    return (
        <div class="flex container">
            <div class="flex flex-row">
                <div class="flex flex-col pr-2 bg-blue-300">Metadata</div>
                <div class="flex flex-col pr-2 bg-red-300 text-black ">
                    Creation Timestamp
                </div>
                <div class="flex flex-col pr-2 bg-amber-300 text-black">
                    Generate Name
                </div>
            </div>
        </div>
    );
}

export function Metadata2(props: MetadataProps) {
    return (
        <div class="flex flex-col">
            <div class="flex flex-row mr-2">
                <h2 class="flex text-red-300">Metadata</h2>
                <h2 class="flex text-blue-300">Creation Timestamp</h2>
                <h2 class="flex text-blue-300">Generate Name</h2>
            </div>
            <div class="flex flex-row mr-2">
                <pre>Fields: </pre>
                <pre>{props.metadata.creationTimestamp}</pre>
                <pre>{props.metadata.generateName}</pre>
            </div>
            <div class="flex flex-row mr-2">Labels:</div>
            <For each={Object.entries(props.metadata.labels)}>
                {(item) => (
                    <div class="flex-row">
                        <strong>{item}</strong>
                    </div>
                )}
            </For>
        </div>
    );
}
