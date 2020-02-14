const path = require('path');

const root = path.resolve('./');
const typescript = path.join(root, './lib/typescript.js');
const watchFilePath = path.join(root, './debug/index.ts');

const ts = require(typescript);

const reportDiagnostic = (...args) => {
  args;
};
const reportWatchStatus = (...args) => {
  args;
};

const rootFiles = [watchFilePath];
const options = {};

const host = ts.createWatchCompilerHost(
  rootFiles,
  options,
  ts.sys,
  ts.createEmitAndSemanticDiagnosticsBuilderProgram,
  reportDiagnostic,
  reportWatchStatus,
);

const watchProgram = ts.createWatchProgram(host);
watchProgram;
