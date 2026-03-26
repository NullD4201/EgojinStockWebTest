import{c as x,r as I,u as B,f as D,a as A,b as q,d as z}from"./index-CbPJfJnL.js";let y="",w=new Set,c=new Set,h="",L="name",b=50,u=1,E=0,v=new Set,f=new Set,k=0;function T(){const t=new URLSearchParams;y&&t.set("status",y),h.trim()&&t.set("q",h.trim()),L!=="name"&&t.set("sort",L),b!==50&&t.set("limit",b),u>1&&t.set("page",u),w.size>0&&t.set("supplier",[...w].join(",")),c.size>0&&t.set("regions",[...c].join("||")),v.size>0&&t.set("categories",[...v].join(",")),f.size>0&&t.set("partIds",[...f].join(","));const n=t.toString();window.history.replaceState({},"",`/products${n?"?"+n:""}`)}function j(){const t=new URLSearchParams(window.location.search);y=t.get("status")||"",h=t.get("q")||"",L=t.get("sort")||"name",b=parseInt(t.get("limit"))||50,u=parseInt(t.get("page"))||1,w=new Set(t.get("supplier")?t.get("supplier").split(","):[]),c=new Set(t.get("regions")?t.get("regions").split("||"):[]),v=new Set(t.get("categories")?t.get("categories").split(","):[]),f=new Set(t.get("partIds")?t.get("partIds").split(",").map(Number):[])}async function U(){if(j(),x()){const s=document.getElementById("product-register-btn-container");s.innerHTML='<button class="btn btn-primary btn-sm" id="go-product-register">+ 상품 등록</button>',document.getElementById("go-product-register").addEventListener("click",()=>{I.navigate("/product-register")})}const t=document.querySelectorAll(".filter-btn");t.forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.filter;t.forEach(o=>o.classList.remove("active")),s.classList.add("active"),y=i==="all"?"":i,u=1,g()})}),y?document.querySelector(`.filter-btn[data-filter="${y}"]`)?.classList.add("active"):document.querySelector('.filter-btn[data-filter="all"]')?.classList.add("active");const n=document.getElementById("product-search");h&&(n.value=h);const a=B.debounce(s=>{h=s,u=1,g()},300);n.addEventListener("input",s=>a(s.target.value));const r=document.getElementById("product-sort");r.value=L,r.addEventListener("change",()=>{L=r.value,u=1,g()});const e=document.getElementById("product-page-size");e.value=b,e.addEventListener("change",()=>{b=parseInt(e.value),u=1,g()}),R(),H();const l=I.getRestoreScroll();await g(),l!=null&&window.scrollTo(0,l)}async function H(){try{const t=await A();M("supplier-dropdown-btn","supplier-dropdown-menu",t.suppliers||[],w,"공급처"),P(t.regions||{})}catch(t){console.error("필터 옵션 로드 실패:",t)}}function M(t,n,a,r,e){const l=document.getElementById(t),s=document.getElementById(n);if(a.length===0){l.disabled=!0,l.textContent=`${e} (없음)`;return}s.innerHTML=a.map(i=>`
    <label>
      <input type="checkbox" value="${i}">
      <span>${i}</span>
    </label>
  `).join(""),l.addEventListener("click",i=>{if(i.target.closest(".dropdown-clear")){i.stopPropagation(),r.clear(),s.querySelectorAll('input[type="checkbox"]').forEach(o=>{o.checked=!1}),$(l,r,e),u=1,g();return}i.stopPropagation(),document.querySelectorAll(".dropdown-menu.open").forEach(o=>{o!==s&&o.classList.remove("open")}),s.classList.toggle("open")}),s.addEventListener("click",i=>i.stopPropagation()),s.querySelectorAll('input[type="checkbox"]').forEach(i=>{r.has(i.value)&&(i.checked=!0),i.addEventListener("change",()=>{i.checked?r.add(i.value):r.delete(i.value),$(l,r,e),u=1,g()})}),$(l,r,e),document.addEventListener("click",()=>s.classList.remove("open"))}function P(t){const n=document.getElementById("region-dropdown-btn"),a=document.getElementById("region-dropdown-menu"),r=Object.keys(t).sort();if(r.length===0){n.disabled=!0,n.textContent="공장 지역 (없음)";return}let e=null;function l(){const s=r.map(o=>{const p=o===e,m=c.has(o)||(t[o]||[]).some(d=>c.has(`${o} / ${d}`));return`<div class="panel-item${p?" active":""}${m?" selected":""}" data-country="${o}">${o}</div>`}).join("");let i="";if(e&&t[e]){const o=[...t[e]].sort();i=`<div class="panel-item${c.has(e)?" selected":""}" data-city="__all__">전체</div>`,i+=o.map(m=>{const d=`${e} / ${m}`;return`<div class="panel-item${c.has(d)||c.has(e)?" selected":""}" data-city="${m}">${m}</div>`}).join("")}a.innerHTML=`
      <div class="region-panels">
        <div class="country-panel">${s}</div>
        <div class="city-panel">${i}</div>
      </div>
    `,a.querySelectorAll(".country-panel .panel-item").forEach(o=>{o.addEventListener("click",()=>{e=o.dataset.country,l()})}),a.querySelectorAll(".city-panel .panel-item").forEach(o=>{o.addEventListener("click",()=>{const p=o.dataset.city;if(p==="__all__")c.has(e)?(c.delete(e),(t[e]||[]).forEach(m=>c.delete(`${e} / ${m}`))):((t[e]||[]).forEach(m=>c.delete(`${e} / ${m}`)),c.add(e));else{const m=`${e} / ${p}`;c.has(e)?(c.delete(e),(t[e]||[]).forEach(d=>{d!==p&&c.add(`${e} / ${d}`)})):c.has(m)?c.delete(m):c.add(m)}$(n,c,"공장 지역"),u=1,g(),l()})})}n.addEventListener("click",s=>{if(s.target.closest(".dropdown-clear")){s.stopPropagation(),c.clear(),$(n,c,"공장 지역"),u=1,g();return}s.stopPropagation(),document.querySelectorAll(".dropdown-menu.open").forEach(i=>{i!==a&&i.classList.remove("open")}),a.classList.contains("open")||(!e&&r.length>0&&(e=r[0]),l()),a.classList.toggle("open")}),a.addEventListener("click",s=>s.stopPropagation()),$(n,c,"공장 지역"),document.addEventListener("click",()=>a.classList.remove("open"))}function $(t,n,a){n.size>0?(t.innerHTML=`<span class="dropdown-label">${a} (${n.size})</span><span class="dropdown-clear">✕</span>`,t.classList.add("has-value")):(t.innerHTML=`<span class="dropdown-label">${a}</span>`,t.classList.remove("has-value"))}async function R(){const t=document.getElementById("open-filter-btn"),n=document.getElementById("close-filter-btn"),a=document.getElementById("filter-overlay"),r=document.getElementById("filter-drawer"),e=document.getElementById("filter-apply-btn"),l=document.getElementById("filter-reset-btn");let s=!1;async function i(){if(a.classList.add("open"),r.classList.add("open"),!s){s=!0;try{const[p,m]=await Promise.all([q(),z()]);document.getElementById("filter-categories").innerHTML=p.map(d=>`
          <label class="filter-option">
            <input type="checkbox" value="${d.name}">
            <span>${d.name}</span>
          </label>
        `).join(""),document.getElementById("filter-parts").innerHTML=m.map(d=>`
          <label class="filter-option">
            <input type="checkbox" value="${d.id}">
            <span>${d.name}</span>
          </label>
        `).join(""),document.querySelectorAll('#filter-categories input[type="checkbox"]').forEach(d=>{v.has(d.value)&&(d.checked=!0)}),document.querySelectorAll('#filter-parts input[type="checkbox"]').forEach(d=>{f.has(parseInt(d.value))&&(d.checked=!0)})}catch(p){console.error("필터 데이터 로드 실패:",p)}}}function o(){a.classList.remove("open"),r.classList.remove("open")}t.addEventListener("click",i),n.addEventListener("click",o),a.addEventListener("click",o),e.addEventListener("click",()=>{v=new Set,document.querySelectorAll("#filter-categories input:checked").forEach(p=>{v.add(p.value)}),f=new Set,document.querySelectorAll("#filter-parts input:checked").forEach(p=>{f.add(parseInt(p.value))}),S(),u=1,g(),o()}),l.addEventListener("click",()=>{document.querySelectorAll('#filter-drawer input[type="checkbox"]').forEach(p=>{p.checked=!1}),v=new Set,f=new Set,S(),u=1,g(),o()}),S()}function S(){const t=document.getElementById("open-filter-btn"),n=v.size+f.size;n>0?(t.classList.add("has-filter"),t.innerHTML=`<span>☰</span><span class="filter-count">${n}</span>`):(t.classList.remove("has-filter"),t.innerHTML="<span>☰</span>")}async function g(){T();const t=++k,n={page:u,limit:b,sort:L};y&&(n.status=y),h.trim()&&(n.q=h.trim()),w.size>0&&(n.supplier=[...w].join(",")),c.size>0&&(n.regions=[...c].join("||")),v.size>0&&(n.categories=[...v].join(",")),f.size>0&&(n.partIds=[...f].join(","));const a=document.getElementById("products-list"),r=document.getElementById("products-pagination");try{const e=await D(n);if(t!==k)return;E=e.total,F(e.items,a,r)}catch(e){if(t!==k)return;console.error("상품 목록 로드 실패:",e),a.innerHTML='<div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-text-tertiary);"><p>로드 실패</p></div>',r.innerHTML=""}}function F(t,n,a){if(t.length===0&&E===0){n.innerHTML=`
      <div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-text-tertiary);">
        <p>상품이 없습니다</p>
      </div>
    `,a.innerHTML="";return}n.innerHTML=`
    <div class="table-container">
      <table>
        <tbody>
          ${t.map(e=>{const l=e.sales4wkDailyAvg>0?Math.ceil(e.totalStock/e.sales4wkDailyAvg):null,s=l!==null?new Date(Date.now()+l*864e5).toLocaleDateString("ko-KR",{month:"numeric",day:"numeric"}):null,i=e.sales3moDailyAvg>0?((e.sales4wkDailyAvg-e.sales3moDailyAvg)/e.sales3moDailyAvg*100).toFixed(0):null;return`
            <tr style="cursor: pointer;" data-id="${e.id}" class="product-row">
              <td style="width: 20px; vertical-align: top; padding-right: var(--spacing-xs);">
                <img src="${e.image}" alt="${e.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); background: var(--color-bg-secondary);" />
              </td>
              <td style="vertical-align: top;">
                <div style="display: flex; flex-direction: column; gap: var(--spacing-xs);">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>${e.name}</strong>
                    ${e.status!=="selling"?`<span class="badge ${e.status==="limited"?"badge-warning":"badge-error"}">${e.status==="limited"?"소":"단"}</span>`:""}
                  </div>
                  <div style="display: flex; gap: var(--spacing-md); color: var(--color-text-secondary); font-size: 0.9em;">
                    <span>모델번호 ${e.modelNumber}</span>
                    <span>어드민코드 ${e.adminCode}</span>
                  </div>
                  <div class="stock-metrics">
                    <div class="stock-metrics-row">
                      <span class="metric-item">
                        <span class="metric-label">가용</span>
                        <span class="metric-value">${e.availableStock??0}</span>
                      </span>
                      <span class="metric-item">
                        <span class="metric-label">발주창고</span>
                        <span class="metric-value">${e.orderStock??0}</span>
                        ${e.orderIncomingDate?`<span class="metric-date">${new Date(e.orderIncomingDate).toLocaleDateString("ko-KR",{month:"numeric",day:"numeric"})}</span>`:""}
                      </span>
                      <span class="metric-item">
                        <span class="metric-label">보유</span>
                        <span class="metric-value metric-value-bold">${e.totalStock??0}</span>
                        ${s?`<span class="metric-date ${l<=14?"metric-date-warn":""}">${s} 소진</span>`:""}
                      </span>
                    </div>
                    <div class="stock-metrics-row">
                      <span class="metric-item">
                        <span class="metric-label">월평균</span>
                        <span class="metric-value">${e.sales3moMonthlyAvg??0}</span>
                      </span>
                      <span class="metric-item">
                        <span class="metric-label">일평균(3월)</span>
                        <span class="metric-value">${e.sales3moDailyAvg??0}</span>
                      </span>
                      <span class="metric-item">
                        <span class="metric-label">일평균(4주)</span>
                        <span class="metric-value">${e.sales4wkDailyAvg??0}</span>
                        ${i!==null?`<span class="metric-trend ${Number(i)>=0?"trend-up":"trend-down"}">${Number(i)>=0?"+":""}${i}%</span>`:""}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
    </div>
  `,document.querySelectorAll(".product-row").forEach(e=>{e.addEventListener("click",()=>{I.navigate(`/product-detail?id=${e.dataset.id}`)})});const r=Math.ceil(E/b);_(a,u,r,E,e=>{u=e,g();const l=document.querySelector("nav"),s=l?l.offsetHeight:0,i=n.getBoundingClientRect().top+window.scrollY-s;window.scrollTo({top:i,behavior:"smooth"})})}function _(t,n,a,r,e){if(a<=1){t.innerHTML=`<div style="text-align: center; padding: var(--spacing-sm); color: var(--color-text-tertiary); font-size: var(--font-size-sm);">${r}개</div>`;return}t.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-xs); padding: var(--spacing-md) 0;">
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="1" ${n===1?"disabled":""}>«</button>
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="${n-1}" ${n===1?"disabled":""}>‹</button>
      <span class="pagination-current" style="cursor: pointer; padding: 0 var(--spacing-sm); font-size: var(--font-size-sm); font-weight: 600; user-select: none;">${n} / ${a}</span>
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="${n+1}" ${n===a?"disabled":""}>›</button>
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="${a}" ${n===a?"disabled":""}>»</button>
    </div>
  `,t.querySelectorAll(".pagination-btn").forEach(l=>{l.addEventListener("click",()=>{l.disabled||e(parseInt(l.dataset.page))})}),t.querySelector(".pagination-current").addEventListener("click",()=>{const l=prompt(`이동할 페이지 (1-${a})`,n);if(l===null)return;const s=parseInt(l);s>=1&&s<=a&&s!==n&&e(s)})}export{U as initProductsPage};
