

(function (global) {
  "use strict";

  // ── shaders ──────────────────────────────────────────────────────────────

  const face_vert = `
    attribute vec3 position;
    uniform vec2 px;
    uniform vec2 boundarySpace;
    varying vec2 uv;
    precision highp float;
    void main(){
      vec3 pos = position;
      vec2 scale = 1.0 - boundarySpace * 2.0;
      pos.xy = pos.xy * scale;
      uv = vec2(0.5)+(pos.xy)*0.5;
      gl_Position = vec4(pos, 1.0);
    }
  `;

  const line_vert = `
    attribute vec3 position;
    uniform vec2 px;
    precision highp float;
    varying vec2 uv;
    void main(){
      vec3 pos = position;
      uv = 0.5 + pos.xy * 0.5;
      vec2 n = sign(pos.xy);
      pos.xy = abs(pos.xy) - px * 1.0;
      pos.xy *= n;
      gl_Position = vec4(pos, 1.0);
    }
  `;

  const mouse_vert = `
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
      vec2 pos = position.xy * scale * 2.0 * px + center;
      vUv = uv;
      gl_Position = vec4(pos, 0.0, 1.0);
    }
  `;

  const advection_frag = `
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform bool isBFECC;
    uniform vec2 fboSize;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
      vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
      if(isBFECC == false){
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
      } else {
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        vec2 error = spot_new2 - spot_new;
        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        vec2 newVel2 = texture2D(velocity, spot_old2).xy;
        gl_FragColor = vec4(newVel2, 0.0, 0.0);
      }
    }
  `;

  const color_frag = `
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D palette;
    uniform vec4 bgColor;
    varying vec2 uv;
    void main(){
      vec2 vel = texture2D(velocity, uv).xy;
      float lenv = clamp(length(vel), 0.0, 1.0);
      vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
      vec3 outRGB = mix(bgColor.rgb, c, lenv);
      float outA = mix(bgColor.a, 1.0, lenv);
      gl_FragColor = vec4(outRGB, outA);
    }
  `;

  const divergence_frag = `
    precision highp float;
    uniform sampler2D velocity;
    uniform float dt;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
      float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
      float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
      float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
      float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
      float divergence = (x1 - x0 + y1 - y0) / 2.0;
      gl_FragColor = vec4(divergence / dt);
    }
  `;

  const externalForce_frag = `
    precision highp float;
    uniform vec2 force;
    uniform vec2 center;
    uniform vec2 scale;
    uniform vec2 px;
    varying vec2 vUv;
    void main(){
      vec2 circle = (vUv - 0.5) * 2.0;
      float d = 1.0 - min(length(circle), 1.0);
      d *= d;
      gl_FragColor = vec4(force * d, 0.0, 1.0);
    }
  `;

  const poisson_frag = `
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D divergence;
    uniform vec2 px;
    varying vec2 uv;
    void main(){
      float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
      float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
      float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
      float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
      float div = texture2D(divergence, uv).r;
      float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
      gl_FragColor = vec4(newP);
    }
  `;

  const pressure_frag = `
    precision highp float;
    uniform sampler2D pressure;
    uniform sampler2D velocity;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
      float step = 1.0;
      float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
      float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
      float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
      float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
      vec2 v = texture2D(velocity, uv).xy;
      vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
      v = v - gradP * dt;
      gl_FragColor = vec4(v, 0.0, 1.0);
    }
  `;

  const viscous_frag = `
    precision highp float;
    uniform sampler2D velocity;
    uniform sampler2D velocity_new;
    uniform float v;
    uniform vec2 px;
    uniform float dt;
    varying vec2 uv;
    void main(){
      vec2 old = texture2D(velocity, uv).xy;
      vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
      vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
      vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
      vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
      vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
      newv /= 4.0 * (1.0 + v * dt);
      gl_FragColor = vec4(newv, 0.0, 0.0);
    }
  `;

  // ── helpers ───────────────────────────────────────────────────────────────

  function makePaletteTexture(THREE, stops) {
    let arr = (Array.isArray(stops) && stops.length > 0)
      ? (stops.length === 1 ? [stops[0], stops[0]] : stops)
      : ["#ffffff", "#ffffff"];
    const w = arr.length;
    const data = new Uint8Array(w * 4);
    for (let i = 0; i < w; i++) {
      const c = new THREE.Color(arr[i]);
      data[i * 4 + 0] = Math.round(c.r * 255);
      data[i * 4 + 1] = Math.round(c.g * 255);
      data[i * 4 + 2] = Math.round(c.b * 255);
      data[i * 4 + 3] = 255;
    }
    const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  }

  function makeFBO(THREE, renderer, w, h) {
    const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
    const type = isIOS ? THREE.HalfFloatType : THREE.FloatType;
    return new THREE.WebGLRenderTarget(w, h, {
      type,
      depthBuffer: false,
      stencilBuffer: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });
  }

  // ── LiquidEther class ─────────────────────────────────────────────────────

  function LiquidEther(container, opts) {
    const THREE = global.THREE;
    if (!THREE) throw new Error("LiquidEther requires Three.js to be loaded first.");

    const cfg = Object.assign({
      colors: ["#5227FF", "#FF9FFC", "#B497CF"],
      mouseForce: 20,
      cursorSize: 100,
      isViscous: true,
      viscous: 30,
      iterationsViscous: 32,
      iterationsPoisson: 32,
      dt: 0.014,
      BFECC: true,
      resolution: 0.5,
      isBounce: false,
      autoDemo: true,
      autoSpeed: 0.5,
      autoIntensity: 2.2,
      takeoverDuration: 0.25,
      autoResumeDelay: 1000,
      autoRampDuration: 0.6,
    }, opts || {});

    // ensure container is relatively positioned
    const cs = getComputedStyle(container);
    if (cs.position === "static") container.style.position = "relative";
    container.style.overflow = "hidden";

    // ── renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.autoClear = false;
    renderer.setClearColor(new THREE.Color(0x000000), 0);

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "0";
    container.prepend(canvas);

    // ── size helpers ─────────────────────────────────────────────────────────
    let W, H, fboW, fboH;
    const cellScale = new THREE.Vector2();
    const fboSize  = new THREE.Vector2();
    const boundary = new THREE.Vector2();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);

    function calcSize() {
      const rect = container.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      fboW = Math.max(1, Math.round(cfg.resolution * W));
      fboH = Math.max(1, Math.round(cfg.resolution * H));
      cellScale.set(1 / fboW, 1 / fboH);
      fboSize.set(fboW, fboH);
    }

    function resizeRenderer() {
      calcSize();
      renderer.setSize(W, H, false);
      if (fbos) {
        Object.values(fbos).forEach(fbo => fbo.setSize(fboW, fboH));
      }
    }

    // ── FBOs ─────────────────────────────────────────────────────────────────
    calcSize();
    renderer.setSize(W, H, false);

    let fbos = null;
    function createFBOs() {
      const keys = ["vel_0","vel_1","vel_vis0","vel_vis1","div","pres_0","pres_1"];
      fbos = {};
      keys.forEach(k => { fbos[k] = makeFBO(THREE, renderer, fboW, fboH); });
    }
    createFBOs();

    // ── palette ───────────────────────────────────────────────────────────────
    const paletteTex = makePaletteTexture(THREE, cfg.colors);
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    // ── shader pass factory ───────────────────────────────────────────────────
    const cam = new THREE.Camera();

    function makePass(vertSrc, fragSrc, uniforms, blending) {
      const scene = new THREE.Scene();
      const mat = new THREE.RawShaderMaterial({
        vertexShader: vertSrc,
        fragmentShader: fragSrc,
        uniforms,
        blending: blending || THREE.NormalBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      scene.add(mesh);
      return { scene, mesh, mat, uniforms };
    }

    function runPass(pass, target) {
      renderer.setRenderTarget(target || null);
      renderer.render(pass.scene, cam);
      renderer.setRenderTarget(null);
    }

    // ── advection ────────────────────────────────────────────────────────────
    const advPass = makePass(face_vert, advection_frag, {
      boundarySpace: { value: cellScale },
      px:            { value: cellScale },
      fboSize:       { value: fboSize },
      velocity:      { value: fbos.vel_0.texture },
      dt:            { value: cfg.dt },
      isBFECC:       { value: cfg.BFECC },
    });
    // boundary line segments
    {
      const bg = new THREE.BufferGeometry();
      const verts = new Float32Array([-1,-1,0, -1,1,0, -1,1,0, 1,1,0, 1,1,0, 1,-1,0, 1,-1,0, -1,-1,0]);
      bg.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      const bm = new THREE.RawShaderMaterial({
        vertexShader: line_vert,
        fragmentShader: advection_frag,
        uniforms: advPass.uniforms,
      });
      const bl = new THREE.LineSegments(bg, bm);
      advPass.scene.add(bl);
      advPass.boundaryLine = bl;
    }

    // ── external force ───────────────────────────────────────────────────────
    const forceScene = new THREE.Scene();
    const forceMat = new THREE.RawShaderMaterial({
      vertexShader: mouse_vert,
      fragmentShader: externalForce_frag,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        px:     { value: cellScale },
        force:  { value: new THREE.Vector2() },
        center: { value: new THREE.Vector2() },
        scale:  { value: new THREE.Vector2(cfg.cursorSize, cfg.cursorSize) },
      },
    });
    const forceMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), forceMat);
    forceScene.add(forceMesh);

    // ── viscous ──────────────────────────────────────────────────────────────
    const viscPass = makePass(face_vert, viscous_frag, {
      boundarySpace:  { value: boundary },
      velocity:       { value: fbos.vel_1.texture },
      velocity_new:   { value: fbos.vel_vis0.texture },
      v:              { value: cfg.viscous },
      px:             { value: cellScale },
      dt:             { value: cfg.dt },
    });

    // ── divergence ───────────────────────────────────────────────────────────
    const divPass = makePass(face_vert, divergence_frag, {
      boundarySpace: { value: boundary },
      velocity:      { value: fbos.vel_1.texture },
      px:            { value: cellScale },
      dt:            { value: cfg.dt },
    });

    // ── poisson ───────────────────────────────────────────────────────────────
    const poisPass = makePass(face_vert, poisson_frag, {
      boundarySpace: { value: boundary },
      pressure:      { value: fbos.pres_0.texture },
      divergence:    { value: fbos.div.texture },
      px:            { value: cellScale },
    });

    // ── pressure ──────────────────────────────────────────────────────────────
    const presPass = makePass(face_vert, pressure_frag, {
      boundarySpace: { value: boundary },
      pressure:      { value: fbos.pres_0.texture },
      velocity:      { value: fbos.vel_vis0.texture },
      px:            { value: cellScale },
      dt:            { value: cfg.dt },
    });

    // ── output ────────────────────────────────────────────────────────────────
    const outScene = new THREE.Scene();
    const outMat = new THREE.RawShaderMaterial({
      vertexShader: face_vert,
      fragmentShader: color_frag,
      transparent: true,
      depthWrite: false,
      uniforms: {
        velocity:      { value: fbos.vel_0.texture },
        boundarySpace: { value: new THREE.Vector2() },
        palette:       { value: paletteTex },
        bgColor:       { value: bgVec4 },
      },
    });
    outScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), outMat));

    // ── mouse tracking ────────────────────────────────────────────────────────
    const coords    = new THREE.Vector2();
    const coordsOld = new THREE.Vector2();
    const diff      = new THREE.Vector2();
    let   mouseMoved = false;
    let   mouseTimer  = null;
    let   isHoverInside = false;

    function setCoords(clientX, clientY) {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      coords.set(
        ((clientX - rect.left) / rect.width)  * 2 - 1,
        -(((clientY - rect.top)  / rect.height) * 2 - 1)
      );
      mouseMoved = true;
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => { mouseMoved = false; }, 100);
    }

    function isInside(clientX, clientY) {
      const r = container.getBoundingClientRect();
      return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
    }

    function onMouseMove(e) {
      isHoverInside = isInside(e.clientX, e.clientY);
      if (!isHoverInside) return;
      lastUserInteraction = performance.now();
      autoActive = false;
      setCoords(e.clientX, e.clientY);
    }
    function onTouchStart(e) {
      const t = e.touches[0];
      isHoverInside = isInside(t.clientX, t.clientY);
      if (!isHoverInside) return;
      lastUserInteraction = performance.now();
      autoActive = false;
      setCoords(t.clientX, t.clientY);
    }
    function onTouchMove(e) {
      const t = e.touches[0];
      isHoverInside = isInside(t.clientX, t.clientY);
      if (!isHoverInside) return;
      lastUserInteraction = performance.now();
      setCoords(t.clientX, t.clientY);
    }
    function onTouchEnd() { isHoverInside = false; }
    function onDocLeave() { isHoverInside = false; }

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("touchend",   onTouchEnd);
    document.addEventListener("mouseleave", onDocLeave);

    // ── auto-demo driver ──────────────────────────────────────────────────────
    let autoActive = false;
    let lastUserInteraction = performance.now();
    const autoCurrent = new THREE.Vector2();
    const autoTarget  = new THREE.Vector2();
    let   autoLastT   = performance.now();
    let   autoActivationT = 0;
    const MARGIN = 0.2;

    function pickAutoTarget() {
      autoTarget.set(
        (Math.random() * 2 - 1) * (1 - MARGIN),
        (Math.random() * 2 - 1) * (1 - MARGIN)
      );
    }
    pickAutoTarget();

    function tickAuto() {
      if (!cfg.autoDemo) return;
      const now  = performance.now();
      const idle = now - lastUserInteraction;
      if (idle < cfg.autoResumeDelay || isHoverInside) {
        autoActive = false;
        return;
      }
      if (!autoActive) {
        autoActive = true;
        autoCurrent.copy(coords);
        autoLastT = now;
        autoActivationT = now;
      }
      let dtSec = (now - autoLastT) / 1000;
      autoLastT = now;
      if (dtSec > 0.2) dtSec = 0.016;

      const dir  = new THREE.Vector2().subVectors(autoTarget, autoCurrent);
      const dist = dir.length();
      if (dist < 0.01) { pickAutoTarget(); return; }
      dir.normalize();

      const rampMs = cfg.autoRampDuration * 1000;
      let ramp = 1;
      if (rampMs > 0) {
        const t = Math.min(1, (now - autoActivationT) / rampMs);
        ramp = t * t * (3 - 2 * t);
      }
      const step = cfg.autoSpeed * dtSec * ramp;
      autoCurrent.addScaledVector(dir, Math.min(step, dist));
      coords.set(autoCurrent.x, autoCurrent.y);
      mouseMoved = true;
    }

    // ── simulation step ───────────────────────────────────────────────────────
    function simulate() {
      // update boundary
      if (cfg.isBounce) {
        boundary.set(0, 0);
      } else {
        boundary.copy(cellScale);
      }

      // mouse diff
      diff.subVectors(coords, coordsOld);
      coordsOld.copy(coords);
      if (coordsOld.x === 0 && coordsOld.y === 0) diff.set(0, 0);
      if (autoActive) diff.multiplyScalar(cfg.autoIntensity);

      // advection
      advPass.uniforms.velocity.value = fbos.vel_0.texture;
      advPass.uniforms.dt.value       = cfg.dt;
      advPass.uniforms.isBFECC.value  = cfg.BFECC;
      advPass.boundaryLine.visible    = cfg.isBounce;
      runPass(advPass, fbos.vel_1);

      // external force
      {
        const forceX = (diff.x / 2) * cfg.mouseForce;
        const forceY = (diff.y / 2) * cfg.mouseForce;
        const csX = cfg.cursorSize * cellScale.x;
        const csY = cfg.cursorSize * cellScale.y;
        const cx = Math.min(Math.max(coords.x, -1 + csX + cellScale.x * 2), 1 - csX - cellScale.x * 2);
        const cy = Math.min(Math.max(coords.y, -1 + csY + cellScale.y * 2), 1 - csY - cellScale.y * 2);
        forceMat.uniforms.force.value.set(forceX, forceY);
        forceMat.uniforms.center.value.set(cx, cy);
        forceMat.uniforms.scale.value.set(cfg.cursorSize, cfg.cursorSize);
        renderer.setRenderTarget(fbos.vel_1);
        renderer.render(forceScene, cam);
        renderer.setRenderTarget(null);
      }

      // viscous
      let velFBO = fbos.vel_1;
      if (cfg.isViscous) {
        viscPass.uniforms.velocity.value = fbos.vel_1.texture;
        viscPass.uniforms.v.value        = cfg.viscous;
        viscPass.uniforms.dt.value       = cfg.dt;
        let fbo_in  = fbos.vel_vis0;
        let fbo_out = fbos.vel_vis1;
        for (let i = 0; i < cfg.iterationsViscous; i++) {
          viscPass.uniforms.velocity_new.value = fbo_in.texture;
          runPass(viscPass, fbo_out);
          [fbo_in, fbo_out] = [fbo_out, fbo_in];
        }
        velFBO = fbo_in; // last written
      }

      // divergence
      divPass.uniforms.velocity.value = velFBO.texture;
      runPass(divPass, fbos.div);

      // poisson
      {
        let p_in  = fbos.pres_0;
        let p_out = fbos.pres_1;
        for (let i = 0; i < cfg.iterationsPoisson; i++) {
          poisPass.uniforms.pressure.value = p_in.texture;
          runPass(poisPass, p_out);
          [p_in, p_out] = [p_out, p_in];
        }
        // pressure subtract
        presPass.uniforms.pressure.value = p_in.texture;
        presPass.uniforms.velocity.value = velFBO.texture;
        runPass(presPass, fbos.vel_0);
      }

      // output render
      outMat.uniforms.velocity.value = fbos.vel_0.texture;
      renderer.setRenderTarget(null);
      renderer.render(outScene, cam);
    }

    // ── main loop ─────────────────────────────────────────────────────────────
    let rafId = null;
    let running = false;

    function loop() {
      if (!running) return;
      tickAuto();
      simulate();
      rafId = requestAnimationFrame(loop);
    }

    this.start = function () {
      if (running) return;
      running = true;
      loop();
    };

    this.pause = function () {
      running = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    };

    // ── resize ────────────────────────────────────────────────────────────────
    let roRaf = null;
    const ro = new ResizeObserver(() => {
      if (roRaf) cancelAnimationFrame(roRaf);
      roRaf = requestAnimationFrame(() => { resizeRenderer(); });
    });
    ro.observe(container);

    // visibility pause/resume
    function onVisibility() {
      if (document.hidden) { this.pause(); }
      else { this.start(); }
    }
    const _onVis = onVisibility.bind(this);
    document.addEventListener("visibilitychange", _onVis);

    // ── destroy ───────────────────────────────────────────────────────────────
    this.destroy = function () {
      this.pause();
      ro.disconnect();
      window.removeEventListener("mousemove",    onMouseMove);
      window.removeEventListener("touchstart",   onTouchStart);
      window.removeEventListener("touchmove",    onTouchMove);
      window.removeEventListener("touchend",     onTouchEnd);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("visibilitychange", _onVis);
      try { renderer.dispose(); renderer.forceContextLoss(); } catch(e){}
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }

  global.LiquidEther = LiquidEther;

})(typeof window !== "undefined" ? window : globalThis);
