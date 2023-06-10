import { Job, Pipeline } from "https://deno.land/x/cicada@v0.1.50/mod.ts";

import { InstallJob } from "./shared/install.ts";

const BuildJob = new Job({
  name: "Install",
  image: "node",
  dependsOn: [InstallJob],
  steps: [
    {
      name: "Run build",
      run: "yarn build",
      cacheDirectories: ["node_modules", "dist"],
    },
  ],
});

export default new Pipeline([InstallJob, BuildJob], {
  name: "Build",
  on: {
    pullRequest: ["main"],
    push: ["main"],
  },
});
