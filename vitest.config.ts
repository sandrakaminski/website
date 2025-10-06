import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
    test: {
        globals: true,
        environment: "happy-dom",
        // include: ["test/*.test.ts", "test/**/*.test.tsx", "test/**/*.test.ts"],
        coverage: {
            provider: "v8",
            exclude: ["node_modules", "test", "src/App.tsx", "src/main.tsx", "src/theme", "src/hooks/index.ts", "src/Viewport/icons", "src/Tracker.tsx"],
            include: ["src"],
            reporter: ["text", "lcov"],
        }
    }
});