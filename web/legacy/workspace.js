(function(root){
'use strict';
const types={school:{label:'Школа',max:11,unit:'класс'},college:{label:'Колледж',max:3,unit:'курс'},university:{label:'Университет',max:4,unit:'курс'}};
const subjects=['Математика','Алгебра','Геометрия','Информатика','Английский язык','Казахский язык','Русский язык','История','Физика','Химия','Биология','География','Программирование','Экономика'];
const defaults={type:'school',name:'',level:7,subject:'Математика'};
const extra=['institution_type','level','subject'];
function profile(value){const p={...defaults,...value};p.name=String(p.name||'').trim();p.subject=String(p.subject||'').trim();p.level=Number(p.level);return p;}
function checkProfile(p){const errors=[];if(!Object.hasOwn(types,p.type))errors.push('Выберите тип учреждения');else if(!Number.isInteger(p.level)||p.level<1||p.level>types[p.type].max)errors.push('Укажите '+types[p.type].unit+' от 1 до '+types[p.type].max);if(!p.subject||p.subject.length>80)errors.push('Название предмета должно содержать от 1 до 80 символов');if(p.name.length>120)errors.push('Название учреждения — не более 120 символов');return errors;}
function matches(r,p){return r.institution_type===p.type&&Number(r.level)===Number(p.level)&&r.subject===p.subject;}
function stamp(rows,p){return rows.map(r=>({...r,institution_type:r.institution_type||p.type,level:r.level===undefined||r.level===''?p.level:Number(r.level),subject:r.subject||p.subject}));}
function prepareImport(rows,p){const stamped=stamp(rows,p),errors=[];stamped.forEach((r,i)=>{const e=checkProfile(profile({type:r.institution_type,level:r.level,subject:r.subject}));if(e.length)errors.push('Строка '+(i+2)+': '+e.join('; '));else if(!matches(r,p))errors.push('Строка '+(i+2)+': учреждение, уровень или предмет не совпадают с выбранными. Измените настройки или файл.');});return{rows:stamped,errors};}
function merge(existing,incoming,p,mode){return mode==='append'?[...existing,...incoming]:[...existing.filter(r=>!matches(r,p)),...incoming];}
function caption(p){return types[p.type].label+' · '+p.level+' '+types[p.type].unit+' · '+p.subject;}
const api={types,subjects,defaults,extra,profile,checkProfile,matches,stamp,prepareImport,merge,caption};if(typeof module!=='undefined')module.exports=api;root.EduWorkspace=api;
})(typeof window!=='undefined'?window:globalThis);
