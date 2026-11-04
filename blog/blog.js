// enVoy blog — static: blog/posts.json is the index, blog/<slug>.md is the body
(function(){
  var V = function(s){ return String(s).replace(/enVoy/g, 'en<span class="V">V</span>oy'); };
  function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function inline(s){
    s = esc(s);
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>').replace(/(^|\W)_([^_]+)_(?=\W|$)/g, '$1<em>$2</em>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    return V(s);
  }
  function md(src){
    var out = [], lines = src.replace(/\r/g,'').split('\n'), i = 0;
    while (i < lines.length) {
      var l = lines[i];
      if (!l.trim()) { i++; continue; }
      var m;
      if ((m = l.match(/^(#{1,3})\s+(.*)/))) { var h = m[1].length + 1; out.push('<h' + h + '>' + inline(m[2]) + '</h' + h + '>'); i++; continue; }
      if (/^>\s?/.test(l)) { var q = []; while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i].replace(/^>\s?/, '')), i++; out.push('<blockquote><p>' + inline(q.join(' ')) + '</p></blockquote>'); continue; }
      if (/^[-*]\s+/.test(l)) { var u = []; while (i < lines.length && /^[-*]\s+/.test(lines[i])) u.push('<li>' + inline(lines[i].replace(/^[-*]\s+/, '')) + '</li>'), i++; out.push('<ul>' + u.join('') + '</ul>'); continue; }
      if (/^\d+\.\s+/.test(l)) { var o = []; while (i < lines.length && /^\d+\.\s+/.test(lines[i])) o.push('<li>' + inline(lines[i].replace(/^\d+\.\s+/, '')) + '</li>'), i++; out.push('<ol>' + o.join('') + '</ol>'); continue; }
      if (/^---+$/.test(l.trim())) { out.push('<hr>'); i++; continue; }
      var p = []; while (i < lines.length && lines[i].trim() && !/^(#{1,3}\s|>|[-*]\s|\d+\.\s|---)/.test(lines[i])) p.push(lines[i]), i++;
      out.push('<p>' + inline(p.join(' ')) + '</p>');
    }
    return out.join('\n');
  }
  function fmt(d){ try { return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); } catch(e){ return d; } }
  function card(p){
    return '<a class="blog-card" href="/post?p=' + encodeURIComponent(p.slug) + '">' +
      (p.cover ? '<img class="blog-card-cover" src="' + esc(p.cover) + '" alt="" loading="lazy">' : '') +
      '<span class="blog-card-date">' + fmt(p.date) + (p.tags && p.tags.length ? ' &middot; ' + esc(p.tags.join(', ')) : '') + '</span>' +
      '<h3>' + V(esc(p.title)) + '</h3><p>' + V(esc(p.summary || '')) + '</p><span class="v-arrow">&rarr;</span></a>';
  }
  window.envoyBlog = { md: md, card: card, fmt: fmt, V: V, esc: esc };

  var grid = document.getElementById('blogGrid');
  if (grid) {
    fetch('/blog/posts.json', { cache: 'no-cache' }).then(function(r){ return r.json(); }).then(function(d){
      var posts = (d.posts || []).slice().sort(function(a,b){ return a.date < b.date ? 1 : -1; });
      grid.innerHTML = posts.length ? posts.map(card).join('') : '<p class="blog-empty">No posts yet.</p>';
    }).catch(function(){ grid.innerHTML = '<p class="blog-empty">Could not load posts.</p>'; });
  }
  var body = document.getElementById('postBody');
  if (body) {
    var slug = new URLSearchParams(location.search).get('p');
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) { body.innerHTML = '<p class="blog-empty">Post not found.</p>'; return; }
    fetch('/blog/posts.json', { cache: 'no-cache' }).then(function(r){ return r.json(); }).then(function(d){
      var p = (d.posts || []).filter(function(x){ return x.slug === slug; })[0];
      if (!p) throw new Error('missing');
      document.title = p.title + ' — enVoy Blog';
      document.getElementById('postTitle').innerHTML = V(esc(p.title));
      document.getElementById('postMeta').innerHTML = fmt(p.date) + (p.tags && p.tags.length ? ' &middot; ' + esc(p.tags.join(', ')) : '');
      var mdesc = document.querySelector('meta[name="description"]'); if (mdesc && p.summary) mdesc.setAttribute('content', p.summary);
      return fetch('/blog/' + slug + '.md', { cache: 'no-cache' }).then(function(r){ if (!r.ok) throw new Error('missing'); return r.text(); }).then(function(t){
        body.innerHTML = (p.cover ? '<img class="post-cover" src="' + esc(p.cover) + '" alt="">' : '') + md(t);
      });
    }).catch(function(){ body.innerHTML = '<p class="blog-empty">Post not found.</p>'; });
  }
})();
