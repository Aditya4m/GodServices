import{_ as e,a as t,c as n,d as r,i,l as a,m as o,n as s,o as c,p as l,r as u,t as d,v as f,y as p}from"./theme-Y_Z3Ykzz.js";var m=p((()=>{a(),f();var s=null,u=null;async function d(){o(`Loading dashboard...`);try{s=await t.get();let n=await c.listDocuments(i.databaseId,i.collections.workers,[e.equal(`userId`,s.$id)]);if(n.documents.length>0){u=n.documents[0];let t=await c.listDocuments(i.databaseId,i.collections.users,[e.equal(`userId`,s.$id)]),r=t.documents.length>0?t.documents[0].name:`Worker`;document.getElementById(`workerName`).textContent=r,document.getElementById(`workerSkill`).textContent=u.skillCategory.replace(`-`,` `).toUpperCase(),document.getElementById(`availabilityToggle`).checked=u.isActive,g(u.isActive),u.isApproved||document.getElementById(`approvalAlert`).classList.remove(`hidden`),await Promise.all([p(),m(),h()])}else l(`Worker profile not found. Please complete your profile.`,`error`),setTimeout(()=>{window.location.href=`/worker/profile.html?setup=true`},2e3)}catch(e){console.error(`Initialization error:`,e),l(`Failed to load dashboard. Please try again.`,`error`)}finally{n()}}async function p(){try{let t=(await c.listDocuments(i.databaseId,i.collections.bookings,[e.equal(`workerId`,u.$id)])).documents;document.getElementById(`pendingJobs`).textContent=t.filter(e=>e.status===`pending`).length,document.getElementById(`activeJobs`).textContent=t.filter(e=>[`accepted`,`in-progress`].includes(e.status)).length,document.getElementById(`completedJobs`).textContent=t.filter(e=>e.status===`completed`).length;let n=t.filter(e=>e.status===`completed`).reduce((e,t)=>e+(t.estimatedPrice||0),0);document.getElementById(`totalEarnings`).textContent=`₹${n}`}catch(e){console.error(`Error loading job stats:`,e)}}async function m(){try{let t=(await c.listDocuments(i.databaseId,i.collections.bookings,[e.equal(`workerId`,u.$id),e.equal(`status`,`pending`),e.orderDesc(`createdAt`)])).documents,n=document.getElementById(`pendingJobsContainer`);if(t.length===0){n.innerHTML=`
            <div class="empty-state">
              <div class="empty-state-icon">📭</div>
              <p>No pending job requests</p>
            </div>
          `;return}n.innerHTML=``,t.forEach(e=>{let t=document.createElement(`div`);t.className=`job-request-card`,t.innerHTML=`
            <div class="job-header">
              <div>
                <div class="job-title">${e.serviceCategory}</div>
                <div class="job-time">${new Date(e.createdAt).toLocaleString()}</div>
              </div>
              <span class="badge badge-warning">Pending</span>
            </div>
            
            <div class="job-details">
              <div class="detail-item">
                <strong>Location:</strong>
                <span>${e.location}, ${e.pincode}</span>
              </div>
              <div class="detail-item">
                <strong>Scheduled:</strong>
                <span>${new Date(e.scheduledTime).toLocaleString()}</span>
              </div>
              <div class="detail-item">
                <strong>Problem:</strong>
                <span>${e.problemDescription}</span>
              </div>
              <div class="detail-item">
                <strong>Estimated Price:</strong>
                <span>₹${e.estimatedPrice}</span>
              </div>
            </div>
            
            <div class="job-actions">
              <button class="btn btn-primary" onclick="acceptJob('${e.$id}')">
                Accept Job
              </button>
              <button class="btn btn-secondary" onclick="rejectJob('${e.$id}')">
                Reject
              </button>
            </div>
          `,n.appendChild(t)})}catch(e){console.error(`Error loading pending jobs:`,e)}}async function h(){try{let t=new Date;t.setHours(0,0,0,0);let n=new Date(t);n.setDate(n.getDate()+1);let r=(await c.listDocuments(i.databaseId,i.collections.bookings,[e.equal(`workerId`,u.$id),e.equal(`status`,`accepted`),e.orderAsc(`scheduledTime`)])).documents.filter(e=>{let r=new Date(e.scheduledTime);return r>=t&&r<n}),a=document.getElementById(`scheduleContainer`);if(r.length===0){a.innerHTML=`
            <div class="empty-state">
              <div class="empty-state-icon">📅</div>
              <p>No jobs scheduled for today</p>
            </div>
          `;return}a.innerHTML=``,r.forEach(e=>{let t=document.createElement(`div`);t.className=`schedule-item`,t.innerHTML=`
            <div class="schedule-time">${new Date(e.scheduledTime).toLocaleTimeString(`en-US`,{hour:`2-digit`,minute:`2-digit`})}</div>
            <div class="schedule-details">
              <div class="schedule-service">${e.serviceCategory.replace(`-`,` `).toUpperCase()}</div>
              <div class="schedule-location">${e.location}</div>
            </div>
            <span class="badge badge-info">Active</span>
          `,a.appendChild(t)})}catch(e){console.error(`Error loading schedule:`,e)}}document.getElementById(`availabilityToggle`).addEventListener(`change`,async e=>{let t=e.target.checked;o(`Updating availability...`);try{await c.updateDocument(i.databaseId,i.collections.workers,u.$id,{isActive:t}),u.isActive=t,g(t),l(`You are now ${t?`available`:`busy`}`,`success`)}catch(n){console.error(`Error updating availability:`,n),l(`Failed to update availability`,`error`),e.target.checked=!t}finally{n()}});function g(e){let t=document.getElementById(`availabilityLabel`);t.textContent=e?`Available`:`Busy`,t.classList.toggle(`active`,e)}window.acceptJob=async function(e){o(`Accepting job...`);try{await c.updateDocument(i.databaseId,i.collections.bookings,e,{status:`accepted`,updatedAt:new Date().toISOString()}),l(`Job accepted successfully!`,`success`),await m(),await p(),await h()}catch(e){console.error(`Error accepting job:`,e),l(`Failed to accept job`,`error`)}finally{n()}},window.rejectJob=async function(e){if(confirm(`Are you sure you want to reject this job?`)){o(`Rejecting job...`);try{await c.updateDocument(i.databaseId,i.collections.bookings,e,{status:`cancelled`,updatedAt:new Date().toISOString()}),l(`Job rejected`,`info`),await m(),await p()}catch(e){console.error(`Error rejecting job:`,e),l(`Failed to reject job`,`error`)}finally{n()}}},document.getElementById(`logoutBtn`).addEventListener(`click`,r),d()})),h=p((()=>{s(),window.toggleTheme=u,d()}));m(),h();