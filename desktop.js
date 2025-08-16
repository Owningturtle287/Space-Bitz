
/* desktop.js – PC enhancements for SpaceBitz */
(function(){
  'use strict';
  const SETTINGS_KEY = 'spacebitz:settings2';
  const DEFAULTS = { resolution: 'auto', pixelDensity: window.devicePixelRatio || 1 };
  const settings = Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}'));

  function save(){ localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }

  /* Utility: detect touch capability */
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* Hide virtual joystick for desktop */
  function updateJoystickVisibility(){
    const joy = document.getElementById('joystick');
    if(!joy) return;
    if(isTouch) return;  // keep visible on touch devices
    joy.style.display = 'none';
  }
  updateJoystickVisibility();

  /* Resolution handling */
  function applyResolution(){
    const canvas = document.getElementById('game');
    if(!canvas) return;
    const dpr = settings.pixelDensity;
    let targetW, targetH;
    if(settings.resolution==='auto'){
      targetW = window.innerWidth;
      targetH = window.innerHeight;
    }else{
      const arr = settings.resolution.split('x').map(Number);
      targetW = arr[0]||window.innerWidth;
      targetH = arr[1]||window.innerHeight;
    }
    // inline with original fitCanvas logic
    canvas.style.width  = targetW + 'px';
    canvas.style.height = targetH + 'px';
    canvas.width  = Math.floor(targetW * dpr);
    canvas.height = Math.floor(targetH * dpr);
    const ctx = canvas.getContext('2d');
    if(ctx) ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', applyResolution);
  window.addEventListener('load', applyResolution);

  /* Inject Resolution row into Settings overlay (desktop only) */
  function injectSettingRow(){
    if(isTouch) return; // don't show on touch devices
    const panel = document.getElementById('settingsPanel');
    if(!panel) return;
    if(document.getElementById('selDesktopRes')) return; // already injected
    const row = document.createElement('div');
    row.className = 'row';
    row.style.gap='10px';
    row.style.alignItems='center';
    row.innerHTML = `
      <label class="muted" style="min-width:110px;">Resolution</label>
      <select id="selDesktopRes" class="btnL" style="min-width:140px;">
        <option value="auto">Match window</option>
        <option value="1280x720">1280×720</option>
        <option value="1920x1080">1920×1080</option>
        <option value="2560x1440">2560×1440</option>
        <option value="3840x2160">3840×2160</option>
      </select>
    `;
    panel.appendChild(row);
    const sel = row.querySelector('select');
    sel.value = settings.resolution;
    sel.addEventListener('change', ()=>{
      settings.resolution = sel.value;
      save();
      setTimeout(applyResolution, 50);
    });
  }
  window.addEventListener('load', injectSettingRow);

  /* Extra keyboard hints */
  function showKeyHints(){
    if(isTouch) return;
    const actBtn = document.getElementById('actionBtn');
    if(actBtn){ actBtn.title = 'Press E or left‑click'; }
  }
  window.addEventListener('load', showKeyHints);
})();
