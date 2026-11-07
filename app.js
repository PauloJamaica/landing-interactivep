const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
const headlineWord=document.querySelector('#headline-word');
if(headlineWord&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const words=['Construyen','Viven','Hacen realidad'];let word=0,letter=words[0].length,deleting=true;
 function type(){const value=words[word];letter+=deleting?-1:1;headlineWord.textContent=value.slice(0,letter);let delay=deleting?55:100;if(letter===0){deleting=false;word=(word+1)%words.length;delay=300;}else if(!deleting&&letter===value.length){deleting=true;delay=1900;}setTimeout(type,delay);}setTimeout(type,1900);
}
$('#year').textContent=new Date().getFullYear();
$('.menu-toggle').addEventListener('click',e=>{const open=$('.header nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open));});
$$('.header nav a').forEach(a=>a.addEventListener('click',()=>{$('.header nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');}));
const services={events:{title:'Del concepto al aplauso final.',description:["Todo comienza con una idea, desde ahí déjanos encargarnos a nosotros. Partimos con el ",{"strong":"diseño"}," y la ",{"strong":"conceptualización"},", luego seguimos con la planificación del evento y por último, la ejecución donde cuidamos cada detalle para que tu evento salga tal como lo planeaste. Contamos con un equipo especializado en la producción y montaje que se encarga de la construcción y diseño de Stands, congresos, eventos, lanzamientos y demás, así como la implementación de tecnología e interactividad."],image:'eventos-pepsi.jpeg',alt:'Producción integral de un evento Pepsi',label:'ESPACIOS QUE CONECTAN',tags:['Concepto y diseño','Stands','Interactividad','Producción y montaje']},digital:{title:'Historias que llevan a tu marca a otro nivel.',description:'En marketing digital, ayudamos a las marcas a conectar con su audiencia de forma real y efectiva. Creamos contenido y campañas pensadas para generar visibilidad, interacción y resultados, fortaleciendo tu presencia en cada canal.',image:'marketing-digital.png',alt:'Producción de contenido audiovisual para marketing digital',label:'CONTENIDO QUE SE VIVE',tags:['Contenido audiovisual','Diseño gráfico','Community management','Contenido web']},stands:{title:'El espacio para conectar con tu audiencia.',description:'Nuestro equipo especializado se encarga de crear espacios funcionales, atractivos y alineados con la identidad de cada proyecto, integrando tecnología, interactividad y acabados de alto nivel para generar experiencias memorables que conectan con el público y potencian la presencia de marca.',image:'stands-essilor.png',alt:'Stand de EssilorLuxottica',label:'DISEÑO + PRODUCCIÓN + MONTAJE',tags:['Diseño de espacios','Stands','Interactividad','Montaje']} };
function selectService(button){const data=services[button.dataset.service];$$('[data-service]').forEach(b=>{const active=b===button;b.classList.toggle('selected',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});$('#service-panel').setAttribute('aria-labelledby',button.id);$('#service-title').textContent=data.title;const description=Array.isArray(data.description)?data.description:[data.description];$('#service-description').replaceChildren(...description.map(part=>{if(typeof part==='string')return part;const strong=document.createElement('strong');strong.textContent=part.strong;return strong;}));$('#service-image').src=`assets/${data.image}`;$('#service-image').alt=data.alt;$('#service-image-label').textContent=data.label;$('#service-tags').replaceChildren(...data.tags.map(t=>{const span=document.createElement('span');span.textContent=t;return span;}));}
$$('[data-service]').forEach((b,i,all)=>{b.addEventListener('click',()=>selectService(b));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(i+1)%all.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(i+all.length-1)%all.length;if(e.key==='Home')n=0;if(e.key==='End')n=all.length-1;if(n!==undefined){e.preventDefault();all[n].focus();selectService(all[n]);}});});
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{$$('[data-filter]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});$$('.project').forEach(p=>p.hidden=b.dataset.filter!=='all'&&p.dataset.category!==b.dataset.filter);$('.project-grid').classList.toggle('filtered',b.dataset.filter!=='all');}));
const projectData={essilor:{title:'EssilorLuxottica',category:'STANDS / DISEÑO DE ESPACIOS',image:'stand',description:'Un espacio de marca presentado en nuestro portafolio corporativo. Diseño, presencia visual y tecnología reunidos en una experiencia de exhibición.'},zebra:{title:'Zebra',category:'STANDS / EXPERIENCIA DE MARCA',image:'zebra',description:'Identidad y presencia de marca en un espacio de exhibición. Una imagen de la selección de proyectos incluida en nuestro portafolio.'},interactive:{title:'Salir de lo cotidiano',category:'INTERACTIVIDAD / EXPERIENCIAS',image:'experience',description:'Simuladores y escenografía para involucrar a las personas en una experiencia participativa. Una muestra visual de nuestra línea de interactividad.'},stage:{title:'Todo listo para conectar',category:'EVENTOS / PRODUCCIÓN AUDIOVISUAL',image:'stage',description:'Un escenario que reúne espacio, identidad y contenido audiovisual. Una muestra de producción integral incluida en nuestra presentación corporativa.'}};
let previousFocus;
function openDialog(dialog){previousFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');}
function closeDialog(dialog){dialog.close();}
$$('dialog').forEach(d=>{d.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});$('.dialog-close',d).addEventListener('click',()=>closeDialog(d));d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d);});});
$$('[data-project]').forEach(b=>b.addEventListener('click',()=>{const data=projectData[b.dataset.project];$('#detail-image').src=`assets/${data.image}.webp`;$('#detail-image').alt=data.title;$('#detail-title').textContent=data.title;$('#detail-category').textContent=data.category;$('#detail-description').textContent=data.description;openDialog($('#project-dialog'));}));

