import { Job } from "https://deno.land/x/cicada@v0.1.50/mod.ts";

export const InstallJob = new Job({
  name: "Install",
  image: "node",
  steps: [
    {
      name: "Install Dependencies",
      run: "yarn",
      cacheDirectories: ["node_modules"],
    },
  ],
});
