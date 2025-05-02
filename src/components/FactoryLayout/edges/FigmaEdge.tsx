import { useTheme } from '@mui/material';
import { Edge, EdgeProps, useReactFlow } from '@xyflow/react';
import React, { useEffect, useState } from 'react';

export interface Segment {
  id: number;
  type: 'H' | 'V';
  from: [number, number];
  to: [number, number];
}

export interface FigmaEdgeData extends Record<string, unknown> {
  segments?: Segment[];
}

export const reduceSegments = (segments: Segment[]) => {
  if (segments.length <= 3) {
    return segments;
  }

  const reduced: Segment[] = [];
  let i = 0;

  while (i < segments.length) {
    const curr = segments[i];
    const next = segments[i + 1];
    const afterNext = segments[i + 2];

    if (
      next &&
      afterNext &&
      curr.to[0] === afterNext.from[0] &&
      curr.to[1] === afterNext.from[1]
    ) {
      // Collapse i, i+1, i+2 into one segment
      reduced.push({
        id: curr.id,
        type: curr.type,
        from: curr.from,
        to: afterNext.to,
      });
      i += 3; // Skip 3 segments
    } else {
      reduced.push(curr);
      i += 1;
    }
  }

  return reduced;
};

const NEW_SEGMENT_OFFSET = 12;
const ANCHOR_WIDTH = 8;
const ANCHOR_HEIGHT = 4;

