// Custom require function to handle react-native-safe-area-context
// This is used by webpack's ProvidePlugin to replace bare require() calls

const safeAreaContextStub = require('./safe-area-context-stub.js');

function customRequire(moduleName) {
  if (moduleName === 'react-native-safe-area-context') {
    return safeAreaContextStub;
  }

  // For other modules, throw an error since they shouldn't be using bare require
  throw new Error(`Module "${moduleName}" cannot be required at runtime in the browser`);
}

export default customRequire;
