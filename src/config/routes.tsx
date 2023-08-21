export const modules = import.meta.glob('../pages/**/index.tsx');

export const componentPaths = Object.keys(modules).map((path: string) => path.replace('../pages', ''));

export const components = Object.keys(modules).reduce<Record<string, () => Promise<any>>>((prev, path: string) => {
   // prev[path.replace('../pages', '')] = modules[path];
   prev[path.replace('../pages', '')] = async () => {
      console.log(modules, 'modules');
      console.log(modules[path + '132323'], '00000');
      try {
         const m = await modules[path + '132323']();
         console.log(m, 'm');
         return m;
      } catch {
         const manifest = await (await fetch('/manifest.json')).json() as any;
         console.log(path.replace('../pages', ''), 'path');
         console.log(manifest, 'manifest');
         console.log(manifest[path.replace('../pages', '')]?.file, 'manifest[path]?.file');
         const m = await import(manifest[path.replace('../pages', '')]?.file);
         console.log(m, 'm444');
         return m;
      }
   }
   return prev;
}, {});

console.log(components, 'components');

