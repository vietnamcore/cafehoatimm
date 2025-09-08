// app.js
// Renders the menu from menu.js (loadMenuData())
// Supports tabs, search, shows unavailable with mờ.

(function(){
  const menuData = () => loadMenuData();
  const tabsEl = document.getElementById('tabs');
  const grid = document.getElementById('menu-grid');
  const search = document.getElementById('search');
  const empty = document.getElementById('empty');

  function renderTabs(){
    const data = menuData();
    tabsEl.innerHTML = '';
    const allBtn = createTab('Tất cả', 'all', true);
    tabsEl.appendChild(allBtn);
    Object.keys(data).forEach((k, i) => {
      tabsEl.appendChild(createTab(k, k));
    });
    // activate first/tab from hash
    const h = decodeURIComponent(location.hash.replace('#','')) || 'all';
    activateTab(h);
  }

  function createTab(label, key, selected=false){
    const b = document.createElement('button');
    b.className = 'tab';
    b.textContent = label;
    b.dataset.key = key;
    b.onclick = () => {
      activateTab(key);
    };
    return b;
  }

  function activateTab(key){
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.key === key));
    location.hash = key === 'all' ? '' : encodeURIComponent(key);
    renderGrid(key);
  }

  function renderGrid(filterKey){
    const data = menuData();
    const q = (search.value || '').trim().toLowerCase();
    grid.innerHTML = '';
    let items = [];
    if(filterKey === 'all'){
      Object.keys(data).forEach(cat => items = items.concat(data[cat].map(it => ({...it, category: cat}))));
    } else {
      items = (data[filterKey] || []).map(it => ({...it, category: filterKey}));
    }
    if(q){
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.price.toLowerCase().includes(q));
    }
    if(items.length === 0){
      empty.hidden = false;
      return;
    } else empty.hidden = true;

    items.forEach(it => {
      const card = document.createElement('article');
      card.className = 'card' + (it.available ? '' : ' unavailable');
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.style.backgroundImage = `url("${it.img || 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop&crop=faces'}")`;
      card.appendChild(thumb);

      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = it.name;
      card.appendChild(name);

      const cat = document.createElement('div');
      cat.className = 'small';
      cat.textContent = it.category;
      card.appendChild(cat);

      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = it.price;
      card.appendChild(price);

      if(!it.available){
        const b = document.createElement('div');
        b.className = 'badge';
        b.textContent = 'Hết hàng';
        card.appendChild(b);
      }

      grid.appendChild(card);
    });
  }

  // search
  search.addEventListener('input', ()=> {
    const active = document.querySelector('.tab.active');
    renderGrid(active ? active.dataset.key : 'all');
  });

  // init
  renderTabs();

  // handle hash change if user navigates
  window.addEventListener('hashchange', ()=> {
    const h = decodeURIComponent(location.hash.replace('#','')) || 'all';
    activateTab(h);
  });
})();
