// require all modules ending in ".spec.ts" from the
// current directory and all subdirectories
const testsContext = require.context('.', true, /\.spec\.ts$/);

testsContext.keys().forEach(testsContext);
