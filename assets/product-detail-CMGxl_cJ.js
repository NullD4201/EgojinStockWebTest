import{e as m,r as d,g as u,u as n,h as b}from"./index-CbPJfJnL.js";async function g(){const r=new URLSearchParams(window.location.search),o=parseInt(r.get("id"));let e;try{e=await m(o)}catch{document.getElementById("product-detail-container").innerHTML=`
      <div class="card">
        <h1>상품을 찾을 수 없습니다</h1>
        <button class="btn btn-primary" id="back-to-products">상품목록</button>
      </div>
    `,document.getElementById("back-to-products").addEventListener("click",()=>{d.navigate("/products")});return}const s=e.parts||[],i={};await Promise.all(s.map(async t=>{try{i[t.id]=await u(t.id)}catch{i[t.id]={incoming:0,latestExpectedDate:null}}})),document.getElementById("product-detail-container").innerHTML=`
    <div class="card">
      <div class="flex justify-between items-center mb-lg">
        <div class="flex gap-md items-center">
          ${e.image?`
            <img src="${e.image}" alt="${e.name}" id="product-thumb"
                 style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-md); background: var(--color-bg-secondary); cursor: pointer;">
          `:""}
          <div>
            <h1 class="card-title">${e.name}</h1>
            <p class="card-subtitle">${e.modelNumber}</p>
          </div>
        </div>
        <span style="width: 20px; height: 20px; border-radius: 50%; background-color: ${e.status==="selling"?"#22c55e":e.status==="limited"?"#f59e0b":"#ef4444"};"></span>
      </div>

      <div class="grid grid-2 mb-lg">
        <div>
          <label class="form-label">어드민코드</label>
          <div style="font-size: var(--font-size-lg); font-weight: 600;">
            <code>${e.adminCode}</code>
          </div>
        </div>
        <div>
          <label class="form-label">카테고리</label>
          <div style="font-size: var(--font-size-lg); font-weight: 600;">
            ${e.category}
          </div>
        </div>
      </div>

      <div class="mb-lg">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>식별코드</th>
                <th>재고</th>
                <th>입고예정</th>
              </tr>
            </thead>
            <tbody>
              ${s.map(t=>{const a=i[t.id]||{incoming:0,latestExpectedDate:null};return`
                  <tr style="cursor: pointer;" data-part-id="${t.id}" class="part-link">
                    <td><strong style="font-size: var(--font-size-sm);">${t.name}</strong></td>
                    <td><code>${t.adminCode}</code></td>
                    <td style="color: ${t.totalStock===0?"#ef4444":t.totalStock<=10?"#f59e0b":"#22c55e"}; font-weight: 600;">${n.formatNumber(t.totalStock)}</td>
                    <td>
                      ${a.incoming>0&&a.latestExpectedDate?`<span class="badge badge-info">${n.formatDate(a.latestExpectedDate)}</span>`:"-"}
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>

      ${(e.partChanges||[]).length>0?`
        <div>
          <h2 style="font-size: var(--font-size-xl); font-weight: 600; margin-bottom: var(--spacing-md);">부속 변경 이력</h2>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>변경 부속</th>
                  <th>사유</th>
                </tr>
              </thead>
              <tbody>
                ${e.partChanges.map(t=>`
                    <tr>
                      <td>${n.formatDate(t.date)}</td>
                      <td>${t.partName||"-"}</td>
                      <td>${t.reason}</td>
                    </tr>
                  `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `:""}

      <div class="flex gap-md mt-lg justify-between">
        <button class="btn btn-secondary" id="back-btn">돌아가기</button>
        ${b()?'<button class="btn btn-primary" id="edit-product-btn">정보수정</button>':""}
      </div>
    </div>
  `,document.getElementById("back-btn").addEventListener("click",()=>{window.history.length>1?window.history.back():d.navigate("/products")}),document.getElementById("edit-product-btn")?.addEventListener("click",()=>{d.navigate(`/product-edit?id=${o}`,{replace:!0})});const c=document.getElementById("product-thumb");c&&c.addEventListener("click",()=>{const t=document.createElement("div");t.className="image-popup-overlay",t.innerHTML=`
        <button class="image-popup-close">&times;</button>
        <img src="${e.image}" alt="${e.name}" class="image-popup-img">
      `,document.body.appendChild(t),requestAnimationFrame(()=>t.classList.add("open"));const a=()=>{t.classList.remove("open"),t.addEventListener("transitionend",()=>t.remove(),{once:!0})};t.querySelector(".image-popup-close").addEventListener("click",a),t.addEventListener("click",l=>{l.target===t&&a()})}),document.querySelectorAll(".part-link").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.partId;d.navigate(`/part-detail?id=${a}`)})})}export{g as initProductDetailPage};