$('#similar-project')?.addEventListener('click',()=>{
 const dialog=$('#project-dialog'),contact=$('#contacto');
 if(!dialog.open||!contact)return;
 // Let normal dismissal restore focus; the contact action moves focus instead.
 previousFocus=undefined;
 dialog.addEventListener('close',()=>{
  if(location.hash!=='#contacto')location.hash='#contacto';
  contact.focus({preventScroll:true});
  contact.scrollIntoView({block:'start'});
 },{once:true});
 dialog.close();
});
// Self-hosted, MIT-licensed Three.js. No paid services or API calls.
async function initScene(){
 const THREE=await import('./assets/three.module.js');
 const holder=$('#scene');const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(9,7.5,11);camera.lookAt(0,1,0);
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setClearColor(0x080c0d,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.4;holder.appendChild(renderer.domElement);
 scene.add(new THREE.AmbientLight(0xd4edff,2));const key=new THREE.DirectionalLight(0xe0f5ff,5);key.position.set(4,8,5);scene.add(key);const fill=new THREE.DirectionalLight(0x00BDF1,3);fill.position.set(-5,3,-3);scene.add(fill);const point=new THREE.PointLight(0x00BDF1,30,18);point.position.set(0,4,1);scene.add(point);
 const world=new THREE.Group();scene.add(world);world.rotation.y=-.15;
 const dark=new THREE.MeshStandardMaterial({color:0x15202c,roughness:.3,metalness:.65});
 const black=new THREE.MeshStandardMaterial({color:0x080c12,roughness:.3,metalness:.6});
 const metal=new THREE.MeshStandardMaterial({color:0x778a98,roughness:.35,metalness:.8});
 const pale=new THREE.MeshStandardMaterial({color:0xd8eaf5,roughness:.25,metalness:.3});
 const emissive=new THREE.MeshStandardMaterial({color:0x00BDF1,emissive:0x00BDF1,emissiveIntensity:1.3,roughness:.2,metalness:.2});
 const pieces=[];const pulseObjects=[];
 function box(w,h,d,mat,x=0,y=0,z=0,parent=world){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
 function cylinder(r1,r2,h,mat,x,y,z,parent=world){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,48),mat);m.position.set(x,y,z);parent.add(m);return m;}
 function edge(mesh,color=0x00BDF1){const line=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),new THREE.LineBasicMaterial({color,transparent:true,opacity:.32}));mesh.add(line);}
 function piece(mesh,dx,dy,dz){pieces.push({mesh,home:mesh.position.clone(),offset:new THREE.Vector3(dx,dy,dz)});return mesh;}
 const platform=box(6.8,.28,4.8,dark,0,-.1,0);edge(platform);box(6.85,.04,4.85,emissive,0,-.25,0);box(7.15,.1,5.15,black,0,-.36,0);
 // Entrance steps and floor inlays.
 box(3.1,.13,.5,dark,0,-.32,2.65);box(3.3,.045,.06,emissive,0,-.25,2.89);
 for(const x of [-2.65,2.65]) box(.025,.018,4.2,emissive,x,.06,0);
 for(const z of [-1.6,1.6])box(5.3,.018,.025,emissive,0,.06,z);
 // Back wall, LED screen and opening portal.
 piece(box(6,.15,.22,metal,0,3.4,-1.8),0,1.7,-.4);
 const wall=piece(box(4.2,2.55,.2,black,-.4,1.55,-1.85),0,.6,-1);edge(wall);
 const texCanvas=document.createElement('canvas');texCanvas.width=1024;texCanvas.height=640;const ctx=texCanvas.getContext('2d');
 function screenTexture(color){ctx.fillStyle='#080c12';ctx.fillRect(0,0,1024,640);const grad=ctx.createLinearGradient(0,0,1024,640);grad.addColorStop(0,color);grad.addColorStop(1,'#144e55');ctx.strokeStyle=grad;ctx.lineWidth=2;for(let i=-5;i<18;i++){ctx.beginPath();ctx.moveTo(i*90,0);ctx.lineTo(i*90+640,640);ctx.stroke();}ctx.fillStyle=color;ctx.font='500 22px Arial';ctx.fillText('INTERACTIVE PRODUCTIONS',65,80);ctx.fillStyle='#e6fff3';ctx.font='bold 108px Arial';ctx.fillText('Las ideas',65,280);ctx.fillText('se viven.',65,397);ctx.fillStyle=color;ctx.fillRect(65,450,210,6);ctx.font='19px Arial';ctx.fillText('BUILDING YOUR NEXT EXPERIENCE',65,550);}
 screenTexture('#00BDF1');const texture=new THREE.CanvasTexture(texCanvas);texture.colorSpace=THREE.SRGBColorSpace;const screenMaterial=new THREE.MeshBasicMaterial({map:texture});const screen=new THREE.Mesh(new THREE.PlaneGeometry(3.9,2.38),screenMaterial);screen.position.set(-.4,1.55,-1.738);world.add(screen);piece(screen,0,.6,-1);
 const portal=new THREE.Group();world.add(portal);portal.position.set(2.55,0,-.25);box(.18,3.4,.23,metal,-.52,1.75,0,portal);box(.18,3.4,.23,metal,.52,1.75,0,portal);box(1.22,.18,.23,metal,0,3.4,0,portal);box(.045,3.25,.025,emissive,-.4,1.72,.13,portal);box(.045,3.25,.025,emissive,.4,1.72,.13,portal);box(.85,.045,.025,emissive,0,3.31,.13,portal);piece(portal,1.3,.3,0);
 // Suspended halo, rigging and light fixtures.
 const rig=new THREE.Group();world.add(rig);rig.position.set(-.15,3.9,-.25);const ring=new THREE.Mesh(new THREE.TorusGeometry(2.35,.14,12,90),dark);ring.rotation.x=Math.PI/2;rig.add(ring);const ringLight=new THREE.Mesh(new THREE.TorusGeometry(2.34,.028,8,90),emissive);ringLight.rotation.x=Math.PI/2;ringLight.position.y=-.12;rig.add(ringLight);piece(rig,0,1.4,0);
 for(let i=0;i<6;i++){const a=i*Math.PI/3;const x=Math.cos(a)*2.35,z=Math.sin(a)*2.35;const light=cylinder(.10,.13,.20,black,x,-.20,z,rig);cylinder(.075,.075,.012,emissive,x,-.31,z,rig);pulseObjects.push(light);}
 // Reception and a luminous interactive kiosk.
 const desk=new THREE.Group();world.add(desk);desk.position.set(-1.7,0,1.25);box(1.6,.86,.72,black,0,.48,0,desk);box(1.7,.07,.81,pale,0,.94,0,desk);box(1.62,.035,.025,emissive,0,.15,.37,desk);piece(desk,-1.3,.3,1);
 const logoCanvas=document.createElement('canvas');logoCanvas.width=512;logoCanvas.height=256;const lc=logoCanvas.getContext('2d');lc.fillStyle='#080c12';lc.fillRect(0,0,512,256);lc.fillStyle='#00BDF1';lc.font='bold 155px Arial';lc.fillText('ip',70,180);lc.fillStyle='#d8f9ec';lc.font='20px Arial';lc.fillText('interactive',250,140);lc.fillText('productions',250,170);const lt=new THREE.CanvasTexture(logoCanvas);lt.colorSpace=THREE.SRGBColorSpace;const logo=new THREE.Mesh(new THREE.PlaneGeometry(1.35,.65),new THREE.MeshBasicMaterial({map:lt}));logo.position.set(0,.55,.366);desk.add(logo);
 const kiosk=new THREE.Group();world.add(kiosk);kiosk.position.set(1.1,0,.6);cylinder(.48,.62,.11,dark,0,.12,0,kiosk);box(.18,.9,.22,metal,0,.6,0,kiosk);const display=box(.75,.1,.56,black,0,1.1,0,kiosk);display.rotation.x=.27;const displayGlow=box(.65,.018,.45,emissive,0,1.16,.01,kiosk);displayGlow.rotation.x=.27;piece(kiosk,1.1,.7,.8);
 // Sculptural product podium and backdrop light bars.
 cylinder(.45,.45,.65,pale,.6,.4,-.95);const sculpture=new THREE.Mesh(new THREE.TorusKnotGeometry(.22,.055,72,12),emissive);sculpture.position.set(.6,1,-.95);world.add(sculpture);
 for(let i=0;i<3;i++){const post=piece(box(.04,2+i*.25,.04,emissive,-2.8+i*.18,1.1+i*.12,-1.6),-.4,.3,-.3);}
 // A subtle technical grid beneath the model, transparent outside the stage.
 const grid=new THREE.GridHelper(14,28,0x2c5647,0x173329);grid.position.y=-.47;grid.material.transparent=true;grid.material.opacity=.24;scene.add(grid);
 const contactShadow=new THREE.Mesh(new THREE.CircleGeometry(5.3,64),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.2,depthWrite:false}));contactShadow.rotation.x=-Math.PI/2;contactShadow.position.y=-.46;scene.add(contactShadow);
 let exploded=false,paused=reduced,visible=true,drag=false,lastX=0,lastY=0,yaw=-.15,pitch=0,view='experience';let accent=0;const accents=[0x00BDF1,0x65b8ff,0xec9fff];const cameraTarget=new THREE.Vector3(9,7.5,11);const lookTarget=new THREE.Vector3(0,1.35,0);let last=performance.now(),t=0,scroll=0;
 const canvas=renderer.domElement;let moved=false;let startY=0;
 canvas.addEventListener('pointerdown',e=>{drag=true;moved=false;lastX=e.clientX;lastY=e.clientY;startY=e.clientY;canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;if(Math.abs(dx)>1)moved=true;yaw+=dx*.008;if(e.pointerType!=='touch')pitch=THREE.MathUtils.clamp(pitch+dy*.002,-.2,.2);lastX=e.clientX;lastY=e.clientY;});
 canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointercancel',()=>drag=false);
 $$('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;$$('[data-view]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});yaw=view==='stand'?0:-.15;pitch=0;if(view==='stand')cameraTarget.set(0,4.8,14.4);else if(view==='top')cameraTarget.set(.2,15,.5);else cameraTarget.set(9,7.5,11);$('#view-name').textContent=({experience:'01 / EXPERIENCIA',stand:'02 / STAND',top:'03 / DESDE ARRIBA'})[view];}));
 $('#pause').setAttribute('aria-pressed',String(paused));$('#pause').textContent=paused?'▶':'Ⅱ';$('#pause').setAttribute('aria-label',paused?'Reanudar movimiento':'Pausar movimiento');
 $('#pause').addEventListener('click',e=>{paused=!paused;e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.textContent=paused?'▶':'Ⅱ';e.currentTarget.setAttribute('aria-label',paused?'Reanudar movimiento':'Pausar movimiento');});
 new IntersectionObserver(entries=>visible=entries[0].isIntersecting,{rootMargin:'60px'}).observe(holder);
 function resize(){const w=holder.clientWidth,h=holder.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();if(w<500)camera.zoom=.89;else camera.zoom=1;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(holder);resize();
 addEventListener('scroll',()=>{scroll=window.scrollY;},{passive:true});
 holder.classList.add('scene-ready');
 function render(now){requestAnimationFrame(render);const dt=Math.min((now-last)/1000,.05);last=now;if(!visible||document.hidden)return;if(!paused)t+=dt;const smooth=reduced?1:1-Math.exp(-dt*6);world.rotation.y=THREE.MathUtils.lerp(world.rotation.y,yaw+(paused||drag?0:Math.sin(t*.25)*.09),smooth);world.rotation.x=THREE.MathUtils.lerp(world.rotation.x,pitch,smooth);camera.position.lerp(cameraTarget,smooth);camera.lookAt(lookTarget);if(!reduced){world.position.y=Math.sin(t*.8)*.035-Math.min(scroll,400)*.00022;sculpture.rotation.y=t*.65;sculpture.rotation.x=t*.3;}pieces.forEach(({mesh,home,offset})=>{const target=home.clone().addScaledVector(offset,exploded?1:0);mesh.position.lerp(target,smooth);});renderer.render(scene,camera);}
 requestAnimationFrame(render);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();holder.classList.remove('scene-ready');$('.scene-caption span:last-child').textContent='VISTA ESTÁTICA';});
}
function initCSSScene(){
 const holder=$('#scene');const stage=document.createElement('div');stage.className='css-stage';const world=document.createElement('div');world.className='css-world';stage.append(world);const floor=document.createElement('div');floor.className='css-floor-shadow';world.append(floor);
 function cube(w,d,h,x,y,z,kind=''){const el=document.createElement('div');el.className='css-cube '+kind;Object.assign(el.style,{width:w+'px',height:d+'px',left:x+'px',top:y+'px',transform:`translateZ(${z}px)`});const top=document.createElement('span');top.className='css-face top';Object.assign(top.style,{width:w+'px',height:d+'px',transform:`translateZ(${h}px)`});const front=document.createElement('span');front.className='css-face front';Object.assign(front.style,{width:w+'px',height:h+'px',top:d+'px',transformOrigin:'0 0',transform:`rotateX(-90deg) translateY(-${h}px)`});const side=document.createElement('span');side.className='css-face side';Object.assign(side.style,{width:d+'px',height:h+'px',transformOrigin:'0 0',transform:`rotateZ(90deg) rotateX(-90deg) translateY(-${h}px)`});el.append(top,front,side);world.append(el);return {el,front};}
 cube(360,260,12,0,0,0,'platform');const screen=cube(230,9,150,25,20,12,'screen');screen.front.innerHTML='<span class="css-screen-small">INTERACTIVE PRODUCTIONS</span><span class="css-screen-heading">Las ideas<br>se viven.</span><span class="css-screen-foot">BUILDING YOUR NEXT EXPERIENCE</span>';
 const desk=cube(100,47,49,28,183,12,'desk');desk.front.textContent='ip';cube(16,15,65,242,164,12);cube(52,38,5,224,153,77,'kiosk');cube(5,8,175,310,43,12,'post');cube(5,8,175,350,43,12,'post');cube(45,8,5,310,43,187,'post');const halo=document.createElement('div');halo.className='css-halo';world.append(halo);holder.append(stage);holder.classList.add('scene-ready');
 let yaw=-29,view='experience',paused=matchMedia('(prefers-reduced-motion: reduce)').matches,drag=false,lastX=0;const mobile=()=>innerWidth<=760;const names={experience:'01 / EXPERIENCIA',stand:'02 / STAND',top:'03 / DESDE ARRIBA'};const update=()=>{world.classList.toggle('auto',!paused&&view==='experience'&&!drag);const angle=view==='top'?6:view==='stand'?74:58;world.style.transform=`translate(-50%,${mobile()?'-20%':'-22%'}) rotateX(${angle}deg) rotateZ(${yaw}deg) scale(${mobile()?.65:.97})`;};
 $$('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;yaw=view==='stand'?0:view==='top'?-10:-29;$$('[data-view]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});$('#view-name').textContent=names[view];update();}));
 const pause=$('#pause');const syncPause=()=>{pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Reanudar movimiento':'Pausar movimiento');update();};pause.addEventListener('click',()=>{paused=!paused;syncPause();});stage.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;stage.setPointerCapture(e.pointerId);world.style.transition='none';update();});stage.addEventListener('pointermove',e=>{if(!drag)return;yaw+=(e.clientX-lastX)*.5;lastX=e.clientX;update();});function endDrag(){if(!drag)return;drag=false;paused=true;world.style.transition='';syncPause();}stage.addEventListener('pointerup',endDrag);stage.addEventListener('pointercancel',endDrag);addEventListener('resize',update);syncPause();
}
if($('#scene')) initScene().catch(error=>{console.info('Using hardware-independent CSS 3D.',error.message);initCSSScene();});

const motionReduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const counters=$$('[data-count]');
const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.count);countObserver.unobserve(el);if(motionReduced){el.textContent=target;return;}const start=performance.now();function tick(now){const t=Math.min((now-start)/1100,1);el.textContent=Math.round(target*(1-Math.pow(1-t,3)));if(t<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);}),{threshold:.5});counters.forEach(el=>{el.textContent=motionReduced?el.dataset.count:'0';countObserver.observe(el);});
$('#pause-logos')?.addEventListener('click',e=>{const paused=$('.logo-track').classList.toggle('paused');e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.setAttribute('aria-label',paused?'Reanudar carrusel':'Pausar carrusel');e.currentTarget.textContent=paused?'▶':'Ⅱ';});

// Repeated carousel items remain interactive while excluded from the tab order.
$$('.logo-group[aria-hidden] a').forEach(link=>link.tabIndex=-1);
