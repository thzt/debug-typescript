## debug-typescript

用户调试 TypeScript 源码的 VSCode 配置。

- - -

### 使用说明

#### 1. 克隆 TypeScript 源码仓库，并构建

```
$ git clone https://github.com/microsoft/TypeScript.git
$ cd TypeScript
$ git checkout v3.7.3
```

```
$ npm i
$ node node_modules/.bin/gulp LKG
```

关于 `gulp LKG`，可参考 [TypeScript/lib/README.md](https://github.com/microsoft/TypeScript/blob/v3.7.3/lib/README.md)。

#### 2. 复制配置

在本仓库根目录下，执行以下命令，
```
$ npm i
$ DEBUG=debug-typescript* node src/install.js {TypeScriptRoot}
```
其中，`{TypeScriptRoot}` 为 TypeScript 源码根目录绝对地址。  
  
执行过程中，会把 `src/file/` 中的下列文件，拷贝到 `{TypeScriptRoot}` 中，
```
.vscode/launch.json
bin/tsc
bin/tsserver
debug/index.ts
debug-tsserver_client/.vscode/launch.json
debug-tsserver_client/index.js
```
还会修改 TypeScript 源码中的 package.json，加入一个 `debug` script。

#### 3. 调试

（1）调试 tsc
+ VSCode 打开 TypeScript 根目录  
选择 `debug tsc` 进行调试

（2）调试 tsserver
+ 一个 VSCode 实例打开 `{TypeScriptRoot}/debug-tsserver_client/`  
选择 `debug tsserver: client` 启动调试  

+ 一个 VSCode 实例打开 `{TypeScriptRoot}`  
选择 `attach to tsserver` 调试 tsserver 子进程  

- - -

### 参考

[淡如止水 TypeScript](https://www.yuque.com/thzt/typescript)
