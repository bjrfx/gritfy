import { useEffect, useRef } from "react";

type ParticlesProps = {
  id?: string;
  className?: string;
};

export default function Particles({ id = "particles-js", className = "" }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);
    
    // Particle properties
    const particlesArray: Particle[] = [];
    const numberOfParticles = 100;
    const maxSize = 5;
    const minSize = 1;
    const mouseRadius = 100;
    
    // Mouse position
    let mouse = {
      x: null as number | null,
      y: null as number | null,
    };
    
    window.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.x - rect.left;
      mouse.y = event.y - rect.top;
    });
    
    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsl(${207}, 90%, 54%, ${Math.random() * 0.5 + 0.2})`;
      }
      
      update() {
        // Move particles
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Boundary checking
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
        
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRadius) {
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 1;
            this.y -= Math.sin(angle) * 1;
          }
        }
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Create particles
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    init();
    
    // Connect particles with lines
    const connect = () => {
      if (!ctx) return;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${207}, 90%, 54%, ${0.1 - distance / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connect();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("mouseout", () => {});
    };
  }, [id]);
  
  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={`absolute inset-0 z-1 ${className}`}
    />
  );
}
