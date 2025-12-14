const timeEl = document.getElementById("time");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const appEl = document.querySelector(".app");
const labelEl = startStopBtn.querySelector(".label");

let startTime=0, elapsed=0, rafId=null, running=false;

function format(ms){
  const m=Math.floor(ms/60000);
  const s=Math.floor(ms%60000/1000);
  const ms2=Math.floor(ms%1000);
  return String(m).padStart(2,"0")+":"+
         String(s).padStart(2,"0")+"."+
         String(ms2).padStart(3,"0");
}
function tick(now){
  elapsed=now-startTime;
  timeEl.textContent=format(elapsed);
  rafId=requestAnimationFrame(tick);
}
function toggle(){
  if(running){
    running=false;
    labelEl.textContent="開始";
    appEl.classList.remove("running");
    cancelAnimationFrame(rafId);
  }else{
    running=true;
    labelEl.textContent="停止";
    appEl.classList.add("running");
    startTime=performance.now()-elapsed;
    rafId=requestAnimationFrame(tick);
  }
}
function reset(){
  running=false;elapsed=0;
  labelEl.textContent="開始";
  appEl.classList.remove("running");
  cancelAnimationFrame(rafId);
  timeEl.textContent=format(0);
}
startStopBtn.onclick=toggle;
resetBtn.onclick=reset;
timeEl.textContent=format(0);
