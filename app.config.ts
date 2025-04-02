import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
    vite: {
        server: {
            allowedHosts: ["solid.deosil.minikube"],
        },
    },
});
