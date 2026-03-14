import{_ as e,a as t,c as n,d as r,i,l as a,m as o,n as s,o as c,p as l,r as u,t as d,v as f,y as p}from"./theme-Y_Z3Ykzz.js";var m=p((()=>{a(),f();var s=null,u=[{id:`plumber`,name:`Plumber`,icon:`🔧`,description:`Pipe repairs, installations`},{id:`electrician`,name:`Electrician`,icon:`⚡`,description:`Wiring, fixtures, repairs`},{id:`ac-technician`,name:`AC Technician`,icon:`❄️`,description:`AC repair & maintenance`},{id:`carpenter`,name:`Carpenter`,icon:`🪚`,description:`Furniture, woodwork`},{id:`painter`,name:`Painter`,icon:`🎨`,description:`Interior & exterior painting`},{id:`cleaner`,name:`Cleaner`,icon:`🧹`,description:`Home & office cleaning`},{id:`gardener`,name:`Gardener`,icon:`🌱`,description:`Garden maintenance`},{id:`mechanic`,name:`Mechanic`,icon:`🔩`,description:`Vehicle repairs`}];async function d(){o(`Loading dashboard...`);try{try{s=await t.get()}catch(e){if(console.error(`Authentication error:`,e),e.code===401||e.message.includes(`guests`)){l(`Please login to continue`,`error`),setTimeout(()=>{window.location.href=`/login.html`},1500);return}throw e}try{let t=await c.listDocuments(i.databaseId,i.collections.customers,[e.equal(`userId`,s.$id)]);t.documents.length>0&&t.documents[0]}catch(e){console.warn(`userId not indexed, using fallback method:`,e),(await c.listDocuments(i.databaseId,i.collections.customers)).documents.find(e=>e.userId===s.$id)}try{let t=await c.listDocuments(i.databaseId,i.collections.users,[e.equal(`userId`,s.$id)]);t.documents.length>0&&(document.getElementById(`userName`).textContent=t.documents[0].name)}catch(e){console.warn(`userId not indexed in users, using fallback:`,e);let t=(await c.listDocuments(i.databaseId,i.collections.users)).documents.find(e=>e.userId===s.$id);t&&(document.getElementById(`userName`).textContent=t.name)}await Promise.all([p(),m(),h()])}catch(e){console.error(`Initialization error:`,e),l(`Failed to load dashboard: ${e.message}`,`error`)}finally{n()}}async function p(){try{let t=[];try{t=(await c.listDocuments(i.databaseId,i.collections.bookings,[e.equal(`customerId`,s.$id)])).documents}catch(e){console.warn(`customerId not indexed, using fallback:`,e),t=(await c.listDocuments(i.databaseId,i.collections.bookings)).documents.filter(e=>e.customerId===s.$id)}document.getElementById(`totalBookings`).textContent=t.length,document.getElementById(`activeBookings`).textContent=t.filter(e=>e.status===`accepted`).length,document.getElementById(`completedBookings`).textContent=t.filter(e=>e.status===`completed`).length,document.getElementById(`pendingBookings`).textContent=t.filter(e=>e.status===`pending`).length}catch(e){console.error(`Error loading booking stats:`,e)}}function m(){let e=document.getElementById(`servicesGrid`);e.innerHTML=``,u.forEach(t=>{let n=document.createElement(`div`);n.className=`service-card`,n.innerHTML=`
          <div class="service-icon">${t.icon}</div>
          <div class="service-name">${t.name}</div>
          <div class="service-description">${t.description}</div>
        `,n.addEventListener(`click`,()=>{window.location.href=`/customer/services.html?category=${t.id}`}),e.appendChild(n)})}async function h(){try{let t=(await c.listDocuments(i.databaseId,i.collections.bookings,[e.equal(`customerId`,s.$id),e.orderDesc(`createdAt`),e.limit(5)])).documents,n=document.getElementById(`recentBookings`);if(t.length===0){n.innerHTML=`
            <div class="empty-state">
              <div class="empty-state-icon">📋</div>
              <p>No bookings yet. Browse services to get started!</p>
              <a href="/customer/services.html" class="btn btn-primary mt-md">Browse Services</a>
            </div>
          `;return}n.innerHTML=``,t.forEach(e=>{let t=document.createElement(`div`);t.className=`booking-card`,t.innerHTML=`
            <div class="booking-header">
              <div class="booking-service">${e.serviceCategory}</div>
              <span class="badge badge-${{pending:`warning`,accepted:`info`,completed:`success`,cancelled:`error`}[e.status]}">${e.status}</span>
            </div>
            <div class="booking-info">
              <div class="booking-info-item">
                <strong>Location:</strong> ${e.location}
              </div>
              <div class="booking-info-item">
                <strong>Date:</strong> ${new Date(e.createdAt).toLocaleDateString()}
              </div>
              <div class="booking-info-item">
                <strong>Price:</strong> ₹${e.estimatedPrice}
              </div>
              <div class="booking-info-item">
                <strong>Payment:</strong> ${e.paymentStatus||`Pending`}
              </div>
            </div>
          `,n.appendChild(t)})}catch(e){console.error(`Error loading recent bookings:`,e)}}document.getElementById(`logoutBtn`).addEventListener(`click`,r),d()})),h=p((()=>{s(),window.toggleTheme=u,d()}));m(),h();