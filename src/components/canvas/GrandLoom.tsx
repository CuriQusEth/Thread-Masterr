import { useEffect, useRef, useState } from 'react';
import { useGameStore, THREAD_COLORS, THREAD_GLOW, ThreadType } from '../../store/gameStore';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function GrandLoom() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { nodes, threads, activeType, initLevel, connectNodes, dragStartNode, setDragStartNode } = useGameStore();
  
  const [mousePos, setMousePos] = useState<{ x: number, y: number } | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Initialize nodes based on container size
  useEffect(() => {
    if (containerRef.current && nodes.length === 0) {
      const { clientWidth, clientHeight } = containerRef.current;
      initLevel(clientWidth, clientHeight);
    }
  }, [initLevel, nodes.length]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.016; // Approx 60fps
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background nebulas/vignette
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, 'rgba(20, 10, 40, 0.8)');
      gradient.addColorStop(1, 'rgba(5, 2, 10, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Interpolate drifting properties for nodes
      const driftingNodes = nodes.map(n => ({
        ...n,
        currentX: n.x + Math.sin(time + n.basePhase) * 10,
        currentY: n.y + Math.cos(time * 0.8 + n.basePhase) * 10,
      }));

      // Draw active threads
      threads.forEach(thread => {
        const start = driftingNodes.find(n => n.id === thread.startNodeId);
        const end = driftingNodes.find(n => n.id === thread.endNodeId);
        if (!start || !end) return;

        ctx.beginPath();
        ctx.moveTo(start.currentX, start.currentY);
        // Add a slight curve/sag
        const midX = (start.currentX + end.currentX) / 2;
        const midY = (start.currentY + end.currentY) / 2 + 20 * (thread.strength || 1);
        ctx.quadraticCurveTo(midX, midY, end.currentX, end.currentY);
        
        ctx.strokeStyle = THREAD_COLORS[thread.type];
        ctx.lineWidth = 2 + thread.strength;
        ctx.shadowBlur = 15;
        ctx.shadowColor = THREAD_GLOW[thread.type];
        ctx.stroke();

        // Animate cosmic energy along the thread
        const progress = (time * 0.5) % 1;
        const particleX = Math.pow(1 - progress, 2) * start.currentX + 2 * (1 - progress) * progress * midX + Math.pow(progress, 2) * end.currentX;
        const particleY = Math.pow(1 - progress, 2) * start.currentY + 2 * (1 - progress) * progress * midY + Math.pow(progress, 2) * end.currentY;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fff';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw dragging thread
      if (dragStartNode && mousePos) {
        const start = driftingNodes.find(n => n.id === dragStartNode);
        if (start) {
          ctx.beginPath();
          ctx.moveTo(start.currentX, start.currentY);
          const midX = (start.currentX + mousePos.x) / 2;
          const midY = (start.currentY + mousePos.y) / 2 + 20;
          ctx.quadraticCurveTo(midX, midY, mousePos.x, mousePos.y);
          ctx.strokeStyle = THREAD_COLORS[activeType];
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 10]);
          ctx.shadowBlur = 10;
          ctx.shadowColor = THREAD_GLOW[activeType];
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.shadowBlur = 0;
        }
      }

      // Draw Nodes
      driftingNodes.forEach(node => {
        const isHovered = mousePos && Math.hypot(node.currentX - mousePos.x, node.currentY - mousePos.y) < 25;
        const isDragging = dragStartNode === node.id;
        
        // Node core
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, isHovered ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle = node.type ? THREAD_COLORS[node.type] : '#e0e7ff';
        ctx.shadowBlur = isHovered || isDragging ? 20 : 10;
        ctx.shadowColor = node.type ? THREAD_GLOW[node.type] : '#c7d2fe';
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Node ring
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw resonance particles
      const newParticles = [];
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.life / p.maxLife * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        if (p.life > 0) newParticles.push(p);
      }
      particlesRef.current = newParticles;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes, threads, activeType, dragStartNode, mousePos]);

  // Interaction handlers
  const handleDown = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Find closest node
    const clickedNode = nodes.find(n => Math.hypot(n.x - x, n.y - y) < 30);
    if (clickedNode) {
      setDragStartNode(clickedNode.id);
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleUp = (clientX: number, clientY: number) => {
    if (!canvasRef.current || !dragStartNode) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const endNode = nodes.find(n => Math.hypot(n.x - x, n.y - y) < 30);
    
    if (endNode && endNode.id !== dragStartNode) {
      connectNodes(dragStartNode, endNode.id, activeType);
      
      // Spawn particles on connection
      const end = nodes.find(n => n.id === endNode.id)!;
      for (let i = 0; i < 10; i++) {
        particlesRef.current.push({
          x: end.x,
          y: end.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 30 + Math.random() * 20,
          maxLife: 50,
          color: THREAD_COLORS[activeType]
        });
      }
    }
    
    setDragStartNode(null);
    setMousePos(null);
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black touch-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseDown={e => handleDown(e.clientX, e.clientY)}
        onMouseMove={e => handleMove(e.clientX, e.clientY)}
        onMouseUp={e => handleUp(e.clientX, e.clientY)}
        onMouseLeave={() => { setDragStartNode(null); setMousePos(null); }}
        onTouchStart={e => { e.preventDefault(); handleDown(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchMove={e => { e.preventDefault(); handleMove(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchEnd={e => { e.preventDefault(); if (mousePos) handleUp(mousePos.x + canvasRef.current!.getBoundingClientRect().left, mousePos.y + canvasRef.current!.getBoundingClientRect().top) }}
      />
    </div>
  );
}
