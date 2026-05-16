import{c as s,d as o,u as c,j as e,X as y,a as d,r as g}from"./index-BuxpjGTV.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=s("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=s("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=s("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=s("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=s("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=s("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=s("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=s("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),j=[{label:"Overview",icon:h,path:"/overview"},{label:"Patients",icon:m,path:"/patients"},{label:"Create Request",icon:i,path:"/create-request"},{label:"Reports Vault",icon:x,path:"/reports-vault"},{label:"Send Reports",icon:u,path:"/send-reports"}],k=({open:a,onClose:t})=>{const r=o(),l=c();return a?e.jsxs("div",{className:"fixed inset-0 z-50 lg:hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-foreground/20 backdrop-blur-sm",onClick:t}),e.jsxs("aside",{className:"absolute left-0 top-0 h-full w-64 bg-card border-r border-border shadow-xl flex flex-col animate-fade-in",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b border-border",children:[e.jsx("span",{className:"font-semibold text-foreground",children:"Menu"}),e.jsx("button",{onClick:t,className:"p-1 rounded hover:bg-secondary",children:e.jsx(y,{className:"w-5 h-5"})})]}),e.jsx("nav",{className:"flex-1 py-4 px-3 space-y-1",children:j.map(n=>{const b=r.pathname===n.path;return e.jsxs("button",{onClick:()=>{l(n.path),t()},className:d("flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",b?"bg-accent text-accent-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"),children:[e.jsx(n.icon,{className:"w-5 h-5"}),n.label]},n.path)})}),e.jsx("div",{className:"p-3 border-t border-border",children:e.jsxs("button",{onClick:()=>{l("/login"),t()},className:"flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors",children:[e.jsx(p,{className:"w-5 h-5"}),"Logout"]})})]})]}):null},N=()=>{const[a,t]=g.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs("header",{className:"sticky top-0 z-50 h-[var(--topbar-height)] border-b border-border bg-card flex items-center justify-between px-4 lg:px-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{className:"lg:hidden p-2 rounded-lg hover:bg-secondary",onClick:()=>t(!0),children:e.jsx(v,{className:"w-5 h-5"})}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-primary flex items-center justify-center",children:e.jsx("span",{className:"text-primary-foreground text-xs font-bold",children:"H"})}),e.jsx("span",{className:"font-semibold text-foreground text-lg",children:"HealthLink"}),e.jsx("span",{className:"hidden sm:inline text-xs text-muted-foreground ml-1 bg-secondary px-2 py-0.5 rounded",children:"PATHLAB PORTAL"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("button",{className:"relative p-2 rounded-lg hover:bg-secondary transition-colors",children:[e.jsx(f,{className:"w-5 h-5 text-muted-foreground"}),e.jsx("span",{className:"absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"hidden sm:block text-sm font-medium text-right leading-tight",children:["Fortis Admin",e.jsx("br",{}),e.jsx("span",{className:"text-xs text-muted-foreground font-normal",children:"PathLab"})]}),e.jsx("div",{className:"w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary",children:"FA"})]})]})]}),e.jsx(k,{open:a,onClose:()=>t(!1)})]})},w=[{label:"Overview",icon:h,path:"/overview"},{label:"Patients",icon:m,path:"/patients"},{label:"Create Request",icon:i,path:"/create-request"},{label:"Reports Vault",icon:x,path:"/reports-vault"},{label:"Send Reports",icon:u,path:"/send-reports"}],M=()=>{const a=o(),t=c();return e.jsxs("aside",{className:"hidden lg:flex flex-col w-56 border-r border-border bg-card h-[calc(100vh-var(--topbar-height))] sticky top-[var(--topbar-height)]",children:[e.jsx("nav",{className:"flex-1 py-4 px-3 space-y-1",children:w.map(r=>{const l=a.pathname===r.path;return e.jsxs("button",{onClick:()=>t(r.path),className:d("flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",l?"bg-accent text-accent-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"),children:[e.jsx(r.icon,{className:"w-5 h-5"}),r.label]},r.path)})}),e.jsx("div",{className:"p-3 border-t border-border",children:e.jsxs("button",{onClick:()=>t("/login"),className:"flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors",children:[e.jsx(p,{className:"w-5 h-5"}),"Logout"]})})]})},H=({children:a})=>e.jsxs("div",{className:"min-h-screen bg-background",children:[e.jsx(N,{}),e.jsxs("div",{className:"flex",children:[e.jsx(M,{}),e.jsx("main",{className:"flex-1 min-h-[calc(100vh-var(--topbar-height))]",children:a})]}),e.jsx("footer",{className:"border-t border-border py-4 text-center text-xs text-muted-foreground",children:"© 2026 HealthLink Secure PHR Platform. All data is encrypted and consent-protected."})]});export{H as A,x as F,m as U};
