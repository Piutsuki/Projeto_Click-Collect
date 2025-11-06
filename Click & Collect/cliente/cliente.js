// cliente.js
// Produtos + funções de carrinho (LocalStorage) + render do catálogo

const CART_KEY = 'cc_cart_v1';
const PRODUCTS = [
  { id: 'p1', name: 'Smartphone XYZ', category:'Eletrônicos', price:1299.99, img: '../assets/imagens/produto1.jpg' },
  { id: 'p2', name: 'Fone Bluetooth', category:'Eletrônicos', price:249.99, img: '../assets/imagens/produto2.jpg' },
  { id: 'p3', name: 'Camiseta Básica', category:'Vestuário', price:59.99, img: '../assets/imagens/produto3.jpg' }
];

// ------- LocalStorage cart helpers -------
function getCart(){ try { const raw = localStorage.getItem(CART_KEY); return raw ? JSON.parse(raw) : []; } catch(e){ console.error(e); return []; } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function updateCartCount(){
  const count = getCart().reduce((s,i)=>s+i.qty,0);
  const el = document.getElementById('cartCountHeader');
  if(el) el.innerText = count;
}

// ------- Add to cart -------
function addToCart(productId){
  const cart = getCart();
  const found = cart.find(i => i.id === productId);
  if(found){ found.qty += 1; }
  else {
    const p = PRODUCTS.find(x => x.id === productId);
    if(!p) return;
    cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  // feedback
  const btn = document.getElementById('add-' + productId);
  if(btn){
    btn.innerText = 'Adicionado ✓';
    setTimeout(()=> btn.innerText = 'Adicionar ao Carrinho', 900);
  }
}

// ------- Render produtos -------
function formatCurrency(v){ return v.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }); }

function renderProductsPage(){
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  PRODUCTS.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb" style="background-image:url('${p.img}'); background-size:cover; background-position:center;">
        <span style="background:rgba(255,255,255,0.4); padding:6px 8px; border-radius:6px; color:#111; font-size:13px;">[Imagem]</span>
      </div>
      <div><span class="badge">${p.category}</span></div>
      <div class="title">${p.name}</div>
      <div class="price">${formatCurrency(p.price)}</div>
      <button id="add-${p.id}" class="btn btn-add">Adicionar ao Carrinho</button>
    `;
    grid.appendChild(card);
    // bind
    setTimeout(()=> {
      const btn = document.getElementById('add-' + p.id);
      if(btn) btn.addEventListener('click', ()=> addToCart(p.id));
    },0);
  });
}
