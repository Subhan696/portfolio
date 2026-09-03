"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Scroll3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Cosmic Deep Space Starfield (Matching exact reference image)
    const starCount = 3200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const whiteColor = new THREE.Color(0xffffff);
    const diamondSilver = new THREE.Color(0xdce7f5);
    const faintSilver = new THREE.Color(0x8898aa);

    for (let i = 0; i < starCount; i++) {
      const r = 1.5 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 40;

      starPos[i * 3] = Math.cos(theta) * r;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      starPos[i * 3 + 2] = z;

      const rnd = Math.random();
      const col = rnd > 0.8 ? whiteColor : rnd > 0.35 ? diamondSilver : faintSilver;
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 3. Silver Surfer 3D Character Group
    const surferGroup = new THREE.Group();
    scene.add(surferGroup);

    // Texture Loader for the exact Silver Surfer character
    const textureLoader = new THREE.TextureLoader();
    const surferTexture = textureLoader.load("/images/silver-surfer-character.png");
    surferTexture.minFilter = THREE.LinearFilter;
    surferTexture.magFilter = THREE.LinearFilter;

    // 3D Silver Surfer Plane with Chrome Specular Reflection
    const surferAspect = 405 / 493; // Aspect ratio of the character
    const surferHeight = 4.2;
    const surferWidth = surferHeight * surferAspect;
    const surferGeo = new THREE.PlaneGeometry(surferWidth, surferHeight, 32, 32);

    const surferMat = new THREE.MeshStandardMaterial({
      map: surferTexture,
      transparent: true,
      alphaTest: 0.05,
      metalness: 0.85,
      roughness: 0.15,
      side: THREE.DoubleSide,
    });

    const surferMesh = new THREE.Mesh(surferGeo, surferMat);
    surferGroup.add(surferMesh);

    // 3D Metallic Chrome Backplate for dimensional depth
    const backplateMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.1,
      transparent: true,
      opacity: 0.4,
    });
    const backplateMesh = new THREE.Mesh(surferGeo, backplateMat);
    backplateMesh.position.z = -0.04;
    backplateMesh.scale.set(0.98, 0.98, 0.98);
    surferGroup.add(backplateMesh);

    // Cosmic Chrome Halo Glow
    const haloGeo = new THREE.PlaneGeometry(surferWidth * 1.25, surferHeight * 1.25);
    const haloMat = new THREE.MeshBasicMaterial({
      map: surferTexture,
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.z = -0.08;
    surferGroup.add(haloMesh);

    // Cosmic Starlight Wake / Particle Trail under the Surfboard
    const wakeCount = 180;
    const wakeGeo = new THREE.BufferGeometry();
    const wakePos = new Float32Array(wakeCount * 3);
    for (let i = 0; i < wakeCount; i++) {
      wakePos[i * 3] = -0.8 - Math.random() * 2.8;
      wakePos[i * 3 + 1] = -1.2 - Math.random() * 1.2;
      wakePos[i * 3 + 2] = -0.4 - Math.random() * 2.0;
    }
    wakeGeo.setAttribute("position", new THREE.BufferAttribute(wakePos, 3));
    const wakeMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const wake = new THREE.Points(wakeGeo, wakeMat);
    surferGroup.add(wake);

    // Initial position & scale
    surferGroup.position.set(1.6, 0.1, 0);
    surferGroup.scale.set(1.0, 1.0, 1.0);

    // 4. Dynamic Lighting for Chrome Sheen
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 6, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x94a3b8, 2.2);
    rimLight.position.set(-6, -4, -2);
    scene.add(rimLight);

    const cosmicLight = new THREE.PointLight(0xe0f2fe, 12, 20);
    cosmicLight.position.set(2, 2, 4);
    scene.add(cosmicLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Mouse Tracking for Surfing Tilt & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Scroll Progress
    let scrollProgress = 0;
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize
    const onResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.055;
      mouseY += (targetMouseY - mouseY) * 0.055;

      // Slow cosmic starfield drift
      stars.rotation.y = t * 0.012;
      stars.rotation.x = t * 0.006;

      // Natural Cosmic Floating Bob
      const bobY = Math.sin(t * 1.6) * 0.12;
      const bobRoll = Math.sin(t * 1.2) * 0.05;

      // Dynamic 3D Surfing Tilt: Banks when moving left/right, pitches when moving up/down
      surferGroup.rotation.z = -0.05 + bobRoll + mouseX * 0.28;
      surferGroup.rotation.y = -0.15 + mouseX * 0.35;
      surferGroup.rotation.x = 0.08 - mouseY * 0.22;

      // Dynamic Light Sheen shifts with mouse
      cosmicLight.position.x = 2 + mouseX * 3;
      cosmicLight.position.y = 2 + mouseY * 3;

      // Scroll-Driven Surfer Journey through Space
      const targetPosX = 1.6 + mouseX * 1.4;
      const targetPosY = 0.1 + mouseY * 0.9 + bobY;

      if (scrollProgress < 0.25) {
        // Hero: Cruising majestically beside title
        const p = scrollProgress / 0.25;
        surferGroup.position.x = THREE.MathUtils.lerp(targetPosX, 0.2, p);
        surferGroup.position.y = THREE.MathUtils.lerp(targetPosY, -0.3, p);
        surferGroup.scale.setScalar(THREE.MathUtils.lerp(1.0, 1.15, p));
      } else if (scrollProgress < 0.6) {
        // Capabilities / About: Banking to the left side
        const p = (scrollProgress - 0.25) / 0.35;
        surferGroup.position.x = THREE.MathUtils.lerp(0.2, -1.8, p) + mouseX * 0.9;
        surferGroup.position.y = THREE.MathUtils.lerp(-0.3, 0.2, p) + mouseY * 0.7;
        surferGroup.scale.setScalar(THREE.MathUtils.lerp(1.15, 0.95, p));
      } else if (scrollProgress < 0.85) {
        // Projects: Sweeping across projects
        const p = (scrollProgress - 0.6) / 0.25;
        surferGroup.position.x = THREE.MathUtils.lerp(-1.8, 1.8, p) + mouseX * 0.9;
        surferGroup.position.y = THREE.MathUtils.lerp(0.2, -0.2, p) + mouseY * 0.7;
        surferGroup.scale.setScalar(THREE.MathUtils.lerp(0.95, 1.1, p));
      } else {
        // Contact: Accelerating into deep cosmos
        const p = (scrollProgress - 0.85) / 0.15;
        surferGroup.position.x = THREE.MathUtils.lerp(1.8, 0, p);
        surferGroup.position.y = THREE.MathUtils.lerp(-0.2, -1.2, p);
        surferGroup.scale.setScalar(THREE.MathUtils.lerp(1.1, 0.75, p));
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      surferGeo.dispose();
      surferMat.dispose();
      surferTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black"
      aria-hidden="true"
    />
  );
}
