import { useState, useCallback, useRef, useEffect } from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface FallingPiece {
  id: string;
  element: HTMLElement;
  rect: DOMRect;
  velocityY: number;
  rotation: number;
  rotationVelocity: number;
  translateX: number;
  translateY: number;
  landed: boolean;
}

interface CutControllerState {
  isCutting: boolean;
  cutPath: Point[];
}

export const useCutController = () => {
  const [state, setState] = useState<CutControllerState>({
    isCutting: false,
    cutPath: [],
  });

  const fallingPiecesRef = useRef<FallingPiece[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const startCutting = useCallback((point: Point) => {
    setState(prev => ({
      ...prev,
      isCutting: true,
      cutPath: [point],
    }));
  }, []);

  const continueCutting = useCallback((point: Point) => {
    if (!state.isCutting) return;

    setState(prev => ({
      ...prev,
      cutPath: [...prev.cutPath, point],
    }));
  }, [state.isCutting]);

  const endCutting = useCallback(() => {
    if (state.cutPath.length < 2) {
      setState(prev => ({
        ...prev,
        isCutting: false,
        cutPath: [],
      }));
      return;
    }

    detectAndCutElements(state.cutPath);

    setState(prev => ({
      ...prev,
      isCutting: false,
      cutPath: [],
    }));
  }, [state.cutPath]);

  const detectAndCutElements = (path: Point[]) => {
    const cuttableElements = document.querySelectorAll('[data-cuttable="true"]');
    
    cuttableElements.forEach((el) => {
      const element = el as HTMLElement;
      const rect = element.getBoundingClientRect();
      
      if (isPathIntersectingRect(path, rect)) {
        splitElement(element, rect, path);
      }
    });
  };

  const isPathIntersectingRect = (path: Point[], rect: DOMRect): boolean => {
    for (let i = 0; i < path.length - 1; i++) {
      const start = path[i];
      const end = path[i + 1];
      
      if (isLineIntersectingRect(start, end, rect)) {
        return true;
      }
    }
    return false;
  };

  const isLineIntersectingRect = (start: Point, end: Point, rect: DOMRect): boolean => {
    const left = rect.left;
    const right = rect.right;
    const top = rect.top;
    const bottom = rect.bottom;

    return (
      isPointInRect(start, rect) ||
      isPointInRect(end, rect) ||
      lineIntersectsLine(start, end, { x: left, y: top }, { x: right, y: top }) ||
      lineIntersectsLine(start, end, { x: right, y: top }, { x: right, y: bottom }) ||
      lineIntersectsLine(start, end, { x: right, y: bottom }, { x: left, y: bottom }) ||
      lineIntersectsLine(start, end, { x: left, y: bottom }, { x: left, y: top })
    );
  };

  const isPointInRect = (point: Point, rect: DOMRect): boolean => {
    return (
      point.x >= rect.left &&
      point.x <= rect.right &&
      point.y >= rect.top &&
      point.y <= rect.bottom
    );
  };

  const lineIntersectsLine = (
    p1: Point, p2: Point,
    p3: Point, p4: Point
  ): boolean => {
    const det = (p2.x - p1.x) * (p4.y - p3.y) - (p4.x - p3.x) * (p2.y - p1.y);
    if (det === 0) return false;

    const lambda = ((p4.y - p3.y) * (p4.x - p1.x) + (p3.x - p4.x) * (p4.y - p1.y)) / det;
    const gamma = ((p1.y - p2.y) * (p4.x - p1.x) + (p2.x - p1.x) * (p4.y - p1.y)) / det;

    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  };

  const splitElement = (element: HTMLElement, rect: DOMRect, path: Point[]) => {
    const cutY = calculateCutY(path, rect);
    
    const topPart = element.cloneNode(true) as HTMLElement;
    const bottomPart = element.cloneNode(true) as HTMLElement;

    const cutPosition = cutY - rect.top;
    const topHeight = cutPosition;
    const bottomHeight = rect.height - cutPosition;

    topPart.style.position = 'fixed';
    topPart.style.left = rect.left + 'px';
    topPart.style.top = rect.top + 'px';
    topPart.style.width = rect.width + 'px';
    topPart.style.height = topHeight + 'px';
    topPart.style.margin = '0';
    topPart.style.zIndex = '1000';
    topPart.style.pointerEvents = 'none';
    topPart.style.overflow = 'hidden';
    topPart.style.clipPath = `inset(0 0 ${100 - (topHeight / rect.height) * 100}% 0)`;
    topPart.dataset.cuttable = 'false';

    bottomPart.style.position = 'fixed';
    bottomPart.style.left = rect.left + 'px';
    bottomPart.style.top = cutY + 'px';
    bottomPart.style.width = rect.width + 'px';
    bottomPart.style.height = bottomHeight + 'px';
    bottomPart.style.margin = '0';
    bottomPart.style.zIndex = '1000';
    bottomPart.style.pointerEvents = 'none';
    bottomPart.style.overflow = 'hidden';
    bottomPart.style.clipPath = `inset(${cutPosition / rect.height * 100}% 0 0 0)`;
    bottomPart.dataset.cuttable = 'false';
    bottomPart.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';

    document.body.appendChild(topPart);
    document.body.appendChild(bottomPart);
    element.style.visibility = 'hidden';

    const newPiece: FallingPiece = {
      id: Date.now().toString() + Math.random().toString(),
      element: bottomPart,
      rect,
      velocityY: 2,
      rotation: (Math.random() - 0.5) * 30,
      rotationVelocity: (Math.random() - 0.5) * 5,
      translateX: 0,
      translateY: 0,
      landed: false,
    };

    fallingPiecesRef.current.push(newPiece);

    if (!animationFrameId.current) {
      startAnimationLoop();
    }
  };

  const calculateCutY = (path: Point[], rect: DOMRect): number => {
    let totalY = 0;
    let count = 0;

    for (const point of path) {
      if (point.x >= rect.left && point.x <= rect.right) {
        totalY += point.y;
        count++;
      }
    }

    if (count === 0) {
      for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        
        if (lineIntersectsLine(start, end, { x: rect.left, y: rect.top }, { x: rect.right, y: rect.top })) {
          return rect.top;
        }
        if (lineIntersectsLine(start, end, { x: rect.left, y: rect.bottom }, { x: rect.right, y: rect.bottom })) {
          return rect.bottom;
        }
      }
      return rect.top + rect.height / 2;
    }

    return totalY / count;
  };

  const startAnimationLoop = () => {
    const gravity = 0.5;
    const friction = 0.99;
    const groundY = window.innerHeight;

    const animate = () => {
      const pieces = fallingPiecesRef.current;
      let activeCount = 0;

      pieces.forEach((piece) => {
        if (piece.landed) return;

        const newVelocityY = piece.velocityY + gravity;
        const newTranslateY = piece.translateY + newVelocityY;
        const newRotation = piece.rotation + piece.rotationVelocity;
        const newRotationVelocity = piece.rotationVelocity * friction;

        const groundHit = piece.rect.top + piece.translateY + piece.rect.height >= groundY;

        if (groundHit) {
          piece.element.style.transform = `translate(${piece.translateX}px, ${groundY - piece.rect.top - piece.rect.height}px) rotate(${newRotation}deg)`;
          piece.element.style.opacity = '0.7';
          piece.element.style.filter = 'brightness(0.6)';
          piece.landed = true;

          setTimeout(() => {
            piece.element.remove();
            const index = fallingPiecesRef.current.findIndex(p => p.id === piece.id);
            if (index !== -1) {
              fallingPiecesRef.current.splice(index, 1);
            }
          }, 3000);
        } else {
          piece.element.style.transform = `translate(${piece.translateX}px, ${newTranslateY}px) rotate(${newRotation}deg)`;
          piece.velocityY = newVelocityY;
          piece.translateY = newTranslateY;
          piece.rotation = newRotation;
          piece.rotationVelocity = newRotationVelocity;
          activeCount++;
        }
      });

      if (activeCount > 0) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        animationFrameId.current = null;
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      fallingPiecesRef.current.forEach(piece => {
        piece.element.remove();
      });
      fallingPiecesRef.current = [];
    };
  }, []);

  return {
    isCutting: state.isCutting,
    cutPath: state.cutPath,
    startCutting,
    continueCutting,
    endCutting,
  };
};