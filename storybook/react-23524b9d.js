import { r as react_default } from './DocsRenderer-NNNQARDV-56cbea69.js';
import { i as init_define_process_env_NODE_PATH } from './chunk-4XTOY3BZ-2d9ac4e7.js';
import './index-f1f4f800.js';
import './index-a1e16c32.js';
import './chunk-QKGAIYDF-dbf583e3.js';

// node_modules/@mdx-js/react/index.js
init_define_process_env_NODE_PATH();

// node_modules/@mdx-js/react/lib/index.js
init_define_process_env_NODE_PATH();
var MDXContext = react_default.createContext({});
function useMDXComponents(components) {
  const contextComponents = react_default.useContext(MDXContext);
  return react_default.useMemo(() => {
    if (typeof components === "function") {
      return components(contextComponents);
    }
    return { ...contextComponents, ...components };
  }, [contextComponents, components]);
}
var emptyObject = {};
function MDXProvider({ components, children, disableParentContext }) {
  let allComponents;
  if (disableParentContext) {
    allComponents = typeof components === "function" ? components({}) : components || emptyObject;
  } else {
    allComponents = useMDXComponents(components);
  }
  return react_default.createElement(
    MDXContext.Provider,
    { value: allComponents },
    children
  );
}

export { MDXContext, MDXProvider, useMDXComponents };
