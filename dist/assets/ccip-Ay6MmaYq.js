import{aR as p,aS as m,aT as y,aU as k,aV as b,aW as E,aX as L,aY as O,aZ as h,a_ as x}from"./index-_Oy-K279.js";class R extends p{constructor({callbackSelector:r,cause:e,data:o,extraData:c,sender:d,urls:a}){var i;super(e.shortMessage||"An error occurred while fetching for an offchain result.",{cause:e,metaMessages:[...e.metaMessages||[],(i=e.metaMessages)!=null&&i.length?"":[],"Offchain Gateway Call:",a&&["  Gateway URL(s):",...a.map(f=>`    ${m(f)}`)],`  Sender: ${d}`,`  Data: ${o}`,`  Callback selector: ${r}`,`  Extra data: ${c}`].flat(),name:"OffchainLookupError"})}}class M extends p{constructor({result:r,url:e}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${m(e)}`,`Response: ${y(r)}`],name:"OffchainLookupResponseMalformedError"})}}class S extends p{constructor({sender:r,to:e}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${e}`,`OffchainLookup sender address: ${r}`],name:"OffchainLookupSenderMismatchError"})}}const A="0x556f1830",$={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function D(n,{blockNumber:r,blockTag:e,data:o,to:c}){const{args:d}=k({data:o,abi:[$]}),[a,i,f,t,s]=d,{ccipRead:u}=n,w=u&&typeof(u==null?void 0:u.request)=="function"?u.request:q;try{if(!b(c,a))throw new S({sender:a,to:c});const l=await w({data:f,sender:a,urls:i}),{data:g}=await E(n,{blockNumber:r,blockTag:e,data:L([t,O([{type:"bytes"},{type:"bytes"}],[l,s])]),to:c});return g}catch(l){throw new R({callbackSelector:t,cause:l,data:o,extraData:s,sender:a,urls:i})}}async function q({data:n,sender:r,urls:e}){var c;let o=new Error("An unknown error occurred.");for(let d=0;d<e.length;d++){const a=e[d],i=a.includes("{data}")?"GET":"POST",f=i==="POST"?{data:n,sender:r}:void 0;try{const t=await fetch(a.replace("{sender}",r).replace("{data}",n),{body:JSON.stringify(f),method:i});let s;if((c=t.headers.get("Content-Type"))!=null&&c.startsWith("application/json")?s=(await t.json()).data:s=await t.text(),!t.ok){o=new h({body:f,details:s!=null&&s.error?y(s.error):t.statusText,headers:t.headers,status:t.status,url:a});continue}if(!x(s)){o=new M({result:s,url:a});continue}return s}catch(t){o=new h({body:f,details:t.message,url:a})}}throw o}export{q as ccipRequest,D as offchainLookup,$ as offchainLookupAbiItem,A as offchainLookupSignature};
