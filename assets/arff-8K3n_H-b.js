import{g as s}from"./index-y8MlQU8U.js";function c(r,a){for(var f=0;f<a.length;f++){const e=a[f];if(typeof e!="string"&&!Array.isArray(e)){for(const t in e)if(t!=="default"&&!(t in r)){const n=Object.getOwnPropertyDescriptor(e,t);n&&Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:()=>e[t]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}var o,i;function d(){if(i)return o;i=1,o=r,r.displayName="arff",r.aliases=[];function r(a){a.languages.arff={comment:/%.*/,string:{pattern:/(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},keyword:/@(?:attribute|data|end|relation)\b/i,number:/\b\d+(?:\.\d+)?\b/,punctuation:/[{},]/}}return o}var u=d();const g=s(u),p=c({__proto__:null,default:g},[u]);export{p as a};
//# sourceMappingURL=arff-8K3n_H-b.js.map
