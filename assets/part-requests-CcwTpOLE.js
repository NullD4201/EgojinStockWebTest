import{f as Y,d as Q,x as V,u as p,y as _,z as G,e as J,A as N,B as K,C as O}from"./index-CbPJfJnL.js";let f="",E=1,C=50,T=0,z=[],x=[],A=!1,H=!1,D=null,y=[],b=[];const R={pending:{label:"대기",badge:"badge-warning"},approved:{label:"승인",badge:"badge-info"},completed:{label:"완료",badge:"badge-success"},rejected:{label:"반려",badge:"badge-error"}};async function ot(){Z();const e=document.getElementById("create-request-btn"),t=document.getElementById("request-modal"),a=document.getElementById("cancel-request-btn"),s=document.getElementById("request-form");document.getElementById("status-filter").addEventListener("click",r=>{const l=r.target.closest("[data-status]");l&&(f=l.dataset.status,E=1,U(),document.querySelectorAll("#status-filter button").forEach(L=>{L.className=`btn btn-sm ${L.dataset.status===f?"btn-primary":"btn-secondary"}`}),I())}),document.querySelectorAll("#status-filter button").forEach(r=>{r.className=`btn btn-sm ${r.dataset.status===f?"btn-primary":"btn-secondary"}`});const o=document.querySelectorAll("#request-type-toggle .toggle-btn"),n=document.getElementById("request-type"),c=document.getElementById("product-mode-section"),u=document.getElementById("part-mode-section");o.forEach(r=>{r.addEventListener("click",()=>{o.forEach(l=>l.classList.remove("active")),r.classList.add("active"),n.value=r.dataset.value,r.dataset.value==="product"?(c.style.display="",u.style.display="none"):(c.style.display="none",u.style.display="")})}),e.addEventListener("click",async()=>{if(t.classList.remove("hidden"),!H)try{const r=await Y({limit:99999});x=r.items||r,H=!0}catch(r){console.error("상품 목록 로드 실패:",r)}if(!A)try{const r=await Q({limit:99999});z=r.items||r,A=!0}catch(r){console.error("부속 목록 로드 실패:",r)}}),a.addEventListener("click",()=>{M(),t.classList.add("hidden")}),t.addEventListener("click",r=>{r.target===t&&(M(),t.classList.add("hidden"))});const d=document.getElementById("product-search-input");d.addEventListener("input",()=>{clearTimeout(D),D=setTimeout(()=>W(d.value.trim()),200)}),document.getElementById("add-part-by-code-btn").addEventListener("click",()=>P()),document.getElementById("part-code-input").addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),P())}),s.addEventListener("submit",async r=>{r.preventDefault();const l=n.value,L=document.getElementById("request-memo").value.trim(),S=V(),i=S?.id==="admin"?1:S?.id||1,g=[];if(l==="product")for(const m of y){const v=document.querySelector(`.accordion-item[data-product-id="${m.id}"] .accordion-body`);v&&v.querySelectorAll(".part-check-item").forEach(q=>{const w=q.querySelector('input[type="checkbox"]'),B=q.querySelector('input[type="number"]');w&&w.checked&&B&&parseInt(B.value)>0&&g.push({partId:parseInt(w.dataset.partId),quantity:parseInt(B.value)})})}else b.forEach(m=>{const v=document.getElementById(`mqty-${m.id}`);v&&parseInt(v.value)>0&&g.push({partId:m.id,quantity:parseInt(v.value)})});if(g.length===0){p.showToast("부속과 수량을 선택해주세요","error");return}try{await Promise.all(g.map(m=>_({partId:m.partId,quantity:m.quantity,memo:L||null,requestedBy:i}))),p.showToast(`${g.length}건의 신청이 등록되었습니다`,"success"),M(),t.classList.add("hidden"),I()}catch(m){p.showToast(m.message||"신청 실패","error")}}),await I()}function W(e){const t=document.getElementById("product-search-results");if(!e){t.innerHTML="";return}const a=e.toLowerCase(),s=new Set(y.map(n=>n.id)),o=x.filter(n=>!s.has(n.id)&&(n.name.toLowerCase().includes(a)||n.modelNumber&&n.modelNumber.toLowerCase().includes(a)||n.adminCode&&n.adminCode.toLowerCase().includes(a))).slice(0,20);if(o.length===0){t.innerHTML='<div style="padding: var(--spacing-sm); color: var(--color-text-tertiary); font-size: var(--font-size-sm);">검색 결과 없음</div>';return}t.innerHTML=o.map(n=>`
    <div class="product-search-item" data-id="${n.id}"
         style="padding: var(--spacing-sm); cursor: pointer; border-bottom: 1px solid var(--color-border);">
      <strong style="font-size: var(--font-size-sm);">${n.name}</strong>
      <span style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-left: var(--spacing-xs);">${n.modelNumber||n.adminCode||""}</span>
    </div>
  `).join(""),t.querySelectorAll(".product-search-item").forEach(n=>{n.addEventListener("click",async()=>{const c=parseInt(n.dataset.id);document.getElementById("product-search-input").value="",t.innerHTML="";try{const u=await J(c),d=x.find(l=>l.id===c),r=(u.parts||[]).map(l=>({...l}));y.push({id:c,name:d.name,modelNumber:d.modelNumber,adminCode:d.adminCode,parts:r,open:!0}),j()}catch(u){console.error("상품 상세 로드 실패:",u)}})})}function j(){const e=document.getElementById("product-accordion-list");if(y.length===0){e.innerHTML="";return}e.innerHTML=y.map(t=>{const a=t.modelNumber?`${t.name} (${t.modelNumber})`:`${t.name} (${t.adminCode||""})`;return`
      <div class="accordion-item" data-product-id="${t.id}">
        <div class="accordion-header">
          <span class="accordion-toggle ${t.open?"open":""}">&#9654;</span>
          <input type="checkbox" class="category-cb" checked>
          <span class="accordion-title">${a}</span>
          <input type="number" min="1" value="1" class="accordion-qty" title="일괄 수량">
          <button type="button" class="accordion-remove" title="삭제">&times;</button>
        </div>
        <div class="accordion-body" style="display: ${t.open?"block":"none"};">
          ${t.parts.map(s=>`
            <div class="part-check-item">
              <input type="checkbox" data-part-id="${s.id}" checked>
              <div class="part-info">
                <span class="part-name">${s.name} (${s.adminCode})</span>
                <span class="part-stock">재고: ${p.formatNumber(s.totalStock)}</span>
              </div>
              <input type="number" min="1" value="1" class="part-qty-input">
            </div>
          `).join("")}
        </div>
      </div>
    `}).join(""),e.querySelectorAll(".accordion-item").forEach(t=>{const a=parseInt(t.dataset.productId),s=t.querySelector(".accordion-toggle"),o=t.querySelector(".accordion-body"),n=t.querySelector(".category-cb"),c=t.querySelector(".accordion-qty"),u=t.querySelector(".accordion-remove");s.addEventListener("click",d=>{d.stopPropagation();const r=y.find(l=>l.id===a);r&&(r.open=!r.open),s.classList.toggle("open"),o.style.display=o.style.display==="none"?"block":"none"}),n.addEventListener("change",()=>{o.querySelectorAll('input[type="checkbox"]').forEach(d=>d.checked=n.checked)}),c.addEventListener("change",()=>{const d=parseInt(c.value)||1;o.querySelectorAll(".part-qty-input").forEach(r=>r.value=d)}),u.addEventListener("click",d=>{d.stopPropagation(),y=y.filter(r=>r.id!==a),j()}),o.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.addEventListener("change",()=>{X(t)})})})}function X(e){const t=e.querySelector(".category-cb"),a=e.querySelectorAll('.accordion-body input[type="checkbox"]'),s=Array.from(a).filter(o=>o.checked).length;s===0?(t.checked=!1,t.indeterminate=!1):s===a.length?(t.checked=!0,t.indeterminate=!1):(t.checked=!1,t.indeterminate=!0)}function P(){const e=document.getElementById("part-code-input"),t=document.getElementById("part-code-message"),a=e.value.trim();if(!a)return;const s=z.find(n=>n.adminCode.toLowerCase()===a.toLowerCase());if(!s){t.innerHTML=`<span style="color: var(--color-error);">유효하지 않은 관리코드입니다: ${a}</span>`;return}if(b.find(n=>n.id===s.id)){t.innerHTML=`<span style="color: var(--color-warning);">이미 추가된 부속입니다: ${s.name}</span>`,e.value="";return}const o=n=>n.locations?n.locations.reduce((c,u)=>c+u.stock,0):n.totalStock||0;b.push({...s,totalStock:o(s)}),t.innerHTML="",e.value="",e.focus(),F()}function F(){const e=document.getElementById("manual-parts-list");if(b.length===0){e.innerHTML="";return}e.innerHTML=b.map(t=>`
    <div class="part-check-item">
      <div class="part-info">
        <span class="part-name">${t.name} (${t.adminCode})</span>
        <span class="part-stock">재고: ${p.formatNumber(t.totalStock)}</span>
      </div>
      <input type="number" min="1" value="1" id="mqty-${t.id}" class="part-qty-input">
      <button type="button" class="remove-manual-part" data-part-id="${t.id}">&times;</button>
    </div>
  `).join(""),e.querySelectorAll(".remove-manual-part").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.partId);b=b.filter(s=>s.id!==a),F()})})}function M(){document.getElementById("request-form").reset(),document.getElementById("request-type").value="product";const e=document.querySelectorAll("#request-type-toggle .toggle-btn");e.forEach(t=>t.classList.remove("active")),e[0].classList.add("active"),document.getElementById("product-search-input").value="",document.getElementById("product-search-results").innerHTML="",document.getElementById("product-accordion-list").innerHTML="",y=[],document.getElementById("part-code-input").value="",document.getElementById("part-code-message").innerHTML="",document.getElementById("manual-parts-list").innerHTML="",b=[],document.getElementById("product-mode-section").style.display="",document.getElementById("part-mode-section").style.display="none"}function U(){const e=new URLSearchParams;f&&e.set("status",f),E>1&&e.set("page",E);const t=e.toString();window.history.replaceState({},"",`/part-requests${t?"?"+t:""}`)}function Z(){const e=new URLSearchParams(window.location.search);f=e.get("status")||"",E=parseInt(e.get("page"))||1}async function I(){const e=document.getElementById("requests-list");try{const t=await G({status:f||void 0,page:E,limit:C}),a=t.items||[];T=t.totalItems||a.length,a.length===0?e.innerHTML=`
        <div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-text-tertiary);">
          <p>신청 내역이 없습니다</p>
        </div>
      `:(e.innerHTML=tt(a),et(e));const s=document.getElementById("pagination-container"),o=Math.ceil(T/C);nt(s,E,o,T,n=>{E=n,U(),I();const c=document.querySelector("nav"),u=c?c.offsetHeight:0,d=e.getBoundingClientRect().top+window.scrollY-u;window.scrollTo({top:d,behavior:"smooth"})})}catch(t){e.innerHTML=`
      <div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-error);">
        <p>목록을 불러올 수 없습니다</p>
      </div>
    `,console.error(t)}}function tt(e){return`
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>부속</th>
            <th>수량</th>
            <th>상태</th>
            <th>메모</th>
            <th>신청자</th>
            <th>신청일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(t=>{const a=R[t.status]||{label:t.status,badge:""};let s="";return t.status==="pending"?s=`
                <button class="btn btn-sm btn-success approve-btn" data-id="${t.id}" data-part-id="${t.partId}" data-quantity="${t.quantity}">승인</button>
                <button class="btn btn-sm btn-danger status-btn" data-id="${t.id}" data-status="rejected">반려</button>
                <button class="btn btn-sm btn-secondary delete-btn" data-id="${t.id}">삭제</button>
              `:t.status==="approved"&&(s=`<button class="btn btn-sm btn-primary status-btn" data-id="${t.id}" data-status="completed">처리완료</button>`),`
              <tr>
                <td><strong>${t.partName}</strong> <code style="font-size: var(--font-size-xs);">${t.partAdminCode}</code></td>
                <td>${p.formatNumber(t.quantity)}</td>
                <td><span class="badge ${a.badge}">${a.label}</span></td>
                <td>${t.memo||"-"}</td>
                <td>${t.requestedByName||"-"}</td>
                <td>${p.formatDateTime(t.createdAt)}</td>
                <td>${s?`<div class="flex gap-xs">${s}</div>`:"-"}</td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `}function et(e){e.querySelectorAll(".approve-btn").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.id),s=parseInt(t.dataset.partId),o=parseInt(t.dataset.quantity);at(a,s,o)})}),e.querySelectorAll(".status-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=parseInt(t.dataset.id),s=t.dataset.status;try{await N(a,s);const o=R[s];p.showToast(`${o.label} 처리되었습니다`,"success"),I()}catch(o){p.showToast(o.message||"상태 변경 실패","error")}})}),e.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",async()=>{if(!confirm("신청을 삭제하시겠습니까?"))return;const a=parseInt(t.dataset.id);try{await K(a),p.showToast("삭제되었습니다","success"),I()}catch(s){p.showToast(s.message||"삭제 실패","error")}})})}let h=new Date,$=null;function at(e,t,a){h=new Date,$=null;const s=document.getElementById("approve-date-modal");s&&s.remove();const o=document.createElement("div");o.id="approve-date-modal",o.className="modal-overlay",o.innerHTML=`
    <div class="card" style="max-width: 360px; width: 100%;">
      <div class="card-header">
        <h2 class="card-title">예정일 선택</h2>
      </div>
      <div style="padding: 0 var(--spacing-lg) var(--spacing-lg);">
        <div id="approve-calendar" class="inline-calendar"></div>
        <div class="flex gap-md" style="margin-top: var(--spacing-md);">
          <button class="btn btn-primary" id="approve-confirm-btn" disabled>승인</button>
          <button class="btn btn-secondary" id="approve-cancel-btn">취소</button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(o),k(),document.getElementById("approve-cancel-btn").addEventListener("click",()=>o.remove()),o.addEventListener("click",n=>{n.target===o&&o.remove()}),document.getElementById("approve-confirm-btn").addEventListener("click",async()=>{if($)try{await N(e,"approved"),await O({type:"part",productId:null,partId:t,quantity:a,expectedDate:$}),p.showToast("승인 완료 및 전표가 생성되었습니다","success"),o.remove(),I()}catch(n){p.showToast(n.message||"승인 처리 실패","error")}})}function k(){const e=document.getElementById("approve-calendar");if(!e)return;const t=h.getFullYear(),a=h.getMonth(),s=new Date,o=document.getElementById("approve-confirm-btn"),n=new Date(t,a+1,0).getDate(),c=new Date(t,a,1).getDay(),u=new Date(t,a,0).getDate(),d=["일","월","화","수","목","금","토"],r=["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];let l=d.map(i=>`<span class="day-header">${i}</span>`).join("");for(let i=c-1;i>=0;i--)l+=`<button type="button" class="day-cell other-month">${u-i}</button>`;for(let i=1;i<=n;i++){const g=`${t}-${String(a+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`,m=s.getFullYear()===t&&s.getMonth()===a&&s.getDate()===i,v=$===g;let q="day-cell";m&&(q+=" today"),v&&(q+=" selected"),l+=`<button type="button" class="${q}" data-date="${g}">${i}</button>`}const S=(7-(c+n)%7)%7;for(let i=1;i<=S;i++)l+=`<button type="button" class="day-cell other-month">${i}</button>`;e.innerHTML=`
    <div class="calendar-header">
      <button type="button" id="approve-cal-prev">&lt;</button>
      <span class="calendar-title">${t}년 ${r[a]}</span>
      <button type="button" id="approve-cal-next">&gt;</button>
    </div>
    <div class="calendar-grid">${l}</div>
  `,e.querySelector("#approve-cal-prev").addEventListener("click",()=>{h.setMonth(h.getMonth()-1),k()}),e.querySelector("#approve-cal-next").addEventListener("click",()=>{h.setMonth(h.getMonth()+1),k()}),e.querySelectorAll(".day-cell:not(.other-month)").forEach(i=>{i.addEventListener("click",()=>{$=i.dataset.date,o&&(o.disabled=!1),k()})})}function nt(e,t,a,s,o){if(a<=1){e.innerHTML=`<div style="text-align: center; padding: var(--spacing-sm); color: var(--color-text-tertiary); font-size: var(--font-size-sm);">${s}개</div>`;return}e.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-xs); padding: var(--spacing-md) 0;">
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="1" ${t===1?"disabled":""}>«</button>
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="${t-1}" ${t===1?"disabled":""}>‹</button>
      <span class="pagination-current" style="cursor: pointer; padding: 0 var(--spacing-sm); font-size: var(--font-size-sm); font-weight: 600; user-select: none;">${t} / ${a}</span>
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="${t+1}" ${t===a?"disabled":""}>›</button>
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="${a}" ${t===a?"disabled":""}>»</button>
    </div>
  `,e.querySelectorAll(".pagination-btn").forEach(n=>{n.addEventListener("click",()=>{n.disabled||o(parseInt(n.dataset.page))})}),e.querySelector(".pagination-current").addEventListener("click",()=>{const n=prompt(`이동할 페이지 (1-${a})`,t);if(n===null)return;const c=parseInt(n);c>=1&&c<=a&&c!==t&&o(c)})}export{ot as initPartRequestsPage};
