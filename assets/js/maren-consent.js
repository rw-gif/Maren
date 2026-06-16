/* ============================================================
   MAREN — cookie consent + newsletter consent
   PECR (as amended by the Data (Use and Access) Act 2025) + UK GDPR.
   - Blocks non-essential / advertising scripts until the user chooses.
   - Accept all / Reject all / Manage preferences, equal prominence.
   - Preference centre; advertising default OFF.
   - Footer "Cookie settings" reopens it so consent can be withdrawn.
   - Logs the choice: timestamp, categories, policy version.
   Zero-build, client-side only.
   ============================================================ */
(function(){
  "use strict";

  var POLICY_VERSION = "2026-06-16";
  var STORE_KEY = "maren_consent";
  var CATS = ["performance","functional","advertising"]; // necessary is always on

  function base(){ return (window.MarenConfig && window.MarenConfig.base) || ""; }

  /* ---- storage (the app's normal client storage, guarded) ---- */
  var mem = null;
  function read(){
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || null; }
    catch(e){ return mem; }
  }
  function write(rec){
    mem = rec;
    try { localStorage.setItem(STORE_KEY, JSON.stringify(rec)); } catch(e){}
  }

  function current(){
    var r = read();
    if(!r || r.version !== POLICY_VERSION) return null; // re-ask on version change
    return r;
  }
  function granted(cat){
    if(cat === "necessary") return true;
    var r = current();
    return !!(r && r.categories && r.categories[cat]);
  }

  /* ---- consent gate: run a script only once its category is allowed ---- */
  var queue = [];
  function gate(cat, fn){
    if(granted(cat)){ try{ fn(); }catch(e){} }
    else queue.push({cat:cat, fn:fn});
  }
  function flush(){
    queue = queue.filter(function(item){
      if(granted(item.cat)){ try{ item.fn(); }catch(e){} return false; }
      return true;
    });
  }

  function save(categories){
    var rec = { ts: new Date().toISOString(), version: POLICY_VERSION, categories: categories };
    write(rec);
    hideBanner();
    syncToggles();
    flush();
  }
  function acceptAll(){ save({performance:true, functional:true, advertising:true}); }
  function rejectAll(){ save({performance:false, functional:false, advertising:false}); }
  function saveFromToggles(){
    var c = {};
    CATS.forEach(function(cat){
      var el = document.getElementById("cc-"+cat);
      c[cat] = !!(el && el.checked);
    });
    save(c);
  }

  /* ---- UI ---- */
  function el(html){ var d=document.createElement("div"); d.innerHTML=html.trim(); return d.firstChild; }

  function banner(){
    return el(
      '<div class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Cookie choices" hidden>'+
        '<div class="cb-inner">'+
          '<p class="cb-text">We use cookies to run this site and, with your consent, to measure performance and show relevant advertising. Strictly necessary cookies are always on. Read our <a href="'+base()+'legal/cookie-policy/">Cookie Policy</a>.</p>'+
          '<div class="cb-actions">'+
            '<button type="button" class="cb-btn" data-cc="reject">Reject all</button>'+
            '<button type="button" class="cb-btn" data-cc="manage">Manage preferences</button>'+
            '<button type="button" class="cb-btn" data-cc="accept">Accept all</button>'+
          '</div>'+
        '</div>'+
      '</div>');
  }

  function row(cat, title, desc, fixed){
    return '<div class="cm-cat">'+
      '<div class="cm-cat-head">'+
        '<span class="cm-cat-title">'+title+'</span>'+
        (fixed
          ? '<span class="cm-always">Always on</span>'
          : '<label class="cm-switch"><input type="checkbox" id="cc-'+cat+'"><span class="cm-track"></span></label>')+
      '</div>'+
      '<p class="cm-cat-desc">'+desc+'</p>'+
    '</div>';
  }

  function modal(){
    return el(
      '<div class="cookie-modal" id="cookie-modal" role="dialog" aria-modal="true" aria-label="Cookie preferences" hidden>'+
        '<div class="cm-overlay" data-cc="close"></div>'+
        '<div class="cm-card">'+
          '<button type="button" class="cm-close" data-cc="close" aria-label="Close">&times;</button>'+
          '<h2>Cookie preferences</h2>'+
          '<p class="cm-intro">Choose which cookies we can use. Strictly necessary cookies keep the site working and cannot be switched off. Everything else is off until you turn it on.</p>'+
          row("necessary","Strictly necessary","Required for the basket, checkout and security.",true)+
          row("performance","Performance & analytics","First-party cookies that help us measure how the site performs so we can improve it.")+
          row("functional","Functional & preferences","Remember choices such as region, currency or language.")+
          row("advertising","Advertising & third-party tracking","Set by us or partners (for example Meta and TikTok) to measure and tailor advertising. Off unless you allow it.")+
          '<div class="cm-actions">'+
            '<button type="button" class="cb-btn" data-cc="reject">Reject all</button>'+
            '<button type="button" class="cb-btn" data-cc="save">Save preferences</button>'+
            '<button type="button" class="cb-btn" data-cc="accept">Accept all</button>'+
          '</div>'+
          '<p class="cm-version">Policy version '+POLICY_VERSION+'</p>'+
        '</div>'+
      '</div>');
  }

  function showBanner(){ var b=document.getElementById("cookie-banner"); if(b) b.hidden=false; }
  function hideBanner(){ var b=document.getElementById("cookie-banner"); if(b) b.hidden=true; }
  function openModal(){ syncToggles(); var m=document.getElementById("cookie-modal"); if(m) m.hidden=false; }
  function closeModal(){ var m=document.getElementById("cookie-modal"); if(m) m.hidden=true; }
  function syncToggles(){
    var r = current();
    CATS.forEach(function(cat){
      var el2 = document.getElementById("cc-"+cat);
      if(el2) el2.checked = !!(r && r.categories && r.categories[cat]);
    });
  }

  function onClick(e){
    var t = e.target.closest("[data-cc]"); if(!t) return;
    var a = t.getAttribute("data-cc");
    if(a==="accept") { acceptAll(); closeModal(); }
    else if(a==="reject") { rejectAll(); closeModal(); }
    else if(a==="manage") { openModal(); }
    else if(a==="save") { saveFromToggles(); closeModal(); }
    else if(a==="close") { closeModal(); }
    else if(a==="open") { openModal(); }  // footer "Cookie settings"
  }

  /* ---- newsletter (unticked positive consent, no pre-consent cookies) ---- */
  function toast(msg){
    var t = document.getElementById("mc-toast");
    if(!t){ t = el('<div class="mc-toast" id="mc-toast" role="status"></div>'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._timer); t._timer = setTimeout(function(){ t.classList.remove("show"); }, 3600);
  }
  function initNewsletter(){
    Array.prototype.slice.call(document.querySelectorAll("[data-newsletter]")).forEach(function(form){
      var btn = form.querySelector(".nl-join");
      if(!btn || btn._wired) return; btn._wired = true;
      btn.addEventListener("click", function(e){
        e.preventDefault();
        var email = (form.querySelector(".nl-email")||{}).value || "";
        var consent = form.querySelector(".nl-consent");
        if(email.indexOf("@") < 0 || email.indexOf(".") < 0){ toast("Please enter a valid email address."); return; }
        if(!consent || !consent.checked){ toast("Please tick the box to confirm you'd like our emails."); return; }
        // Real project: send to the email platform with a logged consent timestamp/source.
        var f = form.querySelector(".nl-email"); if(f) f.value = "";
        if(consent) consent.checked = false;
        toast("Thank you. Please check your inbox to confirm (demo — not yet wired to an email platform).");
      });
    });
  }

  function init(){
    document.body.appendChild(banner());
    document.body.appendChild(modal());
    document.addEventListener("click", onClick);
    if(!current()) showBanner();
    syncToggles();
    initNewsletter();
    flush();
  }

  window.MarenConsent = { open: openModal, granted: granted, gate: gate, get: current, version: POLICY_VERSION };

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
