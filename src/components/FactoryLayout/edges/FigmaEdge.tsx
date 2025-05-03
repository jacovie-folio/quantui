import { useTheme } from '@mui/material';
import { Edge, EdgeProps, useReactFlow } from '@xyflow/react';
import React, { useEffect, useState } from 'react';
import { GRID_SIZE } from '../const';

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
      Math.abs(curr.to[0] - afterNext.from[0]) < NEW_SEGMENT_OFFSET / 2 &&
      Math.abs(curr.to[1] - afterNext.from[1]) < NEW_SEGMENT_OFFSET / 2
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

const NEW_SEGMENT_OFFSET = GRID_SIZE / 4;
const ANCHOR_WIDTH = GRID_SIZE / 2;
const ANCHOR_HEIGHT = GRID_SIZE / 4;

function generateRoundedPath(segments: Segment[], borderRadius: number) {
  if (segments.length === 0) return '';

  let pathD = '';
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const [fromX, fromY] = seg.from;
    const [toX, toY] = seg.to;

    if (i === 0) {
      pathD += `M ${fromX},${fromY} `;
    }

    // Check if there is a next segment to create a rounded corner
    const nextSeg = segments[i + 1];
    if (!nextSeg) {
      // No next segment, just draw a straight line to the end
      pathD += `L ${toX},${toY} `;
      break;
    }

    const [nextFromX, nextFromY] = nextSeg.from;
    const [nextToX, nextToY] = nextSeg.to;

    // Ensure continuity (optional): segments should be connected
    if (toX !== nextFromX || toY !== nextFromY) {
      pathD += `L ${toX},${toY} `;
      continue;
    }

    // Direction vectors
    const v1 = [toX - fromX, toY - fromY];
    const v2 = [nextToX - toX, nextToY - toY];

    const len1 = Math.hypot(...v1);
    const len2 = Math.hypot(...v2);

    const r = Math.min(borderRadius, len1 / 2, len2 / 2);

    // Unit vectors
    const u1 = [v1[0] / len1, v1[1] / len1];
    const u2 = [v2[0] / len2, v2[1] / len2];

    // Points before and after the corner
    const cornerStart = [toX - u1[0] * r, toY - u1[1] * r];
    const cornerEnd = [toX + u2[0] * r, toY + u2[1] * r];

    // Line to corner start
    pathD += `L ${cornerStart[0]},${cornerStart[1]} `;

    // Rounded corner via quadratic Bézier
    pathD += `Q ${toX},${toY} ${cornerEnd[0]},${cornerEnd[1]} `;
  }

  return pathD.trim();
}

export type FigmaEdge = Edge<FigmaEdgeData, 'figma'>;

const roundCoord = (c: number) =>
  Math.round(c / (GRID_SIZE / 4)) * (GRID_SIZE / 4);
const roundCoords = (cs: [number, number]): [number, number] => [
  roundCoord(cs[0]),
  roundCoord(cs[1]),
];

export const FigmaEdgeSVG: React.FC<EdgeProps<FigmaEdge>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  markerEnd,
  selected,
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
  // const pathD = segments.reduce((acc, seg, idx) => {
  //   const [fromX, fromY] = seg.from;
  //   const [toX, toY] = seg.to;
  //   return acc + (idx === 0 ? `M ${fromX},${fromY} ` : '') + `L ${toX},${toY} `;
  // }, '');

  const pathD = React.useMemo(
    () => generateRoundedPath(segments, GRID_SIZE / 2),
    [segments]
  );

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
    const x = roundCoord(rawX);
    const y = roundCoord(rawY);
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

  const [endpoints, setEndpoints] = React.useState({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  React.useLayoutEffect(() => {
    const dx =
      (sourceX - endpoints.sourceX - (endpoints.targetX - targetX)) / 2;
    const dy =
      (sourceY - endpoints.sourceY - (endpoints.targetY - targetY)) / 2;
    setSegments((prevSegments) => {
      const newSegments: Segment[] = prevSegments.map((segment) => ({
        ...segment,
        to: roundCoords([
          sourceX +
            ((targetX - sourceX) / (endpoints.targetX - endpoints.sourceX)) *
              (segment.to[0] - endpoints.sourceX),
          sourceY +
            ((targetY - sourceY) / (endpoints.targetY - endpoints.sourceY)) *
              (segment.to[1] - endpoints.sourceY),
        ]),
        from: roundCoords([
          sourceX +
            ((targetX - sourceX) / (endpoints.targetX - endpoints.sourceX)) *
              (segment.from[0] - endpoints.sourceX),
          sourceY +
            ((targetY - sourceY) / (endpoints.targetY - endpoints.sourceY)) *
              (segment.from[1] - endpoints.sourceY),
        ]),
      }));
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
    if (dx || dy) {
      setEndpoints({ sourceX, sourceY, targetX, targetY });
    }
  }, [sourceX, sourceY, targetX, targetY, endpoints]);

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
          selected
            ? theme.palette.secondary.main
            : hovered || pointerOver !== null
            ? theme.palette.primary.main
            : theme.palette.divider
        }
        strokeWidth={GRID_SIZE / 8}
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
