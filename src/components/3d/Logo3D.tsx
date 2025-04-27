import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Logo3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(
      70,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0x99ccff, 0.8);
    dirLight2.position.set(-5, -2, 3);
    scene.add(dirLight2);

    // HOLOGRAPHIC SPHERE
    const holoGeometry = new THREE.SphereGeometry(1.8, 16, 16);
    const holoMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const holoSphere = new THREE.Mesh(holoGeometry, holoMaterial);
    scene.add(holoSphere);

    // STRIKE IN 3D (simple geometry symbol)
    const strikeShape = new THREE.Shape();

    // Create a simple "lightning bolt" shape
    strikeShape.moveTo(-0.2, 0.4);
    strikeShape.lineTo(0.0, 0.0);
    strikeShape.lineTo(-0.1, 0.0);
    strikeShape.lineTo(0.2, -0.4);
    strikeShape.lineTo(0.0, 0.0);
    strikeShape.lineTo(0.1, 0.0);
    strikeShape.lineTo(-0.2, 0.4);

    const extrudeSettings = {
      steps: 2,
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    };

    const strikeGeometry = new THREE.ExtrudeGeometry(strikeShape, extrudeSettings);
    const strikeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      emissive: 0x5d5fff,
      shininess: 100 
    });
    const strikeMesh = new THREE.Mesh(strikeGeometry, strikeMaterial);
    strikeMesh.scale.set(2, 2, 2); // scale it bigger
    scene.add(strikeMesh);

    // Particle System (keep your particles)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const radius = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xaaccff,
      size: 0.03,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Rings (you can add them if you want, but looks nice without rings for a clean hologram)
    // -- skipping rings for now --

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 2 - 0.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      holoSphere.rotation.y += 0.001;
      strikeMesh.rotation.y += 0.003;
      particles.rotation.y += 0.0005;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    />
  );
};

export default Logo3D;