// enVoy admin — writes a post, exports posts.json + <slug>.md for the blog/ folder
(function(){
  var B = window.envoyBlog, $ = function(id){ return document.getElementById(id); };
  var fields = ['pTitle','pSlug','pDate','pSummary','pTags','pCover','pBody'];
  var KEY = 'envoy-admin-draft', INDEX = 'envoy-admin-index';
  var index = null;
  try { index = JSON.parse(localStorage.getItem(INDEX) || 'null'); } catch(e){}
  try { var d = JSON.parse(localStorage.getItem(KEY) || '{}'); fields.forEach(function(f){ if (d[f]) $(f).value = d[f]; }); } catch(e){}
  if (!$('pDate').value) $('pDate').value = new Date().toISOString().slice(0,10);
  fetch('/blog/posts.json', { cache: 'no-cache' }).then(function(r){ return r.json(); }).then(function(d){ if (!index) index = d; status((index.posts||[]).length + ' posts in current index.'); }).catch(function(){ if (!index) index = { posts: [] }; });
  function status(s){ $('adminStatus').textContent = s; }
  function slugify(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
  $('pTitle').addEventListener('input', function(){ if (!$('pSlug').dataset.touched) $('pSlug').value = slugify($('pTitle').value); });
  $('pSlug').addEventListener('input', function(){ $('pSlug').dataset.touched = '1'; });
  fields.forEach(function(f){ $(f).addEventListener('input', function(){ var o = {}; fields.forEach(function(g){ o[g] = $(g).value; }); localStorage.setItem(KEY, JSON.stringify(o)); }); });
  function meta(){ return { slug: $('pSlug').value.trim(), title: $('pTitle').value.trim(), date: $('pDate').value, summary: $('pSummary').value.trim(), tags: $('pTags').value.split(',').map(function(t){ return t.trim(); }).filter(Boolean), cover: $('pCover').value.trim() }; }
  // pictures: picked files are kept in memory, renamed for assets/blog/, previewed instantly, and downloaded with the post
  var pics = {};
  function picName(f){ var slug = $('pSlug').value.trim() || 'post'; var ext = (f.name.split('.').pop() || 'jpg').toLowerCase(); var base = f.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'image'; return slug + '-' + base + '.' + ext; }
  function addPic(f){ var name = picName(f), path = '/assets/blog/' + name; pics[path] = { file: f, url: URL.createObjectURL(f), name: name }; return path; }
  function insertAtCursor(ta, text){ var s = ta.selectionStart || ta.value.length, e = ta.selectionEnd || s; ta.value = ta.value.slice(0, s) + text + ta.value.slice(e); ta.selectionStart = ta.selectionEnd = s + text.length; ta.dispatchEvent(new Event('input')); ta.focus(); }

  var btnImg = $('btnImg') || $('btnImage');
  var imgFile = $('imgFile') || $('imageFile');
  if (btnImg && imgFile) {
    btnImg.addEventListener('click', function(){ imgFile.click(); });
    imgFile.addEventListener('change', function(){
      [].slice.call(this.files).forEach(function(f){ var p = addPic(f); insertAtCursor($('pBody'), '\n![' + f.name.replace(/\.[^.]+$/, '') + '](' + p + ')\n'); });
      this.value = ''; preview(); status('Picture added — it downloads with the post into assets/blog/.');
    });
  }

  var btnCover = $('btnCover'), coverFile = $('coverFile');
  if (btnCover && coverFile) {
    btnCover.addEventListener('click', function(){ coverFile.click(); });
    coverFile.addEventListener('change', function(){ var f = this.files[0]; if (!f) return; $('pCover').value = addPic(f); $('pCover').dispatchEvent(new Event('input')); this.value = ''; preview(); });
  }

  // preview swaps /assets/blog/... paths for the local picked file so it shows before upload
  var _md = B.md;
  B.mdLocal = function(t){ var out = _md(t); Object.keys(pics).forEach(function(p){ out = out.split(p).join(pics[p].url); }); return out; };

  function preview(){
    var p = meta();
    $('prevCard').innerHTML = '<span class="blog-card-date">' + B.fmt(p.date) + (p.tags.length ? ' &middot; ' + B.esc(p.tags.join(', ')) : '') + '</span><h3>' + B.V(B.esc(p.title || 'Untitled')) + '</h3><p>' + B.V(B.esc(p.summary)) + '</p>';
    var cov = p.cover && pics[p.cover] ? pics[p.cover].url : p.cover;
    $('prevBody').innerHTML = (cov ? '<img class="post-cover" src="' + B.esc(cov) + '" alt="">' : '') + ((B.mdLocal || B.md)($('pBody').value) || '<p class="blog-empty">Nothing yet.</p>');
  }
  $('btnPreview').addEventListener('click', preview);
  function download(name, text, type){ var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: type })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500); }
  $('btnExport').addEventListener('click', function(){
    var p = meta();
    if (!p.slug || !p.title || !p.date || !p.summary) { status('Title, slug, date and summary are required.'); return; }
    if (!/^[a-z0-9-]+$/.test(p.slug)) { status('Slug: lowercase letters, numbers and dashes only.'); return; }
    index = index || { posts: [] };
    index.posts = (index.posts || []).filter(function(x){ return x.slug !== p.slug; }).concat([p]).sort(function(a,b){ return a.date < b.date ? 1 : -1; });
    localStorage.setItem(INDEX, JSON.stringify(index));
    download(p.slug + '.md', $('pBody').value, 'text/markdown');
    setTimeout(function(){ download('posts.json', JSON.stringify(index, null, 2), 'application/json'); }, 400);
    var used = Object.keys(pics).filter(function(path){ return $('pBody').value.indexOf(path) > -1 || p.cover === path; });
    used.forEach(function(path, i){ setTimeout(function(){ var a = document.createElement('a'); a.href = pics[path].url; a.download = pics[path].name; document.body.appendChild(a); a.click(); a.remove(); }, 800 + i * 400); });
    status('Downloaded ' + p.slug + '.md and posts.json → blog/' + (used.length ? ', plus ' + used.length + ' picture(s) → assets/blog/' : '') + '. Commit and it’s live.');
    preview();
  });
  $('btnImport').addEventListener('click', function(){ $('importFile').click(); });
  $('importFile').addEventListener('change', function(){
    var f = this.files[0]; if (!f) return;
    var r = new FileReader(); r.onload = function(){ try { index = JSON.parse(r.result); localStorage.setItem(INDEX, JSON.stringify(index)); status('Imported ' + (index.posts||[]).length + ' posts.'); } catch(e){ status('That file is not valid posts.json.'); } }; r.readAsText(f);
  });
  preview();
})();
