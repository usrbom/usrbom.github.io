"use client";

import {
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

type InteractiveGridBackgroundProps = {
  children: ReactNode;
  interactive?: boolean;
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: number;
  targetActive: number;
};

const GRID_SPACING = 38;
const SAMPLE_STEP = 6;
const WARP_RADIUS = 140;
const WARP_STRENGTH = 20;
const SETTLE_EPSILON = 0.12;

function ease(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

export default function InteractiveGridBackground({
  children,
  interactive = true,
}: InteractiveGridBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const startRenderRef = useRef<() => void>(() => {});
  const drawSizeRef = useRef({ width: 0, height: 0 });
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: 0,
    targetActive: 0,
  });

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const cancelFrame = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const resizeCanvas = () => {
      const rect = root.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const dpr = window.devicePixelRatio || 1;

      drawSizeRef.current = { width, height };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pointer = pointerRef.current;
      if (pointer.x === 0 && pointer.y === 0) {
        pointer.x = width / 2;
        pointer.y = height * 0.18;
        pointer.targetX = pointer.x;
        pointer.targetY = pointer.y;
      }
    };

    const warpPoint = (x: number, y: number, pointer: PointerState) => {
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);

      if (distance === 0 || distance > WARP_RADIUS) {
        return { x, y };
      }

      const distanceRatio = distance / WARP_RADIUS;
      const falloff = (1 - distanceRatio * distanceRatio) ** 2;
      const lift = WARP_STRENGTH * pointer.active * falloff;
      const nx = dx / distance;
      const ny = dy / distance;

      return {
        x: x + nx * lift,
        y: y + ny * lift * 0.72,
      };
    };

    const drawWarpedLine = (
      start: number,
      end: number,
      fixed: number,
      vertical: boolean,
      pointer: PointerState
    ) => {
      context.beginPath();

      for (let variable = start; variable <= end + SAMPLE_STEP; variable += SAMPLE_STEP) {
        const baseX = vertical ? fixed : variable;
        const baseY = vertical ? variable : fixed;
        const point = warpPoint(baseX, baseY, pointer);

        if (variable === start) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      }

      context.stroke();
    };

    const render = () => {
      const { width, height } = drawSizeRef.current;
      const pointer = pointerRef.current;

      pointer.x = ease(pointer.x, pointer.targetX, 0.14);
      pointer.y = ease(pointer.y, pointer.targetY, 0.14);
      pointer.active = ease(pointer.active, pointer.targetActive, 0.12);

      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(0, 64, 224, 0.07)";
      context.lineWidth = 1;

      for (let x = 0; x <= width + GRID_SPACING; x += GRID_SPACING) {
        drawWarpedLine(0, height, x, true, pointer);
      }

      for (let y = 0; y <= height + GRID_SPACING; y += GRID_SPACING) {
        drawWarpedLine(0, width, y, false, pointer);
      }

      const shouldContinue =
        Math.abs(pointer.x - pointer.targetX) > SETTLE_EPSILON ||
        Math.abs(pointer.y - pointer.targetY) > SETTLE_EPSILON ||
        Math.abs(pointer.active - pointer.targetActive) > SETTLE_EPSILON ||
        pointer.active > SETTLE_EPSILON;

      if (shouldContinue) {
        frameRef.current = window.requestAnimationFrame(render);
      } else {
        frameRef.current = null;
      }
    };

    const startRender = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(render);
    };

    startRenderRef.current = startRender;
    resizeCanvas();
    render();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      startRender();
    });

    resizeObserver.observe(root);
    window.addEventListener("resize", startRender);

    return () => {
      cancelFrame();
      resizeObserver.disconnect();
      window.removeEventListener("resize", startRender);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointer = pointerRef.current;

    pointer.targetX = event.clientX - bounds.left;
    pointer.targetY = event.clientY - bounds.top;
    pointer.targetActive = 1;
    startRenderRef.current();
  };

  const handlePointerLeave = () => {
    if (!interactive) return;

    pointerRef.current.targetActive = 0;
    startRenderRef.current();
  };

  return (
    <div
      ref={rootRef}
      className="interactive-grid relative isolate"
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? handlePointerLeave : undefined}
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(0,64,224,0.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(0,193,253,0.16),transparent_28%)]" />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="interactive-grid-canvas absolute inset-0 -z-10 h-full w-full"
      />
      {children}
    </div>
  );
}
