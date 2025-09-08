// admin.js
// Mật khẩu mặc định (thay đổi nếu muốn)
const ADMIN_PW = "admin123";

// Elements
const btnLogin = document.getElementById('btnLogin');
const pwInput = document.getElementById('pw');
const loginBox = document.getElementById('loginBox');
const panel = document.getElementById('panel');
const editor = document.getElementById('editor');
const btnAdd = document.getElementById('btnAdd');
const btnReset = document.getElementById('btnReset');
const btnExport = document.getElementById('btnExport');
const btnImport = document.getElementById('btnImport');
const importInput = document.getElementById('importInput');

btnLogin.addEventListener('click', ()=> {
  const v = pwInput.value.trim();
  if(v === ADMIN_PW){
    loginBox.hidden = true;
    panel.hidden = false;
    loadEditor();
  } else {
    alert('Sai mật khẩu!');
  }
});

// helpers
function getMenu(){ return loadMenuData(); }
function saveMenu(m){ saveMenuData(m); }

// render editor
function loadEditor(){
  const data = getMenu();
  editor.innerHTML = '';
  Object.keys(data).forEach(cat => {
    const h = document.createElement('h3'); h.textContent = cat;
    editor.appendChild(h);
    data[cat].forEach((item, idx) => {
      const row = document.createElement('div'); row.className = 'editor-item';
      row.innerHTML = `
        <img src="${item.img || 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop&crop=faces'}" alt="">
        <div>
          <input type="text" class="edit-name" value="${escapeHtml(item.name)}">
        </div>
        <div>
          <input type="text" class="edit-price" value="${escapeHtml(item.price)}">
        </div>
        <div>
          <input type="url" class="edit-img" placeholder="URL ảnh" value="${item.img || ''}">
        </div>
        <div class="actions">
          <label><input type="checkbox" class="edit-available" ${item.available ? 'checked' : ''}> Còn</label>
          <button class="btn small del" data-cat="${cat}" data-idx="${idx}">Xóa</button>
        </div>`;
      // attach handlers
      editor.appendChild(row);

      const delBtn = row.querySelector('.del');
      delBtn.addEventListener('click', e => {
        if(confirm('Xóa món này?')) {
          const catName = e.target.dataset.cat;
          const i = Number(e.target.dataset.idx);
          const d = getMenu();
          d[catName].splice(i,1);
          saveMenu(d);
          loadEditor();
        }
      });

      // changes on blur
      row.querySelector('.edit-name').addEventListener('change', (ev)=>{
        const d = getMenu();
        d[cat][idx].name = ev.target.value.trim();
        saveMenu(d);
      });
      row.querySelector('.edit-price').addEventListener('change', (ev)=>{
        const d = getMenu();
        d[cat][idx].price = ev.target.value.trim();
        saveMenu(d);
      });
      row.querySelector('.edit-img').addEventListener('change', (ev)=>{
        const d = getMenu();
        d[cat][idx].img = ev.target.value.trim();
        saveMenu(d);
      });
      row.querySelector('.edit-available').addEventListener('change', (ev)=>{
        const d = getMenu();
        d[cat][idx].available = !!ev.target.checked;
        saveMenu(d);
      });
    });
  });

  // After building editor, show "Save done" hint and refresh client view by updating storage (client reads from storage)
}

// Add new item
btnAdd.addEventListener('click', ()=>{
  const cat = prompt('Thêm vào danh mục (chính xác tên danh mục, ví dụ: Café, Trà, Trà Sữa, Sinh Tố, Nước Ép, Soda, Yaourt, Khác, Đồ Ăn Chay):', 'Café');
  if(!cat) return;
  const name = prompt('Tên món mới:', 'Món mới');
  if(!name) return;
  const price = prompt('Giá (ví dụ 20k):', '20k');
  const img = prompt('URL ảnh (để trống sử dụng placeholder):', '');
  const d = getMenu();
  if(!d[cat]) d[cat] = [];
  // create id
  const id = name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'') + '-' + Date.now();
  d[cat].push({id, name, price, available:true, img: img || ''});
  saveMenu(d);
  loadEditor();
});

// Reset to default
btnReset.addEventListener('click', ()=> {
  if(confirm('Khôi phục menu mặc định? Mọi thay đổi sẽ mất.')) {
    saveMenu(DEFAULT_MENU);
    loadEditor();
    alert('Đã khôi phục menu mặc định.');
  }
});

// export JSON
btnExport.addEventListener('click', ()=>{
  const data = getMenu();
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'menu-hoa-tim.json'; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});

// import JSON
btnImport.addEventListener('click', ()=> importInput.click());
importInput.addEventListener('change', (ev)=>{
  const f = ev.target.files[0];
  if(!f) return;
  const reader = new FileReader();
  reader.onload = (e)=>{
    try{
      const json = JSON.parse(e.target.result);
      saveMenu(json);
      loadEditor();
      alert('Đã nhập menu từ file.');
    }catch(err){
      alert('File không hợp lệ.');
    }
  };
  reader.readAsText(f);
});

// small helper
function escapeHtml(s){ return s.replaceAll('"','&quot;').replaceAll("'", ""); }

// on load: if no data in storage, save default
if(!localStorage.getItem(STORAGE_KEY)) saveMenuData(DEFAULT_MENU);
