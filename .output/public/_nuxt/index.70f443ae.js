import{c as D}from"./index-4beab083.aa6fe3da.js";import{r as p,m as F,n as U,c as b,o as E,a as o,b as y,w as t,d as v,e as l,f as s,i as V,g as L,h as M,F as $,j as d,t as m,l as z}from"./entry.f1d16f64.js";import{V as A}from"./VDataTable.cc0fd40d.js";const G={class:"font-weight-regular"},P={__name:"index",setup(H){const i=p([]),c=p([]),f=F(),w=U(),C=b(()=>{const n=i.value.map(e=>e.class);return c.value=[...new Set(n)].sort((e,r)=>e.localeCompare(r))[0],[...new Set(n)].sort((e,r)=>e.localeCompare(r))}),_=b(()=>i.value.filter(n=>c.value.includes(n.class))),k=[{title:"Title",key:"title",sortable:!0}],x=(n,e)=>{const r=e.item.value;w.push({path:"/notes/"+r})};E(async()=>{i.value=await D("619787c75b60479886c147cf746bfbb8"),f.query.class&&(c.value=f.query.class),i.value.sort((n,e)=>n.title.localeCompare(e.title)),console.log(i.value)});const u=p("");return(n,e)=>{const r=o("v-tab"),T=o("v-tabs"),g=o("v-col"),h=o("v-row"),S=o("v-icon"),B=o("v-text-field"),N=o("v-chip"),R=o("v-card"),j=o("v-container");return v(),y(j,{class:"my-5"},{default:t(()=>[l(h,{"no-gutters":"",class:"justify-center"},{default:t(()=>[l(g,{class:"ma-2","align-self":"start"},{default:t(()=>[l(T,{modelValue:s(c),"onUpdate:modelValue":e[0]||(e[0]=a=>V(c)?c.value=a:null),"center-active":""},{default:t(()=>[(v(!0),L($,null,M(s(C),(a,q)=>(v(),y(r,{key:q,value:a},{title:t(()=>[d(m(a),1)]),default:t(()=>[d(" "+m(a),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(h,null,{default:t(()=>[l(g,{class:"ma-2","align-self":"start"},{default:t(()=>[l(R,{class:"pa-3 elevation-4 rounded-lg"},{default:t(()=>[l(B,{modelValue:s(u),"onUpdate:modelValue":e[1]||(e[1]=a=>V(u)?u.value=a:null),label:"Search",filled:"","hide-details":"",class:"ma-1",clearable:"","onClick:clear":e[2]||(e[2]=a=>u.value=""),solo:"",color:"primary",placeholder:"Search..."},{prepend:t(()=>[l(S,{color:"primary"},{default:t(()=>[d("mdi-magnify")]),_:1})]),_:1},8,["modelValue"]),l(s(A),{headers:k,items:s(_),"items-length":s(_).length,"hide-default-footer":"",dense:"",hover:"",search:s(u),"onClick:row":x,loading:s(_).length===0&&s(u).length===0,"items-per-page":10},{"item.title":t(({item:a})=>[l(N,{class:"mr-2 mt-2",color:"primary"},{default:t(()=>[d(m(a.selectable.subclass),1)]),_:2},1024),z("span",G,m(a.selectable.title),1)]),_:1},8,["items","items-length","search","loading"])]),_:1})]),_:1})]),_:1})]),_:1})}}};export{P as default};