const FigmaEdge: React.FC<EdgeProps<Edge<FigmaEdgeData>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  markerEnd,
}) => {
  const { setEdges } = useReactFlow();
  const [segments, setSegments] = useState<Segment[]>(() => {
    if (data?.segments) {
      return data.segments;
    }
    const midX = (sourceX + targetX) / 2;
    const initialSegments: Segment[] = [
      { id: 1, type: 'H', from: [sourceX, sourceY], to: [midX, sourceY] },
      { id: 2, type: 'V', from: [midX, sourceY], to: [midX, targetY] },
      { id: 3, type: 'H', from: [midX, targetY], to: [targetX, targetY] },
    ];
    return initialSegments;
  });
  const [hovered, setHovered] = useState(false);

  const { screenToFlowPosition } = useReactFlow();

  // Update edge data in React Flow
  useEffect(() => {
    setEdges((eds) =>
      eds.map((e) =>
        e.id === id ? { ...e, data: { ...e.data, segments } } : e
      )
    );
  }, [segments, id, setEdges]);

  // Generate SVG path from segments
  const pathD = segments.reduce((acc, seg, idx) => {
    const [fromX, fromY] = seg.from;
    const [toX, toY] = seg.to;
    return acc + (idx === 0 ? `M ${fromX},${fromY} ` : '') + `L ${toX},${toY} `;
  }, '');

  // Calculate anchor positions
  const anchors = segments.map((seg) => {
    const [fromX, fromY] = seg.from;
    const [toX, toY] = seg.to;
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    return { id: seg.id, type: seg.type, position: [midX, midY] };
  });

  // Handle anchor drag
  const handleDrag = (id: number, rawX: number, rawY: number) => {
    const x = Math.round(rawX);
    const y = Math.round(rawY);
    setSegments((prevSegments) => {
      if (!prevSegments) return prevSegments;
      let newSegments: Segment[] = [...prevSegments];
      const index = newSegments.findIndex((s) => s.id === id);
      const seg = newSegments[index];

      if (seg.type === 'V') {
        // Move vertical segment horizontally
        seg.from[0] = x;
        seg.to[0] = x;
        // Adjust adjacent horizontal segments
        if (index > 0 && newSegments[index - 1].type === 'H') {
          newSegments[index - 1].to[0] = x;
        }
        if (
          index < newSegments.length - 1 &&
          newSegments[index + 1].type === 'H'
        ) {
          newSegments[index + 1].from[0] = x;
        }
      } else if (seg.type === 'H') {
        // Move horizontal segment vertically
        seg.from[1] = y;
        seg.to[1] = y;
        // Adjust adjacent vertical segments
        if (index > 0 && newSegments[index - 1].type === 'V') {
          newSegments[index - 1].to[1] = y;
        }
        if (
          index < newSegments.length - 1 &&
          newSegments[index + 1].type === 'V'
        ) {
          newSegments[index + 1].from[1] = y;
        }
      }

      const originalFirst = newSegments[0];
      const originalLast = newSegments[newSegments.length - 1];

      if (originalFirst.from[1] !== sourceY) {
        newSegments = [
          {
            id: originalFirst.id - 2,
            type: 'H',
            from: [sourceX, sourceY],
            to: [sourceX + NEW_SEGMENT_OFFSET, sourceY],
          },
          {
            id: originalFirst.id - 1,
            type: 'V',
            from: [sourceX + NEW_SEGMENT_OFFSET, sourceY],
            to: [sourceX + NEW_SEGMENT_OFFSET, originalFirst.from[1]],
          },
          {
            ...originalFirst,
            from: [sourceX + NEW_SEGMENT_OFFSET, originalFirst.from[1]],
          },
          ...newSegments.slice(1),
        ];
      }
      if (originalLast.to[1] !== targetY) {
        newSegments = [
          ...newSegments.slice(0, newSegments.length - 1),
          {
            ...originalLast,
            to: [targetX - NEW_SEGMENT_OFFSET, originalLast.to[1]],
          },
          {
            id: originalLast.id + 1,
            type: 'V',
            from: [targetX - NEW_SEGMENT_OFFSET, originalLast.to[1]],
            to: [targetX - NEW_SEGMENT_OFFSET, targetY],
          },
          {
            id: originalLast.id + 2,
            type: 'H',
            from: [targetX - NEW_SEGMENT_OFFSET, targetY],
            to: [targetX, targetY],
          },
        ];
      }
      // // Remove any segments that are now redundant
      // newSegments = newSegments.filter((seg, idx) => {
      //   if (idx === 0) return true; // Keep the first segment
      //   if (idx === newSegments.length - 1) return true; // Keep the last segment
      //   return seg.from[0] !== seg.to[0] && seg.from[1] !== seg.to[1];
      // });

      return newSegments;
    });
  };

  React.useLayoutEffect(() => {
    setSegments((prevSegments) => {
      const newSegments = [...prevSegments];
      newSegments[0].from[0] = sourceX;
      newSegments[0].from[1] = sourceY;
      newSegments[0].to[1] = sourceY;
      newSegments[1].from[1] = sourceY;

      newSegments[newSegments.length - 2].to[1] = targetY;
      newSegments[newSegments.length - 1].from[1] = targetY;
      newSegments[newSegments.length - 1].to[0] = targetX;
      newSegments[newSegments.length - 1].to[1] = targetY;
      return reduceSegments(newSegments);
    });
  }, [sourceX, sourceY, targetX, targetY]);

  const [pointerOver, setPointerOver] = useState<number | null>(null);

  const [selectedAnchor, setSelectedAnchor] = useState<{
    id: number;
    startX: number;
    startY: number;
  } | null>(null);

  React.useEffect(() => {
    if (selectedAnchor) {
      const onMouseMove = (e: MouseEvent) => {
        const end = screenToFlowPosition({ x: e.clientX, y: e.clientY });

        handleDrag(selectedAnchor.id, end.x, end.y);
      };

      const onMouseUp = () => {
        setSelectedAnchor(null);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [selectedAnchor, screenToFlowPosition]);

  const theme = useTheme();

  return (
    <>
      <path
        id={id}
        d={pathD}
        fill="none"
        stroke={
          hovered || pointerOver !== null
            ? theme.palette.secondary.main
            : theme.palette.divider
        }
        strokeWidth={2}
        markerEnd={markerEnd}
      />
      <path
        id={id}
        d={pathD}
        fill="none"
        stroke="none"
        strokeWidth={10}
        markerEnd={markerEnd}
        style={{ pointerEvents: 'all' }}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <g>
        {anchors.map((anchor) => {
          const [cx, cy] = anchor.position;
          return (
            <rect
              className="nopan"
              key={anchor.id}
              x={
                anchor.type === 'H'
                  ? cx - ANCHOR_WIDTH / 2
                  : cx - ANCHOR_HEIGHT / 2
              }
              y={
                anchor.type === 'H'
                  ? cy - ANCHOR_HEIGHT / 2
                  : cy - ANCHOR_WIDTH / 2
              }
              width={anchor.type === 'H' ? ANCHOR_WIDTH : ANCHOR_HEIGHT}
              height={anchor.type === 'H' ? ANCHOR_HEIGHT : ANCHOR_WIDTH}
              rx={1}
              fill={
                selectedAnchor?.id === anchor.id
                  ? theme.palette.primary.main
                  : '#fff'
              }
              stroke="none"
              style={{
                pointerEvents: 'all',
                opacity: hovered || pointerOver !== null ? 1 : 0,
                cursor: selectedAnchor ? 'grabbing' : 'pointer',
                zIndex: 9999,
              }}
              onPointerOver={() => {
                setPointerOver(anchor.id);
              }}
              onPointerLeave={() => {
                setPointerOver(null);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedAnchor({
                  id: anchor.id,
                  startX: e.clientX,
                  startY: e.clientY,
                });
              }}
              onMouseUp={() => {
                setSegments((prevSegments) => reduceSegments(prevSegments));
              }}
            />
          );
        })}
      </g>
    </>
  );
};

export default FigmaEdge;
