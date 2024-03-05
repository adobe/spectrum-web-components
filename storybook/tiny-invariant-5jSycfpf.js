import { i as init_define_process_env_NODE_PATH } from './chunk-Y45DR3KI-1BKxHGlv.js';

// node_modules/tiny-invariant/dist/esm/tiny-invariant.js
init_define_process_env_NODE_PATH();
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  {
    throw new Error(prefix);
  }
}

export { invariant as i };
