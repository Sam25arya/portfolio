const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

document.addEventListener("DOMContentLoaded",()=>{
  $("#year").textContent=new Date().getFullYear();

  const nav=$("#desktopNav"), menu=$("#menuBtn");
  menu.addEventListener("click",()=>nav.classList.toggle("open"));
  $$("#desktopNav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const sections=$$("main section[id]");
  const navLinks=$$("#desktopNav a");
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
      }
    });
  },{rootMargin:"-40% 0px -50% 0px"});
  sections.forEach(s=>observer.observe(s));

  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObserver.unobserve(e.target)}});
  },{threshold:.12});
  $$(".reveal").forEach(el=>revealObserver.observe(el));

  $$(".filter").forEach(btn=>btn.addEventListener("click",()=>{
    $$(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    const type=btn.dataset.filter;
    $$(".project-card").forEach(card=>card.hidden=type!=="all"&&card.dataset.type!==type);
  }));

  $("#themeBtn").addEventListener("click",()=>{
    document.body.classList.toggle("light");
    $("#themeBtn").textContent=document.body.classList.contains("light")?"☀":"☾";
  });

  const toast=msg=>{
    const t=$("#toast");t.textContent=msg;t.classList.add("show");
    clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2200);
  };
  

  const answers=[
    ["skills","Arya's current focus includes frontend development, basic backend work, AI exploration and robotics."],
    ["projects","The portfolio showcases web, AI and robotics projects. More project details can be added as they are completed."],
    ["contact","You can contact Arya through the email, LinkedIn or GitHub links in the Contact section."]
  ];
  const chat=$("#chatMessages"), input=$("#chatInput");
  function addMsg(text,cls){const d=document.createElement("div");d.className=cls;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
  function answer(q){
    const s=q.toLowerCase();
    let a=answers.find(x=>s.includes(x[0]))?.[1];
    if(!a){
      if(s.includes("skill")) a=answers[0][1];
      else if(s.includes("project")) a=answers[1][1];
      else if(s.includes("contact")||s.includes("email")||s.includes("linkedin")||s.includes("github")) a=answers[2][1];
      else a="I'm the portfolio demo assistant. Ask about Arya's skills, projects or contact details.";
    }
    setTimeout(()=>addMsg(a,"bot-msg"),350);
  }
  $("#chatForm").addEventListener("submit",e=>{
    e.preventDefault();const q=input.value.trim();if(!q)return;
    addMsg(q,"user-msg");input.value="";answer(q);
  });
  $$(".suggestions button").forEach(b=>b.addEventListener("click",()=>{input.value=b.textContent;$("#chatForm").requestSubmit()}));
});

const educationBtn = document.getElementById("educationBtn");
const educationDetails = document.getElementById("educationDetails");

educationBtn?.addEventListener("click", () => {
  educationDetails.classList.toggle("show");

  if (educationDetails.classList.contains("show")) {
    educationBtn.textContent = "View Less ↑";
  } else {
    educationBtn.textContent = "View More →";
  }
});
