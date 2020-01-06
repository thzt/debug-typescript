const path = require('path');
const { spawn } = require('child_process');

// TypeScript 源码仓库根目录
const root = path.resolve('../');

const child = spawn('node', [
  // tsserver 调试端口号
  // 与 .vscode/launch.json [debug tsserver: server] 中的 port 保持一致
  '--inspect-brk=9002',
  path.join(root, 'bin/tsserver'),
]);

child.stdout.on('data', data => {
  console.log(data.toString());
});

child.on('close', code => {
  console.log(code);
});

const filePath = path.join(root, 'debug/index.ts');

const openFile = {
  seq: 0,
  type: 'request',
  command: 'open',
  arguments: {
    file: filePath,
  }
};
const getQuickInfo = {
  seq: 1,
  type: 'request',
  command: 'quickinfo',
  arguments: {
    file: filePath,
    line: 1,
    offset: 7
  }
};

child.stdin.write(`${JSON.stringify(openFile)}\n`);
child.stdin.write(`${JSON.stringify(getQuickInfo)}\n`);
