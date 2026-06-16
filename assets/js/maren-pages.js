/* ============================================================
   MAREN — shared shell for supporting/legal pages
   Injects a light header and the site footer (with grouped nav,
   business identity tokens, newsletter and a Cookie settings link)
   so each page file is just its semantic <article> content.
   Presentation-free content ports straight to Shopify Pages/Policies.
   ============================================================ */
(function(){
  "use strict";

  function findSrc(re){
    if(document.currentScript && re.test(document.currentScript.src)) return document.currentScript.src;
    var s = Array.prototype.slice.call(document.scripts).filter(function(x){return re.test(x.src);})[0];
    return s ? s.src : '';
  }
  var BASE = (window.MarenConfig && window.MarenConfig.base) ||
             findSrc(/maren-pages\.js/).replace(/assets\/js\/maren-pages\.js.*$/, '');

  function L(path, label, id){
    return '<a href="'+BASE+path+'"'+(id?' id="'+id+'"':'')+'>'+label+'</a>';
  }

  function header(){
    return '<header class="lp-head"><div class="wrap lp-head-in">'+
      '<a class="lp-back" href="'+BASE+'">&larr; Back to store</a>'+
      '<a class="lp-logo" href="'+BASE+'">MAREN</a>'+
      '<a class="lp-help" href="'+BASE+'help/contact/">Help</a>'+
    '</div></header>';
  }

  function club(){
    return '<section class="nl-club" data-newsletter><div class="nl-club-in">'+
      '<span class="eyebrow">The Maren List</span>'+
      '<h2 class="nl-club-h">Join the <em>list</em></h2>'+
      '<p class="nl-club-sub">First access to new arrivals, the occasional letter from Maren, and <strong><span data-token="NEWSLETTER_INCENTIVE">[NEWSLETTER_INCENTIVE]</span></strong> when you sign up.</p>'+
      '<div class="nl-club-form"><input class="nl-email" type="email" placeholder="Enter your email address" aria-label="Email address"><button class="nl-join" type="button">Submit</button></div>'+
      '<label class="nl-consent-row nl-club-consent"><input type="checkbox" class="nl-consent"> <span>Yes, email me Maren updates. I can unsubscribe at any time. See our <a href="'+BASE+'legal/privacy-policy/">Privacy Policy</a>. T&amp;Cs apply.</span></label>'+
    '</div></section>';
  }

  function footer(){
    return '<footer class="site-foot"><div class="wrap">'+
      '<div class="foot-top">'+
        '<div class="foot-brand">'+
          '<div class="fm">MAREN</div>'+
          '<p>Coastal essentials in linen and cotton. Designed for slow days, by the sea.</p>'+
        '</div>'+
        '<div class="foot-col"><h5>Help</h5>'+
          L('help/shipping/','Shipping &amp; Delivery')+L('help/returns/','Returns &amp; Exchanges')+
          L('help/faq/','FAQ')+L('help/contact/','Help &amp; Contact')+
          L('help/duties-and-taxes/','Duties &amp; Taxes')+L('help/size-guide/','Size Guide &amp; Care')+
        '</div>'+
        '<div class="foot-col"><h5>Legal</h5>'+
          L('legal/privacy-policy/','Privacy Policy')+L('legal/cookie-policy/','Cookie Policy')+
          L('legal/terms/','Terms')+L('legal/accessibility/','Accessibility')+
          '<button type="button" class="foot-link-btn" data-cc="open">Cookie settings</button>'+
        '</div>'+
        '<div class="foot-col"><h5>Company</h5>'+
          L('','Shop')+L('affiliates/','Affiliates')+L('account/','Account')+
        '</div>'+
      '</div>'+
      '<p class="foot-id">'+
        '<span data-token="LEGAL_ENTITY">[LEGAL_ENTITY]</span> &middot; '+
        'Company no. <span data-token="COMPANY_NUMBER">[COMPANY_NUMBER]</span> &middot; '+
        'VAT <span data-token="VAT_NUMBER">[VAT_NUMBER]</span> &middot; '+
        '<span data-token="REGISTERED_ADDRESS">[REGISTERED_ADDRESS]</span> &middot; '+
        '<a data-token-mail="CONTACT_EMAIL">[CONTACT_EMAIL]</a>'+
      '</p>'+
      '<div class="foot-bottom">'+
        '<span>&copy; 2026 Maren.</span>'+
        '<button type="button" class="foot-cookie" data-cc="open">Cookie settings</button>'+
      '</div>'+
    '</div></footer>';
  }

  function init(){
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if(h) h.outerHTML = header();
    if(f) f.outerHTML = club() + footer();
    // Fill config tokens in the freshly injected footer once config is ready.
    if(window.MarenConfig && window.MarenConfig.ready){
      window.MarenConfig.ready.then(function(cfg){ cfg.apply(document); });
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
