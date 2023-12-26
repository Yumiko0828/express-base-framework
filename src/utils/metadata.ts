export enum MetadataKeys {
  Route = "route:metadata",
  Module = "module:metadata",
  Method = "method:metadata",
  Param = "param:metadata",
}

export function getMetadata<T>(key: MetadataKeys, target: Object): T {
  return Reflect.getMetadata(key, target);
}
