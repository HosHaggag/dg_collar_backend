import{t as U,q as H,s as N,_ as v,r as c,y as z,z as k,j as I,aU as Y,A as W,C as G,aD as Z,aV as ee,aB as $,M as se,aa as te,G as oe,aW as ne,O as re,E as O}from"./index-6f2efa30.js";function ae(s){return H("MuiList",s)}const ie=U("MuiList",["root","padding","dense","subheader"]),Se=ie,le=["children","className","component","dense","disablePadding","subheader"],ue=s=>{const{classes:e,disablePadding:t,dense:f,subheader:p}=s;return G({root:["root",!t&&"padding",f&&"dense",p&&"subheader"]},ae,e)},ce=N("ul",{name:"MuiList",slot:"Root",overridesResolver:(s,e)=>{const{ownerState:t}=s;return[e.root,!t.disablePadding&&e.padding,t.dense&&e.dense,t.subheader&&e.subheader]}})(({ownerState:s})=>v({listStyle:"none",margin:0,padding:0,position:"relative"},!s.disablePadding&&{paddingTop:8,paddingBottom:8},s.subheader&&{paddingTop:0})),pe=c.forwardRef(function(e,t){const f=z({props:e,name:"MuiList"}),{children:p,className:m,component:l="ul",dense:r=!1,disablePadding:g=!1,subheader:b}=f,P=k(f,le),y=c.useMemo(()=>({dense:r}),[r]),x=v({},f,{component:l,dense:r,disablePadding:g}),d=ue(x);return I.jsx(Y.Provider,{value:y,children:I.jsxs(ce,v({as:l,className:W(d.root,m),ref:t,ownerState:x},P,{children:[b,p]}))})}),de=pe,fe=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function j(s,e,t){return s===e?s.firstChild:e&&e.nextElementSibling?e.nextElementSibling:t?null:s.firstChild}function A(s,e,t){return s===e?t?s.firstChild:s.lastChild:e&&e.previousElementSibling?e.previousElementSibling:t?null:s.lastChild}function V(s,e){if(e===void 0)return!0;let t=s.innerText;return t===void 0&&(t=s.textContent),t=t.trim().toLowerCase(),t.length===0?!1:e.repeating?t[0]===e.keys[0]:t.indexOf(e.keys.join(""))===0}function S(s,e,t,f,p,m){let l=!1,r=p(s,e,e?t:!1);for(;r;){if(r===s.firstChild){if(l)return!1;l=!0}const g=f?!1:r.disabled||r.getAttribute("aria-disabled")==="true";if(!r.hasAttribute("tabindex")||!V(r,m)||g)r=p(s,r,t);else return r.focus(),!0}return!1}const he=c.forwardRef(function(e,t){const{actions:f,autoFocus:p=!1,autoFocusItem:m=!1,children:l,className:r,disabledItemsFocusable:g=!1,disableListWrap:b=!1,onKeyDown:P,variant:y="selectedMenu"}=e,x=k(e,fe),d=c.useRef(null),K=c.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Z(()=>{p&&d.current.focus()},[p]),c.useImperativeHandle(f,()=>({adjustStyleForScrollbar:(o,{direction:a})=>{const u=!d.current.style.width;if(o.clientHeight<d.current.clientHeight&&u){const h=`${ee($(o))}px`;d.current.style[a==="rtl"?"paddingLeft":"paddingRight"]=h,d.current.style.width=`calc(100% + ${h})`}return d.current}}),[]);const D=o=>{const a=d.current,u=o.key,h=$(a).activeElement;if(u==="ArrowDown")o.preventDefault(),S(a,h,b,g,j);else if(u==="ArrowUp")o.preventDefault(),S(a,h,b,g,A);else if(u==="Home")o.preventDefault(),S(a,null,b,g,j);else if(u==="End")o.preventDefault(),S(a,null,b,g,A);else if(u.length===1){const n=K.current,w=u.toLowerCase(),F=performance.now();n.keys.length>0&&(F-n.lastTime>500?(n.keys=[],n.repeating=!0,n.previousKeyMatched=!0):n.repeating&&w!==n.keys[0]&&(n.repeating=!1)),n.lastTime=F,n.keys.push(w);const R=h&&!n.repeating&&V(h,n);n.previousKeyMatched&&(R||S(a,h,!1,g,j,n))?o.preventDefault():n.previousKeyMatched=!1}P&&P(o)},C=se(d,t);let i=-1;c.Children.forEach(l,(o,a)=>{if(!c.isValidElement(o)){i===a&&(i+=1,i>=l.length&&(i=-1));return}o.props.disabled||(y==="selectedMenu"&&o.props.selected||i===-1)&&(i=a),i===a&&(o.props.disabled||o.props.muiSkipListHighlight||o.type.muiSkipListHighlight)&&(i+=1,i>=l.length&&(i=-1))});const L=c.Children.map(l,(o,a)=>{if(a===i){const u={};return m&&(u.autoFocus=!0),o.props.tabIndex===void 0&&y==="selectedMenu"&&(u.tabIndex=0),c.cloneElement(o,u)}return o});return I.jsx(de,v({role:"menu",ref:C,className:r,onKeyDown:D,tabIndex:p?0:-1},x,{children:L}))}),me=he;function ge(s){return H("MuiMenu",s)}U("MuiMenu",["root","paper","list"]);const be=["onEntering"],Me=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Pe={vertical:"top",horizontal:"right"},ye={vertical:"top",horizontal:"left"},ve=s=>{const{classes:e}=s;return G({root:["root"],paper:["paper"],list:["list"]},ge,e)},xe=N(te,{shouldForwardProp:s=>oe(s)||s==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(s,e)=>e.root})({}),we=N(ne,{name:"MuiMenu",slot:"Paper",overridesResolver:(s,e)=>e.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Ce=N(me,{name:"MuiMenu",slot:"List",overridesResolver:(s,e)=>e.list})({outline:0}),Le=c.forwardRef(function(e,t){var f,p;const m=z({props:e,name:"MuiMenu"}),{autoFocus:l=!0,children:r,className:g,disableAutoFocusItem:b=!1,MenuListProps:P={},onClose:y,open:x,PaperProps:d={},PopoverClasses:K,transitionDuration:D="auto",TransitionProps:{onEntering:C}={},variant:i="selectedMenu",slots:L={},slotProps:o={}}=m,a=k(m.TransitionProps,be),u=k(m,Me),h=re(),n=v({},m,{autoFocus:l,disableAutoFocusItem:b,MenuListProps:P,onEntering:C,PaperProps:d,transitionDuration:D,TransitionProps:a,variant:i}),w=ve(n),F=l&&!b&&x,R=c.useRef(null),B=(M,T)=>{R.current&&R.current.adjustStyleForScrollbar(M,{direction:h?"rtl":"ltr"}),C&&C(M,T)},q=M=>{M.key==="Tab"&&(M.preventDefault(),y&&y(M,"tabKeyDown"))};let E=-1;c.Children.map(r,(M,T)=>{c.isValidElement(M)&&(M.props.disabled||(i==="selectedMenu"&&M.props.selected||E===-1)&&(E=T))});const _=(f=L.paper)!=null?f:we,J=(p=o.paper)!=null?p:d,Q=O({elementType:L.root,externalSlotProps:o.root,ownerState:n,className:[w.root,g]}),X=O({elementType:_,externalSlotProps:J,ownerState:n,className:w.paper});return I.jsx(xe,v({onClose:y,anchorOrigin:{vertical:"bottom",horizontal:h?"right":"left"},transformOrigin:h?Pe:ye,slots:{paper:_,root:L.root},slotProps:{root:Q,paper:X},open:x,ref:t,transitionDuration:D,TransitionProps:v({onEntering:B},a),ownerState:n},u,{classes:K,children:I.jsx(Ce,v({onKeyDown:q,actions:R,autoFocus:l&&(E===-1||b),autoFocusItem:F,variant:i},P,{className:W(w.list,P.className),children:r}))}))}),Ie=Le;export{Ie as M,Se as l};
