import{c as H,f as A,d as P,u as p,C as N,D as B,e as j}from"./index-Pn9Rsdm9.js";let L=[],w=[],D=[],m=[],g=[],$=null,f=new Date,q=null;async function R(){if(!H()){document.querySelector(".card").innerHTML=`
      <div class="text-center" style="padding: var(--spacing-2xl);">
        <h2 style="color: var(--color-error);">접근 권한이 없습니다</h2>
        <p style="color: var(--color-text-secondary); margin: var(--spacing-md) 0;">
          전표 관리 기능은 특정 사용자만 이용할 수 있습니다.
        </p>
        <button class="btn btn-primary" onclick="window.history.back()">돌아가기</button>
      </div>
    `;return}const a=document.getElementById("create-voucher-btn"),t=document.getElementById("voucher-modal"),e=document.getElementById("cancel-voucher-btn"),r=document.getElementById("voucher-form"),d=document.querySelectorAll("#voucher-type-toggle .toggle-btn"),o=document.getElementById("voucher-type"),u=document.getElementById("product-mode-section"),l=document.getElementById("part-mode-section");d.forEach(n=>{n.addEventListener("click",()=>{d.forEach(y=>y.classList.remove("active")),n.classList.add("active"),o.value=n.dataset.value,n.dataset.value==="product"?(u.style.display="",l.style.display="none"):(u.style.display="none",l.style.display="")})});try{D=await A()}catch(n){console.error("상품 목록 로드 실패:",n)}try{w=await P()}catch(n){console.error("부속 목록 로드 실패:",n)}const s=document.getElementById("voucher-product-search");s.addEventListener("input",()=>{clearTimeout(q),q=setTimeout(()=>z(s.value.trim()),200)}),document.getElementById("add-part-by-code-btn").addEventListener("click",()=>M()),document.getElementById("part-code-input").addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),M())}),b(),a.addEventListener("click",()=>{t.classList.remove("hidden")}),e.addEventListener("click",()=>{S(),t.classList.add("hidden")}),t.addEventListener("click",n=>{n.target===t&&(S(),t.classList.add("hidden"))}),r.addEventListener("submit",async n=>{n.preventDefault();const y=o.value,E=document.getElementById("voucher-date").value;if(!y||!E){p.showToast("구분과 예정일을 선택하세요","error");return}const c=[];if(y==="product")for(const i of m){const h=document.querySelector(`.accordion-item[data-product-id="${i.id}"] .accordion-body`);h&&h.querySelectorAll(".part-check-item").forEach(I=>{const v=I.querySelector('input[type="checkbox"]'),k=I.querySelector('input[type="number"]');v&&v.checked&&k&&parseInt(k.value)>0&&c.push({productId:i.id,partId:parseInt(v.dataset.partId),quantity:parseInt(k.value)})})}else g.forEach(i=>{const h=document.getElementById(`mqty-${i.id}`);h&&parseInt(h.value)>0&&c.push({productId:null,partId:i.id,quantity:parseInt(h.value)})});if(c.length===0){p.showToast("최소 하나의 부속을 선택하세요","error");return}try{await Promise.all(c.map(i=>N({type:y,productId:i.productId,partId:i.partId,quantity:i.quantity,expectedDate:E}))),p.showToast(`${c.length}건의 전표가 생성되었습니다`,"success"),S(),t.classList.add("hidden"),L=await B(),T()}catch(i){p.showToast(i.message||"전표 생성에 실패했습니다","error")}});try{L=await B()}catch(n){console.error("전표 목록 로드 실패:",n),L=[]}T()}function z(a){const t=document.getElementById("voucher-product-results");if(!a){t.innerHTML="";return}const e=a.toLowerCase(),r=new Set(m.map(o=>o.id)),d=D.filter(o=>!r.has(o.id)&&(o.name.toLowerCase().includes(e)||o.adminCode&&o.adminCode.toLowerCase().includes(e))).slice(0,20);if(d.length===0){t.innerHTML='<div style="padding: var(--spacing-sm); color: var(--color-text-tertiary); font-size: var(--font-size-sm);">검색 결과 없음</div>';return}t.innerHTML=d.map(o=>`
        <div class="product-search-item" data-id="${o.id}"
             style="padding: var(--spacing-sm); cursor: pointer; border-bottom: 1px solid var(--color-border);">
            <strong style="font-size: var(--font-size-sm);">${o.name}</strong>
            <span style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-left: var(--spacing-xs);">${o.adminCode||""}</span>
        </div>
    `).join(""),t.querySelectorAll(".product-search-item").forEach(o=>{o.addEventListener("click",async()=>{const u=parseInt(o.dataset.id);document.getElementById("voucher-product-search").value="",t.innerHTML="";try{const l=await j(u),s=(l.parts||[]).map(n=>({...n}));m.push({id:u,name:l.name,adminCode:l.adminCode,parts:s,open:!0}),C()}catch(l){console.error("상품 상세 로드 실패:",l)}})})}function C(){const a=document.getElementById("product-accordion-list");if(m.length===0){a.innerHTML="";return}a.innerHTML=m.map(t=>`
        <div class="accordion-item" data-product-id="${t.id}">
            <div class="accordion-header">
                <span class="accordion-toggle ${t.open?"open":""}">&#9654;</span>
                <input type="checkbox" class="category-cb" checked>
                <span class="accordion-title">${t.name} (${t.adminCode||""})</span>
                <input type="number" min="1" value="1" class="accordion-qty" title="일괄 수량">
                <button type="button" class="accordion-remove" title="삭제">&times;</button>
            </div>
            <div class="accordion-body" style="display: ${t.open?"block":"none"};">
                ${t.parts.map(e=>`
                    <div class="part-check-item">
                        <input type="checkbox" data-part-id="${e.id}" checked>
                        <div class="part-info">
                            <span class="part-name">${e.name} (${e.adminCode})</span>
                            <span class="part-stock">재고: ${p.formatNumber(e.totalStock)}</span>
                        </div>
                        <input type="number" min="1" value="1" class="part-qty-input">
                    </div>
                `).join("")}
            </div>
        </div>
    `).join(""),a.querySelectorAll(".accordion-item").forEach(t=>{const e=parseInt(t.dataset.productId),r=t.querySelector(".accordion-toggle"),d=t.querySelector(".accordion-body"),o=t.querySelector(".category-cb"),u=t.querySelector(".accordion-qty"),l=t.querySelector(".accordion-remove");r.addEventListener("click",s=>{s.stopPropagation();const n=m.find(y=>y.id===e);n&&(n.open=!n.open),r.classList.toggle("open"),d.style.display=d.style.display==="none"?"block":"none"}),o.addEventListener("change",()=>{d.querySelectorAll('input[type="checkbox"]').forEach(s=>s.checked=o.checked)}),u.addEventListener("change",()=>{const s=parseInt(u.value)||1;d.querySelectorAll(".part-qty-input").forEach(n=>n.value=s)}),l.addEventListener("click",s=>{s.stopPropagation(),m=m.filter(n=>n.id!==e),C()}),d.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.addEventListener("change",()=>{V(t)})})})}function V(a){const t=a.querySelector(".category-cb"),e=a.querySelectorAll('.accordion-body input[type="checkbox"]'),r=Array.from(e).filter(d=>d.checked).length;r===0?(t.checked=!1,t.indeterminate=!1):r===e.length?(t.checked=!0,t.indeterminate=!1):(t.checked=!1,t.indeterminate=!0)}function M(){const a=document.getElementById("part-code-input"),t=document.getElementById("part-code-message"),e=a.value.trim();if(!e)return;const r=w.find(o=>o.adminCode.toLowerCase()===e.toLowerCase());if(!r){t.innerHTML=`<span style="color: var(--color-error);">유효하지 않은 관리코드입니다: ${e}</span>`;return}if(g.find(o=>o.id===r.id)){t.innerHTML=`<span style="color: var(--color-warning);">이미 추가된 부속입니다: ${r.name}</span>`,a.value="";return}const d=o=>o.locations?o.locations.reduce((u,l)=>u+l.stock,0):o.totalStock||0;g.push({...r,totalStock:d(r)}),t.innerHTML="",a.value="",a.focus(),x()}function x(){const a=document.getElementById("manual-parts-list");if(g.length===0){a.innerHTML="";return}a.innerHTML=g.map(t=>`
        <div class="part-check-item">
            <div class="part-info">
                <span class="part-name">${t.name} (${t.adminCode})</span>
                <span class="part-stock">재고: ${p.formatNumber(t.totalStock)}</span>
            </div>
            <input type="number" min="1" value="1" id="mqty-${t.id}" class="part-qty-input">
            <button type="button" class="remove-manual-part" data-part-id="${t.id}">&times;</button>
        </div>
    `).join(""),a.querySelectorAll(".remove-manual-part").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.partId);g=g.filter(r=>r.id!==e),x()})})}function b(){const a=document.getElementById("inline-calendar");if(!a)return;const t=f.getFullYear(),e=f.getMonth(),r=new Date,d=new Date(t,e+1,0).getDate(),o=new Date(t,e,1).getDay(),u=new Date(t,e,0).getDate(),l=["일","월","화","수","목","금","토"],s=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];let n=l.map(c=>`<span class="day-header">${c}</span>`).join("");for(let c=o-1;c>=0;c--)n+=`<button type="button" class="day-cell other-month">${u-c}</button>`;for(let c=1;c<=d;c++){const i=`${t}-${String(e+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`,h=r.getFullYear()===t&&r.getMonth()===e&&r.getDate()===c,I=$===i;let v="day-cell";h&&(v+=" today"),I&&(v+=" selected"),n+=`<button type="button" class="${v}" data-date="${i}">${c}</button>`}const E=(7-(o+d)%7)%7;for(let c=1;c<=E;c++)n+=`<button type="button" class="day-cell other-month">${c}</button>`;a.innerHTML=`
        <div class="calendar-header">
            <button type="button" id="cal-prev">&lt;</button>
            <span class="calendar-title">${t}년 ${s[e]}</span>
            <button type="button" id="cal-next">&gt;</button>
        </div>
        <div class="calendar-grid">${n}</div>
    `,a.querySelector("#cal-prev").addEventListener("click",()=>{f.setMonth(f.getMonth()-1),b()}),a.querySelector("#cal-next").addEventListener("click",()=>{f.setMonth(f.getMonth()+1),b()}),a.querySelectorAll(".day-cell:not(.other-month)").forEach(c=>{c.addEventListener("click",()=>{$=c.dataset.date,document.getElementById("voucher-date").value=$,b()})})}function S(){document.getElementById("voucher-form").reset(),m=[],g=[],$=null,document.getElementById("product-accordion-list").innerHTML="",document.getElementById("manual-parts-list").innerHTML="",document.getElementById("voucher-type").value="product",document.getElementById("voucher-product-search").value="",document.getElementById("voucher-product-results").innerHTML="",document.getElementById("part-code-input").value="",document.getElementById("part-code-message").innerHTML="",document.getElementById("product-mode-section").style.display="",document.getElementById("part-mode-section").style.display="none";const t=document.querySelectorAll("#voucher-type-toggle .toggle-btn");t.forEach(e=>e.classList.remove("active")),t[0].classList.add("active"),f=new Date,b()}function T(){let a=L;const t=document.getElementById("vouchers-list");if(a.length===0){t.innerHTML=`
      <div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-text-tertiary);">
        <p>전표가 없습니다</p>
      </div>
    `;return}t.innerHTML=`
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>전표번호</th>
            <th>구분</th>
            <th>상품</th>
            <th>부속</th>
            <th>수량</th>
            <th>예정일</th>
            <th>실제일</th>
            <th>상태</th>
            <th>생성자</th>
            <th>생성일</th>
          </tr>
        </thead>
        <tbody>
          ${a.map(e=>`
              <tr>
                <td><strong>#${e.id}</strong></td>
                <td>
                  <span class="badge ${e.type==="product"?"badge-info":"badge-success"}">
                    ${e.type==="product"?"상품":"부속"}
                  </span>
                </td>
                <td>${e.productName||"-"}</td>
                <td>${e.partName||"-"}</td>
                <td>${p.formatNumber(e.quantity)}</td>
                <td>${p.formatDate(e.expectedDate)}</td>
                <td>${e.actualDate?p.formatDate(e.actualDate):"-"}</td>
                <td>
                  <span class="badge ${e.status==="completed"?"badge-info":"badge-warning"}">
                    ${e.status==="completed"?"완료":"대기중"}
                  </span>
                </td>
                <td>${e.createdByName||"-"}</td>
                <td>${p.formatDateTime(e.createdAt)}</td>
              </tr>
            `).join("")}
        </tbody>
      </table>
    </div>
  `}export{R as initVouchersPage};
