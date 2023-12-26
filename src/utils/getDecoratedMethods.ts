export function getDecoratedMethods(prototype: Record<string, any>) {
  return Object.getOwnPropertyNames(prototype).filter(
    (name) =>
      typeof prototype[name] === "function" &&
      Reflect.hasMetadata("design:returntype", prototype, name)
  );
}
