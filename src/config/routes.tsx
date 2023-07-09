export const modules = import.meta.glob('../pages/**/index.tsx');

export const componentPaths = Object.keys(modules).map((path: string) => path.replace('../pages', ''));

export const components = Object.keys(modules).reduce<Record<string, () => Promise<any>>>((prev, path: string) => {
   prev[path.replace('../pages', '')] = modules[path];
   return prev;
}, {});
