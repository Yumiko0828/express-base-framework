import { Handler } from "express";

export function UseMiddleware(mw: Handler): MethodDecorator {
  return function (
    target: Object,
    name: string | symbol,
    _descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata("middleware:metadata", mw, target, name);
  };
}
