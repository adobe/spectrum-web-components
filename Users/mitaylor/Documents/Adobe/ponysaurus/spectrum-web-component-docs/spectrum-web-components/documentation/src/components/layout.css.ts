import { css } from 'lit-element';
const styles = css`
#app{width:100%;height:100%;display:flex;flex-direction:column}#side-nav{display:flex;flex:0 0 auto;padding:1.5em}#body{display:flex;flex-direction:row;flex:1 1 auto;padding-bottom:40px;background-color:var(--spectrum-global-color-gray-100);color:var(--spectrum-global-color-gray-800)}#body,#body #layout-content{position:relative;height:100%}#body #layout-content{width:100%;overflow:auto}#body #layout-content #page{padding:40px 52px 24px;max-width:1080px;margin-left:auto;margin-right:auto}
`;
export default styles;