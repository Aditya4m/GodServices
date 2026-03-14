import{a as e,c as t,d as n,i as r,l as i,m as a,n as o,o as s,p as c,r as l,t as u,v as d,y as f}from"./theme-Y_Z3Ykzz.js";var p=f((()=>{i(),d();var o=[],l=`pending`,u=null;async function f(){a(`Loading workers...`);try{await e.get(),await p()}catch(e){console.error(`Initialization error:`,e),c(`Failed to load workers. Please try again.`,`error`)}finally{t()}}async function p(){try{o=(await s.listDocuments(r.databaseId,r.collections.workers)).documents,document.getElementById(`pendingCount`).textContent=o.filter(e=>!e.isApproved).length,document.getElementById(`approvedCount`).textContent=o.filter(e=>e.isApproved).length,document.getElementById(`allCount`).textContent=o.length,m()}catch(e){console.error(`Error loading workers:`,e),c(`Failed to load workers`,`error`)}}function m(){let e=document.getElementById(`workersContainer`),t=o;if(l===`pending`?t=o.filter(e=>!e.isApproved):l===`approved`&&(t=o.filter(e=>e.isApproved)),t.length===0){e.innerHTML=`
          <div class="empty-state">
            <div class="empty-state-icon">👷</div>
            <p>No workers found in this category</p>
          </div>
        `;return}e.innerHTML=``,t.forEach(t=>{let n=document.createElement(`div`);n.className=`worker-card`,n.innerHTML=`
          <div class="worker-header">
            <div class="worker-info">
              <h3>Worker #${t.$id.substring(0,8)}</h3>
              <div class="worker-category">${t.skillCategory}</div>
            </div>
            <div>
              ${t.isApproved?`<span class="badge badge-success">Approved</span>`:`<span class="badge badge-warning">Pending</span>`}
              ${t.isActive?`<span class="badge badge-info ml-sm">Active</span>`:`<span class="badge badge-error ml-sm">Inactive</span>`}
            </div>
          </div>
          
          <div class="worker-details">
            <div class="detail-item">
              <strong>Experience:</strong>
              <span>${t.experience} years</span>
            </div>
            <div class="detail-item">
              <strong>Charges:</strong>
              <span>₹${t.charges}/hour</span>
            </div>
            <div class="detail-item">
              <strong>Service Area:</strong>
              <span>${t.serviceArea?t.serviceArea.join(`, `):`N/A`}</span>
            </div>
            <div class="detail-item">
              <strong>Completed Jobs:</strong>
              <span>${t.completedJobs||0}</span>
            </div>
            <div class="detail-item">
              <strong>Rating:</strong>
              <span>${(t.rating||0).toFixed(1)} ⭐</span>
            </div>
            <div class="detail-item">
              <strong>Status:</strong>
              <span>${t.isActive?`Available`:`Busy`}</span>
            </div>
          </div>
          
          <div class="worker-actions">
            ${t.isApproved?`<button class="btn btn-ghost" onclick="disableWorker('${t.$id}')">Disable Worker</button>`:`<button class="btn btn-primary" onclick="approveWorker('${t.$id}')">Approve Worker</button>
                 <button class="btn btn-secondary" onclick="rejectWorker('${t.$id}')">Reject</button>`}
            <button class="btn btn-ghost" onclick="editWorker('${t.$id}')">Edit Details</button>
          </div>
        `,e.appendChild(n)})}document.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.tab-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),l=e.dataset.tab,m()})}),window.approveWorker=async function(e){a(`Approving worker...`);try{await s.updateDocument(r.databaseId,r.collections.workers,e,{isApproved:!0,isActive:!0}),c(`Worker approved successfully!`,`success`),await p()}catch(e){console.error(`Error approving worker:`,e),c(`Failed to approve worker`,`error`)}finally{t()}},window.rejectWorker=async function(e){if(confirm(`Are you sure you want to reject this worker?`)){a(`Rejecting worker...`);try{await s.deleteDocument(r.databaseId,r.collections.workers,e),c(`Worker rejected and removed`,`info`),await p()}catch(e){console.error(`Error rejecting worker:`,e),c(`Failed to reject worker`,`error`)}finally{t()}}},window.disableWorker=async function(e){if(confirm(`Are you sure you want to disable this worker?`)){a(`Disabling worker...`);try{await s.updateDocument(r.databaseId,r.collections.workers,e,{isApproved:!1,isActive:!1}),c(`Worker disabled`,`info`),await p()}catch(e){console.error(`Error disabling worker:`,e),c(`Failed to disable worker`,`error`)}finally{t()}}},window.editWorker=function(e){let t=o.find(t=>t.$id===e);t&&(u=e,document.getElementById(`editSkillCategory`).value=t.skillCategory,document.getElementById(`editExperience`).value=t.experience,document.getElementById(`editServiceArea`).value=t.serviceArea?t.serviceArea.join(`, `):``,document.getElementById(`editCharges`).value=t.charges,document.getElementById(`editIsActive`).checked=t.isActive,document.getElementById(`editWorkerModal`).classList.add(`active`))},window.closeEditModal=function(){document.getElementById(`editWorkerModal`).classList.remove(`active`),u=null},document.getElementById(`editWorkerForm`).addEventListener(`submit`,async e=>{if(e.preventDefault(),u){a(`Saving changes...`);try{let e=document.getElementById(`editServiceArea`).value.split(`,`).map(e=>e.trim()).filter(e=>e);await s.updateDocument(r.databaseId,r.collections.workers,u,{skillCategory:document.getElementById(`editSkillCategory`).value,experience:parseInt(document.getElementById(`editExperience`).value),serviceArea:e,charges:parseInt(document.getElementById(`editCharges`).value),isActive:document.getElementById(`editIsActive`).checked}),c(`Worker updated successfully!`,`success`),closeEditModal(),await p()}catch(e){console.error(`Error updating worker:`,e),c(`Failed to update worker`,`error`)}finally{t()}}}),document.getElementById(`logoutBtn`).addEventListener(`click`,n),f()})),m=f((()=>{o(),window.toggleTheme=l,u()}));p(),m();