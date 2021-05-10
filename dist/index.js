'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$4=Symbol();class s$6{constructor(t,s){if(s!==e$4)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){return t$3&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const n$5=new Map,o$5=t=>{let o=n$5.get(t);return void 0===o&&n$5.set(t,o=new s$6(t,e$4)),o},r$3=t=>o$5("string"==typeof t?t:t+""),i$3=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,n,o)=>e+(t=>{if(t instanceof s$6)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[o+1]),t[0]);return o$5(n)},S$1=(e,s)=>{t$3?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style");s.textContent=t.cssText,e.appendChild(s);}));},u$3=t$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$5,e$3,h$3,r$2;const o$4={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$4=(t,i)=>i!==t&&(i==i||t==t),l$4={attribute:!0,type:String,converter:o$4,reflect:!1,hasChanged:n$4};class a$3 extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u();}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e));})),t}static createProperty(t,i=l$4){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const h=this[t];this[i]=e,this.requestUpdate(t,h,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$4}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(u$3(i));}else void 0!==i&&s.push(u$3(i));return s}static Πp(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1);}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0);}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t));}attributeChangedCallback(t,i,s){this.K(t,s);}Πj(t,i,s=l$4){var e,h;const r=this.constructor.Πp(t,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:o$4.toAttribute)(i,s.type);this.Πh=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null;}}K(t,i){var s,e,h;const r=this.constructor,n=r.Πm.get(t);if(void 0!==n&&this.Πh!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:o$4.fromAttribute;this.Πh=n,this[n]=a(i,t.type),this.Πh=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$4)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq());}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$();}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s);}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}Π$(){this.L=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return !0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$();}updated(t){}firstUpdated(t){}}a$3.finalized=!0,a$3.elementProperties=new Map,a$3.elementStyles=[],a$3.shadowRootOptions={mode:"open"},null===(e$3=(s$5=globalThis).reactiveElementPlatformSupport)||void 0===e$3||e$3.call(s$5,{ReactiveElement:a$3}),(null!==(h$3=(r$2=globalThis).reactiveElementVersions)&&void 0!==h$3?h$3:r$2.reactiveElementVersions=[]).push("1.0.0-rc.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2,i$2,s$4,e$2;const o$3=globalThis.trustedTypes,l$3=o$3?o$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,n$3=`lit$${(Math.random()+"").slice(9)}$`,h$2="?"+n$3,r$1=`<${h$2}>`,u$2=document,c$3=(t="")=>u$2.createComment(t),d$2=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,a$2=t=>{var i;return v(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g=/"/g,y=/^(?:script|style|textarea)$/i,b=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b(1),x=b(2),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),P=new WeakMap,V=(t,i,s)=>{var e,o;const l=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let n=l._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=n=new C(i.insertBefore(c$3(),t),t,void 0,s);}return n.I(t),n},E=u$2.createTreeWalker(u$2,129,null,!1),M=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let l,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f$1?"!--"===c[1]?u=_:void 0!==c[1]?u=m$1:void 0!==c[2]?(y.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=o?o:f$1,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=void 0===c[3]?p:'"'===c[3]?g:$):u===g||u===$?u=p:u===_||u===m$1?u=f$1:(u=p,o=void 0);const a=u===p&&t[i+1].startsWith("/>")?" ":"";h+=u===f$1?s+r$1:d>=0?(e.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+n$3+a):s+n$3+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==l$3?l$3.createHTML(c):c,e]};class N{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let l=0,r=0;const u=t.length-1,d=this.parts,[v,a]=M(t,i);if(this.el=N.createElement(v,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=E.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(n$3)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(n$3),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:l,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L:"@"===i[1]?R:H});}else d.push({type:6,index:l});}for(const i of t)e.removeAttribute(i);}if(y.test(e.tagName)){const t=e.textContent.split(n$3),i=t.length-1;if(i>0){e.textContent=o$3?o$3.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c$3()),E.nextNode(),d.push({type:2,index:++l});e.append(t[i],c$3());}}}else if(8===e.nodeType)if(e.data===h$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=e.data.indexOf(n$3,t+1));)d.push({type:7,index:l}),t+=n$3.length-1;}l++;}}static createElement(t,i){const s=u$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,l,n,h;if(i===w)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const u=d$2(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===u?r=void 0:(r=new u(t),r.T(t,s,e)),void 0!==e?(null!==(n=(h=s).Σi)&&void 0!==n?n:h.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=S(t,r.S(t,i.values),r,e)),i}class k{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i;}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u$2).importNode(s,!0);E.currentNode=o;let l=E.nextNode(),n=0,h=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new C(l,l.nextSibling,this,t):1===r.type?i=new r.ctor(l,r.name,r.strings,this,t):6===r.type&&(i=new z(l,this,t)),this.l.push(i),r=e[++h];}n!==(null==r?void 0:r.index)&&(l=E.nextNode(),n++);}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++;}}class C{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e;}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t);}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=S(this,t,i),d$2(t)?t===A||null==t||""===t?(this.H!==A&&this.R(),this.H=A):t!==this.H&&t!==w&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):a$2(t)?this.g(t):this.m(t);}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t));}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(u$2.createTextNode(t)),this.H=t;}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=N.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else {const t=new k(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t;}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new N(t)),i}g(t){v(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new C(this.k(c$3()),this.k(c$3()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e);}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i;}}}class H{constructor(t,i,s,e,o){this.type=1,this.H=A,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(A),this.strings=s):this.H=A;}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let l=!1;if(void 0===o)t=S(this,t,i,0),l=!d$2(t)||t!==this.H&&t!==w,l&&(this.H=t);else {const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=S(this,e[s+n],i,n),h===w&&(h=this.H[n]),l||(l=!d$2(h)||h!==this.H[n]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[n+1]),this.H[n]=h;}l&&!e&&this.W(t);}W(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}W(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}W(t){t&&t!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}I(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this.H,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,l=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),l&&this.element.addEventListener(this.name,this,t),this.H=t;}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s;}I(t){S(this,t);}}const Z={Z:"$lit$",U:n$3,Y:h$2,q:1,X:M,tt:k,it:a$2,st:S,et:C,ot:H,nt:L,rt:R,lt:I,ht:z};null===(i$2=(t$2=globalThis).litHtmlPlatformSupport)||void 0===i$2||i$2.call(t$2,N,C),(null!==(s$4=(e$2=globalThis).litHtmlVersions)&&void 0!==s$4?s$4:e$2.litHtmlVersions=[]).push("2.0.0-rc.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var i$1,l$2,o$2,s$3,n$2,a$1;(null!==(i$1=(a$1=globalThis).litElementVersions)&&void 0!==i$1?i$1:a$1.litElementVersions=[]).push("3.0.0-rc.2");class h$1 extends a$3{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this.Φt=V(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1);}render(){return w}}h$1.finalized=!0,h$1._$litElement$=!0,null===(o$2=(l$2=globalThis).litElementHydrateSupport)||void 0===o$2||o$2.call(l$2,{LitElement:h$1}),null===(n$2=(s$3=globalThis).litElementPlatformSupport)||void 0===n$2||n$2.call(s$3,{LitElement:h$1});

const LEAF_BLOCK_TAG_NAMES = [
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'LI',
  'HR'
];
const VOID_BLOCK_TAG_NAMES = [
  'HR'
];
const SUPPORTED_BLOCK_TAG_NAMES = [
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'UL',
  'OL',
  'LI',
  'BLOCKQUOTE',
  // 'TABLE',
  // 'HR'
];
const SUPPORTED_INLINE_TAG_NAMES = [
  'STRONG',
  'EM',
  'I',
  'U',
  'STRIKE',
  'CODE',
  'SUP',
  'SUB',
  'A'
];

