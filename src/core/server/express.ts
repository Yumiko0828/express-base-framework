import express, { Express } from "express";
import { MetadataKeys, getMetadata } from "../../utils/metadata";
import { ModuleOptions } from "../../decorators/Module";
import { routing } from "./routing";

export function Instance(module: Object): Express {
  const data = getMetadata<ModuleOptions>(MetadataKeys.Module, module);

  const app = express();

  // Routing
  const routes = routing(data.routes);

  for (const route of routes) {
    app.use(route);
  }

  if (data.errorHandler) {
    app.use(data.errorHandler);
  }

  app.once("ready", (port) => {
    console.log(`Server ready at: http://localhost:${port}`);
  });

  return app;
}
