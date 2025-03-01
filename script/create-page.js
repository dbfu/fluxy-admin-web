/* eslint-disable no-undef */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
function firstCharToUpperCase(str) {
  return str[0].toUpperCase() + str.substring(1);
}

// 获取当前模块的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块所在的目录路径
const __dirname = dirname(__filename);

const [moduleName] = process.argv.slice(2, 3);

if (moduleName.includes('.')) {
  console.log('模块名称不能包含特殊字符');
  process.exit();
}

if (!moduleName) {
  console.log('请输入模块名称');
  process.exit();
}


if (!fs.existsSync(path.resolve(__dirname, `../src/pages/${moduleName}`))) {
  fs.mkdirSync(path.resolve(__dirname, `../src/pages/${moduleName}`));
}


let indexContent = fs
  .readFileSync(path.resolve(__dirname, './template/index.template'))
  .toString();

let formContent = fs
  .readFileSync(path.resolve(__dirname, './template/new-edit-form.template'))
  .toString();

let name;
let varName = moduleName;

if (moduleName.includes('-')) {
  name = moduleName
    .split('-')
    .map(o => firstCharToUpperCase(o))
    .join('');

  varName = moduleName
    .split('-')
    .filter((_, index) => index > 0)
    .map(o => firstCharToUpperCase(o))
    .join('');
  varName = [moduleName.split('-')[0], varName].join('');

} else {
  name = moduleName[0].toUpperCase() + moduleName.substring(1);
}

indexContent = indexContent
  .replace(/\$1/g, name)
  .replace(/\$2/g, varName);

formContent = formContent
  .replace(/\$1/g, name)
  .replace(/\$2/g, varName);

fs.writeFileSync(
  path.resolve(
    __dirname,
    `../src/pages/${moduleName}/index.tsx`
  ),
  indexContent
);

fs.writeFileSync(
  path.resolve(
    __dirname,
    `../src/pages/${moduleName}/new-edit-form.tsx`
  ),
  formContent
);

console.log('页面创建成功!');