class CtznEditorBlockDefinition {
  constructor ({tagName, content, blocks}) {
    this.id = `${Date.now()}-${Math.random()}`;
    this.tagName = tagName;
    this.content = content || '';
    this.blocks = blocks;
  }

  clone (props) {
    const dst = new CtznEditorBlockDefinition(Object.assign({}, this, props, {blocks: []}));
    for (let block of (this.blocks || [])) {
      dst.blocks.push(block.clone({}));
    }
    return dst
  }

  convertTo (tagName) {
    const dst = this.clone({tagName});
    if (this.tagName === dst.tagName) {
      return dst
    }
    if (isList(this) && !isList(dst)) {
      dst.content = this.blocks.map(block => `- ${block.content}`).join('<br>\n');
    } else if (!isList(this) && isList(dst)) {
      let items = (this.content || '').split(/([\r\n]|<br>)/g)
        .map(str => str.trim().replace(/^- /, ''))
        .filter(str => str && str !== '<br>');
      if (items.length === 0) items.push('');
      dst.blocks = items.map(item => new CtznEditorBlockDefinition({tagName: 'li', content: item}));
    }
    return dst
  }

  toHTML () {
    if (this.tagName === 'editor') {
      return this.blocks.map(block => block.toHTML()).join('\n')
    }
    if (this.tagName === 'hr') return `<hr>\n`
    if (LEAF_BLOCK_TAG_NAMES.includes(this.tagName.toUpperCase())) {
      return `<${this.tagName}>${this.content}</${this.tagName}>\n`
    }
    return `<${this.tagName}>\n${this.blocks.map(block => block.toHTML()).join('\n')}\n</${this.tagName}>\n`
  }
}

function isList (def) {
  return def.tagName === 'ul' || def.tagName === 'ol'
}

function fromHTML (html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  console.log(container.childNodes);
  const res = fromHTML_NodesToBlockDefinition('editor', container.childNodes);
  console.log(res);
  return res
}

function fromHTML_NodesToBlockDefinition (tagName, nodes) {
  const isLeaf = LEAF_BLOCK_TAG_NAMES.includes(tagName);
  const isVoid = VOID_BLOCK_TAG_NAMES.includes(tagName);
  const contents = [];
  const blocks = [];
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (tagName === 'editor') ; else {
        contents.push(node.nodeValue);
      }
    } else {
      if (SUPPORTED_INLINE_TAG_NAMES.includes(node.tagName)) {
        contents.push(fromHTML_NodesToInlineContent(node.tagName, node.childNodes));
      } else if (!isLeaf && SUPPORTED_BLOCK_TAG_NAMES.includes(node.tagName)) {
        blocks.push(fromHTML_NodesToBlockDefinition(node.tagName, node.childNodes));
      } else {
        if (isVoid) ; else if (isLeaf) {
          contents.push(`<em>(Unsupported inline: &lt;${node.tagName}&gt;)</em>`);
        } else {
          blocks.push(new CtznEditorBlockDefinition({tagName: 'p', content: `<em>Unsupported block: ${node.tagName}</em>`}));
        }
      }
    }
  }
  return new CtznEditorBlockDefinition({tagName: tagName.toLowerCase(), content: contents.join(''), blocks})
}

function fromHTML_NodesToInlineContent (tagName, nodes) {
  const tag = tagName.toLowerCase();
  const contents = [];
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      contents.push(node.nodeValue);
    } else {
      if (SUPPORTED_INLINE_TAG_NAMES.includes(node.tagName)) {
        contents.push(fromHTML_NodesToInlineContent(node.tagName, node.childNodes));
      } else {
        contents.push(`<em>(Unsupported inline: &lt;${node.tagName}&gt;)</em>`);
      }
    }
  }
  return `<${tag}>${contents.join('')}</${tag}>`
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i=t=>(...i)=>({_$litDirective$:t,values:i});class s$2{constructor(t){}T(t,i,s){this.Σdt=t,this.M=i,this.Σct=s;}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {et:t}=Z,d$1=o=>void 0===o.strings,e$1=()=>document.createComment(""),u$1=(o,i,n)=>{var v;const l=o.A.parentNode,r=void 0===i?o.B:i.A;if(void 0===n){const i=l.insertBefore(e$1(),r),v=l.insertBefore(e$1(),r);n=new t(i,v,o,o.options);}else {const t=n.B.nextSibling,i=n.M!==o;if(i&&(null===(v=n.Q)||void 0===v||v.call(n,o),n.M=o),t!==r||i){let o=n.A;for(;o!==t;){const t=o.nextSibling;l.insertBefore(o,r),o=t;}}}return n},c$2=(o,t,i=o)=>(o.I(t,i),o),s$1={},f=(o,t=s$1)=>o.H=t,a=o=>o.H,m=o=>{var t;null===(t=o.P)||void 0===t||t.call(o,!1,!0);let i=o.A;const n=o.B.nextSibling;for(;i!==n;){const o=i.nextSibling;i.remove(),i=o;}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c$1=i(class extends s$2{constructor(e){if(super(e),e.type!==t$1.CHILD)throw Error("repeat() can only be used in text expressions")}Mt(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.Mt(e,s,t).values}update(s,[t,r,c]){var d;const p=a(s),{values:v,keys:a$1}=this.Mt(t,r,c);if(!p)return this.Pt=a$1,v;const h=null!==(d=this.Pt)&&void 0!==d?d:this.Pt=[],m$1=[];let x,y,j=0,k=p.length-1,w$1=0,b=v.length-1;for(;j<=k&&w$1<=b;)if(null===p[j])j++;else if(null===p[k])k--;else if(h[j]===a$1[w$1])m$1[w$1]=c$2(p[j],v[w$1]),j++,w$1++;else if(h[k]===a$1[b])m$1[b]=c$2(p[k],v[b]),k--,b--;else if(h[j]===a$1[b])m$1[b]=c$2(p[j],v[b]),u$1(s,m$1[b+1],p[j]),j++,b--;else if(h[k]===a$1[w$1])m$1[w$1]=c$2(p[k],v[w$1]),u$1(s,p[j],p[k]),k--,w$1++;else if(void 0===x&&(x=u(a$1,w$1,b),y=u(h,j,k)),x.has(h[j]))if(x.has(h[k])){const e=y.get(a$1[w$1]),t=void 0!==e?p[e]:null;if(null===t){const e=u$1(s,p[j]);c$2(e,v[w$1]),m$1[w$1]=e;}else m$1[w$1]=c$2(t,v[w$1]),u$1(s,p[j],t),p[e]=null;w$1++;}else m(p[k]),k--;else m(p[j]),j++;for(;w$1<=b;){const e=u$1(s,m$1[b+1]);c$2(e,v[w$1]),m$1[w$1++]=e;}for(;j<=k;){const e=p[j++];null!==e&&m(e);}return this.Pt=a$1,f(s,m$1),w}});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n$1 extends s$2{constructor(i){if(super(i),this.vt=A,i.type!==t$1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A)return this.Vt=void 0,this.vt=r;if(r===w)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.vt)return this.Vt;this.vt=r;const s=[r];return s.raw=s,this.Vt={_$litType$:this.constructor.resultType,strings:s,values:[]}}}n$1.directiveName="unsafeHTML",n$1.resultType=1;const o$1=i(n$1);

function cursorTo (range) {
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function getPlainTextCaretOffset (el) {
  if (!el) return 0
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const range2 = document.createRange();
  range2.selectNodeContents(el);
  range2.setEnd(range.startContainer, range.startOffset);
  return range2.cloneContents().textContent.trim().length
}

function setPlainTextCaretOffset (el, offset) {
  function createRange (node, chars, range) {
    const isFirst = !range;
    if (!range) {
      range = document.createRange();
      range.selectNode(node);
      range.setStart(node, 0);
    }
    
    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        let lastChild;
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          lastChild = node.childNodes[lp];
          range = createRange(node.childNodes[lp], chars, range);
          if (chars.count === 0) {
            break
          }
        }
        if (chars.count > 0 && isFirst) {
          range.setEnd(lastChild, lastChild.textContent.length);
        }
      }
    } 
    
    return range
  }
  const range = createRange(el, {count: offset});
  if (range) {
    range.collapse(false);
    cursorTo(range);
  }
}

