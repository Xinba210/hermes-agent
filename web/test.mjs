import { cpSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

console.log("Starting diagnostic run...");
try {
  const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  console.log("webRoot:", webRoot);
  const uiDist = resolve(webRoot, "node_modules", "@nous-research", "ui", "dist");
  console.log("uiDist:", uiDist);

  const targets = [
    { from: resolve(uiDist, "fonts"), to: resolve(webRoot, "public", "fonts") },
    { from: resolve(uiDist, "assets"), to: resolve(webRoot, "public", "ds-assets") },
  ];

  for (const { from, to } of targets) {
    console.log(`Processing from: ${from} -> to: ${to}`);
    console.log("Removing target dir...");
    rmSync(to, { recursive: true, force: true });
    console.log("Copying from source dir...");
    cpSync(from, to, { recursive: true });
    console.log("Copy complete.");
  }
  console.log("Finished diagnostic run successfully!");
} catch (err) {
  console.error("DIAGNOSTIC ERROR ENCOUNTERED:");
  console.error(err);
  console.error("Error Stack:", err.stack);
}
