import * as esbuild from 'esbuild';
import fs from 'node:fs';
import { createBuildSettings } from './settings.js';

const settings = createBuildSettings({ metafile: true });
const result = await esbuild.build(settings);
const mode = process.env.npm_config_mode;

if (mode === "write") {
    // with --mode=write
    fs.writeFileSync("build-meta.json", JSON.stringify(result.metafile))
} else {
    console.log(await esbuild.analyzeMetafile(result.metafile, {
        verbose: false,
    }));
}
