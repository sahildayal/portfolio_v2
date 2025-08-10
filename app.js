async function loadData(){
  const res = await fetch('./data.json');
  const data = await res.json();
  return data;
}

function el(tag, cls, html){
  const e=document.createElement(tag);
  if(cls) e.className = cls;
  if(html) e.innerHTML = html;
  return e;
}

function link(text, href, label){
  const a = document.createElement('a');
  a.href = href; 
  a.target = '_blank'; 
  a.rel='noopener';
  a.ariaLabel = label;
  a.textContent = text;
  return a;
}

function buildProfile(p){
  document.querySelector('#name').textContent = p.name;
  document.querySelector('#tagline').textContent = p.tagline;
  document.querySelector('#quote').textContent = p.quote;
  document.querySelector('#about').textContent = p.about;

  const socials = document.querySelector('#socials');
  socials.appendChild(link('GitHub', p.links.github, 'GitHub'));
  socials.appendChild(document.createTextNode(' • '));
  socials.appendChild(link('LinkedIn', p.links.linkedin, 'LinkedIn'));
  socials.appendChild(document.createTextNode(' • '));
  socials.appendChild(link('Twitter', p.links.twitter, 'Twitter'));
  if(p.links.resume && p.links.resume !== '#'){
    const btn = document.querySelector('#resume-link');
    btn.href = p.links.resume;
    btn.style.display = 'inline-block';
  }
}

function buildWork(work){
  const wrap = document.querySelector('#work');
  work.forEach(w => {
    const card = el('div','card');
    const head = el('div','');
    head.innerHTML = `<h3>${w.role} — ${w.company}</h3>
      <div class="muted small">${w.location} • ${w.start} – ${w.end}</div>`;
    card.appendChild(head);
    const ul = el('ul','list');
    w.bullets.forEach(b => ul.appendChild(el('li','', b)));
    card.appendChild(ul);
    if(w.tech?.length){
      const tags = el('div','small muted');
      tags.innerHTML = w.tech.map(t=>`<span class="tag">${t}</span>`).join('');
      card.appendChild(tags);
    }
    wrap.appendChild(card);
  });
}

function buildProjects(projects){
  const wrap = document.querySelector('#projects');
  projects.forEach(p => {
    const card = el('div','card');
    card.innerHTML = `<h3>${p.name}</h3>
      <div class="small muted">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <p class="small" style="margin-top:8px">${p.desc}</p>`;
    if(p.highlights?.length){
      const ul = el('ul','list small');
      p.highlights.forEach(h => ul.appendChild(el('li','', h)));
      card.appendChild(ul);
    }
    if(p.links){
      const row = el('div','small');
      if(p.links.code && p.links.code !== '#') {
        const a = el('a','', 'Code ↗');
        a.href = p.links.code;
        row.appendChild(a);
      }
      if(p.links.report && p.links.report !== '#'){
        row.appendChild(document.createTextNode(' • '));
        const r = el('a','', 'Report ↗');
        r.href = p.links.report;
        row.appendChild(r);
      }
      card.appendChild(row);
    }
    wrap.appendChild(card);
  });
}

function buildSkills(skills){
  const wrap = document.querySelector('#skills');
  const card = el('div','card');
  card.innerHTML = skills.map(s=>`<span class="tag">${s}</span>`).join('');
  wrap.appendChild(card);
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  buildProfile(data.profile);
  buildWork(data.work);
  buildProjects(data.projects);
  buildSkills(data.skills);
});
