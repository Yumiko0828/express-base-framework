import { Handler, Router } from "express";
import { getDecoratedMethods } from "../../utils/getDecoratedMethods";
import { MetadataKeys, getMetadata } from "../../utils/metadata";
import { RouteOptions } from "../../decorators/Route";
import { MethodMetadata } from "../../decorators/Method";

export function routing(routes: Function[]): Router[] {
  return routes.map((route) => {
    const router = Router();
    // @ts-ignore
    const routeHandler = new route();
    const { prefix } = getMetadata<RouteOptions>(MetadataKeys.Route, route);

    for (const endpoint of getDecoratedMethods(route.prototype)) {
      const { path, method, options }: MethodMetadata = Reflect.getOwnMetadata(
        MetadataKeys.Method,
        route.prototype,
        endpoint
      );

      const handler: Handler[] = options
        ? [
            ...(options.beforeHandler || []),
            routeHandler[endpoint],
            ...(options.afterHandler || []),
          ]
        : [routeHandler[endpoint]];

      router[method]([prefix, path].join(""), ...handler);
    }

    return router;
  });
}