function splitContentAtCursor (el) {
  const range = window.getSelection().getRangeAt(0);
  const rangeLeft = document.createRange();
  rangeLeft.selectNodeContents(el);
  rangeLeft.setEnd(range.startContainer, range.startOffset);
  const rangeRight = document.createRange();
  rangeRight.selectNodeContents(el);
  rangeRight.setStart(range.endContainer, range.endOffset);
  return {
    leftContent: fragToHTML(rangeLeft.cloneContents()),
    rightContent: fragToHTML(rangeRight.cloneContents())
  }
}

function findParent (node, test) {
  if (typeof test === 'string') {
    // classname default
    var cls = test;
    test = el => el.classList && el.classList.contains(cls);
  }

  while (node) {
    if (test(node)) {
      return node
    }
    node = node.parentNode;
  }
}

function fragToHTML (frag) {
  let div = document.createElement('div');
  div.append(frag);
  return div.innerHTML.replace(/<\!--.*?-->/g, "").trim()
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=i(class extends s$2{constructor(t){var s;if(super(t),t.type!==t$1.ATTRIBUTE||"class"!==t.name||(null===(s=t.strings)||void 0===s?void 0:s.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).filter((s=>t[s])).join(" ")}update(s,[r]){if(void 0===this.bt){this.bt=new Set;for(const t in r)r[t]&&this.bt.add(t);return this.render(r)}const i=s.element.classList;this.bt.forEach((t=>{t in r||(i.remove(t),this.bt.delete(t));}));for(const t in r){const s=!!r[t];s!==this.bt.has(t)&&(s?(i.add(t),this.bt.add(t)):(i.remove(t),this.bt.delete(t)));}return w}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$1=l=>null!=l?l:A;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const r=(i,t)=>{var s,e;const o=i.N;if(void 0===o)return !1;for(const i of o)null===(e=(s=i).O)||void 0===e||e.call(s,t,!1),r(i,t);return !0},o=i=>{let t,s;do{if(void 0===(t=i.M))break;s=t.N,s.delete(i),i=t;}while(0===(null==s?void 0:s.size))},h=i=>{for(let t;t=i.M;i=t){let s=t.N;if(void 0===s)t.N=s=new Set;else if(s.has(i))break;s.add(i),d(t);}};function n(i){void 0!==this.N?(o(this),this.M=i,h(this)):this.M=i;}function l(i,t=!1,s=0){const e=this.H,h=this.N;if(void 0!==h&&0!==h.size)if(t)if(Array.isArray(e))for(let i=s;i<e.length;i++)r(e[i],!1),o(e[i]);else null!=e&&(r(e,!1),o(e));else r(this,i);}const d=i=>{var t,e,r,o;i.type==t$1.CHILD&&(null!==(t=(r=i).P)&&void 0!==t||(r.P=l),null!==(e=(o=i).Q)&&void 0!==e||(o.Q=n));};class c extends s$2{constructor(){super(...arguments),this.isConnected=!0,this.ut=w,this.N=void 0;}T(i,t,s){super.T(i,t,s),h(this);}O(i,t=!0){this.at(i),t&&(r(this,i),o(this));}at(t){var s,e;t!==this.isConnected&&(t?(this.isConnected=!0,this.ut!==w&&(this.setValue(this.ut),this.ut=w),null===(s=this.reconnected)||void 0===s||s.call(this)):(this.isConnected=!1,null===(e=this.disconnected)||void 0===e||e.call(this)));}S(i,t){if(!this.isConnected)throw Error(`AsyncDirective ${this.constructor.name} was rendered while its tree was disconnected.`);return super.S(i,t)}setValue(i){if(this.isConnected)if(d$1(this.Σdt))this.Σdt.I(i,this);else {const t=[...this.Σdt.H];t[this.Σct]=i,this.Σdt.I(t,this,0);}else this.ut=i;}disconnected(){}reconnected(){}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=i(class extends c{render(i,e){return w}update(i,[e,s]){if(e!==this.vt)return this.vt=e,this.Σft(s),w}async Σft(t){let i=0;const{vt:e}=this;for await(let s of e){if(this.vt!==e)break;this.wt&&await this.wt,void 0!==t&&(s=t(s,i)),this.setValue(s),i++;}}disconnected(){this.wt=new Promise((t=>this.yt=t));}reconnected(){this.wt=void 0,this.yt();}});

// globals
// =

var resolve;

// exported api
// =

// create a new context menu
// - returns a promise that will resolve to undefined when the menu goes away
// - example usage:
/*
create({
  // where to put the menu
  x: e.clientX,
  y: e.clientY,

  // align edge to right instead of left
  right: true,

  // use triangle
  withTriangle: true,

  // roomy style
  roomy: true,

  // no borders on items
  noBorders: false,

  // additional styles on dropdown-items
  style: 'font-size: 14px',

  // parent element to append to
  parent: document.body,

  // url to fontawesome css
  fontAwesomeCSSUrl: '/css/font-awesome.css',

  // menu items
  items: [
    // icon from font-awesome
    {icon: 'fa fa-link', label: 'Copy link', click: () => writeToClipboard('...')}
  ]

  // instead of items, can give render()
  render () {
    return html`
      <img src="smile.png" onclick=${contextMenu.destroy} />
    `
  }
}
*/
function create (opts) {
  // destroy any existing
  destroy();

  // extract attrs
  var parent = opts.parent || document.body;

  // render interface
  parent.appendChild(new ContextMenu(opts));
  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('click', onClickAnywhere);

  // return promise
  return new Promise(_resolve => {
    resolve = _resolve;
  })
}

function destroy (value) {
  const el = document.querySelector('ctzn-editor-context-menu');
  if (el) {
    el.parentNode.removeChild(el);
    document.removeEventListener('keyup', onKeyUp);
    document.removeEventListener('click', onClickAnywhere);
    resolve(value);
  }
}

// global event handlers
// =

function onKeyUp (e) {
  e.preventDefault();
  e.stopPropagation();

  if (e.keyCode === 27) {
    destroy();
  }
}

function onClickAnywhere (e) {
  if (!findParent(e.target, el => el.tagName === 'CTZN-EDITOR-CONTEXT-MENU')) {
    // click is outside the context-menu, destroy
    destroy();
  }
}

// internal
// =

class ContextMenu extends h$1 {
  constructor ({parent, x, y, right, center, top, withTriangle, roomy, veryRoomy, rounded, noBorders, style, items, fontAwesomeCSSUrl, render}) {
    super();
    this.hasParent = !!parent;
    this.x = x;
    this.y = y;
    this.right = right || false;
    this.center = center || false;
    this.top = top || false;
    this.withTriangle = withTriangle || false;
    this.roomy = roomy || false;
    this.veryRoomy = veryRoomy || false;
    this.rounded = rounded || false;
    this.noBorders = noBorders || false;
    this.customStyle = style || undefined;
    this.items = items;
    this.fontAwesomeCSSUrl = fontAwesomeCSSUrl || '/css/fontawesome.css';
    this.customRender = render;
  }

  // calls the global destroy
  // (this function exists so that custom renderers can destroy with this.destroy)
  destroy () {
    destroy();
  }

  // rendering
  // =

  render () {
    const cls = e({
      'dropdown-items': true,
      right: this.right,
      center: this.center,
      left: !this.right,
      top: this.top,
      'with-triangle': this.withTriangle,
      roomy: this.roomy,
      'very-roomy': this.veryRoomy,
      rounded: this.rounded,
      'no-border': this.noBorders
    });
    var style = '';
    if (this.x) style += `left: ${this.x}px; `;
    if (this.y) style += `top: ${this.y}px; `;
    return T`
      ${this.fontAwesomeCSSUrl ? T`<link rel="stylesheet" href="${this.fontAwesomeCSSUrl}">` : ''}
      <div class="context-menu dropdown ${this.hasParent ? 'has-parent' : ''}" style="${style}">
        ${this.customRender
          ? this.customRender.call(this)
          : T`
            <div class="${cls}" style="${l$1(this.customStyle)}">
              ${this.items.map(item => {
                if (item instanceof Promise) {
                  return T`${s(renderPromiseItem(item))}`
                }
                if (item === '-') {
                  return T`<hr />`
                }
                if (item._$litType$) {
                  return item
                }
                var icon = item.icon;
                if (typeof icon === 'string' && !icon.includes(' ')) {
                  icon = 'fa fa-' + icon;
                }
                if (item.disabled) {
                  return T`
                    <div class="dropdown-item disabled">
                      ${icon !== false ? T`<i class="${icon}"></i>` : ''}
                      ${item.label}
                    </div>
                  `
                }
                if (item.href) {
                  return T`
                    <a class="dropdown-item ${item.selected ? 'selected' : ''}" href=${item.href}>
                      ${icon !== false ? T`<i class="${icon}"></i>` : ''}
                      ${item.label}
                    </a>
                  `
                }
                return T`
                  <div class="dropdown-item ${item.selected ? 'selected' : ''}" @click=${() => { destroy(); item.click(); }}>
                    ${typeof icon === 'string'
                      ? T`<i class="${icon}"></i>`
                      : icon ? icon : ''}
                    ${item.label}
                  </div>
                `
              })}
            </div>`
        }
      </div>`
  }
}

async function* renderPromiseItem (item) {
  yield T``;
  let value = await item;
  yield value;
}

ContextMenu.styles = i$3`
:host {
  position: relative;
}

.context-menu {
  position: fixed;
  z-index: 10000;
}

.context-menu.has-parent {
  position: absolute;
}

.dropdown-items {
  width: auto;
  white-space: nowrap;
}

a.dropdown-item {
  color: inherit;
  text-decoration: none;
}

.dropdown-item,
.dropdown-items.roomy .dropdown-item {
  padding-right: 30px; /* add a little cushion to the right */
}

/* custom icon css */
.fa-long-arrow-alt-right.custom-link-icon {
  position: relative;
  transform: rotate(-45deg);
  left: 1px;
}
.fa-custom-path-icon:after {
  content: './';
  letter-spacing: -1px;
  font-family: var(--code-font);
}
.dropdown {
  position: relative;

  --text-color--dropdown-default: #333;
  --text-color--dropdown-section: #aaa;
  --text-color--dropdown-icon: rgba(0, 0, 0, 0.65);
  --text-color--dropdown-btn--pressed: #dadada;
  --text-color--title: gray;
  --bg-color--dropdown: #fff;
  --bg-color--dropdown-item--hover: #eee;
  --border-color--dropdown: #dadada;
  --border-color--dropdown-item: #eee;
  --border-color--dropdown-section: rgba(0,0,0,.1);
  --border-color--dropdown-separator: #ddd;
}

@media (prefers-color-scheme: dark) {
  .dropdown {
    --text-color--dropdown-default: #ccd;
    --text-color--dropdown-section: #aaa;
    --text-color--dropdown-icon: #eef;
    --text-color--dropdown-btn--pressed: #2c2c31;
    --text-color--title: gray;
    --bg-color--dropdown: #334;
    --bg-color--dropdown-item--hover: #445;
    --border-color--dropdown: #556;
    --border-color--dropdown-item: #669;
    --border-color--dropdown-section: rgba(0,0,0,.1);
    --border-color--dropdown-separator: #ddd;
  }
}

.dropdown.open .toggleable:not(.primary) {
  background: var(--text-color--dropdown-btn--pressed);
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  border-color: transparent;
  outline: 0;
}

.toggleable-container .dropdown-items {
  display: none;
}

.toggleable-container.hover:hover .dropdown-items,
.toggleable-container.open .dropdown-items {
  display: block;
}

.dropdown-items {
  width: 270px;
  position: absolute;
  right: 0px;
  z-index: 3000;
  background: var(--bg-color--dropdown);
  color: var(--text-color--dropdown-default);
  border: 1px solid var(--border-color--dropdown);
  border-radius: 0px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
}

.dropdown-items .section {
  border-bottom: 1px solid var(--border-color--dropdown-section);
  padding: 5px 0;
}

.dropdown-items .section-header {
  padding: 2px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-items .section-header.light {
  color: #666;
  font-weight: 500;
}

.dropdown-items .section-header.small {
  font-size: 12px;
  letter-spacing: 0.25px;
}

.dropdown-items hr {
  border: 0;
  border-bottom: 1px solid var(--border-color--dropdown-separator);
}

.dropdown-items.thin {
  width: 170px;
}

.dropdown-items.wide {
  width: 400px;
}

.dropdown-items.compact .dropdown-item {
  padding: 2px 15px;
  border-bottom: 0;
}

.dropdown-items.compact .description {
  margin-left: 0;
}

.dropdown-items.compact hr {
  margin: 5px 0;
}

.dropdown-items.roomy .dropdown-item {
  padding: 10px 15px;
}

.dropdown-items.very-roomy .dropdown-item {
  padding: 16px 40px 16px 20px;
}

.dropdown-items.rounded {
  border-radius: 4px;
}

.dropdown-items.no-border .dropdown-item {
  border-bottom: 0;
}

.dropdown-items.center {
  left: 50%;
  right: unset;
  transform: translateX(-50%);
}

.dropdown-items.left {
  right: initial;
  left: 0;
}

.dropdown-items.over {
  top: 0;
}

.dropdown-items.top {
  bottom: calc(100% + 5px);
}

.dropdown-items.with-triangle:before {
  content: '';
  position: absolute;
  top: -6px;
  right: 10px;
  width: 10px;
  height: 10px;
  z-index: -1;
  transform: rotate(45deg);
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  background: var(--bg-color--dropdown);
}

.dropdown-items.with-triangle.left:before {
  left: 10px;
}

.dropdown-items.with-triangle.center:before {
  left: 46%;
}

.dropdown-title {
  border-bottom: 1px solid var(--border-color--dropdown-item);
  padding: 2px 8px;
  font-size: 11px;
  color: var(--text-color--title);
}

.dropdown-item {
  display: block;
  padding: 7px 15px;
  border-bottom: 1px solid var(--border-color--dropdown-item);
}

.dropdown-item.disabled {
  opacity: 0.25;
}

.dropdown-item.no-border {
  border-bottom: 0;
}

.dropdown-item.selected {
  background: var(--bg-color--dropdown-item--hover);  
}

.dropdown-item:hover:not(.no-hover) {
  background: var(--bg-color--dropdown-item--hover);
  cursor: pointer;
}

.dropdown-item:hover:not(.no-hover) i:not(.fa-check-square) {
  color: var(--text-color--dropdown-default);
}

.dropdown-item:hover:not(.no-hover) .description {
  color: var(--text-color--dropdown-default);
}

.dropdown-item:hover:not(.no-hover).disabled {
  background: inherit;
  cursor: default;
}

.dropdown-item .fa,
.dropdown-item i {
  display: inline-block;
  width: 20px;
  color: var(--text-color--dropdown-icon);
}

.dropdown-item .fa-fw {
  margin-left: -3px;
  margin-right: 3px;
}

.dropdown-item img:not(.emoji) {
  display: inline-block;
  width: 16px;
  position: relative;
  top: 3px;
  margin-right: 6px;
}

.dropdown-item img.rounded {
  border-radius: 50%;
}

.dropdown-item .btn .fa {
  color: inherit;
}

.dropdown-item .label {
  font-weight: 500;
}

.dropdown-item .description {
  color: rgb(102, 102, 102);
  margin: 0px 0px 3px 27px;
}

.dropdown-item .label.truncate,
.dropdown-item .description.truncate {
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 640px) {
  .dropdown-item .label.truncate,
  .dropdown-item .description.truncate {
    max-width: 240px;
  }
}

.dropdown-item .description.small {
  font-size: 12.5px;
}

.dropdown-item:first-of-type {
  border-radius: 2px 2px 0 0;
}

.dropdown-item:last-of-type {
  border-radius: 0 0 2px 2px;
}

.dropdown-item .img-wrapper {
  display: flex;
  align-items: center;
}

.dropdown-item .img-wrapper img:not(.emoji) {
  display: block;
  top: 0;
  height: 40px;
  width: 40px;
  margin-right: 15px;
}

.dropdown-item .img-wrapper .description {
  margin-left: 0;
}

.emoji {
  display: inline-block;
  width: 1rem;
}
`;

customElements.define('ctzn-editor-context-menu', ContextMenu);

/**
 * ATTRIBUTION
 * Font Awesome 5
 * https://fontawesome.com/license/free
 */

const questionMark = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question" class="svg-inline--fa fa-question fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"></path></svg>
`;

const bold = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bold" class="svg-inline--fa fa-bold fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M333.49 238a122 122 0 0 0 27-65.21C367.87 96.49 308 32 233.42 32H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h31.87v288H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h209.32c70.8 0 134.14-51.75 141-122.4 4.74-48.45-16.39-92.06-50.83-119.6zM145.66 112h87.76a48 48 0 0 1 0 96h-87.76zm87.76 288h-87.76V288h87.76a56 56 0 0 1 0 112z"></path></svg>
`;

const italic = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="italic" class="svg-inline--fa fa-italic fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M320 48v32a16 16 0 0 1-16 16h-62.76l-80 320H208a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h62.76l80-320H112a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z"></path></svg>
`;

const underline = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="underline" class="svg-inline--fa fa-underline fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 64h32v160c0 88.22 71.78 160 160 160s160-71.78 160-160V64h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H272a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h32v160a80 80 0 0 1-160 0V64h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H32a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm400 384H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>
`;

const strike = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="strikethrough" class="svg-inline--fa fa-strikethrough fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496 224H293.9l-87.17-26.83A43.55 43.55 0 0 1 219.55 112h66.79A49.89 49.89 0 0 1 331 139.58a16 16 0 0 0 21.46 7.15l42.94-21.47a16 16 0 0 0 7.16-21.46l-.53-1A128 128 0 0 0 287.51 32h-68a123.68 123.68 0 0 0-123 135.64c2 20.89 10.1 39.83 21.78 56.36H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h480a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-180.24 96A43 43 0 0 1 336 356.45 43.59 43.59 0 0 1 292.45 400h-66.79A49.89 49.89 0 0 1 181 372.42a16 16 0 0 0-21.46-7.15l-42.94 21.47a16 16 0 0 0-7.16 21.46l.53 1A128 128 0 0 0 224.49 480h68a123.68 123.68 0 0 0 123-135.64 114.25 114.25 0 0 0-5.34-24.36z"></path></svg>
`;

const superscript = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="superscript" class="svg-inline--fa fa-superscript fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496 160h-16V16a16 16 0 0 0-16-16h-48a16 16 0 0 0-14.29 8.83l-16 32A16 16 0 0 0 400 64h16v96h-16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM336 64h-67a16 16 0 0 0-13.14 6.87l-79.9 115-79.9-115A16 16 0 0 0 83 64H16A16 16 0 0 0 0 80v48a16 16 0 0 0 16 16h33.48l77.81 112-77.81 112H16a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h67a16 16 0 0 0 13.14-6.87l79.9-115 79.9 115A16 16 0 0 0 269 448h67a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16h-33.48l-77.81-112 77.81-112H336a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16z"></path></svg>
`;

const subscript = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="subscript" class="svg-inline--fa fa-subscript fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496 448h-16V304a16 16 0 0 0-16-16h-48a16 16 0 0 0-14.29 8.83l-16 32A16 16 0 0 0 400 352h16v96h-16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM336 64h-67a16 16 0 0 0-13.14 6.87l-79.9 115-79.9-115A16 16 0 0 0 83 64H16A16 16 0 0 0 0 80v48a16 16 0 0 0 16 16h33.48l77.81 112-77.81 112H16a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h67a16 16 0 0 0 13.14-6.87l79.9-115 79.9 115A16 16 0 0 0 269 448h67a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16h-33.48l-77.81-112 77.81-112H336a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16z"></path></svg>
`;

const link = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="link" class="svg-inline--fa fa-link fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg>
`;

const undo = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="undo" class="svg-inline--fa fa-undo fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path></svg>
`;

const redo = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo" class="svg-inline--fa fa-redo fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"></path></svg>
`;

const indent = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="indent" class="svg-inline--fa fa-indent fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M27.31 363.3l96-96a16 16 0 0 0 0-22.62l-96-96C17.27 138.66 0 145.78 0 160v192c0 14.31 17.33 21.3 27.31 11.3zM432 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm3.17-128H204.83A12.82 12.82 0 0 0 192 300.83v38.34A12.82 12.82 0 0 0 204.83 352h230.34A12.82 12.82 0 0 0 448 339.17v-38.34A12.82 12.82 0 0 0 435.17 288zm0-128H204.83A12.82 12.82 0 0 0 192 172.83v38.34A12.82 12.82 0 0 0 204.83 224h230.34A12.82 12.82 0 0 0 448 211.17v-38.34A12.82 12.82 0 0 0 435.17 160zM432 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
`;

const deindent = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M 432 416 L 16 416 C 7.163 416 0 423.163 0 432 L 0 464 C 0 472.837 7.163 480 16 480 L 432 480 C 440.837 480 448 472.837 448 464 L 448 432 C 448 423.163 440.837 416 432 416 Z M 435.17 288 L 204.83 288 C 197.742 287.994 191.994 293.742 192 300.83 L 192 339.17 C 191.994 346.258 197.742 352.006 204.83 352 L 435.17 352 C 442.258 352.006 448.006 346.258 448 339.17 L 448 300.83 C 448.006 293.742 442.258 287.994 435.17 288 Z M 435.17 160 L 204.83 160 C 197.742 159.994 191.994 165.742 192 172.83 L 192 211.17 C 191.994 218.258 197.742 224.006 204.83 224 L 435.17 224 C 442.258 224.006 448.006 218.258 448 211.17 L 448 172.83 C 448.006 165.742 442.258 159.994 435.17 160 Z M 432 32 L 16 32 C 7.163 32 0 39.163 0 48 L 0 80 C 0 88.837 7.163 96 16 96 L 432 96 C 440.837 96 448 88.837 448 80 L 448 48 C 448 39.163 440.837 32 432 32 Z"/>
    <path fill="currentColor" d="M 28.779 148.843 L 124.779 244.843 C 131.022 251.091 131.022 261.215 124.779 267.463 L 28.779 363.463 C 18.739 373.483 1.469 366.363 1.469 352.143 L 1.469 160.143 C 1.469 145.833 18.799 138.843 28.779 148.843 Z" transform="matrix(-1, 0, 0, -1, 130.930252, 512.290833)"/>
  </svg>
`;

const clearFormatting = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="remove-format" class="svg-inline--fa fa-remove-format fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M336 416h-11.17l9.26-27.77L267 336.4 240.49 416H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm297.82 42.1L377 259.59 426.17 112H544v32a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16H176a16 16 0 0 0-16 16v43.9L45.46 3.38A16 16 0 0 0 23 6.19L3.37 31.46a16 16 0 0 0 2.81 22.45l588.36 454.72a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zM309.91 207.76L224 141.36V112h117.83z"></path></svg>
`;

const gripVertical = (width=13, height=13) => x`
  <svg width=${width} height=${height} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="grip-vertical" class="svg-inline--fa fa-grip-vertical fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M96 32H32C14.33 32 0 46.33 0 64v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zM288 32h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32z"></path></svg>
`;

class CtznEditorBlock extends h$1 {
  static get properties () {
    return {
      definition: {type: Object} // a CtznEditorBlockDefinition
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super();
    this.isBufferFocused = false;
    this.definition = undefined;
    if (this.containsBlocks) {
      this.addEventListener('select-prev-block', this.onSelectPrevBlock.bind(this));
      this.addEventListener('select-next-block', this.onSelectNextBlock.bind(this));
      this.addEventListener('append-new-block', this.onAppendNewBlock.bind(this));
      this.addEventListener('set-block-tag', this.onSetBlockTag.bind(this));
      this.addEventListener('delete-block', this.onDeleteBlock.bind(this));
      this.addEventListener('split-block', this.onSplitBlock.bind(this));
      this.addEventListener('join-block', this.onJoinBlock.bind(this));
    }
  }

  get buffer () {
    return this.querySelector('.buffer')
  }

  get subBlocks () {
    if (this.canChangeTag) {
      return Array.from(this.querySelectorAll(':scope > .block-wrapper > .block-content > *[is-block]'))
    }
    return Array.from(this.querySelectorAll(':scope > .block-content > *[is-block]'))
  }

  get containsBlocks () {
    return false
  }

  get defaultSubBlockTag () {
    return 'p'
  }

  get canChangeTag () {
    return true
  }

  isCursorAtStart () {
    const buffer = this.buffer;
    if (!buffer) return false
    const sel = window.getSelection();
    if (!sel.isCollapsed) return false

    const range = sel.getRangeAt(0);
    const range2 = document.createRange();
    range2.selectNodeContents(this.buffer);
    range2.setEnd(range.startContainer, range.startOffset);
    return range2.cloneContents().textContent.trim().length === 0
  }

  isCursorAtEnd () {
    const buffer = this.buffer;
    if (!buffer) return
    const sel = window.getSelection();
    if (!sel.isCollapsed) return
    
    const range = sel.getRangeAt(0);
    const range2 = document.createRange();
    range2.selectNodeContents(this.buffer);
    range2.setStart(range.endContainer, range.endOffset);
    return range2.cloneContents().textContent.trim().length === 0
  }

  checkIfCursorMoved () {
    let didMove = false;
    const currentRange = window.getSelection().getRangeAt(0);
    if (this.lastSelectionRange) {
      if (currentRange.compareBoundaryPoints(Range.START_TO_START, this.lastSelectionRange) !== 0) {
        didMove = true;
      } else if (currentRange.compareBoundaryPoints(Range.END_TO_END, this.lastSelectionRange) !== 0) {
        didMove = true;
      }
    }
    this.lastSelectionRange = currentRange;
    if (didMove) this.emitStateChanged();
    return didMove
  }

  async focusBuffer (direction, cursorPos) {
    if (this.containsBlocks) {
      if (!this.definition?.blocks?.length) {
        return
      }
      if (direction === 'up') {
        this.subBlocks[this.definition.blocks.length - 1].focusBuffer(direction, cursorPos);
      } else {
        this.subBlocks[0]?.focusBuffer(direction, cursorPos);
      }
    } else {
      if (!this.buffer) {
        await this.updateComplete;
        if (!this.buffer) return
      }

      if (typeof cursorPos === 'number') {
        setPlainTextCaretOffset(this.buffer, cursorPos);
      } else {
        this.buffer.focus();
      }
    }
  }

  getFocusedSubBlock () {
    return this.subBlocks.find(b => b.isBufferFocused)
  }
  
  // rendering
  // =

  render () {
    if (!this.definition) return T``
    if (!this.canChangeTag) {
      return T`<div class="block-content as-${this.definition.tagName}">${this.renderContent()}</div>`
    }
    return T`
      <div class="block-wrapper">
        <div class="block-ctrl" @click=${this.onClickMenu}>
          <span>${gripVertical(14, 14)}</span>
        </div>
        <div class="menu-container"></div>
        <div class="block-content as-${this.definition.tagName}">${this.renderContent()}</div>
      </div>
    `
  }

  renderContent () {
    if (this.containsBlocks) {
      return this.renderSubBlocks()
    } else {
      return this.renderBuffer()
    }
  }

  renderSubBlocks () {
    return T`
      ${c$1(this.definition.blocks, block => block.id, this.renderSubBlock.bind(this))}
    `
  }

  renderSubBlock (block, index) {
    switch (block.tagName) {
      case 'ul': return T`<ctzn-editor-block--ul is-block .definition=${block} data-index=${index}></ctzn-editor-block--ul>`
      case 'ol': return T`<ctzn-editor-block--ol is-block .definition=${block} data-index=${index}></ctzn-editor-block--ol>`
      case 'li': return T`<ctzn-editor-block--li is-block .definition=${block} data-index=${index}></ctzn-editor-block--li>`
      default: return T`<ctzn-editor-block is-block .definition=${block} data-index=${index}></ctzn-editor-block>`
    }
  }
  
  renderBuffer () {
    return T`
      <div
        class="buffer"
        contenteditable
        @keydown=${this.onKeydownBuffer}
        @keyup=${this.onKeyupBuffer}
        @click=${this.onClickBuffer}
        @input=${this.onInputBuffer}
        @focus=${this.onFocusBuffer}
        @blur=${this.onBlurBuffer}
      >${o$1(this.definition.content || '')}</div>
    `
  }

  // events
  // =

  emitStateChanged () {
    this.dispatchEvent(new Event('state-changed', {bubbles: true}));
  }

  onClickMenu (e) {
    e.preventDefault();
    e.stopPropagation();

    const setBlockTag = (tagName) => this.dispatchEvent(new CustomEvent('set-block-tag', {detail: {tagName}, bubbles: true}));
    create({
      parent: this.querySelector('.menu-container'),
      x: 0,
      y: 0,
      noBorders: true,
      items: [
        {label: 'Text', click: () => setBlockTag('p')},
        {label: 'H1', click: () => setBlockTag('h1')},
        {label: 'H2', click: () => setBlockTag('h2')},
        {label: 'H3', click: () => setBlockTag('h3')},
        {label: 'H4', click: () => setBlockTag('h4')},
        {label: 'H5', click: () => setBlockTag('h5')},
        {label: 'H6', click: () => setBlockTag('h6')},
        {label: 'Quote', click: () => setBlockTag('blockquote')},
        '-',
        {label: 'Bullet List', click: () => setBlockTag('ul')},
        {label: 'Numbered List', click: () => setBlockTag('ol')},
        '-',
        {label: 'Separator', click: () => setBlockTag('hr')},
        '-',
        {label: 'Table', click: () => setBlockTag('table')}
      ]
    });
  }

  onKeydownBuffer (e) {
    const redispatch = (eventName, detail) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent(eventName, {bubbles: true, detail}));
    };
    switch (e.code) {
      case 'ArrowUp': return redispatch('select-prev-block')
      case 'ArrowDown': return redispatch('select-next-block')
      case 'Enter':
      case 'NumpadEnter':
        if (this.definition.content && !this.isCursorAtEnd()) {
          return redispatch('split-block')
        } else {
          return redispatch('append-new-block')
        }
      case 'Backspace':
      case 'Delete':
        if (!this.definition.content) {
          return redispatch('delete-block')
        } else if (e.code === 'Backspace' && this.isCursorAtStart()) {
          return redispatch('join-block', {dir: -1})
        } else if (e.code === 'Delete' && this.isCursorAtEnd()) {
          return redispatch('join-block', {dir: 1})
        }
    }
  }

  onKeyupBuffer (e) {
    this.checkIfCursorMoved();
  }

  onClickBuffer (e) {
    this.checkIfCursorMoved();
  }

  onInputBuffer (e) {
    this.definition.content = this.buffer.innerHTML.replace(/<\!--.*?-->/g, "").trim();
    this.emitStateChanged();
  }

  onFocusBuffer (e) {
    this.isBufferFocused = true;
    this.classList.add('focused');
  }

  onBlurBuffer (e) {
    this.isBufferFocused = false;
    this.classList.remove('focused');
  }

  onSelectPrevBlock (e) {    
    e.stopPropagation();
    if (e.target.previousElementSibling?.hasAttribute('is-block')) {
      const cursorPos = getPlainTextCaretOffset(this.getFocusedSubBlock()?.buffer);
      e.target.previousElementSibling.focusBuffer('up', cursorPos);
      this.emitStateChanged();
    } else if (this.definition.tagName !== 'editor') {
      this.dispatchEvent(new CustomEvent('select-prev-block', {bubbles: true}));
    }
  }

  onSelectNextBlock (e) {    
    e.stopPropagation();
    if (e.target.nextElementSibling?.hasAttribute('is-block')) {
      const cursorPos = getPlainTextCaretOffset(this.getFocusedSubBlock()?.buffer);
      e.target.nextElementSibling.focusBuffer('down', cursorPos);
      this.emitStateChanged();
    } else if (this.definition.tagName !== 'editor') {
      this.dispatchEvent(new CustomEvent('select-next-block', {bubbles: true}));
    }
  }

  async onAppendNewBlock (e) {
    e.stopPropagation();
    
    const index = +e.target.dataset.index;
    const newBlock = new CtznEditorBlockDefinition({tagName: this.defaultSubBlockTag, content: ''});
    if (this.definition.blocks[index + 1]) {
      this.definition.blocks = [
        ...this.definition.blocks.slice(0, index + 1),
        newBlock,
        ...this.definition.blocks.slice(index + 1)
      ];
    } else {
      this.definition.blocks = [
        ...this.definition.blocks,
        newBlock
      ];
    }
    this.requestUpdate();
    await this.updateComplete;
    this.subBlocks[index + 1].focusBuffer('down');
    this.emitStateChanged();
  }

  async onSetBlockTag (e) {
    if (e.target === this) return // bubble up to parent
    e.stopPropagation();
    
    const index = +e.target.dataset.index;
    this.definition.blocks = [
      ...this.definition.blocks.slice(0, index),
      this.definition.blocks[index].convertTo(e.detail.tagName),
      ...this.definition.blocks.slice(index + 1)
    ];
    this.requestUpdate();
    await this.updateComplete;
    this.subBlocks[index].focusBuffer();
    this.emitStateChanged();
  }

  async onDeleteBlock (e) {
    if (e.target === this) return // bubble up to parent
    e.stopPropagation();

    const index = +e.target.dataset.index;
    this.definition.blocks = [
      ...this.definition.blocks.slice(0, index),
      ...this.definition.blocks.slice(index + 1)
    ];
    this.requestUpdate();
    await this.updateComplete;

    if (this.definition.blocks.length === 0) {
      this.dispatchEvent(new CustomEvent('delete-block', {bubbles: true}));
    } else {
      this.subBlocks[Math.max(0, index - 1)].focusBuffer('up');
    }
    this.emitStateChanged();
  }

  async onSplitBlock (e) {
    e.stopPropagation();
    
    const srcIndex = +e.target.dataset.index;
    const srcBlock = this.definition.blocks[srcIndex];
    const {leftContent, rightContent} = splitContentAtCursor(this.subBlocks[srcIndex].buffer);
    const newBlock1 = new CtznEditorBlockDefinition({tagName: srcBlock.tagName, content: leftContent});
    const newBlock2 = new CtznEditorBlockDefinition({tagName: srcBlock.tagName, content: rightContent});
    this.definition.blocks = [
      ...this.definition.blocks.slice(0, srcIndex),
      newBlock1,
      newBlock2,
      ...this.definition.blocks.slice(srcIndex + 1)
    ];
    this.requestUpdate();
    await this.updateComplete;
    this.subBlocks[srcIndex + 1].focusBuffer('down');
    this.emitStateChanged();
  }

  async onJoinBlock (e) {
    if (e.target === this) return // bubble up to parent
    e.stopPropagation();

    let srcIndex = +e.target.dataset.index;
    let srcBlock = this.definition.blocks[srcIndex];
    let dstIndex = srcIndex + e.detail.dir;
    let dstBlock = this.definition.blocks[dstIndex];
    if (!srcBlock || !dstBlock) return

    // TODO
    // handle joins between branches and leaves

    const minIndex = Math.min(srcIndex, dstIndex);
    const content = (e.detail.dir < 0)
      ? `${dstBlock.content}${srcBlock.content}`
      : `${srcBlock.content}${dstBlock.content}`;

    this.definition.blocks = [
      ...this.definition.blocks.slice(0, minIndex),
      dstBlock.clone({content}),
      ...this.definition.blocks.slice(minIndex + 2)
    ];
    this.requestUpdate();
    await this.updateComplete;
    this.subBlocks[minIndex].focusBuffer(
      e.detail.dir > 0 ? 'down' : 'up',
      e.detail.dir > 0 ? srcBlock.content.length : dstBlock.content.length
    );
    this.emitStateChanged();
  }
}
customElements.define('ctzn-editor-block', CtznEditorBlock);

class CtznEditorBlock_Editor extends CtznEditorBlock {
  constructor () {
    super();
  }

  get canChangeTag () {
    return false
  }

  get containsBlocks () {
    return true
  }
}
customElements.define('ctzn-editor-block--editor', CtznEditorBlock_Editor);

class CtznEditorBlock_UL extends CtznEditorBlock {
  get containsBlocks () {
    return true
  }

  get canChangeTag () {
    return true
  }

  get defaultSubBlockTag () {
    return 'li'
  }

  // events
  // =

  async onAppendNewBlock (e) {
    if (e.target === this) return
    e.stopPropagation();

    const focusedBlock = this.getFocusedSubBlock();
    console.log(focusedBlock);
    if (focusedBlock) {
      const focusedBlockIndex = +focusedBlock.dataset.index;
      if (focusedBlockIndex === this.definition.blocks.length - 1 && focusedBlock.definition.content.trim().length === 0) {
        this.definition.blocks = this.definition.blocks.slice(0, this.definition.blocks.length - 1);
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('append-new-block', {bubbles: true}));
        return
      }
    }
    super.onAppendNewBlock(e);
  }
}
customElements.define('ctzn-editor-block--ul', CtznEditorBlock_UL);

class CtznEditorBlock_OL extends CtznEditorBlock {
  get containsBlocks () {
    return true
  }

  get canChangeTag () {
    return true
  }

  get defaultSubBlockTag () {
    return 'li'
  }

  // events
  // =

  async onAppendNewBlock (e) {
    if (e.target === this) return
    e.stopPropagation();

    const focusedBlock = this.getFocusedSubBlock();
    if (focusedBlock) {
      const focusedBlockIndex = +focusedBlock.dataset.index;
      if (focusedBlockIndex === this.definition.blocks.length - 1 && focusedBlock.definition.content.trim().length === 0) {
        this.definition.blocks = this.definition.blocks.slice(0, this.definition.blocks.length - 1);
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('append-new-block', {bubbles: true}));
        return
      }
    }
    super.onAppendNewBlock(e);
  }
}
customElements.define('ctzn-editor-block--ol', CtznEditorBlock_OL);

class CtznEditorBlock_LI extends CtznEditorBlock {
  get containsBlocks () {
    return false
  }

  get canChangeTag () {
    return false
  }
  /*renderBuffer () {
    return html`
      <ul>
        <li contenteditable @keydown=${this.onKeyDown} @input=${this.onInput}></li>
      </ul>
      <div class="buffer as-${this.definition.tagName}" contenteditable @keydown=${this.onKeyDown} @input=${this.onInput}>
        ${unsafeHTML(this.definition.content)}
      </div>
    `
  }*/
}
customElements.define('ctzn-editor-block--li', CtznEditorBlock_LI);

class CtznEditorToolbar extends h$1 {
  static get properties () {
    return {
      richTextState: {type: Object}
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super();
    this.richTextState = {};
    this.TOOLBAR_ITEMS = [
      new ToolbarCtrl_History(-1),
      new ToolbarCtrl_History(1),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_Formatting('bold'),
      new ToolbarCtrl_Formatting('italic'),
      new ToolbarCtrl_Formatting('underline'),
      new ToolbarCtrl_Formatting('strikeThrough'),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_Link(),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_Formatting('superscript'),
      new ToolbarCtrl_Formatting('subscript'),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_Indent(1),
      new ToolbarCtrl_Indent(-1),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_ClearFormatting()
    ];
  }

  get editorEl () {
    return this.parentElement
  }

  // rendering
  // =

  render () {
    return T`
      <div class="controls">
        ${c$1(this.TOOLBAR_ITEMS, (item, i) => `${i}-${item.id}`, item => item.render(this.richTextState))}
      </div>
    `
  }

  // events
  // =
}
customElements.define('ctzn-editor-toolbar', CtznEditorToolbar);

class ToolbarCtrl {
  get id () {
    return 'base'
  }

  render () {
    return T`
      <div class="disabled">${questionMark()}</div>
    `
  }
}

class ToolbarCtrl_Separator extends ToolbarCtrl {
  get id () {
    return 'sep'
  }

  render () {
    return T`<div class="sep">|</div>`
  }
}

class ToolbarCtrl_Formatting extends ToolbarCtrl {
  constructor (formattingCommand) {
    super();
    this.formattingCommand = formattingCommand;
  }

  get id () {
    return this.formattingCommand
  }

  render (richTextState) {
    const pressed = richTextState[this.formattingCommand];
    const icon = ({
      'bold': bold(),
      'italic': italic(),
      'underline': underline(),
      'strikeThrough': strike(),
      'superscript': superscript(),
      'subscript': subscript()
    })[this.formattingCommand] || questionMark();
    return T`
      <div
        class=${e({btn: true, disabled: this.isDisabled, pressed})}
        @mousedown=${this.onMousedown.bind(this)}
      >
        ${icon}
      </div>
    `
  }

  onMousedown (e) {
    e.preventDefault();
    e.stopPropagation();
    document.execCommand(this.formattingCommand, false, '');
  }
}

class ToolbarCtrl_Link extends ToolbarCtrl_Formatting {
  get id () {
    return 'link'
  }

  render () {
    return T`
      <div class="btn disabled">${link()}</div>
    `
  }
}

class ToolbarCtrl_History extends ToolbarCtrl {
  constructor (direction) {
    super();
    this.direction = direction;
  }

  get id () {
    return this.direction === 1 ? 'redo' : 'undo'
  }

  render () {
    return T`
      <div class="btn disabled">${this.direction < 0 ? undo() : redo()}</div>
    `
  }
}

class ToolbarCtrl_Indent extends ToolbarCtrl {
  constructor (direction) {
    super();
    this.direction = direction;
  }

  get id () {
    return this.direction === 1 ? 'indent' : 'deindent'
  }

  render () {
    return T`
      <div class="btn disabled">${this.direction < 0 ? deindent() : indent()}</div>
    `
  }
}

class ToolbarCtrl_ClearFormatting extends ToolbarCtrl {
  constructor () {
    super();
  }

  get id () {
    return 'clear-formatting'
  }

  render () {
    return T`
      <div class="btn" @mousedown=${this.onMousedown.bind(this)}>${clearFormatting()}</div>
    `
  }

  onMousedown (e) {
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('removeFormat', false, '');
  }
}

class CtznEditor extends h$1 {
  static get properties () {
    return {
      rootBlock: {type: Object},
      richTextState: {type: Object}
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super();

    this.rootBlock = new CtznEditorBlockDefinition({tagName: 'editor', blocks: [
      new CtznEditorBlockDefinition({tagName: 'p', content: ''})
    ]});
    this.richTextState = {
      appliedStates: {}
    };
  }

  get toolbar () {
    return this.querySelector('ctzn-editor-toolbar')
  }

  fromHTML (str) {
    this.rootBlock = fromHTML(str);
  }

  toHTML () {
    return this.rootBlock.toHTML()
  }

  toJSON () {
    return this.rootBlock
  }

  // rendering
  // =

  render () {
    return T`
      <ctzn-editor-toolbar
        .richTextState=${this.richTextState}
      ></ctzn-editor-toolbar>
      <ctzn-editor-block--editor
        .definition=${this.rootBlock}
        @state-changed=${this.onEditorStateChanged}
      ></ctzn-editor-block--editor>
    `
  }

  // events
  // =

  onEditorStateChanged (e) {
    this.richTextState = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      superscript: document.queryCommandState('superscript'),
      subscript: document.queryCommandState('subscript')
    };
  }
}
customElements.define('ctzn-editor', CtznEditor);

exports.CtznEditor = CtznEditor;
//# sourceMappingURL=index.js.map
