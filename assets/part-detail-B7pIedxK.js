import{o as p,p as v,u as s,r as l,q as y,h as g}from"./index-Pn9Rsdm9.js";import{g as f}from"./qr-generator-CkRw2xrd.js";let a=null;async function q(){const r=new URLSearchParams(window.location.search),i=parseInt(r.get("id"));try{a=await p(i)}catch{document.getElementById("part-detail-container").innerHTML=`
      <div class="card">
        <h1>부속을 찾을 수 없습니다</h1>
        <button class="btn btn-primary" onclick="window.location.href='/parts'">돌아가기</button>
      </div>
    `;return}await b()}async function b(){const r=a.products||[],i=g();let d;try{d=await v(a.id)}catch{d=[]}let m=[];i&&(m=await Promise.all(a.locations.map(async t=>{const e=await f(a.id,t.code);return{locationId:t.id,qrDataUrl:e}}))),document.getElementById("part-detail-container").innerHTML=`
    <div class="card">
      <div class="flex justify-between items-center mb-lg">
        <div>
          <h1 class="card-title">${a.name}</h1>
          ${a.description?`<p class="card-subtitle">${a.description}</p>`:""}
        </div>
        <code style="font-size: var(--font-size-lg);">${a.adminCode}</code>
      </div>

      <div class="mb-lg">
        <h2 style="font-size: var(--font-size-xl); font-weight: 600; margin-bottom: var(--spacing-md);">위치별 재고</h2>
        <div class="grid grid-1">
          ${a.locations.map(t=>{const e=m.find(n=>n.locationId===t.id);return`
              <div class="card" style="padding: var(--spacing-md);">
                <div class="flex justify-between items-center mb-sm">
                  <div class="flex gap-sm items-center">
                    <h3 style="font-size: var(--font-size-base); font-weight: 600;">${t.name}</h3>
                    ${i&&e&&e.qrDataUrl?`<img src="${e.qrDataUrl}" alt="QR" class="location-qr-thumb" data-qr="${e.qrDataUrl}" style="width: 28px; height: 28px; border-radius: var(--radius-sm); cursor: pointer; opacity: 0.7;">`:""}
                  </div>
                  <span class="badge badge-info">${s.formatNumber(t.stock)}개</span>
                </div>
                ${i?`
                <div class="flex gap-sm">
                  <input type="number" class="form-input" placeholder="수량" id="qty-${t.id}" style="flex: 1;">
                  <button class="btn btn-success" data-location="${t.id}" data-type="in">입고</button>
                  <button class="btn btn-danger" data-location="${t.id}" data-type="out">출고</button>
                </div>
                `:""}
              </div>
            `}).join("")}
        </div>
      </div>

      <div class="mb-lg">
        <h2 style="font-size: var(--font-size-xl); font-weight: 600; margin-bottom: var(--spacing-md);">사용 상품</h2>
        ${r.length>0?`
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>모델명</th>
                  <th>카테고리</th>
                </tr>
              </thead>
              <tbody>
                ${r.map(t=>`
                  <tr style="cursor: pointer; color: ${t.status==="selling"?"#22c55e":t.status==="limited"?"#f59e0b":"#ef4444"};" data-product-id="${t.id}" class="product-link">
                    <td><strong>${t.name}</strong></td>
                    <td>${t.modelNumber}</td>
                    <td>${t.category}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `:'<p style="color: var(--color-text-tertiary);">이 부속을 사용하는 상품이 없습니다.</p>'}
      </div>

      <div class="mb-lg">
        <h2 style="font-size: var(--font-size-xl); font-weight: 600; margin-bottom: var(--spacing-md);">최근 입출고 내역</h2>
        ${d.length>0?`
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>일시</th>
                  <th>위치</th>
                  <th>구분</th>
                  <th>수량</th>
                  <th>재고변화</th>
                  <th>사유</th>
                  <th>담당자</th>
                </tr>
              </thead>
              <tbody>
                ${d.map(t=>`
                    <tr>
                      <td>${s.formatDateTime(t.createdAt)}</td>
                      <td>${t.locationName||"-"}</td>
                      <td>
                        <span class="badge ${t.type==="in"?"badge-success":"badge-warning"}">
                          ${t.type==="in"?"입고":"출고"}
                        </span>
                      </td>
                      <td>${s.formatNumber(t.quantity)}</td>
                      <td>${s.formatNumber(t.previousStock)} → ${s.formatNumber(t.newStock)}</td>
                      <td>${t.reason}</td>
                      <td>${t.userName||"-"}</td>
                    </tr>
                  `).join("")}
              </tbody>
            </table>
          </div>
        `:'<p style="color: var(--color-text-tertiary);">입출고 내역이 없습니다.</p>'}
      </div>

      <div class="flex gap-md justify-between">
        <button class="btn btn-secondary" id="back-btn">돌아가기</button>
        ${i?'<button class="btn btn-primary" id="edit-part-btn">정보수정</button>':""}
      </div>
    </div>
  `,document.getElementById("back-btn").addEventListener("click",()=>{window.history.length>1?window.history.back():l.navigate("/parts")}),document.getElementById("edit-part-btn")?.addEventListener("click",()=>{l.navigate(`/part-edit?id=${a.id}`,{replace:!0})}),document.querySelectorAll(".location-qr-thumb").forEach(t=>{t.addEventListener("click",()=>{const e=document.createElement("div");e.className="image-popup-overlay",e.innerHTML=`
        <button class="image-popup-close">&times;</button>
        <img src="${t.dataset.qr}" alt="QR Code" class="image-popup-img">
      `,document.body.appendChild(e),requestAnimationFrame(()=>e.classList.add("open"));const n=()=>{e.classList.remove("open"),e.addEventListener("transitionend",()=>e.remove(),{once:!0})};e.querySelector(".image-popup-close").addEventListener("click",n),e.addEventListener("click",o=>{o.target===e&&n()})})}),document.querySelectorAll(".btn-success, .btn-danger").forEach(t=>{t.addEventListener("click",async()=>{const e=parseInt(t.dataset.location),n=t.dataset.type,o=document.getElementById(`qty-${e}`),c=parseInt(o.value);if(!c||c<=0){s.showToast("올바른 수량을 입력하세요","error");return}const u=prompt("사유를 입력하세요:");if(u)try{await y(a.id,e,n,c,u),s.showToast(`${n==="in"?"입고":"출고"} 처리되었습니다`,"success"),o.value="",a=await p(a.id),await b()}catch(h){s.showToast(h.message||"처리에 실패했습니다","error")}})}),document.querySelectorAll(".product-link").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.productId;l.navigate(`/product-detail?id=${e}`)})})}export{q as initPartDetailPage};
