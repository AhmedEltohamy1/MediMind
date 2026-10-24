var meds=[],log={};
function today(o){var d=new Date();d.setDate(d.getDate()-(o||0));return d.toISOString().slice(0,10)}
function load(){try{meds=JSON.parse(localStorage.getItem('mm_m')||'[]');log=JSON.parse(localStorage.getItem('mm_l')||'{}')}catch(e){meds=[];log={}}}
function save(){try{localStorage.setItem('mm_m',JSON.stringify(meds));localStorage.setItem('mm_l',JSON.stringify(log))}catch(e){}}
function add(){var n=v('n'),d=v('d'),hh=(+v('th'))%12+(v('ta')==='PM'?12:0),t=(hh<10?'0':'')+hh+':'+v('tm');if(!n)return;meds.push({id:Date.now()+''+meds.length,name:n,dose:d,time:t||'08:00'});meds.sort(function(a,b){return a.time<b.time?-1:1});save();render();document.getElementById('n').value=''}
function v(i){return document.getElementById(i).value.trim()}
function mark(id){var k=today();log[k]=log[k]||{};log[k][id]='taken';save();render()}
function reset(){meds=[];log={};save();render()}
function demo(){meds=[{id:'a1',name:'Metformin',dose:'500 mg',time:'08:00'},{id:'a2',name:'Vitamin D',dose:'1000 IU',time:'13:00'},{id:'a3',name:'Atorvastatin',dose:'20 mg',time:'21:00'}];log={};
 for(var i=1;i<=7;i++){log[today(i)]={};meds.forEach(function(m){var miss=(m.id==='a3'&&i%2===0)||(m.id==='a1'&&i===3);if(!miss)log[today(i)][m.id]='taken'})}save();render()}
