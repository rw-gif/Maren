/* ============================================================
   MAREN — config token helper
   Single source of truth: /site-config.json. This reads the
   config once and substitutes every <span data-token="KEY">.
   If a value is blank it leaves the visible token [KEY] so it
   is obvious and greppable. One edit to site-config.json updates
   every page. Zero-build, client-side only.
   ============================================================ */
(function(){
  "use strict";

  // Work out the site root from this script's own URL, so pages at any
  // depth (/legal/x/, /help/y/) resolve the config and links correctly.
  function findSrc(re){
    if(document.currentScript && re.test(document.currentScript.src)) return document.currentScript.src;
    var s = Array.prototype.slice.call(document.scripts).filter(function(x){return re.test(x.src);})[0];
    return s ? s.src : '';
  }
  var src = findSrc(/site-config\.js/);
  var BASE = src.replace(/assets\/js\/site-config\.js.*$/, '');

  // Flatten the nested config to a single {KEY: value} map. Keys are unique
  // across groups, and keys starting with "_" (instructions/status) are skipped.
  function flatten(obj, out){
    out = out || {};
    Object.keys(obj).forEach(function(k){
      if(k.charAt(0) === '_') return;
      var v = obj[k];
      if(v && typeof v === 'object' && !Array.isArray(v)) flatten(v, out);
      else out[k] = v;
    });
    return out;
  }

  var data = {};
  var loaded = false;

  function valueFor(key){
    var v = data[key];
    return (v === undefined || v === null || String(v).trim() === '') ? null : String(v);
  }

  // Fill tokens within a root element (defaults to document).
  function apply(root){
    root = root || document;
    // Text tokens: <span data-token="LEGAL_ENTITY">[LEGAL_ENTITY]</span>
    Array.prototype.slice.call(root.querySelectorAll('[data-token]')).forEach(function(el){
      var key = el.getAttribute('data-token');
      var v = valueFor(key);
      el.textContent = v !== null ? v : '['+key+']';
      el.classList.toggle('token-missing', v === null);
    });
    // Mail links: <a data-token-mail="CONTACT_EMAIL">[CONTACT_EMAIL]</a>
    Array.prototype.slice.call(root.querySelectorAll('[data-token-mail]')).forEach(function(el){
      var key = el.getAttribute('data-token-mail');
      var v = valueFor(key);
      el.textContent = v !== null ? v : '['+key+']';
      if(v !== null){ el.setAttribute('href', 'mailto:'+v); }
      else { el.removeAttribute('href'); }
      el.classList.toggle('token-missing', v === null);
    });
  }

  var resolveReady;
  var ready = new Promise(function(res){ resolveReady = res; });

  function init(){
    fetch(BASE + 'site-config.json', {cache:'no-store'})
      .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
      .then(function(json){ data = flatten(json); loaded = true; })
      .catch(function(){ data = {}; loaded = false; })  // tokens stay visible as [KEY]
      .then(function(){ apply(document); resolveReady(api); });
  }

  var api = {
    base: BASE,
    ready: ready,
    loaded: function(){ return loaded; },
    get: valueFor,
    apply: apply
  };
  window.MarenConfig = api;

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
