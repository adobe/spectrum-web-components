---
layout: using-swc-react.njk
title: 'Get started your react application: Spectrum Web Components'
displayName: Using swc-react
slug: getstarted-react-wrapper
---

# Using React Wrappers for Spectrum Web Components

swc-react is a collection of React wrapper components for the Spectrum Web Components (SWC) library, enabling you to use SWC in your React applications with ease. It relies on the [`@lit/react`](https://github.com/lit/lit/tree/main/packages/react) package to provide seamless integration between React and the SWC library.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Importing Components](#importing-components)
    - [Theming](#theming)
    - [Event Handling and Type Definitions](#event-handling-and-type-definitions)
3. [Using Next.js Wrapper Components](#using-next.js-wrapper-components)
4. [API Reference](#api-reference)
5. [FAQs](#faqs)
6. [Troubleshooting](#troubleshooting)
7. [Contributing](#contributing)

## Introduction

The swc-react wrapper library aims to make it easy for developers to use the Spectrum Web Components (SWC) library in their React applications. The SWC library provides a set of reusable Web Components built following the [Spectrum Design Language](https://spectrum.adobe.com/) guidelines. swc-react relies on the [`@lit/react`](https://github.com/lit/lit/tree/main/packages/react) package to provide React components that correspond to the Web Components in the SWC library.

With swc-react, developers can utilize SWC components in their React applications just like native React components, with added support for React synthetic events. However, the `onChange` synthetic event for form elements is an exception, and you can refer to this [GitHub issue](https://github.com/facebook/react/issues/19846) for more details.

## Getting Started

### Installation

To install an swc-react wrapper component, you can use either npm or yarn. The corresponding SWC component will automatically be installed as a dependency, eliminating the need for manual installation. It's worth noting that each swc-react wrapper component has the same version number as its corresponding SWC component. To determine the version of the underlying SWC component, simply check the version of the wrapper component.

```sh
npm install --save @swc-react/button
```

or

```sh
yarn add --save @swc-react/button
```

### Importing Components

To use an swc-react component, first import it into your React application. For example, to use the Button component, you would import it like this:

```jsx
import { Button } from '@swc-react/button';
```

You can then use the component in your JSX just like any other React component:

```jsx
import React from 'react';
import { Button } from '@swc-react/button';

function App() {
    return (
        <div>
            <Button onClick={() => alert('Button clicked!')}>Click me</Button>
        </div>
    );
}

export default App;
```

### Theming

To ensure that Spectrum Web Components render correctly in your application, all component usages must be wrapped inside a special `sp-theme` customer element. The corresponding swc-react wrapper component is `@swc-react/theme`, and the wrapper component name is Theme. The Theme component acts like a React Context component. Here's a complete code example:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@spectrum-web-components/theme/theme-light.js";
import '@spectrum-web-components/theme/express/theme-light.js';
import "@spectrum-web-components/theme/scale-medium.js";
import '@spectrum-web-components/theme/express/scale-medium.js';
import { Theme } from "@swc-react/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Theme system="spectrum" scale="medium" color="light">
      <App />
    </Theme>
  </React.StrictMode>
);
```

Please note that you'll need to import the appropriate theme and scale styles for your application.

### Event Handling and Type Definitions

For TypeScript projects, each react wrapper component re-exports the underlying SWC component's type definition as `${component-name}Type`. For instance, the @swc-react/button component re-exports its type definition as ButtonType. This approach encourages the use of strongly-typed event targets. Here's a code example:

```jsx
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Button, ButtonType } from '@swc-react/button';

function App() {
    const [count, setCount] = useState(0);
    const btnRef = useRef < ButtonType > null;
    useEffect(() => {
        console.log(count, btnRef.current);
    }, [count]);
    return (
        <div className="App">
            <Button
                variant="primary"
                ref={btnRef}
                onClick={(e: MouseEvent<ButtonType>) => {
                    console.log(e.currentTarget.variant);
                    console.log(e.currentTarget.size);
                    setCount((count) => count + 1);
                }}
            >
                Count is {count}
            </Button>
        </div>
    );
}

export default App;
```

## Using Next.js Wrapper Components

### Introduction to Next.js Wrappers

The Next.js component wrappers in `@swc-react/*` are specially designed for use with Next.js applications. These wrappers cater to Next.js's static content exports functionality, allowing for more streamlined and efficient integration. For detailed information on Next.js static exports, visit [Next.js documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).

### Usage

Using the Next.js wrapper is similar to the standard `@swc-react/*` wrapper components. The key difference lies in referencing a different file within the `@swc-react/*` wrapper package. Here's an example using the Button component:

```jsx
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@swc-react/button/next.js';
import { ButtonType } from '@swc-react/button';

function App() {
    const [count, setCount] = useState(0);
    return (
        <div className="App">
            <Button
                variant="primary"
                onClick={(e: MouseEvent<ButtonType>) => {
                    console.log(e.currentTarget.variant);
                    console.log(e.currentTarget.size);
                    setCount((count) => count + 1);
                }}
            >
                Count is {count}
            </Button>
        </div>
    );
}

export default App;
```

This example demonstrates the ease of integrating SWC components with Next.js. By simply changing the import path, you can leverage the power of Next.js's static export functionality alongside the rich UI components provided by SWC.

### Limitations

Currently, the Next.js wrappers in @swc-react/\* face a specific limitation:

1. The React useRef hook is incompatible with the Next.js wrapper. This issue stems from challenges in integrating React's ref mechanism with custom elements within the Next.js environment. For detailed insights and potential workarounds, refer to the discussions in [lit#2951](https://github.com/lit/lit/issues/2951) and [next.js#40769](https://github.com/vercel/next.js/issues/40769). It's advisable to explore these resources for understanding the limitations and identifying alternative approaches.

## API Reference

swc-react is a collection of wrapper components designed to make Spectrum Web Components (SWC) work like native React components in a React application. As these components serve as a bridge between React and SWC, their properties and event names are directly derived from the corresponding SWC components.

For detailed information on the properties and event names of each component, please refer to the official documentation for the corresponding SWC component. This will provide you with the most accurate and up-to-date information on the usage and behavior of each component within the SWC library.

## FAQs

**1. How many SWC components does swc-react support?**

Currently, swc-react supports a total of 62 SWC components. To install swc-react, simply replace the scope name "@spectrum-web-components" with "@swc-react" in the package naming convention. The sub package name remains identical to the original SWC component.

**2. Where is the source code of swc-react wrapper components?**

The code for all swc-react wrapper components is generated by machine. Rather than pushing the generated code to a Git repository, it is published directly to the public NPM registry. For more information on how the wrapper components are generated, please refer to the original [PR#2745](https://github.com/adobe/spectrum-web-components/pull/2745) for detail.

**3. How can I view the source of swc-react wrappers?**

To view the source of swc-react wrappers, first set up your local development environment for the spectrum-web-components repo. Then, run `yarn build:react`. Afterward, you can find all the wrapper components in the ./react folder.

**4. What is the release schedule of swc-react?**

Every time there is a successful release of the SWC library, it automatically triggers a release for the swc-react wrapper components. These corresponding components share the same version number as their SWC counterparts.

**5. Is the @lit/react library stable enough for production use, considering it's still a lab project?**

The @lit/react library has been in development for over three years. swc-react isn't the only project that relies on it; the next-generation [VMware Clarity component library](https://github.com/vmware-clarity) also uses it to integrate its core Lit-based Web Components with popular frameworks like React and Angular. For more details, you can check their [repository](https://github.com/vmware-clarity/core/tree/main/projects/react).

**6. Why was a custom code generator built instead of using the official Google Lit project code-gen tool, @lit-labs/gen-wrapper-react?**

The [@lit-labs/gen-wrapper-react](https://github.com/lit/lit/tree/main/packages/labs/gen-wrapper-react) project was evaluated, but it was unable to generate anything from SWC components. After examining its source code, I realized that it wasn't a good fit for SWC. This is because it heavily relies on some specific TypeScript annotations of Lit, whereas SWC extends Lit to build its own annotations. The official wrapper generation tool does not recognize these custom annotations, so nothing was generated. As a result, generating code from the custom-elements.json file was chosen, which has proven to be a more robust solution for SWC.

**7. Can I reference SWC custom elements with React Refs and then manipulate them?**

Yes, every swc-react wrapper component is wrapped using React.forwardRef. The returned ref will point to the SWC host custom element, allowing you to manipulate it as needed.

## Troubleshooting

**1. Error: "sp-xxx has already been used with this registry"**

If you encounter an error like "sp-xxx has already been used with this registry" in your browser console, it's likely due to having two different versions of the same SWC component on the same page. You should check your package.json and attempt to resolve the SWC component version conflict there. If, for some reason, you cannot avoid this issue, consider adding the string-replace-loader package to your project and including the following webpack parsing rule in your webpack configuration file. The core idea is to insert a small piece of JavaScript code into each of your SWC custom element registration code snippets, which registers the custom element name only if it doesn't already exist.

```javascript
webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
) => {
    config.module.rules.push({
        test: /\.(js)$/,
        loader: 'string-replace-loader',
        options: {
            search: /customElements\.define\("(.*?)"/,
            replace: (_match, p1) => {
                return `!customElements.get("${p1}")&&customElements.define("${p1}"`;
            },
            flags: 'g',
        },
    });
    return config;
};
```

If you're not using webpack, there should be alternative methods to achieve similar results.

**2. Unable to add event handler to an event listed in the SWC component documentation**

The generated wrapper code relies on metadata from the custom-elements.json file of each SWC component. To resolve this issue, please ensure that this file contains the necessary event information.

## Contributing

We welcome contributions to the swc-react project! If you have any ideas, suggestions, or bug reports, feel free to open an issue on the [GitHub repository](https://github.com/adobe/spectrum-web-components). We are particularly interested in contributions related to the following areas:

1. End-to-end tests that cover all the @swc-react components, ensuring their correct behavior and seamless integration with React Ecosystem.
2. An online playground for each of the @swc-react components, providing live examples and allowing users to experiment with different configurations. Once implemented, we would like to add a link to the playground in each of the SWC component documentation pages.

If you're interested in contributing code, please submit a pull request. Before submitting, please ensure that your changes adhere to the coding style and guidelines in place, and that you've added appropriate tests for your modifications.

For any questions or further information, you can always reach out to the community in the [GitHub Discussions](https://github.com/adobe/spectrum-web-components/discussions) section of the repository.

Thank you for your interest in making swc-react better!
