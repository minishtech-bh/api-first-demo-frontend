import { defineConfig } from "orval";

const specDir = "./contract/tsp-output/@typespec/openapi3";

export default defineConfig({
  app: {
    input: `${specDir}/TodoDemo.PointManagement.App.yaml`,
    output: {
      target: "src/api/app.ts",
      client: "react-query",
      httpClient: "axios",
    },
  },
  adminPartner: {
    input: `${specDir}/TodoDemo.PointManagement.Admin.Partner.yaml`,
    output: {
      target: "src/api/admin-partner.ts",
      client: "react-query",
      httpClient: "axios",
    },
  },
  adminPlatform: {
    input: `${specDir}/TodoDemo.PointManagement.Admin.Platform.yaml`,
    output: {
      target: "src/api/admin-platform.ts",
      client: "react-query",
      httpClient: "axios",
    },
  },
});
