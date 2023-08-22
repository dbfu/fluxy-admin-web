export const modules = import.meta.glob('../pages/**/index.tsx');

export const componentPaths = Object.keys(modules).map((path: string) => path.replace('../pages', ''));

let manifest: any;

export const components = Object.keys(modules).reduce<Record<string, () => Promise<any>>>((prev, path: string) => {
   const formatPath = path.replace('../pages', '');
   prev[formatPath] = async () => {
      try {
         // 这里其实就是动态加载js，如果报错了说明js资源不存在
         return await modules[path]() as any;
      } catch {
         // 如果manifest已经存在了，就不用再请求了
         if (manifest) {
            try {
               // 有可能manifest是过期的，所以可能还会加载失败
               return await import('/' + manifest[`src/pages${formatPath}`]?.file);
            } catch {
               // 如果失败，重新获取一下manifest.json，拿到最新的路径
               manifest = await (await fetch('/manifest.json')).json() as any;
               return await import('/' + manifest[`src/pages${formatPath}`]?.file);
            }
         } else {
            // 如果manifest.json为空，请求manifest.json，并根据最新的路径加载对应js
            manifest = await (await fetch('/manifest.json')).json() as any;
            return await import('/' + manifest[`src/pages${formatPath}`]?.file);
         }
      }
   }
   return prev;
}, {});

