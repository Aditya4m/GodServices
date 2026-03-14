import{_ as e,a as t,c as n,d as r,i,l as a,m as o,n as s,o as c,p as l,r as u,t as d,v as f,y as p}from"./theme-Y_Z3Ykzz.js";var m=p((()=>{a(),f();var s=null,u=[];async function d(){o(`Loading your bookings...`);try{try{s=await t.get()}catch{window.location.href=`/login.html`;return}try{u=(await c.listDocuments(i.databaseId,i.collections.bookings,[e.equal(`customerId`,s.$id),e.orderDesc(`createdAt`)])).documents}catch{console.warn(`Index missing, using fallback filtering`),u=(await c.listDocuments(i.databaseId,i.collections.bookings,[e.orderDesc(`createdAt`)])).documents.filter(e=>e.customerId===s.$id)}p(`all`)}catch(e){console.error(`Error:`,e),l(`Failed to load bookings`,`error`)}finally{n()}}function p(e){let t=document.getElementById(`bookingsList`),n=document.getElementById(`emptyState`),r=e===`all`?u:u.filter(t=>t.status===e);if(r.length===0){t.innerHTML=``,n.classList.remove(`hidden`);return}n.classList.add(`hidden`),t.innerHTML=r.map(e=>{let t=new Date(e.createdAt).toLocaleDateString(void 0,{year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`}),n={pending:`warning`,accepted:`info`,completed:`success`,cancelled:`error`},r=``;return e.status===`completed`&&(r=e.rating?`<div class="rated-display">Rated: ${`★`.repeat(e.rating)}${`☆`.repeat(5-e.rating)}</div>`:`<button class="rate-btn" onclick="openRatingModal('${e.$id}', '${e.workerId}')">\u2b50 Rate Worker</button>`),`
                <div class="booking-card animate-fade-in">
                    <div class="booking-header">
                        <div class="booking-service">${e.serviceCategory}</div>
                        <span class="badge badge-${n[e.status]||`default`}">${e.status}</span>
                    </div>
                    <div class="booking-details-grid">
                        <div class="detail-item">
                            <label>Date & Time</label>
                            <span>${t}</span>
                        </div>
                        <div class="detail-item">
                            <label>Location</label>
                            <span>${e.location}</span>
                        </div>
                        <div class="detail-item">
                            <label>Amount</label>
                            <span>₹${e.estimatedPrice}</span>
                        </div>
                        <div class="detail-item">
                            <label>Payment</label>
                            <span class="payment-status-${e.utr?`paid`:(e.paymentStatus||``).toLowerCase()}">
                                ${e.utr?`Paid`:e.paymentStatus||`Pending`}
                            </span>
                        </div>
                    </div>
                    ${r}
                </div>
                `}).join(``)}document.querySelectorAll(`.filter-tab`).forEach(e=>{e.addEventListener(`click`,e=>{document.querySelectorAll(`.filter-tab`).forEach(e=>e.classList.remove(`active`)),e.target.classList.add(`active`),p(e.target.dataset.status)})});var m=null,h=null,g=0,_={1:`Poor`,2:`Below Average`,3:`Average`,4:`Good`,5:`Excellent`};window.openRatingModal=function(e,t){m=e,h=t,g=0,document.querySelectorAll(`.star-btn`).forEach(e=>{e.textContent=`☆`,e.classList.remove(`active`)}),document.getElementById(`ratingLabel`).textContent=`Select a rating`,document.getElementById(`submitRatingBtn`).disabled=!0,document.getElementById(`ratingModal`).classList.add(`active`)},document.querySelectorAll(`.star-btn`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{v(parseInt(e.dataset.value))}),e.addEventListener(`mouseleave`,()=>{v(g)}),e.addEventListener(`click`,()=>{g=parseInt(e.dataset.value),v(g),document.getElementById(`ratingLabel`).textContent=_[g],document.getElementById(`submitRatingBtn`).disabled=!1})});function v(e){document.querySelectorAll(`.star-btn`).forEach(t=>{parseInt(t.dataset.value)<=e?(t.textContent=`★`,t.classList.add(`active`)):(t.textContent=`☆`,t.classList.remove(`active`))})}document.getElementById(`closeRatingModal`).addEventListener(`click`,()=>{document.getElementById(`ratingModal`).classList.remove(`active`)}),document.getElementById(`submitRatingBtn`).addEventListener(`click`,async()=>{if(!(!g||!m)){o(`Submitting rating...`);try{await c.updateDocument(i.databaseId,i.collections.bookings,m,{rating:g});let t=[];try{t=(await c.listDocuments(i.databaseId,i.collections.bookings,[e.equal(`workerId`,h),e.equal(`status`,`completed`),e.limit(100)])).documents.filter(e=>e.rating&&e.rating>0)}catch{t=(await c.listDocuments(i.databaseId,i.collections.bookings,[e.limit(100)])).documents.filter(e=>e.workerId===h&&e.status===`completed`&&e.rating&&e.rating>0)}let n=t.reduce((e,t)=>e+t.rating,0),r=t.length>0?n/t.length:0;try{await c.updateDocument(i.databaseId,i.collections.workers,h,{rating:parseFloat(r.toFixed(1))}),console.log(`Worker rating updated successfully to`,r)}catch(e){console.error(`Failed to update worker rating:`,e)}let a=u.find(e=>e.$id===m);a&&(a.rating=g),document.getElementById(`ratingModal`).classList.remove(`active`),l(`Rating submitted successfully!`,`success`);let o=document.querySelector(`.filter-tab.active`);p(o?o.dataset.status:`all`)}catch(e){console.error(`Error submitting rating:`,e),l(`Failed to submit rating: ${e.message}`,`error`)}finally{n()}}}),document.getElementById(`logoutBtn`).addEventListener(`click`,r),d()})),h=p((()=>{s(),window.toggleTheme=u,d()}));m(),h();