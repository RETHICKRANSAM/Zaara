/**
 * ZAARA — Dotted Surface Background
 * Vanilla JS port of the React dotted-surface component.
 * Requires Three.js to be loaded before this script.
 */
(function () {
  'use strict';

  const SEPARATION = 150;
  const AMOUNTX    = 40;
  const AMOUNTY    = 60;

  // ── Container ──────────────────────────────────────────────────
  const container = document.createElement('div');
  container.id    = 'dotted-surface';
  container.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:-5',          // above bg-orbs (-11) but behind page content
    'pointer-events:none',
    'overflow:hidden',
  ].join(';');
  document.body.insertBefore(container, document.body.firstChild);

  // ── Scene ───────────────────────────────────────────────────────
  const scene    = new THREE.Scene();
  scene.fog      = new THREE.Fog(0x0a0a0f, 2000, 10000);

  const camera   = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 355, 1220);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);   // fully transparent
  container.appendChild(renderer.domElement);

  // ── Particle geometry ───────────────────────────────────────────
  const positions = [];
  const colors    = [];

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      positions.push(
        ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
        0,
        iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
      );
      // bright gold dots (RGB 0-1): #E8C96A
      colors.push(0.91, 0.788, 0.416);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color',    new THREE.Float32BufferAttribute(colors,    3));

  const material = new THREE.PointsMaterial({
    size:          6,
    vertexColors:  true,
    transparent:   true,
    opacity:       0.8,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // ── Animation loop ──────────────────────────────────────────────
  let count = 0;
  let animationId;

  function animate() {
    animationId = requestAnimationFrame(animate);

    const pos = geometry.attributes.position.array;
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        pos[i * 3 + 1] =
          Math.sin((ix + count) * 0.3) * 50 +
          Math.sin((iy + count) * 0.5) * 50;
        i++;
      }
    }
    geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    count += 0.1;
  }

  animate();

  // ── Resize handler ──────────────────────────────────────────────
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── Pause when tab is hidden (saves CPU) ────────────────────────
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  // ── PDF-export safety: hide canvas during print ─────────────────
  window.addEventListener('beforeprint', function () {
    container.style.display = 'none';
  });
  window.addEventListener('afterprint', function () {
    container.style.display = '';
  });
})();
