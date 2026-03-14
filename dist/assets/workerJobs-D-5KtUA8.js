import{_ as e,a as t,c as n,i as r,l as i,m as a,n as o,o as s,p as c,r as l,s as u,t as d,u as f,y as p}from"./theme-Y_Z3Ykzz.js";var m=p((()=>{i();var o=null,l=[],d=`all`;async function p(){return!await f()||(o=await m(),!o)?(window.location.href=`/login.html`,!1):await u(o.$id)===`worker`?!0:(c(`Access denied. Workers only.`,`error`),setTimeout(()=>window.location.href=`/index.html`,2e3),!1)}async function m(){try{return await t.get()}catch(e){return console.error(`Error getting user:`,e),null}}async function h(){try{a();let t=await s.listDocuments(r.databaseId,r.collections.workers,[e.equal(`userId`,o.$id)]);if(t.documents.length===0){console.error(`Worker profile not found`),n();return}let i=t.documents[0].$id;if(l=(await s.listDocuments(r.databaseId,r.collections.bookings,[e.equal(`workerId`,i),e.orderDesc(`$createdAt`)])).documents,l.length===0){g(),_(),n();return}let c=[...new Set(l.map(e=>e.customerId))];if(c.length>0){let t=await s.listDocuments(r.databaseId,r.collections.users,[e.equal(`userId`,c)]),n={};t.documents.forEach(e=>{n[e.userId]=e}),l.forEach(e=>{e.customerData=n[e.customerId]})}g(),_(),n()}catch(e){console.error(`Error loading jobs:`,e),c(`Failed to load jobs: ${e.message}`,`error`),n()}}function g(){let e=l.filter(e=>e.status===`pending`).length,t=l.filter(e=>[`accepted`,`in-progress`].includes(e.status)).length,n=l.filter(e=>e.status===`completed`).length;document.getElementById(`totalJobs`).textContent=l.length,document.getElementById(`pendingJobs`).textContent=e,document.getElementById(`activeJobs`).textContent=t,document.getElementById(`completedJobs`).textContent=n}function _(){let e=document.getElementById(`jobsList`),t=document.getElementById(`emptyState`),n=l;if(d!==`all`&&(n=l.filter(e=>e.status===d)),n.length===0){e.innerHTML=``,t.classList.remove(`hidden`);return}t.classList.add(`hidden`),e.innerHTML=n.map(e=>{let t={pending:`warning`,accepted:`info`,"in-progress":`info`,completed:`success`,cancelled:`error`}[e.status]||`secondary`,n=e.customerData?.name||`Unknown Customer`,r=e.customerData?.phone||`N/A`;return`
                    <div class="job-card">
                        <div class="job-header">
                            <div>
                                <div class="job-title">${e.serviceCategory||`Service`}</div>
                                <span class="badge badge-${t}">${e.status}</span>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--color-accent-primary);">
                                    ₹${e.estimatedPrice||0}
                                </div>
                            </div>
                        </div>

                        <div class="job-info">
                            <div class="job-info-item">
                                <span class="job-info-label">Customer</span>
                                <span class="job-info-value">${n}</span>
                            </div>
                            <div class="job-info-item">
                                <span class="job-info-label">Phone</span>
                                <span class="job-info-value">${r}</span>
                            </div>
                            <div class="job-info-item">
                                <span class="job-info-label">Date</span>
                                <span class="job-info-value">${e.scheduledTime?new Date(e.scheduledTime).toLocaleDateString():`N/A`}</span>
                            </div>
                            <div class="job-info-item">
                                <span class="job-info-label">Time</span>
                                <span class="job-info-value">${e.scheduledTime?new Date(e.scheduledTime).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}):`TBD`}</span>
                            </div>
                        </div>

                        ${e.description?`
                            <div style="margin-bottom: var(--spacing-sm);">
                                <span class="job-info-label">Description</span>
                                <p style="color: var(--color-text-secondary); margin-top: 0.25rem;">${e.description}</p>
                            </div>
                        `:``}

                        ${e.address?`
                            <div style="margin-bottom: var(--spacing-md);">
                                <span class="job-info-label">Address</span>
                                <p style="color: var(--color-text-secondary); margin-top: 0.25rem;">${e.address}</p>
                            </div>
                        `:``}

                        <div class="job-actions">
                            ${e.status===`pending`?`
                                <button class="btn btn-primary btn-sm" onclick="updateJobStatus('${e.$id}', 'accepted')">
                                    Accept Job
                                </button>
                                <button class="btn btn-ghost btn-sm" onclick="updateJobStatus('${e.$id}', 'cancelled')">
                                    Reject
                                </button>
                            `:``}
                            ${e.status===`accepted`?`
                                <button class="btn btn-primary btn-sm" onclick="updateJobStatus('${e.$id}', 'in-progress')">
                                    Start Job
                                </button>
                            `:``}
                            ${e.status===`in-progress`?`
                                <button class="btn btn-primary btn-sm" onclick="updateJobStatus('${e.$id}', 'completed')">
                                    Mark Complete
                                </button>
                            `:``}
                            ${r===`N/A`?``:`
                                <a href="tel:${r}" class="btn btn-secondary btn-sm">
                                    📞 Call Customer
                                </a>
                            `}
                        </div>
                    </div>
                `}).join(``)}window.updateJobStatus=async function(t,i){try{if(a(),await s.updateDocument(r.databaseId,r.collections.bookings,t,{status:i}),i===`completed`)try{let t=await s.listDocuments(r.databaseId,r.collections.workers,[e.equal(`userId`,o.$id)]);if(t.documents.length>0){let e=t.documents[0];await s.updateDocument(r.databaseId,r.collections.workers,e.$id,{completedJobs:(e.completedJobs||0)+1})}}catch(e){console.warn(`Could not update worker completedJobs count:`,e)}c(`Job ${i} successfully`,`success`),await h(),n()}catch(e){console.error(`Error updating job status:`,e),c(`Failed to update job status`,`error`),n()}},document.querySelectorAll(`.filter-tab`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.filter-tab`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),d=e.dataset.status,_()})}),document.getElementById(`logoutBtn`).addEventListener(`click`,async()=>{try{await t.deleteSession(`current`),window.location.href=`/index.html`}catch(e){console.error(`Logout error:`,e),window.location.href=`/index.html`}});async function v(){await p()&&await h()}v()})),h=p((()=>{o(),window.toggleTheme=l,d()}));m(),h();