function stats(){var tot=0,tk=0,by={};for(var i=1;i<=7;i++){var l=log[today(i)];if(!l)continue;meds.forEach(function(m){tot++;var ok=l[m.id]==='taken';if(ok)tk++;else by[m.name]=(by[m.name]||0)+1})}return{tot:tot,tk:tk,by:by}}
function render(){var k=today(),l=log[k]||{},h='';
 if(!meds.length)h='<small>No medications yet. Add one or load demo data.</small>';
 meds.forEach(function(m){var done=l[m.id]==='taken',late=!done&&new Date().toTimeString().slice(0,5)>m.time;
  h+='<div class="med"><div><b>'+esc(m.name)+'</b> <small>'+esc(m.dose)+' · '+m.time+'</small></div><div>'+(done?'<span class="tag t">Taken ✓</span>':(late?'<span class="tag m">Overdue</span> ':'')+'<button onclick="mark(\''+m.id+'\')">Mark taken</button>')+'</div></div>'});
 document.getElementById('list').innerHTML=h;
 var s=stats(),p=s.tot?Math.round(100*s.tk/s.tot):null;document.getElementById('pct').textContent=p===null?'–':p+'%';
 var b='';for(var i=6;i>=0;i--){var d=log[today(i)],c=0;if(d)meds.forEach(function(m){if(d[m.id]==='taken')c++});var w=meds.length?Math.round(100*c/meds.length):0;
  b+='<div style="display:flex;align-items:center;gap:8px;font-size:12px;margin:3px 0"><span style="width:70px;color:var(--mut)">'+today(i).slice(5)+'</span><div style="flex:1;background:var(--bg);border-radius:6px;height:10px"><div style="width:'+w+'%;height:10px;border-radius:6px;background:var(--ok)"></div></div><span>'+w+'%</span></div>'}
 document.getElementById('bars').innerHTML=b;
 var I=[];if(p!==null){if(p>=90)I.push('Excellent adherence! Keep up the routine.');else if(p>=70)I.push('Good progress, but some doses were missed. Try linking doses to daily habits.');else I.push('Adherence is low. Consider asking your doctor about simplifying your schedule.');
  var w2=Object.keys(s.by).sort(function(a,b){return s.by[b]-s.by[a]})[0];if(w2)I.push('Most missed: '+w2+' ('+s.by[w2]+' times this week). Suggest moving its reminder to a time you are more consistent.')}
 else I.push('Add medications and track doses to receive personalized insights.');
 document.getElementById('ins').innerHTML=I.map(function(x){return'<div class="ins">'+esc(x)+'</div>'}).join('')}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var KB=[[/miss|forgot|forget/,'If you missed a dose, take it as soon as you remember—unless it is almost time for the next one. Never double the dose. Check the leaflet or ask your pharmacist.'],
[/side effect|nausea|dizzy|rash/,'Mild side effects (nausea, dizziness) are common with some medicines. If symptoms are severe, persistent, or include rash or breathing difficulty, contact your doctor immediately.'],
[/food|meal|empty stomach|eat/,'Some medicines (e.g., metformin) are best taken with food to reduce stomach upset; others work better on an empty stomach. Check your leaflet or ask your pharmacist.'],
[/alcohol|drink/,'Alcohol can interact with many medicines. It is safest to ask your doctor or pharmacist about your specific medication.'],
[/reminder|remind|time|schedule/,'Tip: attach each dose to a daily habit (breakfast, brushing teeth). MediMind shows overdue alerts when a scheduled time passes.'],
[/water|hydrat/,'Staying hydrated supports most treatments. Unless your doctor limits fluids, take tablets with a full glass of water.'],
[/sleep|stress|diet|exercise/,'Regular sleep, balanced meals, and light daily exercise improve treatment results. Discuss any plan with your doctor.'],
[/emergency|chest pain|breath|faint/,'⚠ These can be emergency signs. Please call your local emergency number or go to the nearest hospital now.'],
[/hello|hi|hey/,'Hello! I am MediMind. Ask me about missed doses, side effects, food timing, or reminders.']];
function say(t,c){var e=document.getElementById('chat'),d=document.createElement('div');d.className=c;d.textContent=t;e.appendChild(d);e.scrollTop=e.scrollHeight}
var DRUGS={
metformin:{use:'type 2 diabetes (it lowers blood sugar)',how:'usually with or right after a meal to reduce stomach upset',se:'nausea, diarrhea, stomach pain, metallic taste. Seek urgent help for severe weakness, fast breathing or muscle pain',warn:'tell your doctor about kidney problems, and before scans with contrast dye or surgery'},
paracetamol:{use:'pain and fever',how:'with or without food, with water',se:'rare at normal use; an overdose can seriously damage the liver',warn:'never exceed the maximum daily amount on the label, and check other products for hidden paracetamol'},
ibuprofen:{use:'pain, fever and inflammation',how:'with food or milk to protect the stomach',se:'stomach pain, heartburn, dizziness',warn:'avoid if you have stomach ulcers, kidney disease or are on blood thinners without asking your doctor'},
aspirin:{use:'pain and fever, and low-dose for heart protection when prescribed',how:'with food',se:'stomach irritation and increased bleeding',warn:'not for children with fever, and ask your doctor before combining with blood thinners'},
atorvastatin:{use:'lowering cholesterol and heart-disease risk',how:'once daily, usually in the evening, with or without food',se:'muscle aches, headache, mild stomach upset',warn:'avoid large amounts of grapefruit juice, and report unexplained muscle pain or weakness'},
'vitamin d':{use:'bone health and vitamin D deficiency',how:'with a meal that contains some fat for better absorption',se:'usually none at normal doses; too much can raise blood calcium',warn:'do not take high doses for long without a blood test'},
amoxicillin:{use:'bacterial infections',how:'with or without food; finish the full course',se:'diarrhea, nausea, rash',warn:'stop and seek help if you get swelling, severe rash or trouble breathing (possible allergy)'},
omeprazole:{use:'acid reflux and stomach ulcers',how:'usually 30 to 60 minutes before breakfast',se:'headache, diarrhea, stomach pain',warn:'long-term use should be reviewed by your doctor'},
amlodipine:{use:'high blood pressure and chest pain (angina)',how:'once daily, with or without food',se:'ankle swelling, flushing, headache, dizziness',warn:'stand up slowly if you feel dizzy'}};
var ALIAS={panadol:'paracetamol',acetaminophen:'paracetamol',tylenol:'paracetamol',brufen:'ibuprofen',advil:'ibuprofen',glucophage:'metformin',lipitor:'atorvastatin',norvasc:'amlodipine',augmentin:'amoxicillin',vitamind:'vitamin d'};
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function findDrug(l){var k;for(k in ALIAS)if(l.indexOf(k)>-1)return ALIAS[k];for(k in DRUGS)if(l.indexOf(k)>-1)return k;return null}
function myMed(l,d){var r=null;meds.forEach(function(m){var n=m.name.toLowerCase();if(!r&&((d&&n.indexOf(d)>-1)||l.indexOf(n)>-1))r=m});return r}
function todayList(){var l=log[today()]||{};return meds.map(function(m){return m.name+' '+m.dose+' at '+m.time+' ('+(l[m.id]==='taken'?'taken':'not taken yet')+')'}).join('; ')}
function reply(q){var l=q.toLowerCase(),d=findDrug(l),m=myMed(l,d),D=d?DRUGS[d]:null,nm=d||(m&&m.name)||'this medicine',lg=log[today()]||{},i;
 if(/emergency|chest pain|can't breathe|cannot breathe|faint|unconscious|overdose/.test(l))return KB[7][1];
 if(/\b(hello|hi|hey|thanks|thank you)\b/.test(l))return KB[8][1];
 if(/my meds|my medic|schedule|next dose|what.*(take|due).*today|today.*(list|meds)/.test(l)&&!(d&&/can i/.test(l)))return meds.length?'Today: '+todayList()+'.':'You have no medications yet. Add one using the form above.';
 if(/adherence|progress|report|how am i doing/.test(l)){var s=stats();return s.tot?'Your 7-day adherence is '+Math.round(100*s.tk/s.tot)+'%. See the Smart insights panel for tips.':'No history yet. Track some doses first, or press Load demo data.'}
 if(m&&/(can i|should i|did i|already|today|now|take it)/.test(l)&&!/side effect|food|meal|dose|dosage|how much/.test(l)){
  if(lg[m.id]==='taken')return 'You already marked '+m.name+' as taken today. Do not take another dose unless your doctor told you to.';
  return m.name+' ('+m.dose+') is scheduled today at '+m.time+' and is not marked taken yet. If it is time, take it as prescribed, then tap Mark taken.'}
 if(d&&/(can i|should i|did i|already|today|now)/.test(l)&&!m&&!/side effect|food|meal|dose|dosage|how much/.test(l))return cap(nm)+' is not in your schedule. Add it above so I can track it. Take it only as prescribed by your doctor or as written on the label.';
 if(/dose|dosage|how much|how many|mg\b|tablet/.test(l)&&(d||m)){
  if(m)return 'Your saved schedule says '+m.name+' '+m.dose+' at '+m.time+'. Always follow your doctor\'s prescription and the label.';
  return 'The dose of '+nm+' depends on your age, condition and prescription, so I cannot set it for you. Follow your doctor or the label, and save the prescribed dose in your schedule.'}
 if(D){
  if(/side effect|nausea|dizzy|rash|reaction/.test(l))return 'Common side effects of '+cap(nm)+': '+D.se+'.';
  if(/food|meal|eat|empty stomach|when to take|how to take|how do i take/.test(l))return 'Timing for '+cap(nm)+': '+D.how+'.';
  if(/what is|what\'s|used for|use of|why|for what|purpose/.test(l))return cap(nm)+' is used for '+D.use+'.';
  if(/warn|careful|safe|avoid|caution|interact|alcohol/.test(l))return 'For '+cap(nm)+': '+D.warn+'.';
  return cap(nm)+' is used for '+D.use+'. Timing: '+D.how+'. Common side effects: '+D.se+'. Ask me about its dose, food timing, or warnings.'}
 for(i=0;i<KB.length;i++)if(KB[i][0].test(l))return KB[i][1];
 return "I'm not sure about that. Please ask your doctor or pharmacist. Try: 'Can I take Metformin today?', 'side effects of ibuprofen', 'what is my schedule', or 'I missed a dose'."}
function ask(){var q=v('q');if(!q)return;document.getElementById('q').value='';say(q,'u');var a=reply(q);setTimeout(function(){say(a,'b')},300)}
var notified={};
function tick(){var now=new Date().toTimeString().slice(0,5),l=log[today()]||{};
 meds.forEach(function(m){if(m.time===now&&l[m.id]!=='taken'&&!notified[m.id+now]){notified[m.id+now]=1;var a=document.getElementById('alert');a.style.display='block';a.textContent='⏰ Time to take '+m.name+' ('+m.dose+')';setTimeout(function(){a.style.display='none'},15000)}});render()}
(function(){var H=document.getElementById('th'),M=document.getElementById('tm'),i,o;for(i=1;i<=12;i++){o=document.createElement('option');o.textContent=String(i);H.appendChild(o)}for(i=0;i<60;i+=5){o=document.createElement('option');o.textContent=(i<10?'0':'')+i;M.appendChild(o)}H.value='8'})();
load();render();say('Hi! I am MediMind, your AI health assistant. How can I help?','b');setInterval(tick,30000);
