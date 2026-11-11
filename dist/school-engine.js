(function(root){
'use strict';
const scope=(p,group)=>JSON.stringify([p.type,Number(p.level),group]);
const personKey=(p,group,id)=>JSON.stringify([p.type,Number(p.level),group,String(id)]);
const normalized=g=>g.score/g.max*100;
const mean=xs=>xs.length?xs.reduce((s,x)=>s+x,0)/xs.length:null;
function rank(roster,grades,subject='all'){
const items=roster.map(person=>{const all=grades.filter(g=>g.studentKey===person.key);const gs=all.filter(g=>subject==='all'||g.subject===subject);const names=[...new Set(all.map(g=>g.subject))];const subjects=Object.fromEntries(names.map(s=>[s,mean(all.filter(g=>g.subject===s).map(normalized))]));const score=subject==='all'?mean(Object.values(subjects)):(subjects[subject]??null);return{...person,score:score===null?null:Math.round(score*100)/100,count:gs.length,subjects};});
items.sort((a,b)=>a.score===null?(b.score===null?a.student_id.localeCompare(b.student_id,'ru'):1):b.score===null?-1:b.score-a.score||a.student_id.localeCompare(b.student_id,'ru'));
let last=null,place=0;return items.map((r,i)=>{if(r.score===null)return{...r,rank:null};if(last===null||r.score!==last)place=i+1;last=r.score;return{...r,rank:place};});
}
function gradeErrors(g,roster){let es=[];if(!roster.some(p=>p.key===g.studentKey))es.push('Выберите обучающегося из текущей группы');if(!g.subject?.trim()||g.subject.length>80)es.push('Укажите предмет до 80 символов');if(!g.title?.trim()||g.title.length>160)es.push('Укажите работу до 160 символов');if(!Number.isFinite(g.score)||!Number.isFinite(g.max)||g.max<1||g.max>1000||g.score<0||g.score>g.max)es.push('Балл должен быть от 0 до максимума, максимум — от 1 до 1000');if(!validDate(g.date))es.push('Укажите корректную дату');return es;}
function validDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return false;const d=new Date(value+'T12:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===value;}
function minutes(time){if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time||''))return NaN;return Number(time.slice(0,2))*60+Number(time.slice(3));}
function lessonErrors(l,lessons){const es=[];if(!Number.isInteger(l.day)||l.day<1||l.day>7)es.push('Выберите день недели');if(!l.subject?.trim()||l.subject.length>80)es.push('Укажите предмет до 80 символов');const start=minutes(l.start),end=minutes(l.end);if(!Number.isFinite(start)||!Number.isFinite(end)||start>=end)es.push('Время окончания должно быть позже начала');if(lessons.some(x=>x.id!==l.id&&x.day===l.day&&start<minutes(x.end)&&end>minutes(x.start)))es.push('У вас уже есть занятие в это время. Измените время или день.');return es;}
function hourErrors(rows,budget){const es=[];if(!Number.isInteger(budget)||budget<1||budget>10000)es.push('Общий объём: целое число от 1 до 10 000');if(!rows.length)es.push('Добавьте хотя бы одну тему');const names=new Set();rows.forEach((r,i)=>{if(!r.name?.trim())es.push('Тема '+(i+1)+': укажите название');if(names.has(String(r.name||'').trim()))es.push('Названия тем не должны повторяться');names.add(String(r.name||'').trim());if(!Number.isInteger(r.hours)||r.hours<1||r.hours>1000)es.push('Тема '+(i+1)+': часы от 1 до 1000, целое число');});if(rows.reduce((s,r)=>s+r.hours,0)!==budget)es.push('Сумма часов должна совпадать с общим объёмом');return es;}
const api={scope,personKey,rank,gradeErrors,validDate,minutes,lessonErrors,hourErrors,mean,normalized};if(typeof module!=='undefined')module.exports=api;root.EduSchool=api;
})(typeof window!=='undefined'?window:globalThis);
