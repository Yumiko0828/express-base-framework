import { Handler } from "express";
import { MetadataKeys } from "../utils/metadata";

export type Methods = "GET" | "POST" | "PUT" | "DELETE";
export interface MethodOptions {
  afterHandler?: Handler[];
  beforeHandler?: Handler[];
}
export interface MethodMetadata {
  path: string;
  method: Lowercase<Methods>;
  options?: MethodOptions;
}

export function Method(
  method: Methods,
  path: string,
  options?: MethodOptions
): MethodDecorator {
  return function (target, name) {
    Reflect.defineMetadata(
      MetadataKeys.Method,
      {
        path,
        method: method.toLowerCase(),
        options,
      },
      target,
      name
    );
  };
}
