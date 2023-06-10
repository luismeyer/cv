import { Job, Pipeline } from "https://deno.land/x/cicada@v0.1.50/mod.ts";

import { InstallJob } from "./shared/install.ts";

const LintJob = new Job({
  name: "Lint",
  image: "node",
  dependsOn: [InstallJob],
  steps: [
    {
      name: "Run Lint",
      run: "yarn lint",
      cacheDirectories: ["node_modules"],
    },
  ],
});

export default new Pipeline([InstallJob, LintJob], {
  name: "Lint",
  on: {
    pullRequest: ["main"],
    push: ["main"],
  },
});
