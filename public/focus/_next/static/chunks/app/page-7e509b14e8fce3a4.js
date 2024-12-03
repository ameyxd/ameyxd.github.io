(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[593],{7303:(e,a,r)=>{Promise.resolve().then(r.bind(r,5870))},5870:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>z});var s=r(9568),t=r(1948),l=r(6997),d=r(614);function i(){for(var e=arguments.length,a=Array(e),r=0;r<e;r++)a[r]=arguments[r];return(0,d.QP)((0,l.$)(a))}let n=t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,s.jsx)("div",{ref:a,className:i("rounded-lg border bg-card text-card-foreground shadow-sm",r),...t})});n.displayName="Card",t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,s.jsx)("div",{ref:a,className:i("flex flex-col space-y-1.5 p-6",r),...t})}).displayName="CardHeader",t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,s.jsx)("h3",{ref:a,className:i("text-2xl font-semibold leading-none tracking-tight",r),...t})}).displayName="CardTitle",t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,s.jsx)("p",{ref:a,className:i("text-sm text-muted-foreground",r),...t})}).displayName="CardDescription",t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,s.jsx)("div",{ref:a,className:i("p-6 pt-0",r),...t})}).displayName="CardContent",t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,s.jsx)("div",{ref:a,className:i("flex items-center p-6 pt-0",r),...t})}).displayName="CardFooter";var o=r(7921);let c=(0,r(477).F)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),g=t.forwardRef((e,a)=>{let{className:r,variant:t,size:l,asChild:d=!1,...n}=e,g=d?o.DX:"button";return(0,s.jsx)(g,{className:i(c({variant:t,size:l,className:r})),ref:a,...n})});g.displayName="Button";var u=r(6647),m=r(5775),h=r(9652),x=r(9460),f=r(8850),b=r(3957),v=r(9872),y=r(5790),p=r(8856),j=r(3451),N=r(966),w=r(4262),k=r(7005),C=r(1899),S=r(7129),A=r(2985);let E=t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,s.jsxs)(A.bL,{ref:a,className:i("relative flex w-full touch-none select-none items-center",r),...t,children:[(0,s.jsx)(A.CC,{className:"relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800",children:(0,s.jsx)(A.Q6,{className:"absolute h-full bg-gray-300 dark:bg-gray-600"})}),(0,s.jsx)(A.zi,{className:"block h-4 w-4 rounded-full border border-gray-200 border-gray-200/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:focus-visible:ring-gray-800"})]})});function V(e){let{playlistUrl:a}=e,[r,l]=(0,t.useState)(!1),[d,i]=(0,t.useState)(null),[o,c]=(0,t.useState)(null),[u,m]=(0,t.useState)(!1),[f,b]=(0,t.useState)(20);(0,t.useRef)(null);let[v,y]=(0,t.useState)(!1),p=(0,t.useRef)(null),[j,N]=(0,t.useState)(!1),[w,k]=(0,t.useState)(100),A="PL6dMWM5sYDapFWlmjH3rXn09igyLVsWNH",V=async()=>{if(!u||!o)return;let e=await o.getPlaylist();if(e&&e.length>0){let a=Math.floor(Math.random()*e.length);o.playVideoAt(a),l(!0)}},z=function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d;if(!a)return;let r=document.querySelector(".video-background");if(!r&&e){(r=document.createElement("div")).className="video-background",document.body.insertBefore(r,document.body.firstChild);let e=document.createElement("div");e.className="blur-layer",r.appendChild(e)}if(r){if(e){let e="https://img.youtube.com/vi/".concat(a.id,"/maxresdefault.jpg"),s=new Image;s.onload=()=>{if(r){let a=r.querySelector(".blur-layer");a&&(a.style.backgroundImage="url(".concat(e,")"),a.style.filter="blur(".concat(f,"px) brightness(0.3)"),r.classList.add("show"),document.body.classList.add("has-video-background"))}},s.src=e}else r.classList.remove("show"),document.body.classList.remove("has-video-background"),setTimeout(()=>{null==r||r.remove()},300)}};return(0,t.useEffect)(()=>{let e=document.querySelector(".blur-layer");e&&(e.style.filter="blur(".concat(f,"px) brightness(0.3)"))},[f]),(0,t.useEffect)(()=>{p.current&&N(p.current.scrollWidth>p.current.clientWidth)},[null==d?void 0:d.title]),(0,t.useEffect)(()=>{let e=e=>{let a=e.target;a.closest(".music-player-card")||a.closest(".focus-card")||y(!0)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,s.jsxs)(n,{className:"music-player-card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] rounded-[32px] bg-gradient-to-b from-gray-200 to-white p-[2px] dark:from-gray-800 dark:to-gray-900 ".concat(v?"minimized":"w-full"),onClick:e=>{e.stopPropagation(),v&&y(!1)},children:[(0,s.jsx)("div",{className:"absolute inset-0 rounded-[30px] bg-white dark:bg-slate-900"}),(0,s.jsxs)("div",{className:"relative flex flex-col p-8 rounded-[30px]",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between gap-4",children:[(0,s.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,s.jsx)("h2",{className:"text-2xl font-bold",children:"Now Playing"}),(0,s.jsx)("div",{className:"overflow-hidden",children:(0,s.jsx)("div",{ref:p,className:"text-muted-foreground whitespace-nowrap ".concat(j?"marquee":""),children:(null==d?void 0:d.title)||"Select a track"})})]}),(0,s.jsxs)("div",{className:"flex gap-2 flex-shrink-0",children:[(0,s.jsx)(g,{variant:"ghost",size:"icon",className:"rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",onClick:r?()=>{u&&o&&"function"==typeof o.pauseVideo&&(o.pauseVideo(),l(!1),z(!1))}:()=>{if(u&&o&&"function"==typeof o.playVideo){if(o.playVideo(),l(!0),!d){let e=o.getVideoData();i({id:e.video_id,title:e.title})}z(!0)}},disabled:!u,children:r?(0,s.jsx)(h.A,{className:"h-4 w-4"}):(0,s.jsx)(x.A,{className:"h-4 w-4"})}),(0,s.jsx)(g,{variant:"ghost",size:"icon",className:"rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",onClick:V,disabled:!u,children:(0,s.jsx)(S.A,{className:"h-4 w-4"})})]})]}),!v&&(0,s.jsxs)("div",{className:"mt-4 flex items-center gap-4",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsxs)("label",{className:"text-xs text-muted-foreground whitespace-nowrap",children:["Blur: ",f]}),(0,s.jsx)(E,{value:[f],onValueChange:e=>{let[a]=e;return b(a)},min:0,max:20,step:1,className:"w-24 ml-2"})]}),(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsxs)("label",{className:"text-xs text-muted-foreground whitespace-nowrap",children:["Volume: ",w]}),(0,s.jsx)(E,{value:[w],onValueChange:e=>{let a=e[0];k(a),o&&"function"==typeof o.setVolume&&o.setVolume(a)},min:0,max:100,step:1,className:"w-24 ml-2"})]})]}),(0,s.jsx)("div",{style:{display:"none"},children:(0,s.jsx)(C.A,{opts:{playerVars:{autoplay:0,controls:0,modestbranding:1,loop:1,playlist:A}},onReady:e=>{let a=e.target;c(a),m(!0),a.loadPlaylist({list:A,listType:"playlist",index:0}),setTimeout(()=>{V(),a.pauseVideo()},100)},onStateChange:e=>{let a=1===e.data;if(l(a),o&&(1===e.data||2===e.data)){let e=o.getVideoData();i({id:e.video_id,title:e.title}),z(a)}}})})]})]})}function z(){let[e,a]=(0,t.useState)(1500),[r,l]=(0,t.useState)(!1),{theme:d,setTheme:i}=(0,k.D)(),[o,c]=(0,t.useState)(!1);(0,t.useEffect)(()=>{let s;return r&&e>0&&(s=setInterval(()=>{a(e=>e-1)},1e3)),()=>clearInterval(s)},[r,e]),(0,t.useEffect)(()=>{let e=e=>{let a=e.target;a.closest(".focus-card")||a.closest(".music-player-card")||c(!o)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[o]);let C=e=>{let a=Math.floor(e/60);return"".concat(a.toString().padStart(2,"0"),":").concat((e%60).toString().padStart(2,"0"))};return(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center p-4 bg-gray-50/80 dark:bg-slate-900",children:(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full ".concat(o?"minimized-state":""),children:[(0,s.jsx)("div",{className:"md:col-span-3",children:(0,s.jsx)(V,{playlistUrl:"https://www.youtube.com/playlist?list=PL6dMWM5sYDapFWlmjH3rXn09igyLVsWNH"})}),(0,s.jsxs)(n,{className:"focus-card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] rounded-[32px] bg-gradient-to-b from-gray-200 to-white p-[2px] dark:from-gray-800 dark:to-gray-900 ".concat(o?"h-14":"aspect-square"," ").concat(o?"":"group-hover:blur-sm hover:!blur-none"),onClick:()=>o&&c(!1),children:[(0,s.jsx)("div",{className:"absolute inset-0 rounded-[30px] bg-white dark:bg-slate-900"}),(0,s.jsx)("div",{className:"relative h-full flex flex-col justify-center ".concat(o?"px-5":"p-8"," rounded-[30px]"),children:o?(0,s.jsxs)("div",{className:"flex items-center justify-between w-full",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsx)(v.A,{className:"w-5 h-5 text-gray-500"}),(0,s.jsx)("h2",{className:"text-3xl font-bold tracking-tighter",children:C(e)})]}),(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)(g,{variant:"ghost",size:"icon",className:"h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",onClick:e=>{e.stopPropagation(),a(1500),l(!1)},children:(0,s.jsx)(f.A,{className:"w-4 h-4"})}),(0,s.jsx)(g,{variant:"ghost",size:"icon",className:"h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",onClick:e=>{e.stopPropagation(),l(!r)},children:r?(0,s.jsx)(h.A,{className:"w-4 h-4"}):(0,s.jsx)(x.A,{className:"w-4 h-4"})})]})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"flex justify-end gap-2 mb-4",children:[(0,s.jsxs)(g,{variant:"ghost",size:"icon",className:"rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",children:[(0,s.jsx)("span",{className:"sr-only",children:"Expand"}),(0,s.jsx)(u.A,{className:"w-4 h-4"})]}),(0,s.jsxs)(g,{variant:"ghost",size:"icon",className:"rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",children:[(0,s.jsx)("span",{className:"sr-only",children:"Settings"}),(0,s.jsx)(m.A,{className:"w-4 h-4"})]})]}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("h2",{className:"text-7xl font-bold tracking-tighter mb-2",children:C(e)}),(0,s.jsx)("p",{className:"text-gray-500 dark:text-gray-400",children:"Focus"}),(0,s.jsx)("p",{className:"text-gray-500 dark:text-gray-400 mt-4",children:"Just do it."})]}),(0,s.jsxs)("div",{className:"flex gap-2 justify-start mt-4",children:[(0,s.jsx)(g,{variant:"ghost",size:"icon",className:"rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",onClick:()=>l(!r),children:r?(0,s.jsx)(h.A,{className:"w-4 h-4"}):(0,s.jsx)(x.A,{className:"w-4 h-4"})}),(0,s.jsx)(g,{variant:"ghost",size:"icon",className:"rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",onClick:()=>{a(1500),l(!1)},children:(0,s.jsx)(f.A,{className:"w-4 h-4"})}),(0,s.jsx)(g,{variant:"ghost",size:"icon",className:"rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",children:(0,s.jsx)(b.A,{className:"w-4 h-4"})})]})]})})]}),!o&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n,{className:"focus-card aspect-square relative overflow-hidden transition-all duration-300 group-hover:blur-sm hover:!blur-none hover:scale-[1.02] rounded-[32px] bg-gradient-to-b from-gray-200 to-white p-[2px] dark:from-gray-800 dark:to-gray-900",children:[(0,s.jsx)("div",{className:"absolute inset-0 rounded-[30px] bg-white dark:bg-slate-900"}),(0,s.jsx)("div",{className:"relative h-full flex flex-col p-8 rounded-[30px]",children:(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("h2",{className:"text-7xl font-bold tracking-tighter mb-2",children:(0,N.GP)(new Date,"HH:mm")}),(0,s.jsxs)("p",{className:"text-gray-500 dark:text-gray-400 flex items-center gap-2",children:[(0,s.jsx)(y.A,{className:"w-4 h-4"}),"Houston"]}),(0,s.jsxs)("div",{className:"mt-4 text-sm text-gray-500 dark:text-gray-400",children:[(0,s.jsx)("p",{children:(0,N.GP)(new Date,"EEE, MMM dd")}),(0,s.jsxs)("p",{children:["Week ",(0,w.N)(new Date)]})]})]})})]}),(0,s.jsxs)(n,{className:"focus-card aspect-square relative overflow-hidden transition-all duration-300 group-hover:blur-sm hover:!blur-none hover:scale-[1.02] rounded-[32px] bg-gradient-to-b from-gray-200 to-white p-[2px] dark:from-gray-800 dark:to-gray-900",children:[(0,s.jsx)("div",{className:"absolute inset-0 rounded-[30px] bg-white dark:bg-slate-900"}),(0,s.jsx)("div",{className:"relative h-full flex flex-col p-8 rounded-[30px]",children:(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsxs)("h2",{className:"text-2xl font-bold flex items-center gap-2 mb-4",children:[(0,s.jsx)(m.A,{className:"w-6 h-6"}),"Settings"]}),(0,s.jsx)("div",{className:"space-y-4",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsx)("span",{className:"text-sm",children:"Dark Mode"}),(0,s.jsx)(g,{variant:"ghost",size:"icon",className:"rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",onClick:()=>i("dark"===d?"light":"dark"),children:"dark"===d?(0,s.jsx)(p.A,{className:"w-4 h-4"}):(0,s.jsx)(j.A,{className:"w-4 h-4"})})]})})]})})]})]})]})})}E.displayName=A.bL.displayName}},e=>{var a=a=>e(e.s=a);e.O(0,[573,974,767,358],()=>a(7303)),_N_E=e.O()}]);