(self.webpackChunkinctagram=self.webpackChunkinctagram||[]).push([[512],{"./src/stories/Header.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LoggedIn:()=>LoggedIn,LoggedOut:()=>LoggedOut,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_test__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/@storybook+test@8.5.2_storybook@8.5.2_prettier@3.4.2_/node_modules/@storybook/test/dist/index.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Example/Header",component:__webpack_require__("./src/stories/Header.tsx").Y,tags:["autodocs"],parameters:{layout:"fullscreen"},args:{onLogin:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_0__.fn)(),onLogout:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_0__.fn)(),onCreateAccount:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_0__.fn)()}},LoggedIn={args:{user:{name:"Jane Doe"}}},LoggedOut={},__namedExportsOrder=["LoggedIn","LoggedOut"];LoggedIn.parameters={...LoggedIn.parameters,docs:{...LoggedIn.parameters?.docs,source:{originalSource:"{\n  args: {\n    user: {\n      name: 'Jane Doe'\n    }\n  }\n}",...LoggedIn.parameters?.docs?.source}}},LoggedOut.parameters={...LoggedOut.parameters,docs:{...LoggedOut.parameters?.docs,source:{originalSource:"{}",...LoggedOut.parameters?.docs?.source}}}},"./src/stories/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$:()=>Button});var jsx_runtime=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.7_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-runtime.js"),style=__webpack_require__("./node_modules/.pnpm/styled-jsx@5.1.6_@babel+core@7.26.7_react@19.0.0/node_modules/styled-jsx/style.js"),style_default=__webpack_require__.n(style),injectStylesIntoStyleTag=(__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.7_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),stories_button=__webpack_require__("./node_modules/.pnpm/css-loader@6.11.0_webpack@5.97.1_esbuild@0.24.2_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.5.1_typescript@5.7.3_webpack@5.97.1_esbuild@0.24.2_/node_modules/postcss-loader/dist/cjs.js!./src/stories/button.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(stories_button.A,options);stories_button.A&&stories_button.A.locals&&stories_button.A.locals;const Button=({primary=!1,size="medium",backgroundColor,label,...props})=>{const mode=primary?"storybook-button--primary":"storybook-button--secondary";return(0,jsx_runtime.jsxs)("button",{type:"button",...props,className:style_default().dynamic([["6675b9302a0356ac",[backgroundColor]]])+" "+(props&&null!=props.className&&props.className||["storybook-button",`storybook-button--${size}`,mode].join(" ")||""),children:[label,(0,jsx_runtime.jsx)(style_default(),{id:"6675b9302a0356ac",dynamic:[backgroundColor],children:`button.__jsx-style-dynamic-selector{background-color:${backgroundColor}}`})]})};Button.__docgenInfo={description:"Primary UI component for user interaction",methods:[],displayName:"Button",props:{primary:{required:!1,tsType:{name:"boolean"},description:"Is this the principal call to action on the page?",defaultValue:{value:"false",computed:!1}},backgroundColor:{required:!1,tsType:{name:"string"},description:"What background color to use"},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"How large should the button be?",defaultValue:{value:"'medium'",computed:!1}},label:{required:!0,tsType:{name:"string"},description:"Button contents"},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional click handler"}}}},"./src/stories/Header.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Y:()=>Header});var jsx_runtime=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.7_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-runtime.js"),Button=(__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.7_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./src/stories/Button.tsx")),injectStylesIntoStyleTag=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.97.1_esbuild@0.24.2_/node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),header=__webpack_require__("./node_modules/.pnpm/css-loader@6.11.0_webpack@5.97.1_esbuild@0.24.2_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.5.1_typescript@5.7.3_webpack@5.97.1_esbuild@0.24.2_/node_modules/postcss-loader/dist/cjs.js!./src/stories/header.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(header.A,options);header.A&&header.A.locals&&header.A.locals;const Header=({user,onLogin,onLogout,onCreateAccount})=>(0,jsx_runtime.jsx)("header",{children:(0,jsx_runtime.jsxs)("div",{className:"storybook-header",children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("svg",{width:"32",height:"32",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",children:(0,jsx_runtime.jsxs)("g",{fill:"none",fillRule:"evenodd",children:[(0,jsx_runtime.jsx)("path",{d:"M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",fill:"#FFF"}),(0,jsx_runtime.jsx)("path",{d:"M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",fill:"#555AB9"}),(0,jsx_runtime.jsx)("path",{d:"M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",fill:"#91BAF8"})]})}),(0,jsx_runtime.jsx)("h1",{children:"Acme"})]}),(0,jsx_runtime.jsx)("div",{children:user?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)("span",{className:"welcome",children:["Welcome, ",(0,jsx_runtime.jsx)("b",{children:user.name}),"!"]}),(0,jsx_runtime.jsx)(Button.$,{size:"small",onClick:onLogout,label:"Log out"})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Button.$,{size:"small",onClick:onLogin,label:"Log in"}),(0,jsx_runtime.jsx)(Button.$,{primary:!0,size:"small",onClick:onCreateAccount,label:"Sign up"})]})})]})});Header.__docgenInfo={description:"",methods:[],displayName:"Header",props:{user:{required:!1,tsType:{name:"signature",type:"object",raw:"{\n  name: string;\n}",signature:{properties:[{key:"name",value:{name:"string",required:!0}}]}},description:""},onLogin:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onLogout:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCreateAccount:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}}},"./node_modules/.pnpm/css-loader@6.11.0_webpack@5.97.1_esbuild@0.24.2_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.5.1_typescript@5.7.3_webpack@5.97.1_esbuild@0.24.2_/node_modules/postcss-loader/dist/cjs.js!./src/stories/button.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/css-loader@6.11.0_webpack@5.97.1_esbuild@0.24.2_/node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/css-loader@6.11.0_webpack@5.97.1_esbuild@0.24.2_/node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".storybook-button {\n  display: inline-block;\n  cursor: pointer;\n  border: 0;\n  border-radius: 3em;\n  font-weight: 700;\n  line-height: 1;\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n.storybook-button--primary {\n  background-color: #555ab9;\n  color: white;\n}\n.storybook-button--secondary {\n  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;\n  background-color: transparent;\n  color: #333;\n}\n.storybook-button--small {\n  padding: 10px 16px;\n  font-size: 12px;\n}\n.storybook-button--medium {\n  padding: 11px 20px;\n  font-size: 14px;\n}\n.storybook-button--large {\n  padding: 12px 24px;\n  font-size: 16px;\n}\n","",{version:3,sources:["webpack://./src/stories/button.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,eAAe;EACf,SAAS;EACT,kBAAkB;EAClB,gBAAgB;EAChB,cAAc;EACd,0EAA0E;AAC5E;AACA;EACE,yBAAyB;EACzB,YAAY;AACd;AACA;EACE,qDAAqD;EACrD,6BAA6B;EAC7B,WAAW;AACb;AACA;EACE,kBAAkB;EAClB,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,eAAe;AACjB",sourcesContent:[".storybook-button {\n  display: inline-block;\n  cursor: pointer;\n  border: 0;\n  border-radius: 3em;\n  font-weight: 700;\n  line-height: 1;\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n.storybook-button--primary {\n  background-color: #555ab9;\n  color: white;\n}\n.storybook-button--secondary {\n  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;\n  background-color: transparent;\n  color: #333;\n}\n.storybook-button--small {\n  padding: 10px 16px;\n  font-size: 12px;\n}\n.storybook-button--medium {\n  padding: 11px 20px;\n  font-size: 14px;\n}\n.storybook-button--large {\n  padding: 12px 24px;\n  font-size: 16px;\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/.pnpm/css-loader@6.11.0_webpack@5.97.1_esbuild@0.24.2_/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/.pnpm/postcss-loader@8.1.1_postcss@8.5.1_typescript@5.7.3_webpack@5.97.1_esbuild@0.24.2_/node_modules/postcss-loader/dist/cjs.js!./src/stories/header.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/css-loader@6.11.0_webpack@5.97.1_esbuild@0.24.2_/node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/css-loader@6.11.0_webpack@5.97.1_esbuild@0.24.2_/node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_pnpm_css_loader_6_11_0_webpack_5_97_1_esbuild_0_24_2_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".storybook-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 15px 20px;\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\n.storybook-header svg {\n  display: inline-block;\n  vertical-align: top;\n}\n\n.storybook-header h1 {\n  display: inline-block;\n  vertical-align: top;\n  margin: 6px 0 6px 10px;\n  font-weight: 700;\n  font-size: 20px;\n  line-height: 1;\n}\n\n.storybook-header button + button {\n  margin-left: 10px;\n}\n\n.storybook-header .welcome {\n  margin-right: 10px;\n  color: #333;\n  font-size: 14px;\n}\n","",{version:3,sources:["webpack://./src/stories/header.css"],names:[],mappings:"AAAA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,2CAA2C;EAC3C,kBAAkB;EAClB,0EAA0E;AAC5E;;AAEA;EACE,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,eAAe;AACjB",sourcesContent:[".storybook-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 15px 20px;\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\n.storybook-header svg {\n  display: inline-block;\n  vertical-align: top;\n}\n\n.storybook-header h1 {\n  display: inline-block;\n  vertical-align: top;\n  margin: 6px 0 6px 10px;\n  font-weight: 700;\n  font-size: 20px;\n  line-height: 1;\n}\n\n.storybook-header button + button {\n  margin-left: 10px;\n}\n\n.storybook-header .welcome {\n  margin-right: 10px;\n  color: #333;\n  font-size: 14px;\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/.pnpm/styled-jsx@5.1.6_@babel+core@7.26.7_react@19.0.0/node_modules/styled-jsx/style.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/.pnpm/styled-jsx@5.1.6_@babel+core@7.26.7_react@19.0.0/node_modules/styled-jsx/dist/index/index.js").style}}]);