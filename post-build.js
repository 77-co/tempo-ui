import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const distDir = "./dist";
readdirSync(distDir)
  .filter((f) => f.endsWith(".cjs.js") || f.endsWith(".esm.js"))
  .forEach((file) => {
    const path = join(distDir, file);
    const content = readFileSync(path, "utf8");
    writeFileSync(
      path,
      `/** Tempo UI, Copyright 2026 Maciej Gomoła, seventy7 and contributors. This code is licensed under the GNU General Public License v3.0. Learn more in LICENSE. */\n"use client";\n${content}`,
    );
  });
