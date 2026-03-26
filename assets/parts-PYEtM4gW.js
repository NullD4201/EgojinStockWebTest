import{c as f,r as b,u as p,d as y}from"./index-CbPJfJnL.js";let c="",l="name",d=50,o=1,m=0,u=0;function h(){const e=new URLSearchParams;c.trim()&&e.set("q",c.trim()),l!=="name"&&e.set("sort",l),d!==50&&e.set("limit",d),o>1&&e.set("page",o);const n=e.toString();window.history.replaceState({},"",`/parts${n?"?"+n:""}`)}function $(){const e=new URLSearchParams(window.location.search);c=e.get("q")||"",l=e.get("sort")||"name",d=parseInt(e.get("limit"))||50,o=parseInt(e.get("page"))||1}async function S(){if($(),f()){const i=document.getElementById("part-register-btn-container");i.innerHTML='<button class="btn btn-primary btn-sm" id="go-part-register">+ 부속 등록</button>',document.getElementById("go-part-register").addEventListener("click",()=>{b.navigate("/part-register")})}const e=document.getElementById("part-search");c&&(e.value=c);const n=p.debounce(i=>{c=i,o=1,g()},300);e.addEventListener("input",i=>n(i.target.value));const a=document.getElementById("part-sort");a.value=l,a.addEventListener("change",()=>{l=a.value,o=1,g()});const r=document.getElementById("part-page-size");r.value=d,r.addEventListener("change",()=>{d=parseInt(r.value),o=1,g()});const t=b.getRestoreScroll();await g(),t!=null&&window.scrollTo(0,t)}async function g(){h();const e=++u,n={page:o,limit:d,sort:l};c.trim()&&(n.q=c.trim());const a=document.getElementById("parts-list"),r=document.getElementById("parts-pagination");try{const t=await y(n);if(e!==u)return;m=t.total,x(t.items,a,r)}catch(t){if(e!==u)return;console.error("부속 목록 로드 실패:",t),a.innerHTML='<div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-text-tertiary);"><p>로드 실패</p></div>',r.innerHTML=""}}function x(e,n,a){if(e.length===0&&m===0){n.innerHTML=`
      <div style="text-align: center; padding: var(--spacing-2xl); color: var(--color-text-tertiary);">
        <p>부속이 없습니다</p>
      </div>
    `,a.innerHTML="";return}n.innerHTML=`
    <div class="grid grid-3">
      ${e.map(t=>{const i=t.locations?t.locations.reduce((s,v)=>s+v.stock,0):t.totalStock??0;return`
          <div class="card part-card" style="cursor: pointer; padding: var(--spacing-lg);" data-id="${t.id}">
            ${t.image?`
              <div style="margin-bottom: var(--spacing-md); text-align: center;">
                <img src="${t.image}" alt="${t.name}"
                     style="width: 100%; max-height: 120px; object-fit: cover; border-radius: var(--radius-md); background: var(--color-bg-secondary);">
              </div>
            `:""}
            <h3 style="font-size: var(--font-size-lg); font-weight: 600; margin-bottom: var(--spacing-sm);">
              ${t.name}
            </h3>
            ${t.description?`<p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--spacing-md);">
              ${p.truncate(t.description,60)}
            </p>`:""}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid var(--color-border);">
              <code style="font-size: var(--font-size-xs);">${t.adminCode}</code>
              <span class="badge badge-info">재고: ${p.formatNumber(i)}</span>
            </div>
            ${t.locations?`
            <div style="margin-top: var(--spacing-sm);">
              ${t.locations.map(s=>`
                <div style="display: flex; justify-content: space-between; font-size: var(--font-size-xs); color: var(--color-text-tertiary); padding: 2px 0;">
                  <span>${s.name}</span>
                  <span>${p.formatNumber(s.stock)}개</span>
                </div>
              `).join("")}
            </div>
            `:""}
          </div>
        `}).join("")}
    </div>
  `,document.querySelectorAll(".part-card").forEach(t=>{t.addEventListener("click",()=>{b.navigate(`/part-detail?id=${t.dataset.id}`)})});const r=Math.ceil(m/d);w(a,o,r,m,t=>{o=t,g();const i=document.querySelector("nav"),s=i?i.offsetHeight:0,v=n.getBoundingClientRect().top+window.scrollY-s;window.scrollTo({top:v,behavior:"smooth"})})}function w(e,n,a,r,t){if(a<=1){e.innerHTML=`<div style="text-align: center; padding: var(--spacing-sm); color: var(--color-text-tertiary); font-size: var(--font-size-sm);">${r}개</div>`;return}e.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-xs); padding: var(--spacing-md) 0;">
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="1" ${n===1?"disabled":""}>«</button>
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="${n-1}" ${n===1?"disabled":""}>‹</button>
      <span class="pagination-current" style="cursor: pointer; padding: 0 var(--spacing-sm); font-size: var(--font-size-sm); font-weight: 600; user-select: none;">${n} / ${a}</span>
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="${n+1}" ${n===a?"disabled":""}>›</button>
      <button class="btn btn-secondary btn-sm pagination-btn" data-page="${a}" ${n===a?"disabled":""}>»</button>
    </div>
  `,e.querySelectorAll(".pagination-btn").forEach(i=>{i.addEventListener("click",()=>{i.disabled||t(parseInt(i.dataset.page))})}),e.querySelector(".pagination-current").addEventListener("click",()=>{const i=prompt(`이동할 페이지 (1-${a})`,n);if(i===null)return;const s=parseInt(i);s>=1&&s<=a&&s!==n&&t(s)})}export{S as initPartsPage};
