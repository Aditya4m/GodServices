import{_ as e,a as t,c as n,d as r,i,l as a,m as o,n as s,o as c,p as l,r as u,t as d,v as f,y as p}from"./theme-Y_Z3Ykzz.js";var m=p((()=>{a(),f();var s=null,u=[],d=[],p=[];async function m(){o(`Loading customers...`);try{s=await t.get();let n=!1;try{let t=await c.listDocuments(i.databaseId,i.collections.users,[e.equal(`userId`,s.$id)]);n=t.documents.length>0&&t.documents[0].role===`admin`}catch(e){console.warn(`userId query failed, using fallback:`,e);let t=(await c.listDocuments(i.databaseId,i.collections.users)).documents.find(e=>e.userId===s.$id);n=t&&t.role===`admin`}if(!n){l(`Unauthorized access. Admin only.`,`error`),setTimeout(()=>{window.location.href=`/index.html`},2e3);return}try{u=(await c.listDocuments(i.databaseId,i.collections.customers)).documents}catch(e){console.warn(`Could not load customers:`,e)}try{d=(await c.listDocuments(i.databaseId,i.collections.bookings)).documents}catch(e){console.warn(`Could not load bookings:`,e)}try{p=(await c.listDocuments(i.databaseId,i.collections.users)).documents}catch(e){console.warn(`Could not load users:`,e)}console.log(`Loaded:`,u.length,`customers,`,d.length,`bookings,`,p.length,`users`),h(),g()}catch(e){console.error(`Initialization error:`,e),l(`Failed to load customers. Check console for details.`,`error`)}finally{n()}}function h(){let e=p.filter(e=>e.role===`customer`);document.getElementById(`totalCustomers`).textContent=e.length,document.getElementById(`totalCustomerBookings`).textContent=d.length;let t=d.filter(e=>e.status===`completed`).reduce((e,t)=>e+(t.estimatedPrice||0),0);document.getElementById(`totalSpent`).textContent=`₹${t.toLocaleString()}`}function g(e=``){let t=document.getElementById(`customersContainer`),n=e.toLowerCase(),r=p.filter(e=>e.role===`customer`);if(n&&(r=r.filter(e=>{let t=u.find(t=>t.userId===e.userId),r=(e.name||``).toLowerCase(),i=(e.phone||``).toLowerCase(),a=(e.email||``).toLowerCase(),o=t?(t.pincode||``).toLowerCase():``;return r.includes(n)||i.includes(n)||a.includes(n)||o.includes(n)})),r.length===0){t.innerHTML=`
                    <div class="empty-state">
                        <div class="empty-state-icon">👥</div>
                        <p>${n?`No customers match your search`:`No customers registered yet`}</p>
                    </div>
                `;return}t.innerHTML=``,r.forEach(e=>{let n=u.find(t=>t.userId===e.userId),r=d.filter(t=>t.customerId===e.userId),i=r.filter(e=>e.status===`completed`),a=i.reduce((e,t)=>e+(t.estimatedPrice||0),0),o=document.createElement(`div`);o.className=`customer-card`,o.innerHTML=`
                    <div class="customer-header">
                        <div class="customer-info">
                            <h3>${e.name||`Customer`}</h3>
                            <div class="customer-phone">${e.phone||e.email||`No contact`}</div>
                        </div>
                        <span class="badge badge-success">Active</span>
                    </div>

                    <div class="customer-details">
                        <div class="detail-item">
                            <strong>Address:</strong>
                            <span>${n&&n.address||`N/A`}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Pincode:</strong>
                            <span>${n&&n.pincode||`N/A`}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Joined:</strong>
                            <span>${new Date(e.createdAt||e.$createdAt).toLocaleDateString()}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Total Bookings:</strong>
                            <span>${r.length}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Completed:</strong>
                            <span>${i.length}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Total Spent:</strong>
                            <span>₹${a.toLocaleString()}</span>
                        </div>
                    </div>

                    <div class="customer-actions">
                        <a href="/admin/bookings.html?customer=${e.userId}" class="btn btn-ghost btn-sm">View Bookings</a>
                    </div>
                `,t.appendChild(o)})}document.getElementById(`logoutBtn`).addEventListener(`click`,r),m()})),h=p((()=>{s(),window.toggleTheme=u,d()}));m(),h();