import{_ as e,a as t,c as n,d as r,i,l as a,m as o,n as s,o as c,p as l,r as u,t as d,v as f,y as p}from"./theme-Y_Z3Ykzz.js";var m=p((()=>{a(),f();var s=null,u=[],d=[],p=[],m=`all`,h=null;async function g(){o(`Loading bookings...`);try{s=await t.get();let n=!1;try{let t=await c.listDocuments(i.databaseId,i.collections.users,[e.equal(`userId`,s.$id)]);n=t.documents.length>0&&t.documents[0].role===`admin`}catch(e){console.warn(`userId query failed, using fallback:`,e);let t=(await c.listDocuments(i.databaseId,i.collections.users)).documents.find(e=>e.userId===s.$id);n=t&&t.role===`admin`}if(!n){l(`Unauthorized access. Admin only.`,`error`),setTimeout(()=>{window.location.href=`/index.html`},2e3);return}let r=new URLSearchParams(window.location.search).get(`customer`);try{u=(await c.listDocuments(i.databaseId,i.collections.bookings)).documents}catch(e){console.warn(`Could not load bookings:`,e)}try{d=(await c.listDocuments(i.databaseId,i.collections.users)).documents}catch(e){console.warn(`Could not load users:`,e)}try{p=(await c.listDocuments(i.databaseId,i.collections.workers)).documents}catch(e){console.warn(`Could not load workers:`,e)}if(r){u=u.filter(e=>e.customerId===r);let e=d.find(e=>e.userId===r);e&&(document.querySelector(`.page-header p`).textContent=`Showing bookings for ${e.name}`)}_(),v(),y()}catch(e){console.error(`Initialization error:`,e),l(`Failed to load bookings.`,`error`)}finally{n()}}function _(){document.getElementById(`totalBookings`).textContent=u.length,document.getElementById(`pendingCount`).textContent=u.filter(e=>e.status===`pending`).length,document.getElementById(`activeCount`).textContent=u.filter(e=>[`accepted`,`in-progress`].includes(e.status)).length,document.getElementById(`completedCount`).textContent=u.filter(e=>e.status===`completed`).length}function v(){document.getElementById(`tabAll`).textContent=u.length,document.getElementById(`tabPending`).textContent=u.filter(e=>e.status===`pending`).length,document.getElementById(`tabAccepted`).textContent=u.filter(e=>[`accepted`,`in-progress`].includes(e.status)).length,document.getElementById(`tabCompleted`).textContent=u.filter(e=>e.status===`completed`).length,document.getElementById(`tabCancelled`).textContent=u.filter(e=>e.status===`cancelled`).length}function y(){let e=document.getElementById(`bookingsContainer`),t=u;if(m===`pending`?t=u.filter(e=>e.status===`pending`):m===`accepted`?t=u.filter(e=>[`accepted`,`in-progress`].includes(e.status)):m===`completed`?t=u.filter(e=>e.status===`completed`):m===`cancelled`&&(t=u.filter(e=>e.status===`cancelled`)),t.sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)),t.length===0){e.innerHTML=`
                    <div class="empty-state">
                        <div class="empty-state-icon">📋</div>
                        <p>No bookings found in this category</p>
                    </div>
                `;return}e.innerHTML=``,t.forEach(t=>{let n=d.find(e=>e.userId===t.customerId),r=p.find(e=>e.$id===t.workerId),i=r?d.find(e=>e.userId===r.userId):null,a={pending:`warning`,accepted:`info`,"in-progress":`info`,completed:`success`,cancelled:`error`},o=document.createElement(`div`);o.className=`booking-card`,o.setAttribute(`data-status`,t.status),o.innerHTML=`
                    <div class="booking-header">
                        <div class="booking-info">
                            <h3>${(t.serviceCategory||`Service`).replace(`-`,` `).toUpperCase()}</h3>
                            <div class="booking-id">ID: ${t.$id.substring(0,12)}</div>
                        </div>
                        <span class="badge badge-${a[t.status]||`info`}">${t.status}</span>
                    </div>

                    <div class="booking-details">
                        <div class="detail-item">
                            <strong>Customer:</strong>
                            <span>${n?n.name:t.customerId?.substring(0,8)||`N/A`}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Worker:</strong>
                            <span>${i?i.name:r?`Worker #`+r.$id.substring(0,8):`Unassigned`}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Location:</strong>
                            <span>${t.location||`N/A`}, ${t.pincode||``}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Scheduled:</strong>
                            <span>${t.scheduledTime?new Date(t.scheduledTime).toLocaleString():`Not set`}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Price:</strong>
                            <span>₹${t.estimatedPrice||0}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Created:</strong>
                            <span>${new Date(t.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    ${t.problemDescription?`
                    <div class="booking-problem">
                        <strong>Problem: </strong>${t.problemDescription}
                    </div>`:``}

                    <div class="booking-actions">
                        ${t.status===`pending`?`
                            <button class="btn btn-primary btn-sm" onclick="quickUpdate('${t.$id}', 'accepted')">Accept</button>
                            <button class="btn btn-secondary btn-sm" onclick="quickUpdate('${t.$id}', 'cancelled')">Cancel</button>
                        `:``}
                        ${t.status===`accepted`?`
                            <button class="btn btn-primary btn-sm" onclick="quickUpdate('${t.$id}', 'completed')">Mark Completed</button>
                        `:``}
                        <button class="btn btn-ghost btn-sm" onclick="openStatusModal('${t.$id}', '${t.status}')">Change Status</button>
                    </div>
                `,e.appendChild(o)})}document.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.tab-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),m=e.dataset.tab,y()})}),window.quickUpdate=async function(e,t){o(`Updating booking...`);try{await c.updateDocument(i.databaseId,i.collections.bookings,e,{status:t,updatedAt:new Date().toISOString()});let n=u.findIndex(t=>t.$id===e);n!==-1&&(u[n].status=t),_(),v(),y(),l(`Booking ${t} successfully!`,`success`)}catch(e){console.error(`Error updating booking:`,e),l(`Failed to update booking`,`error`)}finally{n()}},window.openStatusModal=function(e,t){h=e,document.getElementById(`newStatus`).value=t,document.getElementById(`statusModal`).classList.add(`active`)},window.closeStatusModal=function(){document.getElementById(`statusModal`).classList.remove(`active`),h=null},window.saveStatus=async function(){if(!h)return;let e=document.getElementById(`newStatus`).value;closeStatusModal(),await quickUpdate(h,e)},document.getElementById(`logoutBtn`).addEventListener(`click`,r),g()})),h=p((()=>{s(),window.toggleTheme=u,d()}));m(),h();