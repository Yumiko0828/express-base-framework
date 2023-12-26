import { ErrorRequestHandler } from "express";
import { MetadataKeys } from "../utils/metadata";

export interface ModuleOptions {
  routes: Function[];
  errorHandler?: ErrorRequestHandler;
}

export function Module(options: ModuleOptions): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(MetadataKeys.Module, options, target);
  };
}
