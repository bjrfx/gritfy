import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Logo3D = () => {
  const mountRef = useRef(null);

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

    // Common material for all shapes
    const mainMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      emissive: 0x5d5fff,
      shininess: 100 
    });
    
    // Extrude settings for shapes
    const extrudeSettings = {
      steps: 2,
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    };

    // STRIKE SHAPE
    const strikeShape = new THREE.Shape();
    // Create a lightning bolt shape
    strikeShape.moveTo(-0.2, 0.4);
    strikeShape.lineTo(0.0, 0.0);
    strikeShape.lineTo(-0.1, 0.0);
    strikeShape.lineTo(0.2, -0.4);
    strikeShape.lineTo(0.0, 0.0);
    strikeShape.lineTo(0.1, 0.0);
    strikeShape.lineTo(-0.2, 0.4);

    const strikeGeometry = new THREE.ExtrudeGeometry(strikeShape, extrudeSettings);
    const strikeMesh = new THREE.Mesh(strikeGeometry, mainMaterial.clone());
    strikeMesh.scale.set(2, 2, 2);
    
    // CLOUD SYMBOL
    const cloudShape = new THREE.Shape();
    // Create a cloud shape
    cloudShape.moveTo(-0.3, 0);
    // First bump (left side)
    cloudShape.bezierCurveTo(-0.3, -0.15, -0.15, -0.25, -0.05, -0.15);
    // Middle bump (top)
    cloudShape.bezierCurveTo(0, -0.25, 0.2, -0.25, 0.2, -0.1);
    // Right bump
    cloudShape.bezierCurveTo(0.35, -0.1, 0.35, 0.1, 0.2, 0.1);
    // Bottom
    cloudShape.bezierCurveTo(0.2, 0.15, -0.15, 0.2, -0.15, 0.05);
    cloudShape.bezierCurveTo(-0.3, 0.05, -0.3, 0, -0.3, 0);

    const cloudGeometry = new THREE.ExtrudeGeometry(cloudShape, extrudeSettings);
    const cloudMesh = new THREE.Mesh(cloudGeometry, mainMaterial.clone());
    cloudMesh.scale.set(2, 2, 2);
    
    // DATA SYMBOL (Database icon)
    const dataShape = new THREE.Shape();
    // Top ellipse
    dataShape.ellipse(0, 0.2, 0.25, 0.1, 0, Math.PI * 2, false);
    // Connect to bottom ellipse with lines
    dataShape.lineTo(-0.25, -0.2);
    // Bottom ellipse
    dataShape.ellipse(0, -0.2, 0.25, 0.1, 0, Math.PI * 2, false);
    // Draw a line back to the top to close the shape
    dataShape.lineTo(0.25, 0.2);
    
    // Add some details to make it look like a database
    const holeShape = new THREE.Path();
    holeShape.ellipse(0, 0, 0.15, 0.05, 0, Math.PI * 2, false);
    dataShape.holes.push(holeShape);

    const dataGeometry = new THREE.ExtrudeGeometry(dataShape, extrudeSettings);
    const dataMesh = new THREE.Mesh(dataGeometry, mainMaterial.clone());
    dataMesh.scale.set(2, 2, 2);
    
    // AI SYMBOL (Brain/Circuit)
    const aiShape = new THREE.Shape();
    
    // Draw a brain/circuit hybrid shape
    aiShape.moveTo(-0.25, -0.15);
    
    // Bottom contour
    aiShape.bezierCurveTo(-0.2, -0.25, 0.2, -0.25, 0.25, -0.15);
    
    // Right side
    aiShape.bezierCurveTo(0.3, -0.05, 0.3, 0.05, 0.25, 0.15);
    
    // Top contour
    aiShape.bezierCurveTo(0.2, 0.25, -0.2, 0.25, -0.25, 0.15);
    
    // Left side
    aiShape.bezierCurveTo(-0.3, 0.05, -0.3, -0.05, -0.25, -0.15);
    
    // Add some "circuit" lines across the brain
    // Horizontal line
    aiShape.moveTo(-0.2, 0);
    aiShape.lineTo(0.2, 0);
    
    // Vertical line
    aiShape.moveTo(0, -0.2);
    aiShape.lineTo(0, 0.2);
    
    // Diagonal line 1
    aiShape.moveTo(-0.15, -0.15);
    aiShape.lineTo(0.15, 0.15);
    
    // Diagonal line 2
    aiShape.moveTo(-0.15, 0.15);
    aiShape.lineTo(0.15, -0.15);

    const aiGeometry = new THREE.ExtrudeGeometry(aiShape, extrudeSettings);
    const aiMesh = new THREE.Mesh(aiGeometry, mainMaterial.clone());
    aiMesh.scale.set(2, 2, 2);
    
    // Store all tech symbols in an array
    const techSymbols = [cloudMesh, dataMesh, aiMesh];
    
    // Initially add strike mesh to scene
    scene.add(strikeMesh);
    
    // Particle System
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

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 2 - 0.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Variables to control glitch effect
    let currentSymbolIndex = -1; // -1 means strike is showing
    let lastGlitchTime = 0;
    let isGlitching = false;
    let glitchDuration = 0;
    let glitchStartTime = 0;
    const GLITCH_INTERVAL = 3000; // 3 seconds between glitches
    
    // Apply distortion to mesh vertices as part of glitch effect
    const applyGlitchDistortion = (mesh, intensity) => {
      const positionAttribute = mesh.geometry.attributes.position;
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);
        
        // Apply random displacement to vertices
        positionAttribute.setX(i, x + (Math.random() - 0.5) * intensity);
        positionAttribute.setY(i, y + (Math.random() - 0.5) * intensity);
        positionAttribute.setZ(i, z + (Math.random() - 0.5) * intensity);
      }
      
      positionAttribute.needsUpdate = true;
    };
    
    // Reset mesh distortion
    const resetDistortion = (mesh, originalGeometry) => {
      mesh.geometry.dispose();
      mesh.geometry = originalGeometry.clone();
    };
    
    // Store original geometries for restoration after glitch
    const originalStrikeGeometry = strikeGeometry.clone();
    const originalCloudGeometry = cloudGeometry.clone();
    const originalDataGeometry = dataGeometry.clone();
    const originalAiGeometry = aiGeometry.clone();
    const originalGeometries = [originalCloudGeometry, originalDataGeometry, originalAiGeometry];

    // Function to remove all symbols from scene
    const clearSymbols = () => {
      if (scene.getObjectById(strikeMesh.id)) {
        scene.remove(strikeMesh);
      }
      
      techSymbols.forEach(symbol => {
        if (scene.getObjectById(symbol.id)) {
          scene.remove(symbol);
        }
      });
    };

    // Animate
    const animate = () => {
      const currentTime = Date.now();
      requestAnimationFrame(animate);

      holoSphere.rotation.y += 0.001;
      
      // Rotate current visible shape
      if (scene.getObjectById(strikeMesh.id)) {
        strikeMesh.rotation.y += 0.003;
      } else {
        techSymbols.forEach(symbol => {
          if (scene.getObjectById(symbol.id)) {
            symbol.rotation.y += 0.003;
          }
        });
      }
      
      particles.rotation.y += 0.0005;
      
      // Handle glitch effect timing
      if (!isGlitching && currentTime - lastGlitchTime > GLITCH_INTERVAL) {
        isGlitching = true;
        glitchStartTime = currentTime;
        glitchDuration = 500 + Math.random() * 300; // Random glitch duration between 500-800ms
      }
      
      // During glitch effect
      if (isGlitching) {
        const glitchProgress = (currentTime - glitchStartTime) / glitchDuration;
        
        // Apply distortion during glitch
        if (glitchProgress < 0.8) {
          // Rapidly toggle between shapes and apply distortion
          if (Math.random() > 0.6) {
            clearSymbols();
            
            // During glitch, randomly show any of the shapes
            const randomIndex = Math.floor(Math.random() * (techSymbols.length + 1)) - 1;
            
            if (randomIndex === -1) {
              scene.add(strikeMesh);
              applyGlitchDistortion(strikeMesh, 0.03);
            } else {
              scene.add(techSymbols[randomIndex]);
              applyGlitchDistortion(techSymbols[randomIndex], 0.03);
            }
          }
          
          // Random color glitches
          const randomHue = Math.random();
          let randomEmissive;
          
          if (randomHue < 0.25) {
            randomEmissive = new THREE.Color(0xff3300); // Red-orange
          } else if (randomHue < 0.5) {
            randomEmissive = new THREE.Color(0x00ffcc); // Cyan
          } else if (randomHue < 0.75) {
            randomEmissive = new THREE.Color(0x5d5fff); // Original blue
          } else {
            randomEmissive = new THREE.Color(0xffcc00); // Yellow
          }
          
          strikeMesh.material.emissive = randomEmissive;
          techSymbols.forEach(symbol => {
            symbol.material.emissive = randomEmissive;
          });
        } 
        // End of glitch effect
        else if (glitchProgress >= 1.0) {
          isGlitching = false;
          lastGlitchTime = currentTime;
          
          // Reset materials
          strikeMesh.material.emissive = new THREE.Color(0x5d5fff);
          techSymbols.forEach(symbol => {
            symbol.material.emissive = new THREE.Color(0x5d5fff);
          });
          
          // Reset geometries
          resetDistortion(strikeMesh, originalStrikeGeometry);
          techSymbols.forEach((symbol, index) => {
            resetDistortion(symbol, originalGeometries[index]);
          });
          
          // Toggle between shapes at the end of glitch
          clearSymbols();
          
          // Cycle to the next symbol
          currentSymbolIndex = (currentSymbolIndex + 1) % (techSymbols.length + 1);
          
          if (currentSymbolIndex === techSymbols.length) {
            // Show strike shape
            scene.add(strikeMesh);
          } else {
            // Show one of the tech symbols
            scene.add(techSymbols[currentSymbolIndex]);
          }
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearSymbols();
      techSymbols.forEach(symbol => {
        symbol.geometry.dispose();
        symbol.material.dispose();
      });
      strikeMesh.geometry.dispose();
      strikeMesh.material.dispose();
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