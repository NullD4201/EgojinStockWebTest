const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CkUeu7at.js","assets/qr-generator-CkRw2xrd.js"])))=>i.map(i=>d[i]);
import{u as o,o as h,_ as E,r as k,q as I}from"./index-Pn9Rsdm9.js";import{p as x}from"./qr-generator-CkRw2xrd.js";let p=null,u=null,i=null,m=!1;async function T(){const n=document.getElementById("nfc-result"),t=document.getElementById("nfc-status-text"),e=document.getElementById("nfc-icon");if("NDEFReader"in window)try{u=new AbortController,p=new NDEFReader,await p.scan({signal:u.signal}),t.textContent="NFC 대기 중...",e.style.color="var(--color-success)",o.showToast("NFC 인식 준비 완료","success"),p.addEventListener("reading",({serialNumber:a,message:s})=>{for(const c of s.records){if(c.recordType==="text"){const r=new TextDecoder(c.encoding||"utf-8").decode(c.data);l(r);return}if(c.recordType==="url"){const r=new TextDecoder().decode(c.data);try{const d=new URL(r).searchParams.get("data");if(d){l(d);return}}catch{}l(r);return}}o.showToast("인식할 수 없는 태그입니다","error")}),p.addEventListener("readingerror",()=>{o.showToast("태그 읽기 실패","error")})}catch(a){console.error("NFC error:",a),t.textContent="NFC를 사용할 수 없습니다",e.style.animation="none",e.style.opacity="0.4",n.innerHTML=`
        <div class="card" style="background: rgba(239, 68, 68, 0.1); border-color: var(--color-error);">
          <h3 style="color: var(--color-error); margin-bottom: var(--spacing-sm);">NFC 오류</h3>
          <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
            NFC 권한을 허용하거나, NFC를 지원하는 기기에서 사용해주세요.
          </p>
        </div>
      `,n.classList.remove("hidden")}else document.getElementById("nfc-page-title").textContent="QR 태그인식",document.getElementById("nfc-status").style.display="none",document.getElementById("qr-fallback").classList.remove("hidden"),document.getElementById("qr-fallback-start-btn")?.addEventListener("click",()=>{L()});document.getElementById("nfc-test-btn")?.addEventListener("click",async()=>{const a=JSON.stringify({type:"part",partId:2,locationId:"1850602233108"});await l(a)})}async function L(){const n=document.getElementById("qr-fallback-prompt");try{const{Html5Qrcode:t}=await E(async()=>{const{Html5Qrcode:e}=await import("./index-CkUeu7at.js");return{Html5Qrcode:e}},__vite__mapDeps([0,1]));i=new t("nfc-qr-reader"),await i.start({facingMode:"environment"},{fps:10,qrbox:{width:250,height:250},aspectRatio:1},C,()=>{}),m=!0,n.style.display="none",o.showToast("카메라가 시작되었습니다","success")}catch(t){console.error("Camera error:",t);const e=document.getElementById("nfc-result");e.innerHTML=`
      <div class="card" style="background: rgba(239, 68, 68, 0.1); border-color: var(--color-error);">
        <h3 style="color: var(--color-error); margin-bottom: var(--spacing-sm);">카메라 오류</h3>
        <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
          카메라 권한을 허용해주세요. 브라우저 설정에서 카메라 접근을 허용해야 합니다.
        </p>
      </div>
    `,e.classList.remove("hidden")}}async function C(n){i&&m&&(m=!1,i.stop().catch(t=>console.error("Error stopping scanner:",t))),await l(n)}function B(){i&&m&&(m=!1,i.stop().catch(n=>console.error("Error stopping scanner:",n)))}async function l(n){const t=x(n);if(!t){o.showToast("올바른 태그 데이터가 아닙니다","error");return}let e;try{e=await h(t.partId)}catch{o.showToast("부속을 찾을 수 없습니다","error");return}const a=e.locations.find(s=>s.code===t.locationId);if(!a){o.showToast("위치를 찾을 수 없습니다","error");return}u&&(u.abort(),u=null),q(e,a)}function q(n,t){const e=document.getElementById("nfc-result"),a=document.getElementById("nfc-status"),s=document.getElementById("qr-fallback"),c=n.products||[];a.style.display="none",s&&(s.style.display="none"),e.innerHTML=`
    <div class="card" style="background: var(--color-accent-gradient); color: white; padding: var(--spacing-lg);">
      <h2 style="font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--spacing-md); text-align: center;">
        ${n.name}
      </h2>

      <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border-radius: var(--radius-lg); padding: var(--spacing-md); margin-bottom: var(--spacing-md);">
        <div class="flex justify-between items-center">
          <span style="font-weight: 600;">${t.name}</span>
          <span style="font-size: var(--font-size-lg); font-weight: 700;" id="nfc-stock-display">${o.formatNumber(t.stock)}개</span>
        </div>
        <div class="flex gap-sm" style="margin-top: var(--spacing-sm);">
          <input type="number" class="form-input" placeholder="수량" id="nfc-qty-input" style="flex: 1; color: #000;">
          <button class="btn btn-success" id="nfc-in-btn">입고</button>
          <button class="btn btn-danger" id="nfc-out-btn">출고</button>
        </div>
      </div>

      ${c.length>0?`
        <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border-radius: var(--radius-lg); padding: var(--spacing-md); margin-bottom: var(--spacing-md);">
          <h4 style="font-weight: 600; margin-bottom: var(--spacing-sm);">사용 상품</h4>
          ${c.map(r=>`
            <div class="flex justify-between items-center nfc-product-link" data-product-id="${r.id}" style="padding: var(--spacing-xs) 0; cursor: pointer; ${r.status==="nostock"?"opacity: 0.6;":""}">
              <span>${r.name}</span>
              <span style="font-size: var(--font-size-sm); opacity: 0.8;">${r.modelNumber}</span>
            </div>
          `).join("")}
        </div>
      `:""}

      <button class="btn btn-secondary" id="nfc-again-btn" style="width: 100%; background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.4);">
        다시 인식
      </button>
    </div>
  `,e.classList.remove("hidden");const f=async r=>{const g=document.getElementById("nfc-qty-input"),d=parseInt(g.value);if(!d||d<=0){o.showToast("올바른 수량을 입력하세요","error");return}const b=prompt("사유를 입력하세요:");if(b)try{await I(n.id,t.id,r,d,b),o.showToast(`${r==="in"?"입고":"출고"} 처리되었습니다`,"success"),g.value="";const y=(await h(n.id)).locations.find(w=>w.id===t.id);y&&(t.stock=y.stock,document.getElementById("nfc-stock-display").textContent=`${o.formatNumber(y.stock)}개`)}catch(v){o.showToast(v.message||"처리에 실패했습니다","error")}};document.getElementById("nfc-in-btn").addEventListener("click",()=>f("in")),document.getElementById("nfc-out-btn").addEventListener("click",()=>f("out")),document.querySelectorAll(".nfc-product-link").forEach(r=>{r.addEventListener("click",()=>{k.navigate(`/product-detail?id=${r.dataset.productId}`)})}),document.getElementById("nfc-again-btn").addEventListener("click",()=>{a.style.display="",s&&(s.style.display="",document.getElementById("qr-fallback-prompt").style.display=""),e.classList.add("hidden"),e.innerHTML="",T()}),o.showToast(`${n.name} 태그 인식 완료`,"success")}window.addEventListener("beforeunload",()=>{B()});export{T as initNfcPage};
