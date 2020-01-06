const fs = require('fs');
const path = require('path');
const run = require('runscript');
const log = require('debug')('debug-typescript');

// typeScriptRootPath: TypeScript 源码仓库根目录地址
const [, , typeScriptRootPath] = process.argv;

// 待拷贝 VSCode 配置目录地址
const vscodeConfigDir = path.join(__dirname, 'file');

const main = async () => {
  log('将 VSCode 调试配置拷贝到 TypeScript 源码仓库根目录');
  await copyVSCodeFiles();

  log('修改 TypeScript 源码 package.json 文件');
  await modifyPackageJson();

  log('操作成功');
};

const copyVSCodeFiles = async () => {
  const files = [
    // 启动调试 tsc
    '.vscode/launch.json',

    // 修改 tsc 和 tsserver 调用 gulp 产物
    'bin/tsc',
    'bin/tsserver',

    // 待 tsc 编译的源文件
    'debug/index.ts',

    // 调试 tsserver 的客户端配置
    'debug-tsserver_client/.vscode/launch.json',
    'debug-tsserver_client/index.js',
  ];

  for (const file of files) {
    const sourceFilePath = path.join(vscodeConfigDir, file);
    const targetFilePath = path.join(typeScriptRootPath, file);

    log('拷贝文件到：%s', targetFilePath);
    await copyFile(sourceFilePath, targetFilePath);
  }
};

const modifyPackageJson = async () => {
  const typeScriptPackageJsonFile = path.join(typeScriptRootPath, 'package.json');
  const typeScriptPackageJsonContent = fs.readFileSync(typeScriptPackageJsonFile, 'utf-8');
  const typeScriptPackageJson = JSON.parse(typeScriptPackageJsonContent);

  const hasDebugScript = typeScriptPackageJson.scripts.debug;
  if (hasDebugScript) {
    log('已修改过 package.json，无需再次修改');
    return;
  }

  const packageJsonFile = path.join(vscodeConfigDir, 'package.json');
  const packageJsonContent = fs.readFileSync(packageJsonFile, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);

  // scripts 中添加一行
  log('向 %s 中添加 debug scripts', typeScriptPackageJsonFile);
  const lines = typeScriptPackageJsonContent.split('\n');
  lines.splice(104, 0, `        "debug": "${packageJson.scripts.debug}",`);

  // 写回去
  fs.writeFileSync(typeScriptPackageJsonFile, lines.join('\n'), 'utf-8');
};

const copyFile = async (sourceFilePath, targetFilePath) => {
  // 目的文件所在文件夹
  const targetDir = path.dirname(targetFilePath);

  // 确保目的文件夹存在
  await run(`mkdir -p ${targetDir}`);

  // 强制复制文件
  await run(`cp -rf ${sourceFilePath} ${targetFilePath}`);
};

main();
