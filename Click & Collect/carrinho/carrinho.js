// carrinho.js
const CART_KEY = 'cc_cart_v1';
const ORDERS_KEY = 'cc_orders_v1';

function getCart(){ try{ const r = localStorage.getItem(CART_KEY); return r ? JSON.parse(r) : []; }catch(e){return [];} }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function getOrders(){ try{ const r = localStorage.getItem(ORDERS_KEY); return r ? JSON.parse(r) : []; }catch(e){return [];} }
function saveOrders(list){ localStorage.setItem(ORDERS_KEY, JSON.stringify(list)); }

function updateCartCount(){
  const count = getCart().reduce((s,i)=>s+i.qty,0);
  const el = document.getElementById('cartCountHeader');
  if(el) el.innerText = count;
}

function formatCurrency(v){ return v.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }); }

function renderCartPage(){
  const container = document.getElementById('cartItems');
  if(!container) return;
  const cart = getCart();
  container.innerHTML = '';
  if(cart.length === 0){
    container.innerHTML = `<div class="order" style="text-align:center; color:var(--muted)">Seu carrinho está vazio.</div>`;
    document.getElementById('cartTotal').innerText = formatCurrency(0);
    return;
  }

  cart.forEach(item => {
    const node = document.createElement('div');
    node.className = 'cart-item';
    node.innerHTML = `
      <div class="cart-thumb"><img src="${item.img || 'https://via.placeholder.com/220x160?text=Imagem'}" alt="" style="width:100%; height:100%; object-fit:cover; border-radius:6px"></div>
      <div class="cart-info">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:600">${item.name}</div>
            <div class="muted">${formatCurrency(item.price)}</div>
          </div>
          <div class="muted" style="font-size:13px">${formatCurrency(item.price * item.qty)}</div>
        </div>

        <div style="margin-top:10px; display:flex; align-items:center; justify-content:space-between;">
          <div class="qty-controls">
            <button class="qty-dec" data-id="${item.id}">-</button>
            <div style="min-width:28px; text-align:center;">${item.qty}</div>
            <button class="qty-inc" data-id="${item.id}">+</button>
            <button class="remove-btn" data-id="${item.id}">Remover</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(node);
  });

  // bind events
  container.querySelectorAll('.qty-inc').forEach(b => b.addEventListener('click', e=>{
    const id = e.currentTarget.dataset.id;
    const cart = getCart(); const it = cart.find(x=>x.id===id);
    if(it){ it.qty += 1; saveCart(cart); renderCartPage(); updateCartCount(); }
  }));
  container.querySelectorAll('.qty-dec').forEach(b => b.addEventListener('click', e=>{
    const id = e.currentTarget.dataset.id;
    const cart = getCart(); const it = cart.find(x=>x.id===id);
    if(it){ it.qty -= 1; if(it.qty <= 0) { const idx = cart.findIndex(x=>x.id===id); cart.splice(idx,1); } saveCart(cart); renderCartPage(); updateCartCount(); }
  }));
  container.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', e=>{
    const id = e.currentTarget.dataset.id;
    const cart = getCart().filter(i=>i.id!==id);
    saveCart(cart); renderCartPage(); updateCartCount();
  }));

  const total = cart.reduce((s,i) => s + (i.price * i.qty), 0);
  document.getElementById('cartTotal').innerText = formatCurrency(total);

  const scheduleBtn = document.getElementById('schedulePickupBtn');
  if(scheduleBtn){
    scheduleBtn.onclick = () => {
      // cria pedido simples e salva em orders
      const orders = getOrders();
      const orderId = '#CC' + Math.floor(Math.random()*900000 + 100000);
      const newOrder = {
        id: orderId,
        customer: 'Cliente (Simulado)',
        email: 'cliente@example.com',
        items: cart,
        total,
        status: 'Pendente',
        createdAt: new Date().toISOString(),
        pickup: { date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() }
      };
      orders.unshift(newOrder);
      saveOrders(orders);

      // limpar carrinho
      saveCart([]);
      updateCartCount();
      renderCartPage();
      alert('Retirada agendada! Pedido: ' + orderId + '\nAbra o Painel do Funcionário para ver.')
    };
  }
}
