import { MetadataKeys } from "../utils/metadata";

export interface RouteOptions {
  prefix: string;
}

export function Route(options: RouteOptions): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(MetadataKeys.Route, options, target);
  };
}
