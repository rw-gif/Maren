/* ============================================================
   MAREN — storefront app
   Data layer + cart/wishlist + product detail + journal +
   shoppable lookbook + size guide + fitting-room demo + stylist.
   Zero-build, client-side only. Persistence via localStorage.
   ============================================================ */
(function(){
  "use strict";

  /* ---------------- DATA ---------------- */
  // Placeholder range — swap for the real catalogue. Prices are numbers (GBP).
  var SIZES = ['XS','S','M','L','XL'];
  var products = [
    {id:'shift',   name:'The Linen Shift',        price:128, cat:'Dresses',  g:'dress', blooms:'#AFC7DA', hero:true,  pal:['blues','neutrals'], occ:['harbour','town'],
      desc:'Sleeveless, A-line, washed linen', colors:[{name:'Cream',hex:'#F2ECDF'},{name:'Sky',hex:'#AFC7DA'},{name:'Navy',hex:'#2A3B52'}],
      fabric:'100% washed European linen. Breathable, lived-in, made to soften with every wear.', care:'Machine wash cold, line dry, warm iron. Gets better with age.'},
    {id:'breton',  name:'Breton Long-Sleeve',     price:72,  cat:'Tops',     g:'top',   blooms:'#8FB0CB', hero:true,  pal:['stripe','blues'], occ:['town','rest'],
      desc:'Cotton jersey, navy stripe', colors:[{name:'Navy stripe',hex:'#2A3B52'},{name:'Sky stripe',hex:'#8FB0CB'}],
      fabric:'Heavyweight organic cotton jersey, yarn-dyed Breton stripe.', care:'Machine wash cold, reshape damp, dry flat.'},
    {id:'set',     name:'Gingham Boxer Set',       price:86,  cat:'Sets',     g:'set',   blooms:'#C3D5E2', hero:false, pal:['neutrals','blues'], occ:['rest','harbour'],
      desc:'Cotton shorts and scrunchie', colors:[{name:'Sky gingham',hex:'#AFC7DA'},{name:'Clay gingham',hex:'#C9BBA1'}],
      fabric:'Crisp yarn-dyed cotton gingham. Shorts + matching scrunchie.', care:'Machine wash cold, warm iron.'},
    {id:'pj',      name:'The Sea Pyjama',          price:94,  cat:'Sleepwear',g:'top',   blooms:'#E2D7C3', hero:false, pal:['neutrals'], occ:['rest'],
      desc:'Brushed cotton, floral sprig', colors:[{name:'Oat',hex:'#E2D7C3'},{name:'Cream',hex:'#F2ECDF'}],
      fabric:'Brushed organic cotton, soft floral sprig print.', care:'Machine wash cold, tumble low.'},
    {id:'babydoll',name:'Babydoll Mini',           price:110, cat:'Dresses',  g:'dress', blooms:'#AFC7DA', hero:false, pal:['neutrals','blues'], occ:['evening','harbour'],
      desc:'Tiered cotton, broderie hem', colors:[{name:'Cream',hex:'#F2ECDF'},{name:'Sky',hex:'#AFC7DA'}],
      fabric:'Tiered cotton poplin with broderie anglaise hem.', care:'Machine wash cold, line dry, cool iron.'},
    {id:'knit',    name:'Cable Cardigan',          price:148, cat:'Knitwear', g:'top',   blooms:'#8FB0CB', hero:true,  pal:['blues'], occ:['evening','rest'],
      desc:'Cotton cable knit, sky blue', colors:[{name:'Sky',hex:'#AFC7DA'},{name:'Cream',hex:'#F2ECDF'}],
      fabric:'Heavy cotton cable knit, horn buttons.', care:'Hand wash cool, dry flat, do not hang.'},
    {id:'shirt',   name:'Coastal Oversize Shirt',  price:88,  cat:'Tops',     g:'top',   blooms:'#C3D5E2', hero:true,  pal:['stripe','neutrals'], occ:['town','harbour'],
      desc:'Striped cotton poplin', colors:[{name:'White',hex:'#FBF8F2'},{name:'Sky stripe',hex:'#AFC7DA'}],
      fabric:'Crisp cotton poplin, oversized cut, mother-of-pearl buttons.', care:'Machine wash cold, warm iron.'},
    {id:'scallop', name:'Scallop Linen Mini',      price:124, cat:'Dresses',  g:'dress', blooms:'#2A3B52', hero:true,  pal:['blues','neutrals'], occ:['evening'],
      desc:'Strapless, scalloped edge, ink', colors:[{name:'Ink',hex:'#2A3B52'},{name:'Cream',hex:'#F2ECDF'}],
      fabric:'Structured linen blend, strapless with scalloped edge.', care:'Dry clean, or hand wash cool.'}
  ];
  var byId = {}; products.forEach(function(p){ byId[p.id]=p; });

  // Shoppable lookbook looks — hotspots map x/y% to catalogue ids.
  var looks = [
    {muse:'cami', k:'The Linen Shirt', t:'Clean lines, by the water.',
      hotspots:[{x:46,y:48,id:'shirt'},{x:58,y:76,id:'shift'}]},
    {muse:'vivi', k:'Off-duty', t:'Sun, stripes, salt air.',
      hotspots:[{x:50,y:58,id:'breton'},{x:46,y:82,id:'scallop'}]}
  ];

  // The Journal — trend & editorial entries.
  var journal = [
    {tag:'Trend', date:'June 2026', cover:'cami', title:'The Quiet Coast: linen as a uniform',
      excerpt:'Why a small wardrobe of washed linen is the season’s most considered choice — and how to wear it from harbour to evening.',
      body:['This summer the loudest thing in the room is restraint. The coastal wardrobe has narrowed to a handful of washed-linen staples worn on repeat, and looking better for it.',
            'Start with a shift in cream, layer a cropped knit for the evening drop in temperature, and let the fabric crease — that’s the point. Linen earns its character.',
            'Three ways to wear it: open over a swimsuit at the harbour, belted for town, or under the Scallop Mini’s structured line when the sun goes down.'],
      tags:['Linen','Capsule','How to wear']},
    {tag:'Edit', date:'June 2026', cover:'mono', title:'Breton, reconsidered',
      excerpt:'The stripe is a classic for a reason. A short history, and the five pieces it pairs with this season.',
      body:['The Breton has survived a century of trends because it refuses to try too hard. Navy on cream, a boat neck, three-quarter sleeves: it is the original off-duty uniform.',
            'Pair it with the Gingham Boxer Set for slow mornings, or tuck it into tailored shorts for town. Keep the rest quiet and let the stripe do the talking.'],
      tags:['Breton','Stripe','Styling']},
    {tag:'Fabric', date:'May 2026', cover:'mono', title:'Why washed linen wins',
      excerpt:'Breathability, longevity and that lived-in hand-feel. A short note on the fibre we build the label around.',
      body:['Linen is spun from flax — a crop that needs little water and no irrigation in the right climates. Garment-washed, it loses its starchy stiffness and gains a soft, rumpled drape.',
            'It breathes in heat, wicks moisture, and grows more comfortable with every wash. Buy fewer, wash cold, line dry, and a linen piece will outlast a decade of fast fashion.'],
      tags:['Fabric','Sustainability','Care']}
  ];

  // Promotional films — drop matching files into /assets/video to play.
  var films = [
    {kind:'Campaign',         title:'SS26 — By the Sea',  poster:'vivi', src:'assets/video/promo-campaign.mp4'},
    {kind:'Fabric story',     title:'The Linen Story',    poster:'mono', src:'assets/video/promo-linen.mp4'},
    {kind:'Behind the seams', title:'In the Studio',      poster:'cami', src:'assets/video/promo-studio.mp4'}
  ];

  // Size chart (cm) and fit-finder logic.
  var sizeRows = [
    ['XS','78–82','60–64','84–88'],
    ['S','83–87','65–69','89–93'],
    ['M','88–92','70–74','94–98'],
    ['L','93–98','75–80','99–104'],
    ['XL','99–104','81–86','105–110']
  ];

  /* ---------------- HELPERS ---------------- */
  function money(n){ return '£' + n; }
  function $(s,ctx){ return (ctx||document).querySelector(s); }
  function $all(s,ctx){ return Array.prototype.slice.call((ctx||document).querySelectorAll(s)); }
  function bloomSVG(color){
    return '<svg class="bloom" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+
      '<circle cx="60" cy="60" r="54" fill="none" stroke="#2A3B52" stroke-width="1.4"/>'+
      '<circle cx="60" cy="60" r="47" fill="none" stroke="'+color+'" stroke-width="0.8"/>'+
      '<text x="60" y="80" text-anchor="middle" font-family="\'Playfair Display\',Georgia,serif" font-size="56" fill="#2A3B52">M</text>'+
      '</svg>';
  }
  function gradient(hex){ return 'linear-gradient(160deg,#FBF8F2,'+hex+'33)'; }

  /* ---------------- STORE (cart + wishlist) ---------------- */
  var store = {
    cart: [], wish: [],
    load:function(){
      try{ this.cart = JSON.parse(localStorage.getItem('maren_cart')) || []; }catch(e){ this.cart=[]; }
      try{ this.wish = JSON.parse(localStorage.getItem('maren_wish')) || []; }catch(e){ this.wish=[]; }
    },
    save:function(){
      try{ localStorage.setItem('maren_cart', JSON.stringify(this.cart));
           localStorage.setItem('maren_wish', JSON.stringify(this.wish)); }catch(e){}
      render.counts(); render.cart(); render.wishHearts();
    },
    addToCart:function(id,size,color){
      var key = id+'|'+size+'|'+color;
      var line = this.cart.filter(function(l){return l.key===key;})[0];
      if(line){ line.qty++; } else { this.cart.push({key:key,id:id,size:size,color:color,qty:1}); }
      this.save();
    },
    setQty:function(key,delta){
      var line = this.cart.filter(function(l){return l.key===key;})[0];
      if(!line) return;
      line.qty += delta;
      if(line.qty<=0){ this.cart = this.cart.filter(function(l){return l.key!==key;}); }
      this.save();
    },
    cartCount:function(){ return this.cart.reduce(function(n,l){return n+l.qty;},0); },
    cartTotal:function(){ return this.cart.reduce(function(n,l){return n+(byId[l.id].price*l.qty);},0); },
    clearCart:function(){ this.cart=[]; this.save(); },
    toggleWish:function(id){
      var i = this.wish.indexOf(id);
      if(i>-1){ this.wish.splice(i,1); } else { this.wish.push(id); }
      this.save();
    },
    inWish:function(id){ return this.wish.indexOf(id)>-1; }
  };

  /* ---------------- PANELS (overlay / drawers / modals) ---------------- */
  var overlay = $('#overlay');
  function openPanel(el){ overlay.classList.add('show'); el.classList.add('show'); document.body.classList.add('no-scroll'); }
  function closeAll(){
    overlay.classList.remove('show');
    $all('.drawer,.modal,.checkout').forEach(function(p){ p.classList.remove('show'); });
    document.body.classList.remove('no-scroll');
  }
  overlay && overlay.addEventListener('click', closeAll);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeAll(); });
  $all('[data-close]').forEach(function(b){ b.addEventListener('click', closeAll); });

  /* ---------------- TOAST ---------------- */
  var toast = $('#toast'), toastTimer;
  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 3200);
  }

  /* ---------------- RENDER ---------------- */
  var render = {
    counts:function(){
      var b = $('#bag-count'); if(b) b.textContent = '('+store.cartCount()+')';
      var w = $('#wish-count'); if(w) w.textContent = '('+store.wish.length+')';
    },
    grid:function(filter){
      var grid = $('#product-grid'); if(!grid) return;
      grid.innerHTML = '';
      products.filter(function(p){ return !filter || filter==='All' || p.cat===filter; }).forEach(function(p){
        var card = document.createElement('article');
        card.className='card'; card.setAttribute('data-id',p.id);
        card.innerHTML =
          '<div class="swatch" data-quick="'+p.id+'" style="background:'+gradient(p.blooms)+'">'+
            '<span class="label-tag">'+p.cat+'</span>'+
            '<button class="wish'+(store.inWish(p.id)?' on':'')+'" data-wish="'+p.id+'" aria-label="Save">'+(store.inWish(p.id)?'♥':'♡')+'</button>'+
            bloomSVG(p.blooms)+
          '</div>'+
          '<div class="meta"><h3>'+p.name+'</h3><div class="price">'+money(p.price)+'</div>'+
          '<div class="desc">'+p.desc+'</div></div>'+
          '<div class="card-actions">'+
            '<button class="btn" data-quick="'+p.id+'">Quick view</button>'+
            '<button class="btn solid" data-tryon="'+p.id+'">Try on</button>'+
          '</div>';
        grid.appendChild(card);
      });
    },
    filters:function(){
      var bar = $('#edit-tools'); if(!bar) return;
      var cats = ['All']; products.forEach(function(p){ if(cats.indexOf(p.cat)<0) cats.push(p.cat); });
      bar.innerHTML = cats.map(function(c,i){
        return '<button class="filter-chip'+(i===0?' active':'')+'" data-filter="'+c+'">'+c+'</button>';
      }).join('');
    },
    lookbookProducts:function(){
      var row = $('#lb-products'); if(!row) return;
      row.innerHTML = products.filter(function(p){return p.hero;}).map(function(p){
        var sw = p.colors.map(function(c){return '<i style="background:'+c.hex+'"></i>';}).join('');
        return '<article class="lp" data-quick="'+p.id+'"><div class="ph"><span class="mono">M</span></div>'+
          '<div class="info"><h4>'+p.name+'</h4><div class="pr">'+money(p.price)+'</div>'+
          '<div class="sw">'+sw+'</div></div></article>';
      }).join('');
    },
    hotspots:function(){
      looks.forEach(function(look){
        var host = $('#feature-'+look.muse); if(!host) return;
        look.hotspots.forEach(function(h){
          var b = document.createElement('button');
          b.className='hotspot'; b.style.left=h.x+'%'; b.style.top=h.y+'%';
          b.setAttribute('data-quick',h.id);
          b.setAttribute('aria-label','Shop '+(byId[h.id]?byId[h.id].name:'product'));
          b.textContent='+';
          host.appendChild(b);
        });
      });
    },
    journal:function(){
      var grid = $('#jrn-grid'); if(!grid) return;
      grid.innerHTML = journal.map(function(a,i){
        var cover = a.cover==='cami' ? '<div class="jrn-cover" style="background-image:var(--cami-img)"><span class="jrn-tag">'+a.tag+'</span></div>'
                  : a.cover==='vivi' ? '<div class="jrn-cover" style="background-image:var(--vivi-img)"><span class="jrn-tag">'+a.tag+'</span></div>'
                  : '<div class="jrn-cover mono"><span class="jrn-tag">'+a.tag+'</span><span class="m">M</span></div>';
        return '<article class="jrn-card" data-article="'+i+'">'+cover+
          '<div class="jrn-body"><div class="date">'+a.date+'</div><h3>'+a.title+'</h3>'+
          '<p>'+a.excerpt+'</p><div class="read">Read &rsaquo;</div></div></article>';
      }).join('');
    },
    films:function(){
      var grid = $('#films-grid'); if(!grid) return;
      grid.innerHTML = films.map(function(f){
        var media = f.poster==='cami' ? '<div class="vmedia" style="background-image:var(--cami-img)">'
                  : f.poster==='vivi' ? '<div class="vmedia" style="background-image:var(--vivi-img)">'
                  : '<div class="vmedia mono">';
        return '<figure class="vcard">'+ media +
            '<span class="vslot-badge">Film slot</span>'+
            '<video playsinline preload="none"><source src="'+f.src+'" type="video/mp4"></video>'+
            '<button class="vplay" aria-label="Play '+f.title+'">&#9654;</button>'+
          '</div>'+
          '<figcaption><span class="kind">'+f.kind+'</span><h4>'+f.title+'</h4></figcaption>'+
        '</figure>';
      }).join('');
    },
    wishHearts:function(){
      $all('[data-wish]').forEach(function(b){
        var on = store.inWish(b.getAttribute('data-wish'));
        b.classList.toggle('on', on);
        if(b.classList.contains('wish')) b.textContent = on ? '♥' : '♡';
      });
      var pw = $('#pdp-wish');
      if(pw){ var id=pw.getAttribute('data-id'); pw.classList.toggle('on', store.inWish(id)); }
    },
    cart:function(){
      var body = $('#cart-body'); if(!body) return;
      if(!store.cart.length){ body.innerHTML = '<div class="drawer-empty">Your bag is empty.</div>'; }
      else {
        body.innerHTML = store.cart.map(function(l){
          var p = byId[l.id];
          return '<div class="line"><div class="thumb"><span>M</span></div>'+
            '<div class="li-info"><h4>'+p.name+'</h4>'+
            '<div class="vr">'+l.color+' &middot; Size '+l.size+'</div>'+
            '<div class="li-price">'+money(p.price)+'</div>'+
            '<div class="qty"><button data-dec="'+l.key+'">&minus;</button><span>'+l.qty+'</span><button data-inc="'+l.key+'">+</button></div>'+
            '<button class="li-remove" data-rm="'+l.key+'">Remove</button>'+
            '</div></div>';
        }).join('');
      }
      var tot = $('#cart-total'); if(tot) tot.textContent = money(store.cartTotal());
    },
    wishlist:function(){
      var body = $('#wish-body'); if(!body) return;
      if(!store.wish.length){ body.innerHTML = '<div class="drawer-empty">No saved pieces yet.</div>'; return; }
      body.innerHTML = store.wish.map(function(id){
        var p = byId[id];
        return '<div class="line"><div class="thumb"><span>M</span></div>'+
          '<div class="li-info"><h4>'+p.name+'</h4><div class="li-price">'+money(p.price)+'</div>'+
          '<button class="btn" data-quick="'+id+'" style="font-size:11px;padding:9px 14px;margin-top:8px;">View</button> '+
          '<button class="li-remove" data-wish="'+id+'">Remove</button></div></div>';
      }).join('');
    }
  };

  /* ---------------- PRODUCT QUICK VIEW (PDP) ---------------- */
  var pdpState = { id:null, size:null, color:null };
  function openPDP(id){
    var p = byId[id]; if(!p) return;
    pdpState = { id:id, size:null, color:p.colors[0].name };
    var host = $('#pdp'); if(!host) return;
    host.innerHTML =
      '<div class="pdp-gallery">'+
        '<div class="pdp-main" style="background:'+gradient(p.blooms)+'"><span class="mono">M</span></div>'+
        '<div class="pdp-thumbs">'+
          '<i style="background:'+gradient(p.blooms)+'"></i>'+
          '<i style="background:linear-gradient(160deg,#FBF8F2,#dfe7ee)"></i>'+
          '<i style="background:linear-gradient(160deg,#FBF8F2,'+p.blooms+'55)"></i>'+
        '</div>'+
      '</div>'+
      '<div class="pdp-info">'+
        '<div class="cat">'+p.cat+' &middot; Linen / Cotton</div>'+
        '<h2>'+p.name+'</h2>'+
        '<div class="price">'+money(p.price)+'</div>'+
        '<p class="blurb">'+p.desc+'. '+p.fabric.split('.')[0]+'.</p>'+
        '<div class="opt-label"><span>Colour — <em id="pdp-colorname">'+p.colors[0].name+'</em></span></div>'+
        '<div class="swatches" id="pdp-colors">'+
          p.colors.map(function(c,i){ return '<button data-color="'+c.name+'" class="'+(i===0?'active':'')+'" style="background:'+c.hex+'" aria-label="'+c.name+'"></button>'; }).join('')+
        '</div>'+
        '<div class="opt-label"><span>Size</span><a id="open-size">Size &amp; fit guide</a></div>'+
        '<div class="sizes" id="pdp-sizes">'+
          SIZES.map(function(s){ return '<button data-size="'+s+'">'+s+'</button>'; }).join('')+
        '</div>'+
        '<div class="pdp-actions">'+
          '<button class="btn solid" id="pdp-add">Add to bag</button>'+
          '<button class="btn wish-btn'+(store.inWish(id)?' on':'')+'" id="pdp-wish" data-id="'+id+'" aria-label="Save">'+(store.inWish(id)?'♥':'♡')+'</button>'+
        '</div>'+
        '<button class="btn" id="pdp-tryon" data-tryon="'+id+'" style="width:100%;justify-content:center;margin-top:10px;font-size:11px;">See it in the fitting room</button>'+
        '<div class="acc">'+
          '<details><summary>Fabric &amp; origin</summary><p>'+p.fabric+'</p></details>'+
          '<details><summary>Care</summary><p>'+p.care+'</p></details>'+
          '<details><summary>Delivery &amp; returns</summary><p>Demo storefront — shipping, returns and stock are not wired up. In production this reflects live fulfilment.</p></details>'+
        '</div>'+
        '<p class="pdp-note">Sample product — imagery and details are placeholders for layout.</p>'+
      '</div>';
    openPanel($('#quickview'));
  }

  /* ---------------- CHECKOUT (multi-step demo, processor-ready) ---------------- */
  var co = { step:'details', delivery:'standard', form:{}, orderId:null };
  var DELIVERY = { standard:{name:'Standard',sub:'3–5 working days',price:4.95},
                   express:{name:'Express',sub:'1–2 working days',price:9.95} };
  function shipCost(){
    if(co.delivery==='standard' && store.cartTotal()>=150) return 0; // free standard over £150
    return DELIVERY[co.delivery].price;
  }
  function coTotal(){ return store.cartTotal() + shipCost(); }

  function openCheckout(){ co.step='details'; renderCheckout();
    var el=$('#checkout-modal'); el.classList.add('show'); document.body.classList.add('no-scroll'); }

  function renderSummary(){
    var lines = store.cart.map(function(l){ var p=byId[l.id];
      return '<div class="co-sum-line"><div class="qd">M</div>'+
        '<div class="nm">'+p.name+'<small>'+l.color+' &middot; Size '+l.size+' &middot; Qty '+l.qty+'</small></div>'+
        '<div>'+money(p.price*l.qty)+'</div></div>';
    }).join('');
    var ship = shipCost();
    return '<h4>Order summary</h4>'+lines+
      '<div class="co-tot"><span>Subtotal</span><span>'+money(store.cartTotal())+'</span></div>'+
      '<div class="co-tot"><span>Shipping</span><span>'+(ship===0?'Free':money(ship))+'</span></div>'+
      '<div class="co-tot grand"><span>Total</span><b>'+money(coTotal())+'</b></div>';
  }
  function stepsBar(active){
    var arr=[['details','Details'],['delivery','Delivery'],['payment','Payment']];
    return '<div class="co-steps">'+arr.map(function(s,i){
      var on=s[0]===active; return (on?'<b>':'<span>')+(i+1)+'. '+s[1]+(on?'</b>':'</span>');
    }).join(' &middot; ')+'</div>';
  }
  function renderCheckout(){
    var main=$('#co-main'), sum=$('#co-summary');
    if(co.step!=='done'){ sum.style.display=''; sum.innerHTML = renderSummary(); } else { sum.style.display='none'; }

    if(co.step==='details'){
      main.innerHTML = stepsBar('details')+
        '<div class="co-step"><h3>Contact &amp; shipping</h3>'+
        '<div class="demo-banner">Demo checkout — no account, no real charge, nothing ships, nothing is stored.</div>'+
        '<div class="co-field"><label>Email</label><input id="f-email" type="email" placeholder="you@example.com" value="'+(co.form.email||'')+'"></div>'+
        '<div class="co-row"><div class="co-field"><label>First name</label><input id="f-first" value="'+(co.form.first||'')+'"></div>'+
        '<div class="co-field"><label>Last name</label><input id="f-last" value="'+(co.form.last||'')+'"></div></div>'+
        '<div class="co-field"><label>Address</label><input id="f-addr" value="'+(co.form.addr||'')+'"></div>'+
        '<div class="co-row"><div class="co-field"><label>City / Town</label><input id="f-city" value="'+(co.form.city||'')+'"></div>'+
        '<div class="co-field"><label>Postcode</label><input id="f-post" value="'+(co.form.post||'')+'"></div></div>'+
        '<div class="co-field"><label>Country</label><select id="f-country"><option>United Kingdom</option><option>Ireland</option><option>France</option><option>United States</option></select></div>'+
        '<div class="co-actions"><span></span><button class="btn solid" id="co-next">Continue to delivery</button></div></div>';
    } else if(co.step==='delivery'){
      main.innerHTML = stepsBar('delivery')+
        '<div class="co-step"><h3>Delivery</h3>'+
        Object.keys(DELIVERY).map(function(k){ var d=DELIVERY[k];
          var pr=(k==='standard' && store.cartTotal()>=150)?'Free':money(d.price);
          return '<div class="delivery-opt'+(co.delivery===k?' active':'')+'" data-deliv="'+k+'">'+
            '<div><div class="d-name">'+d.name+'</div><div class="d-sub">'+d.sub+'</div></div><div class="d-price">'+pr+'</div></div>';
        }).join('')+
        '<div class="co-actions"><button class="co-back" id="co-back">&larr; Back</button><button class="btn solid" id="co-next">Continue to payment</button></div></div>';
    } else if(co.step==='payment'){
      main.innerHTML = stepsBar('payment')+
        '<div class="co-step"><h3>Payment</h3>'+
        '<div class="demo-banner">Demo payment — please don’t enter real card details; no charge is made. This is exactly where a real Stripe or Shopify hosted payment page slots in.</div>'+
        '<div class="co-field"><label>Card number</label><input id="f-card" inputmode="numeric" placeholder="4242 4242 4242 4242"></div>'+
        '<div class="co-row"><div class="co-field"><label>Expiry</label><input id="f-exp" placeholder="MM/YY"></div>'+
        '<div class="co-field"><label>CVC</label><input id="f-cvc" inputmode="numeric" placeholder="123"></div></div>'+
        '<div class="co-field"><label>Name on card</label><input id="f-cardname" value="'+(((co.form.first||'')+' '+(co.form.last||'')).trim())+'"></div>'+
        '<div class="co-actions"><button class="co-back" id="co-back">&larr; Back</button><button class="btn solid" id="co-pay">Pay '+money(coTotal())+' (demo)</button></div></div>';
    } else { // done
      main.innerHTML = '<div class="co-done"><div class="mono">M</div><div class="ord">Order '+co.orderId+'</div>'+
        '<h2>Thank you</h2>'+
        '<p>This is a demo store — no payment was taken and nothing will ship. A confirmation would normally be sent to <b>'+(co.form.email||'your email')+'</b>.</p>'+
        '<button class="btn solid" id="co-done-close">Continue shopping</button></div>';
    }
  }
  function validateDetails(){
    var ids={email:'f-email',first:'f-first',last:'f-last',addr:'f-addr',city:'f-city',post:'f-post'}, ok=true;
    Object.keys(ids).forEach(function(k){ var el=$('#'+ids[k]); var v=(el.value||'').trim(); co.form[k]=v;
      var bad = !v || (k==='email' && v.indexOf('@')<0); el.classList.toggle('bad',bad); if(bad) ok=false; });
    var c=$('#f-country'); co.form.country = c?c.value:'United Kingdom';
    if(!ok) showToast('Please complete the highlighted fields.');
    return ok;
  }
  function placeOrder(){
    var fields=['f-card','f-exp','f-cvc'], ok=true;
    fields.forEach(function(id){ var el=$('#'+id); var bad=!(el.value||'').trim(); el.classList.toggle('bad',bad); if(bad) ok=false; });
    if(!ok){ showToast('Enter the (demo) card details to continue.'); return; }
    co.orderId='MAREN-'+Math.random().toString(36).slice(2,7).toUpperCase();
    co.step='done'; store.clearCart(); renderCheckout();
  }

  /* ---------------- INIT ---------------- */
  function init(){
    store.load();
    render.filters();
    render.grid('All');
    render.lookbookProducts();
    render.hotspots();
    render.journal();
    render.films();
    render.counts();
    render.cart();
    render.wishHearts();

    // ----- global click delegation -----
    document.addEventListener('click', function(e){
      var t = e.target.closest('[data-quick],[data-wish],[data-tryon],[data-article],[data-filter],[data-add]');
      if(!t) return;

      if(t.hasAttribute('data-filter')){
        $all('#edit-tools .filter-chip').forEach(function(c){c.classList.remove('active');});
        t.classList.add('active'); render.grid(t.getAttribute('data-filter')); render.wishHearts(); return;
      }
      if(t.hasAttribute('data-wish')){ e.preventDefault(); store.toggleWish(t.getAttribute('data-wish')); render.wishlist(); return; }
      if(t.hasAttribute('data-quick')){ openPDP(t.getAttribute('data-quick')); return; }
      if(t.hasAttribute('data-article')){ openArticle(parseInt(t.getAttribute('data-article'),10)); return; }
      if(t.hasAttribute('data-tryon')){ closeAll(); jumpToTryOn(byId[t.getAttribute('data-tryon')].g); return; }
    });

    // ----- PDP internal interactions (delegated to modal) -----
    var pdp = $('#pdp');
    pdp && pdp.addEventListener('click', function(e){
      var c = e.target.closest('[data-color]'); if(c){
        $all('#pdp-colors button').forEach(function(b){b.classList.remove('active');});
        c.classList.add('active'); pdpState.color = c.getAttribute('data-color');
        var nm = $('#pdp-colorname'); if(nm) nm.textContent = pdpState.color; return;
      }
      var s = e.target.closest('[data-size]'); if(s){
        $all('#pdp-sizes button').forEach(function(b){b.classList.remove('active');});
        s.classList.add('active'); pdpState.size = s.getAttribute('data-size'); return;
      }
      if(e.target.id==='pdp-add'){
        if(!pdpState.size){ showToast('Please choose a size.'); return; }
        store.addToCart(pdpState.id, pdpState.size, pdpState.color);
        showToast(byId[pdpState.id].name+' added to bag.');
        closeAll(); openPanel($('#cart')); return;
      }
      if(e.target.id==='pdp-wish'){ store.toggleWish(pdpState.id); render.wishHearts(); render.wishlist(); return; }
      if(e.target.id==='open-size'){ openPanel($('#sizeguide')); return; }
    });

    // ----- cart drawer interactions -----
    var cartBody = $('#cart-body');
    cartBody && cartBody.addEventListener('click', function(e){
      var inc=e.target.closest('[data-inc]'), dec=e.target.closest('[data-dec]'), rm=e.target.closest('[data-rm]');
      if(inc) store.setQty(inc.getAttribute('data-inc'),1);
      if(dec) store.setQty(dec.getAttribute('data-dec'),-1);
      if(rm){ var l=store.cart.filter(function(x){return x.key===rm.getAttribute('data-rm');})[0]; if(l) store.setQty(l.key,-l.qty); }
    });
    var wishBody = $('#wish-body');
    wishBody && wishBody.addEventListener('click', function(e){
      var q=e.target.closest('[data-quick]'); if(q){ openPDP(q.getAttribute('data-quick')); return; }
    });

    // ----- nav openers -----
    $('#open-cart') && $('#open-cart').addEventListener('click', function(e){ e.preventDefault(); openPanel($('#cart')); });
    $('#open-wish') && $('#open-wish').addEventListener('click', function(e){ e.preventDefault(); render.wishlist(); openPanel($('#wish')); });
    $('#checkout') && $('#checkout').addEventListener('click', function(){
      if(!store.cart.length){ showToast('Your bag is empty.'); return; }
      closeAll(); openCheckout();
    });

    // ----- promotional films: click-to-play -----
    document.addEventListener('click', function(e){
      var pb = e.target.closest('.vplay'); if(!pb) return;
      var card = pb.closest('.vcard'); var v = card.querySelector('video');
      card.classList.add('playing'); v.setAttribute('controls','controls');
      var pr = v.play();
      if(pr && pr.catch) pr.catch(function(){
        card.classList.remove('playing'); v.removeAttribute('controls');
        showToast('Add this film to /assets/video to play it.');
      });
    });

    // ----- checkout step interactions -----
    var coModal = $('#checkout-modal');
    coModal && coModal.addEventListener('click', function(e){
      var d = e.target.closest('[data-deliv]'); if(d){ co.delivery = d.getAttribute('data-deliv'); renderCheckout(); return; }
      if(e.target.id==='co-next'){
        if(co.step==='details'){ if(validateDetails()){ co.step='delivery'; renderCheckout(); } }
        else if(co.step==='delivery'){ co.step='payment'; renderCheckout(); }
        return;
      }
      if(e.target.id==='co-back'){ co.step = (co.step==='payment') ? 'delivery' : 'details'; renderCheckout(); return; }
      if(e.target.id==='co-pay'){ placeOrder(); return; }
      if(e.target.id==='co-done-close'){ closeAll(); return; }
    });
    $('#open-size-foot') && $('#open-size-foot').addEventListener('click', function(e){ e.preventDefault(); openPanel($('#sizeguide')); });

    // ----- mobile nav -----
    var navToggle = $('.nav-toggle');
    navToggle && navToggle.addEventListener('click', function(){
      var links = $('.nav-links');
      if(links) links.style.display = links.style.display==='flex' ? 'none' : 'flex';
    });

    buildSizeGuide();
    initVideo();
    initFittingRoom();
    initStylist();
    initNewsletter();
  }

  /* ---------------- ARTICLE MODAL ---------------- */
  function openArticle(i){
    var a = journal[i]; if(!a) return;
    var host = $('#article'); if(!host) return;
    var cover = a.cover==='cami' ? '<div class="a-cover" style="background-image:var(--cami-img)"></div>'
              : a.cover==='vivi' ? '<div class="a-cover" style="background-image:var(--vivi-img)"></div>'
              : '<div class="a-cover mono"><span class="m">M</span></div>';
    host.innerHTML = cover + '<div class="article-body"><div class="date">'+a.tag+' &middot; '+a.date+'</div>'+
      '<h2>'+a.title+'</h2>'+ a.body.map(function(p){return '<p>'+p+'</p>';}).join('')+
      '<div class="tags">'+a.tags.map(function(tg){return '<span>'+tg+'</span>';}).join('')+'</div></div>';
    openPanel($('#articlemodal'));
  }

  /* ---------------- SIZE GUIDE + FIT FINDER ---------------- */
  function buildSizeGuide(){
    var host = $('#size-body'); if(!host) return;
    var rows = sizeRows.map(function(r){
      return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td></tr>';
    }).join('');
    host.innerHTML =
      '<h2>Size &amp; fit</h2>'+
      '<table class="size-table"><thead><tr><th>Size</th><th>Bust (cm)</th><th>Waist (cm)</th><th>Hip (cm)</th></tr></thead><tbody>'+rows+'</tbody></table>'+
      '<div class="fitfinder"><h4>Find your fit</h4>'+
        '<div class="ff-row">'+
          '<select id="ff-height"><option value="">Your height</option><option value="s">Under 5’4”</option><option value="m">5’4” – 5’8”</option><option value="l">Over 5’8”</option></select>'+
          '<select id="ff-usual"><option value="">Usual size</option>'+SIZES.map(function(s){return '<option>'+s+'</option>';}).join('')+'</select>'+
        '</div>'+
        '<div class="ff-result" id="ff-result">Tell us a little and we’ll suggest a size.</div>'+
      '</div>'+
      '<p class="pdp-note" style="margin-top:16px;">Measurements are placeholder guidance for the prototype.</p>';
    function recompute(){
      var h=$('#ff-height').value, u=$('#ff-usual').value, out=$('#ff-result');
      if(!h||!u){ out.innerHTML='Tell us a little and we’ll suggest a size.'; return; }
      var idx = SIZES.indexOf(u);
      if(h==='l' && idx<SIZES.length-1) idx++;
      if(h==='s' && idx>0) idx--;
      out.innerHTML = 'We’d suggest a <b>'+SIZES[idx]+'</b> for a relaxed coastal fit. Size up for extra ease.';
    }
    $('#ff-height').addEventListener('change',recompute);
    $('#ff-usual').addEventListener('change',recompute);
  }

  /* ---------------- VIDEO (hero + lookbook film) ---------------- */
  function initVideo(){
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $all('video[data-autoplay]').forEach(function(v){
      if(reduce){ v.removeAttribute('autoplay'); v.pause(); return; }
      var play = v.play(); if(play && play.catch) play.catch(function(){});
    });
    var hero = $('#hero'), toggle = $('#media-toggle'), hv = $('#hero-video');
    if(hero) hero.classList.add('has-media');
    if(toggle && hv){
      toggle.addEventListener('click', function(){
        if(hv.paused){ hv.play(); toggle.textContent='❙❙'; }
        else { hv.pause(); toggle.textContent='▶'; }
      });
      toggle.textContent = (reduce || hv.paused) ? '▶' : '❙❙';
    }
  }

  /* ---------------- FITTING ROOM (demo, unchanged behaviour) ---------------- */
  var fr = {};
  function jumpToTryOn(g){
    var tryon = $('#tryon'); if(!tryon) return;
    tryon.scrollIntoView({behavior:'smooth'});
    setTimeout(function(){
      if(fr.setModel) fr.setModel('a');
      if(fr.garmentShape){
        var shapes = fr.shapes;
        fr.garmentShape.setAttribute('d', shapes[g]||shapes.dress);
        fr.garmentShape.setAttribute('fill', g==='dress'?'#F2ECDF':'#dfe7ee');
        fr.garment.classList.add('on');
      }
    }, 500);
  }
  function initFittingRoom(){
    var shapes = {
      dress:'M20,30 L40,12 L80,12 L100,30 L94,52 L98,140 L22,140 L26,52 Z',
      top:  'M16,32 L40,12 L80,12 L104,32 L92,52 L92,96 L28,96 L28,52 Z',
      set:  'M22,34 L42,16 L78,16 L98,34 L90,54 L90,84 L30,84 L30,54 Z M34,92 L86,92 L84,138 L62,138 L62,104 L58,104 L58,138 L36,138 Z'
    };
    fr.shapes = shapes;
    var empty=$('#stage-empty'), silA=$('#sil-a'), silB=$('#sil-b'), uploaded=$('#uploaded-img');
    var garment=$('#garment'); fr.garment=garment; fr.garmentShape=$('#garment-shape');
    var chipsBox=$('#garment-chips');
    if(!garment) return;
    fr.setModel = function(which){
      empty.style.display='none'; uploaded.style.display='none';
      silA.style.display = which==='a'?'block':'none';
      silB.style.display = which==='b'?'block':'none';
      $all('[data-model]').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-model')===which); });
    };
    $all('[data-model]').forEach(function(btn){ btn.addEventListener('click', function(){ fr.setModel(btn.getAttribute('data-model')); }); });
    $('#photo') && $('#photo').addEventListener('change', function(e){
      var file=e.target.files[0]; if(!file) return;
      var reader=new FileReader();
      reader.onload=function(ev){ uploaded.src=ev.target.result; uploaded.style.display='block';
        silA.style.display='none'; silB.style.display='none'; empty.style.display='none';
        $all('[data-model]').forEach(function(b){b.classList.remove('active');}); };
      reader.readAsDataURL(file);
    });
    var garmentBtns=[
      {g:'dress',label:'Linen Shift',color:'#F2ECDF'},{g:'top',label:'Breton Top',color:'#dfe7ee'},
      {g:'top',label:'Cable Knit',color:'#AFC7DA'},{g:'set',label:'Boxer Set',color:'#cdd9e6'},
      {g:'dress',label:'Scallop Mini',color:'#2A3B52'}
    ];
    chipsBox && garmentBtns.forEach(function(o){
      var b=document.createElement('button'); b.className='chip'; b.textContent=o.label;
      b.addEventListener('click', function(){
        if(silA.style.display==='none' && silB.style.display==='none' && uploaded.style.display==='none'){ fr.setModel('a'); }
        fr.garmentShape.setAttribute('d', shapes[o.g]); fr.garmentShape.setAttribute('fill', o.color);
        garment.classList.add('on');
        $all('.chip',chipsBox).forEach(function(c){c.classList.remove('active');}); b.classList.add('active');
      });
      chipsBox.appendChild(b);
    });
    $('#reset-stage') && $('#reset-stage').addEventListener('click', function(){
      garment.classList.remove('on'); silA.style.display='none'; silB.style.display='none';
      uploaded.style.display='none'; uploaded.src=''; empty.style.display='block';
      $all('.chip',chipsBox).forEach(function(c){c.classList.remove('active');});
    });
  }

  /* ---------------- STYLIST (rule-based demo) ---------------- */
  function initStylist(){
    var answers={};
    $all('.s-chip').forEach(function(chip){
      chip.addEventListener('click', function(){
        var q=chip.closest('.q').getAttribute('data-q'); answers[q]=chip.getAttribute('data-val');
        $all('.s-chip',chip.closest('.q')).forEach(function(c){c.classList.remove('active');}); chip.classList.add('active');
      });
    });
    var go=$('#stylist-go'); if(!go) return;
    go.addEventListener('click', function(){
      var occ=answers.occasion, pal=answers.palette;
      var picks=products.filter(function(p){ return (occ?p.occ.indexOf(occ)>-1:true)&&(pal?p.pal.indexOf(pal)>-1:true); });
      if(picks.length<2) picks=products.filter(function(p){ return pal?p.pal.indexOf(pal)>-1:true; });
      if(picks.length<2) picks=products.slice(0,3);
      picks=picks.slice(0,3);
      var reasons={harbour:'easy enough for lunch on the water',town:'put-together for town without trying',
        evening:'a quiet step up for the evening',rest:'soft and unhurried for a slow day'};
      var why=reasons[occ]||'an easy MAREN staple';
      var out=$('#stylist-out');
      var html='<p class="serif" style="font-size:22px;margin:0 0 6px;">Your edit</p>'+
        '<p style="font-size:13px;color:var(--clay);margin:0 0 10px;">Chosen because it’s '+why+'.</p>';
      picks.forEach(function(p){
        html+='<div class="rec"><div class="rec-bloom">'+bloomSVG(p.blooms)+'</div>'+
          '<div><h4>'+p.name+'</h4><p>'+p.desc+' &middot; '+money(p.price)+'</p>'+
          '<button class="btn" data-quick="'+p.id+'" style="font-size:10px;padding:8px 12px;margin-top:6px;">Quick view</button></div></div>';
      });
      html+='<p class="stylist-foot">Demo stylist — picks are matched from the sample catalogue by simple rules. In production a styling model would personalise from your live range and the shopper’s history.</p>';
      out.innerHTML=html; out.classList.add('show'); out.scrollIntoView({behavior:'smooth',block:'nearest'});
    });
  }

  /* ---------------- NEWSLETTER ---------------- */
  function initNewsletter(){
    var btn=$('#news-btn'); if(!btn) return;
    btn.addEventListener('click', function(){
      var input=$('#news-email'), v=input.value.trim();
      if(v && v.indexOf('@')>-1){ showToast('Thanks — you’re on the list (demo, not stored).'); input.value=''; }
      else { showToast('Please enter a valid email.'); }
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
