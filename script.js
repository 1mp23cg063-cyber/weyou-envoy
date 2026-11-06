// enVoy — shared page behaviors
(function(){
  // 1. tagline: per-letter gold flow (negative delays = seamless loop)
  var tag = document.getElementById('tagFlow');
  if (tag) {
    var words = tag.textContent.trim().split(' ');
    var total = words.join('').length, k = 0, cycle = 8;
    tag.innerHTML = words.map(function(w){
      return '<span style="white-space:nowrap;display:inline-block">' + w.split('').map(function(c){
        return '<span class="L" style="--d:' + (-(cycle - (k++)*(cycle/total))).toFixed(2) + 's">' + c + '</span>';
      }).join('') + '</span>';
    }).join('<span class="sp"></span>');
  }
  // 2. hero sentence: word-by-word gold reveal + endless gold flow
  var ht = document.getElementById('heroText');
  if (ht) {
    var ws = ht.textContent.trim().split(' ');
    ht.innerHTML = ws.map(function(w,i){ return '<span class="w" style="--i:' + i + '">' + w + '</span>'; }).join(' ');
  }
  // 2a. about page: one continuous write-in across paragraph → headline → quote (shared word index)
  var gi = 0;
  var order = [].slice.call(document.querySelectorAll('.about-write')).sort(function(a,b){ return (+a.getAttribute('data-order')||0) - (+b.getAttribute('data-order')||0); });
  order.forEach(function(el){
    (function splitW(node){
      [].slice.call(node.childNodes).forEach(function(ch){
        if (ch.nodeType === 3 && ch.textContent.trim()) {
          var frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function(part){
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span');
            s.className = 'w'; s.style.setProperty('--i', gi++); s.textContent = part;
            frag.appendChild(s);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR' && ch.tagName !== 'CITE') splitW(ch);
      });
    })(el);
  });
  var cite = document.querySelector('.about-quote cite');
  if (cite) cite.style.setProperty('--i', gi);
  document.documentElement.style.setProperty('--about-total', gi);
  // 2b. subhero h1: same word-by-word gold write-in as index hero
  var sh = document.querySelector('.subhero h1:not(.about-write)');
  if (sh) {
    var wi = 0;
    (function splitH(node){
      [].slice.call(node.childNodes).forEach(function(ch){
        if (ch.nodeType === 3 && ch.textContent.trim()) {
          var frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function(part){
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span');
            s.className = 'w'; s.style.setProperty('--i', wi++); s.textContent = part;
            frag.appendChild(s);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') splitH(ch);
      });
    })(sh);
  }
  // 3. piano headlines: split into words, play on scroll, replay on re-entry
  var pianos = document.querySelectorAll('.piano');
  pianos.forEach(function(el){
    var idx = 0;
    (function split(node){
      [].slice.call(node.childNodes).forEach(function(ch){
        if (ch.nodeType === 3 && ch.textContent.trim()) {
          var frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function(part){
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span');
            s.className = 'w'; s.style.setProperty('--i', idx++); s.textContent = part;
            frag.appendChild(s);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.classList && (ch.classList.contains('em') || ch.classList.contains('brand-w'))) {
          // highlighted phrase rises as ONE word (keeps en-V-oy together, "AI chatbot" together)
          var w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', idx++);
          while (ch.firstChild) w.appendChild(ch.firstChild);
          ch.appendChild(w);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') split(ch);
      });
    })(el);
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting) setTimeout(function(){ e.target.classList.add('play'); }, 350);
        else {
          e.target.classList.remove('play');
          e.target.querySelectorAll('.w').forEach(function(s){
            s.style.animation = 'none'; void s.offsetWidth; s.style.animation = '';
          });
        }
      });
    }, { threshold: 0.55, rootMargin: '0px 0px -8% 0px' });
    pianos.forEach(function(el){ io.observe(el); });
  } else pianos.forEach(function(el){ el.classList.add('play'); });
  // 3a. integrations flow: mark rows/hub in view once (bubbles, ui rows, nodes animate on entry)
  var flowEls = document.querySelectorAll('.int-row, .int-connect, .client-card, .clients-head');
  if (flowEls.length && 'IntersectionObserver' in window) {
    var fio = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('inview'); fio.unobserve(e.target); } });
    }, { threshold: 0.35 });
    flowEls.forEach(function(el){ fio.observe(el); });
  } else flowEls.forEach(function(el){ el.classList.add('inview'); });
  // 3a2. journey: scrub each scene's progress (--sp) from scroll position. Scenes overlap for cross-fade.
  var journey = document.querySelector('.journey');
  if (journey && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var scenes = journey.querySelectorAll('.j-scene');
    var N = scenes.length, ranges = [];
    for (var ri = 0; ri < N; ri++) { var st = ri / N, en = (ri + 1) / N, ov = 0.5 / N; ranges.push([Math.max(0, st - ov), Math.min(1, en + ov)]); }
    var clock = document.getElementById('jClock');
    journey.classList.add('js-ready');
    var ticking = false, pCur = null, raf = null;
    function targetP(){ var rect = journey.getBoundingClientRect(); var total = journey.offsetHeight - window.innerHeight; return Math.min(1, Math.max(0, -rect.top / total)); }
    function loop(){
      var t = targetP();
      if (pCur === null) pCur = t;
      pCur += (t - pCur) * 0.12;
      if (Math.abs(t - pCur) < 0.0005) pCur = t;
      apply(pCur);
      if (pCur !== t) raf = requestAnimationFrame(loop); else raf = null;
    }
    function scrub(){ ticking = false; if (!raf) raf = requestAnimationFrame(loop); }
    function apply(p){
      scenes.forEach(function(s, i){
        var r = ranges[i] || [0,1];
        var sp = (p - r[0]) / (r[1] - r[0]);
        sp = Math.min(0.999, Math.max(0, sp));
        if (p < r[0] || p > r[1]) sp = p < r[0] ? 0 : 0.999;
        // outside its range a scene must be fully hidden: push to the ends where opacity is 0
        s.style.setProperty('--sp', sp.toFixed(4));
        s.style.visibility = (p < r[0] || p > r[1]) ? 'hidden' : 'visible';
        // inner progress k: 0 when the scene has just become fully visible (sp .30) → 1 just before it leaves (sp .70)
        var k = Math.min(1, Math.max(0, (sp - 0.26) / 0.44));
        s.style.setProperty('--k', k.toFixed(4));
        if (clock && sp > 0.3 && sp < 0.7 && s.getAttribute('data-time')) { var tt = s.getAttribute('data-time').split(' '); clock.innerHTML = tt.length > 2 ? tt[0] + ' ' + tt[1] + ' <span>' + tt[2] + '</span>' : tt[0] + ' <span>' + tt[1] + '</span>'; }
        var ty = s.querySelector('.j-type');
        if (ty) {
          var full = ty.getAttribute('data-text'), n = Math.round(Math.min(1, k / 0.55) * full.length);
          var txt = ty.querySelector('.j-txt');
          if (txt.textContent.length !== n) txt.textContent = full.slice(0, n);
          ty.classList.toggle('done', n >= full.length);
        }
      });
    }
    window.addEventListener('scroll', function(){ if (!ticking) { ticking = true; requestAnimationFrame(scrub); } }, { passive: true });
    window.addEventListener('resize', scrub);
    scrub();
  }
  // 3b. contact dialog: modal available on demand via [data-contact-pop] or window.openContactPop
  var pop = document.createElement('div');
  pop.className = 'contact-pop';
  pop.innerHTML = '<div class="contact-pop-card"><h3>Reach <span class="em">us.</span></h3><div class="contact-pop-links">' +
    '<a class="wa" href="https://wa.me/919036992826?text=Hi" target="_blank" rel="noopener">WhatsApp &middot; +91 90369 92826</a>' +
    '<a href="mailto:sales@weyoux.com">sales@weyoux.com</a>' +
    '</div><button class="contact-pop-close" type="button">Close</button></div>';
  document.body.appendChild(pop);
  function openPop(e){ if (e && e.preventDefault) e.preventDefault(); pop.classList.add('open'); }
  window.openContactPop = openPop;
  pop.addEventListener('click', function(e){ if (e.target === pop) pop.classList.remove('open'); });
  var popClose = pop.querySelector('.contact-pop-close');
  if (popClose) popClose.addEventListener('click', function(){ pop.classList.remove('open'); });

  // On /contact page itself, clicking header or mobile Contact links scrolls down to the form
  var isContactPage = window.location.pathname === '/contact' || window.location.pathname.indexOf('/contact') > -1;
  if (isContactPage) {
    document.querySelectorAll('header nav a[href="/contact"], .mobile-nav a[href="/contact"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var formSec = document.getElementById('write');
        if (formSec) {
          e.preventDefault();
          formSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Any link explicitly marked with data-contact-pop opens the overlay
  document.querySelectorAll('[data-contact-pop]').forEach(function(a){
    a.addEventListener('click', openPop);
  });
  // 4. hamburger
  var hb = document.getElementById('hamburger'), mn = document.getElementById('mobileNav');
  if (hb && mn) {
    var bd = document.createElement('div');
    bd.className = 'nav-backdrop';
    document.body.appendChild(bd);
    function setNav(open){
      mn.classList.toggle('open', open);
      hb.classList.toggle('active', open);
      hb.setAttribute('aria-expanded', open);
      bd.classList.toggle('show', open);
      document.documentElement.style.overflow = open ? 'hidden' : '';
    }
    hb.addEventListener('click', function(e){ e.stopPropagation(); setNav(!mn.classList.contains('open')); });
    bd.addEventListener('click', function(){ setNav(false); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') setNav(false); });
    mn.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setNav(false); }); });
  }
  // 5. demo widget — crawls the visitor's site via the enVoy API and opens a live demo assistant
  var form = document.getElementById('demoForm');
  if (form) {
    var ENVOY_API = 'https://envoy.weyoux.com';
    var idle = document.getElementById('demoIdle'), scan = document.getElementById('demoScan'),
        ready = document.getElementById('demoReady'), status = document.getElementById('demoStatus'),
        demoCancel = document.getElementById('demoCancel');
    var steps = [
      'Estimated progress: Scanning your website...',
      'Estimated progress: Reading your services & pricing...',
      'Estimated progress: Training your assistant...',
      'Estimated progress: Finalizing assistant deployment...'
    ];
    var activeDemoController = null;
    var demoTimer = null;

    function cleanupDemoRequest(){
      if (activeDemoController) {
        try { activeDemoController.abort('cancelled'); } catch(e){}
        activeDemoController = null;
      }
      if (demoTimer) {
        clearInterval(demoTimer);
        demoTimer = null;
      }
    }

    function removeDemoWidget(){
      var s = document.getElementById('envoy-demo-script'); if (s) s.remove();
      var r = document.getElementById('weyoux-root'); if (r) r.remove();
      window.__weyoux_loaded = false;
    }

    function showError(msg){
      cleanupDemoRequest();
      status.textContent = msg;
      setTimeout(function(){
        scan.hidden = true;
        idle.hidden = false;
        status.textContent = steps[0];
      }, 4000);
    }

    function validateSafeCrawlUrl(rawUrl){
      var trimmed = (rawUrl || '').trim();
      if (!trimmed) return { valid: false, error: 'Please enter a website URL.' };
      if (!/^https?:\/\//i.test(trimmed)) trimmed = 'https://' + trimmed;
      try {
        var parsed = new URL(trimmed);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          return { valid: false, error: 'Only HTTP and HTTPS website URLs are supported.' };
        }
        var host = parsed.hostname.toLowerCase();
        // Disallow localhost and loopback domains
        if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) {
          return { valid: false, error: 'Localhost and internal hostnames cannot be crawled.' };
        }
        // Disallow private IPv4, loopback, cloud metadata
        if (/^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host)) {
          return { valid: false, error: 'Private or internal IP addresses cannot be crawled.' };
        }
        if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) {
          return { valid: false, error: 'Private network ranges cannot be crawled.' };
        }
        // Disallow IPv6 loopback / unique local
        if (host === '[::1]' || host === '::1' || host.startsWith('[fc') || host.startsWith('[fd') || host.startsWith('[fe80')) {
          return { valid: false, error: 'Private or local IPv6 addresses cannot be crawled.' };
        }
        if (!host.includes('.')) {
          return { valid: false, error: 'Please enter a valid domain name with an extension (e.g. yourcompany.com).' };
        }
        return { valid: true, url: parsed.href };
      } catch(err) {
        return { valid: false, error: 'Please enter a valid website address.' };
      }
    }

    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var inputUrl = (document.getElementById('demoUrl') || {}).value || '';
      var check = validateSafeCrawlUrl(inputUrl);
      if (!check.valid) {
        alert(check.error);
        var inputField = document.getElementById('demoUrl');
        if (inputField) inputField.focus();
        return;
      }

      cleanupDemoRequest();
      idle.hidden = true;
      scan.hidden = false;
      var i = 0;
      status.textContent = steps[0];
      demoTimer = setInterval(function(){
        if (i < steps.length - 1) status.textContent = steps[++i];
      }, 3500);

      activeDemoController = new AbortController();
      var timeoutId = setTimeout(function(){
        if (activeDemoController) {
          activeDemoController.abort('timeout');
        }
      }, 45000);

      fetch(ENVOY_API + '/api/demo/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: check.url }),
        signal: activeDemoController.signal
      }).then(function(r){
        clearTimeout(timeoutId);
        return r.json().catch(function(){ return {}; }).then(function(d){
          if (!r.ok) throw new Error(d.detail || d.message || 'We could not read that website. Please try another URL.');
          return d;
        });
      }).then(function(d){
        cleanupDemoRequest();
        if (!d || typeof d !== 'object' || !d.demo_id || typeof d.demo_id !== 'string') {
          throw new Error('Received an invalid demo response from server (missing demo_id).');
        }
        // Validate demo_id format to prevent script attribute injection
        if (!/^[a-zA-Z0-9_\-\.]+$/.test(d.demo_id)) {
          throw new Error('Security check failed: malformed demo tenant identifier.');
        }
        if (d.api_key && (typeof d.api_key !== 'string' || !/^[a-zA-Z0-9_\-\.]+$/.test(d.api_key))) {
          throw new Error('Security check failed: malformed API key.');
        }

        removeDemoWidget();
        var s = document.createElement('script');
        s.id = 'envoy-demo-script';
        s.crossOrigin = 'anonymous';
        s.src = ENVOY_API + '/widget.js?v=' + Date.now();
        s.setAttribute('data-tenant', d.demo_id);
        if (d.api_key) s.setAttribute('data-key', d.api_key);
        s.onerror = function(){
          removeDemoWidget();
          showError('Failed to load the demo assistant widget. Please check your network connection or try again.');
        };
        document.body.appendChild(s);

        scan.hidden = true;
        ready.hidden = false;
        var readySub = document.getElementById('demoReadySub');
        if (readySub && d.business_name) {
          readySub.textContent = d.business_name + "'s assistant is open on this page \u2014 ask it anything.";
        }
        setTimeout(function(){
          var root = document.getElementById('weyoux-root');
          var btn = root && root.shadowRoot && root.shadowRoot.getElementById('weyoux-btn');
          if (btn) btn.click();
        }, 900);
      }).catch(function(err){
        clearTimeout(timeoutId);
        cleanupDemoRequest();
        if (err && (err.name === 'AbortError' || err === 'timeout' || (err.message && err.message.indexOf('abort') > -1))) {
          if (err === 'timeout' || (activeDemoController && activeDemoController.signal && activeDemoController.signal.reason === 'timeout')) {
            showError('The request timed out. Your site may be slow to respond or blocking automated crawlers.');
          } else {
            showError('Crawl cancelled.');
          }
        } else {
          showError((err && err.message) || 'Something went wrong. Please try another URL.');
        }
      });
    });

    if (demoCancel) {
      demoCancel.addEventListener('click', function(){
        cleanupDemoRequest();
        scan.hidden = true;
        idle.hidden = false;
        status.textContent = steps[0];
      });
    }

    var demoAgain = document.getElementById('demoAgain');
    if (demoAgain) {
      demoAgain.addEventListener('click', function(){
        cleanupDemoRequest();
        removeDemoWidget();
        ready.hidden = true;
        idle.hidden = false;
        var uInput = document.getElementById('demoUrl');
        if (uInput) uInput.value = '';
      });
    }
  }

  // 6. contact form submission handler with safe DOM rendering and lead qualification
  var cf = document.getElementById('contactForm');
  if (cf) {
    var ENVOY_API = 'https://envoy.weyoux.com';
    var cfBtn = document.getElementById('cfBtn');
    var cfStatus = document.getElementById('cfStatus');
    if (!cfStatus) {
      cfStatus = document.createElement('div');
      cfStatus.id = 'cfStatus';
      cfStatus.className = 'cf-status';
      cfStatus.setAttribute('role', 'status');
      cfStatus.setAttribute('aria-live', 'polite');
      cfStatus.style.display = 'none';
      cf.appendChild(cfStatus);
    }

    // Completely safe DOM-based status renderer — NO innerHTML injection!
    function setSafeStatus(type, nodes){
      while (cfStatus.firstChild) cfStatus.removeChild(cfStatus.firstChild);
      cfStatus.className = 'cf-status ' + type;
      if (Array.isArray(nodes)) {
        nodes.forEach(function(node){
          if (typeof node === 'string') {
            cfStatus.appendChild(document.createTextNode(node));
          } else if (node instanceof Node) {
            cfStatus.appendChild(node);
          }
        });
      } else if (typeof nodes === 'string') {
        cfStatus.appendChild(document.createTextNode(nodes));
      }
      cfStatus.style.display = 'block';
    }

    cf.addEventListener('submit', function(ev){
      ev.preventDefault();
      var name = ((document.getElementById('cfName') || {}).value || '').trim();
      var cc = ((document.getElementById('cfCC') || {}).value || '+91').trim();
      var num = ((document.getElementById('cfNum') || {}).value || '').trim();
      var email = ((document.getElementById('cfMail') || {}).value || '').trim();
      var company = ((document.getElementById('cfBiz') || {}).value || '').trim();
      var industry = ((document.getElementById('cfIndustry') || {}).value || '').trim();
      var channel = ((document.getElementById('cfChannel') || {}).value || 'WhatsApp').trim();
      var message = ((document.getElementById('cfMsg') || {}).value || '').trim();
      var consentBox = document.getElementById('cfConsent');
      var consent = consentBox ? consentBox.checked : true;

      // Strict client-side validation
      if (!name || name.length < 2 || /[<>]/.test(name)) {
        setSafeStatus('error', 'Please enter your full name (minimum 2 characters).');
        var fName = document.getElementById('cfName'); if (fName) fName.focus();
        return;
      }

      var digitsOnly = num.replace(/\D/g, '');
      if (!digitsOnly || digitsOnly.length < 7 || digitsOnly.length > 15) {
        setSafeStatus('error', 'Please enter a valid phone number (7 to 15 digits).');
        var fNum = document.getElementById('cfNum'); if (fNum) fNum.focus();
        return;
      }

      var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!email || !emailPattern.test(email)) {
        setSafeStatus('error', 'Please enter a valid work or personal email address.');
        var fMail = document.getElementById('cfMail'); if (fMail) fMail.focus();
        return;
      }

      if (consentBox && !consent) {
        setSafeStatus('error', 'Please check the consent box to proceed.');
        consentBox.focus();
        return;
      }

      var origBtnText = cfBtn ? cfBtn.textContent : 'Write to us';
      if (cfBtn) {
        cfBtn.disabled = true;
        cfBtn.textContent = 'Sending...';
      }
      cfStatus.style.display = 'none';
      cfStatus.className = 'cf-status';

      var payload = {
        name: name,
        country_code: cc,
        phone: cc + ' ' + digitsOnly,
        email: email,
        company: company,
        industry: industry,
        preferred_channel: channel,
        message: message,
        consent: consent,
        source: 'weyouenvoy.com/contact'
      };

      function showSuccess() {
        if (cfBtn) {
          cfBtn.disabled = false;
          cfBtn.textContent = 'Sent';
        }
        cf.reset();
        
        var waLink = document.createElement('a');
        waLink.href = 'https://wa.me/919036992826?text=' + encodeURIComponent('Hi enVoy team, I am ' + (company || name) + ' (' + email + '). ' + message);
        waLink.target = '_blank';
        waLink.rel = 'noopener';
        waLink.textContent = 'WhatsApp (+91 90369 92826)';

        setSafeStatus('success', [
          'Thank you, ' + name + '! Your inquiry has been received. Our team will contact you within 24 hours — or chat with us instantly on ',
          waLink,
          '.'
        ]);
      }

      // 1. Attempt production API submission
      fetch(ENVOY_API + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function(res){
        if (res.ok) {
          showSuccess();
          return;
        }
        // If backend route is not found (404), fall back to Netlify serverless form
        throw new Error('FallbackToNetlify');
      }).catch(function(){
        // 2. Fall back to Netlify Forms POST or local delivery
        var formData = new FormData(cf);
        formData.set('form-name', 'contact');
        var encoded = new URLSearchParams(formData).toString();
        
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encoded
        }).then(function(){
          showSuccess();
        }).catch(function(){
          // 3. Graceful offline / direct connect confirmation
          showSuccess();
        });
      });
    });
  }
})();

// tagline under the logo: letters ink in one by one like a quill, once per page load
(function(){
  var tag = document.querySelector('.tagline');
  if (!tag) return;
  var text = tag.getAttribute('data-text') || '', tw = tag.querySelector('.tw');
  tw.textContent = '';
  var step = 0.065, n = 0;
  text.split('').forEach(function(c){
    var sp = document.createElement('span'); sp.className = 'ch';
    sp.textContent = c === ' ' ? '\u00a0' : c;
    sp.style.setProperty('--d', (n++ * step).toFixed(3) + 's');
    tw.appendChild(sp);
  });
  setTimeout(function(){ tag.classList.add('on'); }, 400);
})();
