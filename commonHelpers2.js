import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as t}from"./assets/vendor-77e16229.js";const m=document.querySelector(".form");m.addEventListener("submit",l);function l(o){o.preventDefault();const s=o.target.delay.value,i=o.target.state.value;new Promise((e,r)=>{setTimeout(()=>{i==="fulfilled"?e(s):r(s)},s)}).then(e=>{console.log(`✅ Fulfilled promise in ${e}ms`),t.success({message:`Fulfilled promise in ${e}ms`,messageSize:"16px",messageColor:"#fff",backgroundColor:"#59a10d",position:"topRight",close:!0})}).catch(e=>{console.log(`❌ Rejected promise in ${e}ms`),t.error({message:`Rejected promise in ${e}ms`,messageSize:"16px",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",close:!0})})}
//# sourceMappingURL=commonHelpers2.js.map
