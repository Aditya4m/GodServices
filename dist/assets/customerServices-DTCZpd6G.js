import{_ as e,a as t,c as n,d as r,h as i,i as a,l as o,m as s,n as c,o as l,p as u,r as d,t as f,v as p,y as m}from"./theme-Y_Z3Ykzz.js";var h=m((()=>{o(),p();var c=[],d=[],f=new URLSearchParams(window.location.search).get(`category`);async function m(){s(`Loading workers...`);try{try{await t.get()}catch(e){if(console.error(`Authentication error:`,e),e.code===401||e.message.includes(`guests`)){u(`Please login to continue`,`error`),setTimeout(()=>{window.location.href=`/login.html`},1500);return}throw e}if(f){document.getElementById(`categoryFilter`).value=f;let e={plumber:`Plumber`,electrician:`Electrician`,"ac-technician":`AC Technician`,carpenter:`Carpenter`,painter:`Painter`,cleaner:`Cleaner`,gardener:`Gardener`,mechanic:`Mechanic`};document.getElementById(`categoryName`).textContent=`${e[f]} Services`}await h()}catch(e){console.error(`Initialization error:`,e),u(`Failed to load workers. Please try again.`,`error`)}finally{n()}}async function h(){try{let t;try{let n=[e.equal(`isApproved`,!0),e.equal(`isActive`,!0)];f&&n.push(e.equal(`skillCategory`,f)),t=await l.listDocuments(a.databaseId,a.collections.workers,n)}catch(e){console.warn(`Worker attributes not indexed, using fallback:`,e),t={documents:(await l.listDocuments(a.databaseId,a.collections.workers)).documents.filter(e=>!(!e.isApproved||!e.isActive||f&&e.skillCategory!==f))}}c=t.documents;let n=[...new Set(c.map(e=>e.userId))];if(n.length===0){d=[],g();return}let r=await l.listDocuments(a.databaseId,a.collections.users),i={};r.documents.forEach(e=>{n.includes(e.userId)&&(i[e.userId]=e.name)}),c.forEach(e=>{e.name=i[e.userId]||`Worker`}),d=[...c],g()}catch(e){console.error(`Error loading workers:`,e),u(`Failed to load workers: ${e.message}`,`error`)}}function g(){let e=document.getElementById(`workersGrid`),t=document.getElementById(`emptyState`);if(d.length===0){e.classList.add(`hidden`),t.classList.remove(`hidden`);return}e.classList.remove(`hidden`),t.classList.add(`hidden`),e.innerHTML=``;let n={plumber:`🔧`,electrician:`⚡`,"ac-technician":`❄️`,carpenter:`🪚`,painter:`🎨`,cleaner:`🧹`,gardener:`🌱`,mechanic:`🔩`};d.forEach(t=>{let r=document.createElement(`div`);r.className=`worker-card`;let i=t.rating||0,a=`⭐`.repeat(Math.round(i));r.innerHTML=`
          <div class="worker-header">
            <div class="worker-avatar">${n[t.skillCategory]||`👷`}</div>
            <div>
              <div class="worker-name">${t.name}</div>
              <div class="worker-category">${t.skillCategory||`N/A`}</div>
            </div>
          </div>
          
          <div class="worker-stats">
            <div class="stat-item">
              <div class="stat-label">Experience</div>
              <div class="stat-value">${t.experience||0} years</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Completed</div>
              <div class="stat-value">${t.completedJobs||0} jobs</div>
            </div>
          </div>
          
          <div class="worker-details">
            <div class="detail-row">
              <span class="detail-label">Service Area:</span>
              <span class="detail-value">${t.serviceArea?t.serviceArea.join(`, `):`N/A`}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Charges:</span>
              <span class="detail-value">₹${t.charges||0}/hour</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Rating:</span>
              <span class="detail-value rating">${a} ${i.toFixed(1)}</span>
            </div>
          </div>
          
          <button class="btn btn-primary btn-block" onclick="bookWorker('${t.$id}', '${t.skillCategory}', ${t.charges})">
            Book Now
          </button>
          
          <div class="portfolio-section" id="portfolio-${t.$id}" style="display:none;">
            <div class="portfolio-label">📸 Work Portfolio</div>
            <div class="portfolio-collapsed" id="portfolio-collapsed-${t.$id}"></div>
            <div class="portfolio-expanded" id="portfolio-expanded-${t.$id}"></div>
          </div>
        `,e.appendChild(r)}),_()}document.getElementById(`applyFiltersBtn`).addEventListener(`click`,()=>{console.log(`Apply Filters button clicked`);let e=document.getElementById(`categoryFilter`).value,t=document.getElementById(`pincodeFilter`).value.trim();console.log(`Filters:`,{category:e,pincode:t}),console.log(`All workers count:`,c.length),d=(c||[]).filter(n=>!(e&&n.skillCategory!==e||t&&(!n.serviceArea||!n.serviceArea.includes(t)))),console.log(`Filtered workers count:`,d.length),g()});async function _(){let t=[];try{t=(await i.listFiles(a.buckets.workPortfolio,[e.limit(500)])).files||[]}catch(e){console.warn(`Could not load portfolio files:`,e);return}d.forEach(e=>{let n=t.filter(t=>t.name.startsWith(e.$id)),r=document.getElementById(`portfolio-${e.$id}`),o=document.getElementById(`portfolio-collapsed-${e.$id}`),s=document.getElementById(`portfolio-expanded-${e.$id}`);if(!r||!o||!s||n.length===0)return;r.style.display=`block`;let c=Math.min(3,n.length),l=``;for(let e=0;e<c;e++){let t=i.getFileView(a.buckets.workPortfolio,n[e].$id).toString();l+=`<img class="mini-thumb" src="${t}" alt="Work" loading="lazy">`}n.length>3&&(l+=`<span class="more-badge">+${n.length-3} more</span>`),o.innerHTML=l;let u=``;n.forEach(e=>{let t=i.getFileView(a.buckets.workPortfolio,e.$id).toString();u+=`<div class="port-thumb"><img src="${t}" alt="Work photo" loading="lazy"></div>`}),s.innerHTML=u})}window.bookWorker=function(e,t,n){sessionStorage.setItem(`selectedWorker`,e),sessionStorage.setItem(`serviceCategory`,t),sessionStorage.setItem(`estimatedPrice`,n),window.location.href=`/customer/booking.html`},document.getElementById(`logoutBtn`).addEventListener(`click`,r),m()})),g=m((()=>{c(),window.toggleTheme=d,f()}));h(),g();