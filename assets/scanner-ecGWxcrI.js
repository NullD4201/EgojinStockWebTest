import{Html5Qrcode as f}from"./index-CkUeu7at.js";import{p as v}from"./qr-generator-CkRw2xrd.js";import{u as s,o as g,r as h,q as w}from"./index-CbPJfJnL.js";let o=null,i=!1;async function k(){const t=document.getElementById("scan-result"),a=document.getElementById("scanner-prompt");i=!1,document.getElementById("start-camera-btn")?.addEventListener("click",()=>{E(t,a)}),document.getElementById("test-scan-btn")?.addEventListener("click",async()=>{const n=JSON.stringify({type:"part",partId:2,locationId:"1850602233108"});await b(n)})}async function E(t,a){try{o=new f("qr-reader");const n={fps:10,qrbox:{width:250,height:250},aspectRatio:1};await o.start({facingMode:"environment"},n,b,I),i=!0,a.style.display="none",s.showToast("카메라가 시작되었습니다","success")}catch(n){console.error("Camera error:",n),t.innerHTML=`
      <div class="card" style="background: rgba(239, 68, 68, 0.1); border-color: var(--color-error);">
        <h3 style="color: var(--color-error); margin-bottom: var(--spacing-sm);">카메라 오류</h3>
        <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
          카메라 권한을 허용해주세요. 브라우저 설정에서 카메라 접근을 허용해야 합니다.
        </p>
      </div>
    `,t.classList.remove("hidden")}}async function b(t,a){const n=v(t);if(!n){s.showToast("올바른 QR코드가 아닙니다","error");return}let r;try{r=await g(n.partId)}catch{s.showToast("부속을 찾을 수 없습니다","error");return}const c=r.locations.find(e=>e.code===n.locationId);if(!c){s.showToast("위치를 찾을 수 없습니다","error");return}o&&i&&(i=!1,o.stop().catch(e=>{console.error("Error stopping scanner:",e)})),x(r,c)}function I(t){}function x(t,a){const n=document.getElementById("scan-result"),r=t.products||[];n.innerHTML=`
    <div class="card" style="background: var(--color-accent-gradient); color: white; padding: var(--spacing-lg);">
      <h2 style="font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--spacing-md); text-align: center;">
        ${t.name}
      </h2>

      <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border-radius: var(--radius-lg); padding: var(--spacing-md); margin-bottom: var(--spacing-md);">
        <div class="flex justify-between items-center">
          <span style="font-weight: 600;">${a.name}</span>
          <span style="font-size: var(--font-size-lg); font-weight: 700;" id="scan-stock-display">${s.formatNumber(a.stock)}개</span>
        </div>
        <div class="flex gap-sm" style="margin-top: var(--spacing-sm);">
          <input type="number" class="form-input" placeholder="수량" id="scan-qty-input" style="flex: 1; color: #000;">
          <button class="btn btn-success" id="scan-in-btn">입고</button>
          <button class="btn btn-danger" id="scan-out-btn">출고</button>
        </div>
      </div>

      ${r.length>0?`
        <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border-radius: var(--radius-lg); padding: var(--spacing-md); margin-bottom: var(--spacing-md);">
          <h4 style="font-weight: 600; margin-bottom: var(--spacing-sm);">사용 상품</h4>
          ${r.map(e=>`
            <div class="flex justify-between items-center product-link" data-product-id="${e.id}" style="padding: var(--spacing-xs) 0; cursor: pointer; ${e.status==="nostock"?"opacity: 0.6;":""}">
              <span>${e.name}</span>
              <span style="font-size: var(--font-size-sm); opacity: 0.8;">${e.modelNumber}</span>
            </div>
          `).join("")}
        </div>
      `:""}

      <button class="btn btn-secondary" id="scan-again-btn" style="width: 100%; background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.4);">
        다시 스캔
      </button>
    </div>
  `,n.classList.remove("hidden");const c=async e=>{const u=document.getElementById("scan-qty-input"),d=parseInt(u.value);if(!d||d<=0){s.showToast("올바른 수량을 입력하세요","error");return}const m=prompt("사유를 입력하세요:");if(m)try{await w(t.id,a.id,e,d,m),s.showToast(`${e==="in"?"입고":"출고"} 처리되었습니다`,"success"),u.value="";const l=(await g(t.id)).locations.find(y=>y.id===a.id);l&&(a.stock=l.stock,document.getElementById("scan-stock-display").textContent=`${s.formatNumber(l.stock)}개`)}catch(p){s.showToast(p.message||"처리에 실패했습니다","error")}};document.getElementById("scan-in-btn").addEventListener("click",()=>c("in")),document.getElementById("scan-out-btn").addEventListener("click",()=>c("out")),document.querySelectorAll(".product-link").forEach(e=>{e.addEventListener("click",()=>{h.navigate(`/product-detail?id=${e.dataset.productId}`)})}),document.getElementById("scan-again-btn").addEventListener("click",()=>{n.classList.add("hidden"),k()}),s.showToast(`${t.name} 스캔 완료`,"success")}window.addEventListener("beforeunload",()=>{o&&o.stop().catch(t=>console.error("Error stopping scanner:",t))});export{k as initScannerPage};
