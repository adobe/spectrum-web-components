import { x } from './lit-html-COgVUehj.js';

var styles_stories = {
  title: "Styles"
};
const dividers = () => x`
    <style>
        .app-dividers {
            display: grid;
            position: absolute;
            inset: 0;
            grid-template-areas:
                'header header header'
                'toolbar main properties';
            grid-template-columns: 50px 1fr 250px;
            grid-template-rows: 50px 1fr;
            gap: var(--spectrum-global-alias-appframe-border-size);
            background: var(--spectrum-background-base-color);
        }
        header,
        aside {
            background: var(--spectrum-background-layer-1-color);
        }
        header {
            grid-area: header;
        }
        header + aside {
            grid-area: toolbar;
        }
        main {
            grid-area: main;
            background: var(--spectrum-background-layer-2-color);
        }
        main + aside {
            grid-area: properties;
        }
    </style>
    <div class="app-dividers">
        <header></header>
        <aside></aside>
        <main></main>
        <aside></aside>
    </div>
`;
const __namedExportsOrder = ['dividers'];

export { __namedExportsOrder, styles_stories as default, dividers };
