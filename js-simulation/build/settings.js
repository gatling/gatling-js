import esbuildPluginTsc from 'esbuild-plugin-tsc';

export function createBuildSettings(options) {
    return {
        entryPoints: ['src/index.ts'],
        outfile: 'target/bundle.js',
        bundle: true,
        minify: false,
        sourcemap: true,
        format: "iife",
        globalName: "gatling",
        plugins: [
            esbuildPluginTsc({
                force: true
            }),
        ],
        ...options
    };
}
