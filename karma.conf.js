const srcPattern = 'src/**/*.ts';
const khmerChessBase = 'node_modules/khmer-chess/src/**';
const k4usShareBase = 'node_modules/k4us-share/**';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      { pattern: `${k4usShareBase}/*.ts` },
      { pattern: `${khmerChessBase}/*.ts` },
      { pattern: srcPattern },
    ],
    exclude: [
      `${khmerChessBase}/*.Spec.ts`,
      `${khmerChessBase}/*.test.ts`,
      `${k4usShareBase}/*.Spec.ts`,
      `${k4usShareBase}/*.test.ts`,
    ],
    preprocessors: {
      [srcPattern]: ['karma-typescript'],
      [`${khmerChessBase}/*.ts`]: ['karma-typescript'],
      [`${k4usShareBase}/*.ts`]: ['karma-typescript'],
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.test.json',
    }
  })
}
