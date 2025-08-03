'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type ShapeType = 'rect' | 'circle' | 'poly';

interface Shape {
  type: ShapeType;
  coords: number[];
  id: string;
  color: string;
  href: string;
  title: string;
}

const ImageMapCreator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentShape, setCurrentShape] = useState<ShapeType>('rect');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCoords, setTempCoords] = useState<number[]>([]);
  const [editingShape, setEditingShape] = useState<Shape | null>(null);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [liveCoords, setLiveCoords] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const animationFrameRef = useRef<number>(0);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Modern color palette
  const colors = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    background: '#1e293b',
    card: '#334155',
    text: '#f8fafc',
    error: '#ef4444',
    success: '#10b981'
  };

  // Get accurate mouse position relative to canvas
  const getCanvasCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 };

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    lastMousePos.current = { x, y };
    return { x, y };
  }, []);

  // Optimized drawing function using requestAnimationFrame
  const drawAllShapes = useCallback((ctx: CanvasRenderingContext2D, editingCoords: number[] | null = null) => {
    if (!canvasRef.current) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Redraw the image first
    if (image) {
      const img = new Image();
      img.src = image;
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    // Draw all shapes
    shapes.forEach(shape => {
      const isSelected = editingShape?.id === shape.id;
      ctx.strokeStyle = isSelected ? colors.accent : shape.color;
      ctx.fillStyle = isSelected ? `${shape.color}22` : `${shape.color}22`;
      ctx.lineWidth = isSelected ? 3 : 2;

      const coords = isSelected && editingCoords ? editingCoords : shape.coords;

      if (shape.type === 'rect') {
        const [x1, y1, x2, y2] = coords;
        ctx.beginPath();
        ctx.rect(x1, y1, x2 - x1, y2 - y1);
        ctx.stroke();
        ctx.fill();

        if (isSelected) {
          ctx.fillStyle = colors.accent;
          const points = [
            [x1, y1], [x2, y1], [x2, y2], [x1, y2] // corners
          ];
          points.forEach(([px, py]) => {
            ctx.beginPath();
            ctx.rect(px - 4, py - 4, 8, 8);
            ctx.fill();
          });
        }
      } else if (shape.type === 'circle') {
        const [cx, cy, r] = coords;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();

        if (isSelected) {
          ctx.fillStyle = colors.accent;
          // Center point
          ctx.beginPath();
          ctx.rect(cx - 4, cy - 4, 8, 8);
          ctx.fill();
          // Radius point
          ctx.beginPath();
          ctx.rect(cx + r - 4, cy - 4, 8, 8);
          ctx.fill();
          // Connecting line
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + r, cy);
          ctx.strokeStyle = colors.accent;
          ctx.stroke();
        }
      } else if (shape.type === 'poly') {
        ctx.beginPath();
        ctx.moveTo(coords[0], coords[1]);
        for (let i = 2; i < coords.length; i += 2) {
          ctx.lineTo(coords[i], coords[i + 1]);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        if (isSelected) {
          ctx.fillStyle = colors.accent;
          for (let i = 0; i < coords.length; i += 2) {
            ctx.beginPath();
            ctx.rect(coords[i] - 4, coords[i + 1] - 4, 8, 8);
            ctx.fill();
          }
        }
      }
    });

    // Draw temporary shape if drawing
    if (isDrawing && tempCoords.length > 0) {
      const { x, y } = lastMousePos.current;
      ctx.strokeStyle = colors.accent;
      ctx.fillStyle = `${colors.accent}33`;
      ctx.lineWidth = 2;

      if (currentShape === 'rect' && tempCoords.length === 2) {
        const [x1, y1] = tempCoords;
        ctx.beginPath();
        ctx.rect(x1, y1, x - x1, y - y1);
        ctx.stroke();
        ctx.fill();
      } else if (currentShape === 'circle' && tempCoords.length === 2) {
        const [x1, y1] = tempCoords;
        const radius = Math.round(Math.sqrt((x - x1) ** 2 + (y - y1) ** 2));
        ctx.beginPath();
        ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
      } else if (currentShape === 'poly') {
        ctx.beginPath();
        ctx.moveTo(tempCoords[0], tempCoords[1]);
        for (let i = 2; i < tempCoords.length; i += 2) {
          ctx.lineTo(tempCoords[i], tempCoords[i + 1]);
        }
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  }, [image, shapes, editingShape, isDrawing, tempCoords, currentShape, colors]);

  // Animation loop for smooth editing
  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    drawAllShapes(ctx, liveCoords.length > 0 ? liveCoords : null);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawAllShapes, liveCoords]);

  // Start animation loop when component mounts
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        setShapes([]);
        setEditingShape(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return; // Only left click for drawing

    const { x, y } = getCanvasCoordinates(e);

    // Check if we're clicking on a point of the editing shape
    if (editingShape) {
      const pointIndex = findPointAtPosition(x, y, editingShape);
      if (pointIndex !== null) {
        setIsEditing(true);
        setActivePointIndex(pointIndex);
        return;
      }

      // Check if we're clicking inside the shape to drag it
      if (isPointInShape(x, y, editingShape)) {
        setIsDragging(true);

        // Calculate offset from shape's center or first point
        if (editingShape.type === 'rect') {
          const [x1, y1, x2, y2] = editingShape.coords;
          const centerX = (x1 + x2) / 2;
          const centerY = (y1 + y2) / 2;
          setDragOffset({ x: x - centerX, y: y - centerY });
        } else if (editingShape.type === 'circle') {
          const [cx, cy] = editingShape.coords;
          setDragOffset({ x: x - cx, y: y - cy });
        } else if (editingShape.type === 'poly') {
          // For polygon, use first point as reference
          setDragOffset({ x: x - editingShape.coords[0], y: y - editingShape.coords[1] });
        }
        return;
      }
    }

    // Check if we're clicking on any shape to select it
    const clickedShape = findShapeAtPosition(x, y);
    if (clickedShape) {
      setEditingShape(clickedShape);
      return;
    }

    // Start drawing new shape
    if (currentShape === 'poly') {
      if (!isDrawing) {
        setIsDrawing(true);
        setTempCoords([x, y]);
      } else {
        setTempCoords(prev => [...prev, x, y]);
      }
    } else {
      setIsDrawing(true);
      setTempCoords([x, y]);
    }
  };

  const findPointAtPosition = (x: number, y: number, shape: Shape): number | null => {
    const pointRadius = 10;

    if (shape.type === 'rect') {
      const [x1, y1, x2, y2] = shape.coords;
      const points = [
        [x1, y1], [x2, y1], [x2, y2], [x1, y2] // corners
      ];

      for (let i = 0; i < points.length; i++) {
        const [px, py] = points[i];
        if (Math.sqrt((x - px) ** 2 + (y - py) ** 2) <= pointRadius) {
          return i;
        }
      }
    }
    else if (shape.type === 'circle') {
      const [cx, cy, r] = shape.coords;
      // Center point
      if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= pointRadius) return 0;
      // Radius point
      if (Math.sqrt((x - (cx + r)) ** 2 + (y - cy) ** 2) <= pointRadius) return 1;
    }
    else if (shape.type === 'poly') {
      for (let i = 0; i < shape.coords.length; i += 2) {
        const px = shape.coords[i];
        const py = shape.coords[i + 1];
        if (Math.sqrt((x - px) ** 2 + (y - py) ** 2) <= pointRadius) {
          return i / 2;
        }
      }
    }

    return null;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const { x, y } = getCanvasCoordinates(e);

    if (isDragging && editingShape) {
      // Calculate new coordinates based on drag position
      const newCoords = [...editingShape.coords];

      if (editingShape.type === 'rect') {
        const [x1, y1, x2, y2] = editingShape.coords;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = x - dragOffset.x - width / 2;
        const newY1 = y - dragOffset.y - height / 2;
        newCoords[0] = newX1;
        newCoords[1] = newY1;
        newCoords[2] = newX1 + width;
        newCoords[3] = newY1 + height;
      }
      else if (editingShape.type === 'circle') {
        newCoords[0] = x - dragOffset.x;
        newCoords[1] = y - dragOffset.y;
      }
      else if (editingShape.type === 'poly') {
        const offsetX = x - dragOffset.x - editingShape.coords[0];
        const offsetY = y - dragOffset.y - editingShape.coords[1];
        for (let i = 0; i < newCoords.length; i += 2) {
          newCoords[i] += offsetX;
          newCoords[i + 1] += offsetY;
        }
        // Update drag offset for next move
        setDragOffset({
          x: x - newCoords[0],
          y: y - newCoords[1]
        });
      }

      setLiveCoords(newCoords);
      return;
    }

    if (isEditing && editingShape && activePointIndex !== null) {
      // Create a new copy of coordinates with the updated point
      const newCoords = [...editingShape.coords];

      if (editingShape.type === 'rect') {
        // For rectangles, update based on which corner is being dragged
        if (activePointIndex === 0) { // top-left
          newCoords[0] = x;
          newCoords[1] = y;
        } else if (activePointIndex === 1) { // top-right
          newCoords[2] = x;
          newCoords[1] = y;
        } else if (activePointIndex === 2) { // bottom-right
          newCoords[2] = x;
          newCoords[3] = y;
        } else if (activePointIndex === 3) { // bottom-left
          newCoords[0] = x;
          newCoords[3] = y;
        }
      } else if (editingShape.type === 'circle') {
        if (activePointIndex === 0) {
          // Moving center - keep radius the same
          newCoords[0] = x;
          newCoords[1] = y;
        } else if (activePointIndex === 1) {
          // Moving radius point - update radius and round to integer
          const radius = Math.round(Math.sqrt((x - newCoords[0]) ** 2 + (y - newCoords[1]) ** 2));
          newCoords[2] = radius;
        }
      } else if (editingShape.type === 'poly') {
        // For polygons, just update the coordinates
        newCoords[activePointIndex * 2] = x;
        newCoords[activePointIndex * 2 + 1] = y;
      }

      setLiveCoords(newCoords);
      return;
    }

    if (!isDrawing || tempCoords.length === 0) return;
  };

  const finishDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      if (editingShape && liveCoords.length > 0) {
        // Update the shapes array with the edited shape
        const updatedShape = { ...editingShape, coords: liveCoords };
        setShapes(shapes.map(shape =>
          shape.id === updatedShape.id ? updatedShape : shape
        ));
        setEditingShape(updatedShape);
      }
      setIsDragging(false);
      setLiveCoords([]);
      return;
    }

    if (isEditing) {
      if (editingShape && liveCoords.length > 0) {
        // Update the shapes array with the edited shape
        const updatedShape = { ...editingShape, coords: liveCoords };
        setShapes(shapes.map(shape =>
          shape.id === updatedShape.id ? updatedShape : shape
        ));
        setEditingShape(updatedShape);
      }
      setIsEditing(false);
      setActivePointIndex(null);
      setLiveCoords([]);
      return;
    }

    if (!isDrawing || tempCoords.length === 0) return;

    const { x, y } = getCanvasCoordinates(e);
    let newShape: Shape | null = null;

    if (currentShape === 'rect' && tempCoords.length === 2) {
      const [x1, y1] = tempCoords;
      newShape = createShape('rect', [x1, y1, x, y]);
    } else if (currentShape === 'circle' && tempCoords.length === 2) {
      const [x1, y1] = tempCoords;
      // Round the radius to the nearest integer
      const radius = Math.round(Math.sqrt((x - x1) ** 2 + (y - y1) ** 2));
      newShape = createShape('circle', [x1, y1, radius]);
    } else if (currentShape === 'poly' && tempCoords.length >= 6) {
      if (e.detail === 2 || e.button === 2) { // Double click or right click to finish
        newShape = createShape('poly', [...tempCoords]);
        setIsDrawing(false);
      } else {
        return;
      }
    }

    if (newShape) {
      setEditingShape(newShape);
      setShapes(prev => [...prev, newShape!]);
      setTempCoords([]);
      setIsDrawing(false);
    } else if (currentShape !== 'poly') {
      setIsDrawing(false);
      setTempCoords([]);
    }
  };

  const handleShapeClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing || isEditing || isDragging) return;

    const { x, y } = getCanvasCoordinates(e);
    const clickedShape = findShapeAtPosition(x, y);

    if (clickedShape) {
      setEditingShape(clickedShape);
    } else {
      setEditingShape(null);
    }
  };

  const findShapeAtPosition = (x: number, y: number): Shape | null => {
    for (const shape of shapes) {
      if (isPointInShape(x, y, shape)) {
        return shape;
      }
    }
    return null;
  };

  const isPointInShape = (x: number, y: number, shape: Shape): boolean => {
    if (shape.type === 'rect') {
      const [x1, y1, x2, y2] = shape.coords;
      return x >= Math.min(x1, x2) && x <= Math.max(x1, x2) &&
        y >= Math.min(y1, y2) && y <= Math.max(y1, y2);
    } else if (shape.type === 'circle') {
      const [cx, cy, r] = shape.coords;
      return Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= r;
    } else if (shape.type === 'poly') {
      let inside = false;
      for (let i = 0, j = shape.coords.length - 2; i < shape.coords.length; j = i, i += 2) {
        const xi = shape.coords[i], yi = shape.coords[i + 1];
        const xj = shape.coords[j], yj = shape.coords[j + 1];

        const intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }
    return false;
  };

  const createShape = (type: ShapeType, coords: number[]): Shape => {
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#f97316',
      '#10b981', '#3b82f6', '#ef4444', '#f59e0b'
    ];
    return {
      type,
      coords,
      id: Date.now().toString(),
      color: colors[Math.floor(Math.random() * colors.length)],
      href: '#',
      title: ''
    };
  };

  const removeShape = (id: string) => {
    setShapes(shapes.filter(shape => shape.id !== id));
    if (editingShape?.id === id) {
      setEditingShape(null);
    }
  };

  const updateShape = (updates: Partial<Shape>) => {
    if (!editingShape) return;

    const updatedShape = { ...editingShape, ...updates };
    setEditingShape(updatedShape);

    setShapes(prev =>
      prev.map(shape =>
        shape.id === updatedShape.id ? updatedShape : shape
      )
    );
  };

  const generateImageMap = () =>
    `<map name="image-map">\n` +
    shapes.map(s =>
      `  <area shape="${s.type}" coords="${s.coords.join(',')}" href="${s.href}" title="${s.title}" alt="${s.title || s.type + ' area'}" />`
    ).join('\n') +
    `\n</map>`;

  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const img = new Image();
    img.onload = () => {
      if (!canvasRef.current) return;

      // Set canvas size to actual image dimensions for better quality
      canvasRef.current.width = img.naturalWidth;
      canvasRef.current.height = img.naturalHeight;
    };
    img.src = image;
  }, [image]);

  return (
    <div style={{
      maxWidth: '100%',
      margin: 'auto',
      padding: 20,
      backgroundColor: colors.background,
      color: colors.text,
      borderRadius: 12
    }}>
      <h1 style={{
        fontSize: 28,
        marginBottom: 20,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        🖼️ Image Map Creator
      </h1>

      <div style={{
        marginBottom: 20,
        padding: 20,
        backgroundColor: colors.card,
        borderRadius: 8
      }}>
        <label style={{ display: 'block', marginBottom: 10 }}>
          <span style={{ display: 'block', marginBottom: 5 }}>Upload Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 6,
              border: `1px solid ${colors.primary}`,
              backgroundColor: 'transparent',
              color: colors.text
            }}
          />
        </label>
      </div>

      <div style={{
        margin: '20px 0',
        padding: 20,
        backgroundColor: colors.card,
        borderRadius: 8
      }}>
        <h2 style={{ marginTop: 0, marginBottom: 15 }}>Shape Tools</h2>
        <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentShape('rect')}
            style={{
              padding: '10px 20px',
              background: currentShape === 'rect' ? colors.primary : colors.card,
              color: colors.text,
              border: `1px solid ${currentShape === 'rect' ? colors.primary : '#475569'}`,
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: currentShape === 'rect' ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            Rectangle
          </button>
          <button
            onClick={() => setCurrentShape('circle')}
            style={{
              padding: '10px 20px',
              background: currentShape === 'circle' ? colors.primary : colors.card,
              color: colors.text,
              border: `1px solid ${currentShape === 'circle' ? colors.primary : '#475569'}`,
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: currentShape === 'circle' ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            Circle
          </button>
          <button
            onClick={() => setCurrentShape('poly')}
            style={{
              padding: '10px 20px',
              background: currentShape === 'poly' ? colors.primary : colors.card,
              color: colors.text,
              border: `1px solid ${currentShape === 'poly' ? colors.primary : '#475569'}`,
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: currentShape === 'poly' ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            Polygon
          </button>
        </div>
      </div>



      {/* Large image display */}
      <div style={{
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: colors.card,
        padding: 20,
        borderRadius: 8
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={finishDrawing}
            onClick={handleShapeClick}
            onMouseLeave={() => {
              setIsDrawing(false);
              setIsEditing(false);
              setIsDragging(false);
              setActivePointIndex(null);
              setLiveCoords([]);
            }}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              cursor: isEditing ? 'grab' : isDragging ? 'grabbing' : 'crosshair',
              borderRadius: 8,
              border: `2px solid ${colors.primary}`
            }}
          />
          {!image && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 8,
              color: colors.text,
              minHeight: '300px'
            }}>
              Please upload an image to start
            </div>
          )}
        </div>
      </div>

      {editingShape && (
        <div style={{
          marginBottom: 20,
          padding: 20,
          backgroundColor: colors.card,
          borderRadius: 8,
          borderLeft: `4px solid ${editingShape.color}`
        }}>
          <h3 style={{ marginTop: 0, marginBottom: 15 }}>Edit Area</h3>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>URL:</label>
            <input
              type="text"
              value={editingShape.href}
              onChange={(e) => updateShape({ href: e.target.value })}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: `1px solid ${colors.primary}`,
                backgroundColor: 'transparent',
                color: colors.text
              }}
              placeholder="https://example.com"
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>Title:</label>
            <input
              type="text"
              value={editingShape.title}
              onChange={(e) => updateShape({ title: e.target.value })}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: `1px solid ${colors.primary}`,
                backgroundColor: 'transparent',
                color: colors.text
              }}
              placeholder="Area description"
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>Coordinates:</label>
            <div style={{
              padding: 10,
              backgroundColor: '#1e293b',
              borderRadius: 6,
              fontFamily: 'monospace',
              wordBreak: 'break-all'
            }}>
              {liveCoords.length > 0 ? liveCoords.join(', ') : editingShape.coords.join(', ')}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <button
              onClick={() => removeShape(editingShape.id)}
              style={{
                padding: '10px 20px',
                background: colors.error,
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                flex: 1
              }}
            >
              Delete Area
            </button>
            <button
              onClick={() => setEditingShape(null)}
              style={{
                padding: '10px 20px',
                background: colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                flex: 1
              }}
            >
              Done Editing
            </button>
          </div>
        </div>
      )}



      {shapes.length > 0 && (
        <div style={{
          marginBottom: 20,
          padding: 20,
          backgroundColor: colors.card,
          borderRadius: 8
        }}>
          <h3 style={{ marginTop: 0, marginBottom: 15 }}>Edit Areas</h3>

          <div style={{
            overflowX: 'auto',
            marginBottom: 20
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              color: colors.text
            }}>
              <thead>
                <tr style={{
                  backgroundColor: '#1e293b',
                  borderBottom: `1px solid ${colors.primary}`
                }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Active</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Shape</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Link</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Title</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Target</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shapes.map((shape) => (
                  <tr
                    key={shape.id}
                    style={{
                      borderBottom: `1px solid #334155`,
                      backgroundColor: editingShape?.id === shape.id ? '#1e293b' : 'transparent',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <input
                        type="checkbox"
                        checked={editingShape?.id === shape.id}
                        onChange={() => setEditingShape(shape)}
                        style={{
                          accentColor: colors.primary,
                          cursor: 'pointer'
                        }}
                      />
                    </td>
                    <td style={{ padding: '12px 16px', color: shape.color }}>
                      {shape.type.charAt(0).toUpperCase() + shape.type.slice(1)}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <input
                        type="text"
                        value={shape.href}
                        onChange={(e) => updateShape({
                          ...shape,
                          href: e.target.value
                        })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: 4,
                          border: `1px solid #334155`,
                          backgroundColor: 'transparent',
                          color: colors.text
                        }}
                        placeholder="Enter URL"
                      />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <input
                        type="text"
                        value={shape.title}
                        onChange={(e) => updateShape({
                          ...shape,
                          title: e.target.value
                        })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: 4,
                          border: `1px solid #334155`,
                          backgroundColor: 'transparent',
                          color: colors.text
                        }}
                        placeholder="Enter title"
                      />
                    </td>
                    <td style={{ padding: '12px 16px', color: '#94a3b8' }}>
                      --
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        onClick={() => removeShape(shape.id)}
                        style={{
                          padding: '6px 12px',
                          background: colors.error,
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          transition: 'all 0.2s'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => {
                const newShape = createShape(currentShape, [50, 50, 150, 150]);
                setShapes([...shapes, newShape]);
                setEditingShape(newShape);
              }}
              style={{
                padding: '10px 20px',
                background: colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              Add New Area
            </button>

            {editingShape && (
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{
                  padding: '10px 16px',
                  backgroundColor: '#1e293b',
                  borderRadius: 6,
                  fontFamily: 'monospace'
                }}>
                  Coords: {liveCoords.length > 0 ? liveCoords.join(', ') : editingShape.coords.join(', ')}
                </div>
                <button
                  onClick={() => setEditingShape(null)}
                  style={{
                    padding: '10px 20px',
                    background: colors.secondary,
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  Done Editing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{
        marginBottom: 20,
        backgroundColor: colors.card,
        padding: 20,
        borderRadius: 8
      }}>
        <h3 style={{ marginTop: 0 }}>Defined Areas</h3>
        {shapes.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No areas defined yet. Draw on the image to create areas.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 15
          }}>
            {shapes.map(s => (
              <div
                key={s.id}
                style={{
                  padding: 15,
                  backgroundColor: '#1e293b',
                  borderRadius: 6,
                  borderLeft: `4px solid ${s.color}`,
                  cursor: 'pointer',
                  border: editingShape?.id === s.id ? `2px solid ${colors.primary}` : '1px solid #334155',
                  transition: 'all 0.2s'
                }}
                onClick={() => setEditingShape(s)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontWeight: 'bold', color: s.color }}>
                    {s.type.toUpperCase()}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeShape(s.id);
                    }}
                    style={{
                      padding: '4px 8px',
                      background: colors.error,
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 5 }}>
                  Coordinates: [{s.coords.join(', ')}]
                </div>
                {s.href && (
                  <div style={{ marginTop: 5 }}>
                    <div style={{ fontSize: 12, color: '#64748b' }}>URL:</div>
                    <div style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: 14
                    }}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: colors.primary }}>
                        {s.href}
                      </a>
                    </div>
                  </div>
                )}
                {s.title && (
                  <div style={{ marginTop: 5 }}>
                    <div style={{ fontSize: 12, color: '#64748b' }}>Title:</div>
                    <div style={{ fontSize: 14 }}>{s.title}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageMapCreator;