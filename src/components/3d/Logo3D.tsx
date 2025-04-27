import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Logo3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Get container dimensions instead of window dimensions
    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight;

    // Camera with closer position to make objects appear larger
    const camera = new THREE.PerspectiveCamera(
      70, // Wider field of view (was 75)
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.z = 3.8; // Move camera closer (was 5)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Higher quality rendering
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Add directional light for better shading
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Increased intensity
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add a second directional light from another angle for more dimension
    const directionalLight2 = new THREE.DirectionalLight(0x99ccff, 0.8);
    directionalLight2.position.set(-5, -2, 3);
    scene.add(directionalLight2);

    // Planet (Sphere) - larger size
    const planetGeometry = new THREE.SphereGeometry(1.4, 64, 64); // Increased radius (was 1)
    const planetMaterial = new THREE.MeshPhongMaterial({
      color: 0x5d5fff,
      shininess: 50,
      emissive: 0x3333aa,
      emissiveIntensity: 0.2,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Strike Logo (Plane with texture)
    const textureLoader = new THREE.TextureLoader();
    const strikeTexture = textureLoader.load('/path-to-your-strike-icon.png'); // Public folder or assets
    const strikeMaterial = new THREE.MeshBasicMaterial({ map: strikeTexture, transparent: true });
    const strikePlane = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), strikeMaterial); // Increased size (was 1, 1)
    strikePlane.position.z = 1.5; // Moved forward for visibility (was 1.1)
    scene.add(strikePlane);

    // Rings (Orbits) - larger sizes
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x99ccff,
      transparent: true,
      opacity: 0.7
    });
    const rings: THREE.Mesh[] = [];

    for (let i = 1; i <= 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.6 + i * 0.15, 0.015, 16, 100), // Increased ring size and thickness
        ringMaterial
      );
      ring.rotation.x = Math.PI / 2 * (i / 3);
      scene.add(ring);
      rings.push(ring);
    }

    // Add particle system for a more impressive visual effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const positions = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount; i++) {
      // Create a spherical distribution around the main planet
      const radius = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xaaccff,
      size: 0.03,
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Controls with restricted zoom and rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // Disable zoom
    controls.enableZoom = false;
    
    // Limit orbital movement
    controls.minPolarAngle = Math.PI / 2 - 0.5; // Restrict vertical rotation
    controls.maxPolarAngle = Math.PI / 2 + 0.5;
    
    // Dampening for smoother rotation stops
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Auto rotation for subtle movement
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // Handle window resize
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

      planet.rotation.y += 0.002;
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.001 * (index + 1);
      });
      
      // Rotate particle system slowly
      particles.rotation.y += 0.0005;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div 
    ref={mountRef} 
    style={{ 
      width: '100%', 
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }} 
  />;
};

export default Logo3D;