import {
  Edge,
  EdgeProps,
  getSmoothStepPath,
  Position,
  useReactFlow,
} from '@xyflow/react';
import React from 'react';

export interface AvoidantEdgeProps extends Record<string, unknown> {
  ingredientIndex?: number;
  productIndex?: number;
}

const AVOID_MARGIN = 5;
const MAX_DEPTH = 3;
const SAMPLES = 2;

function sampleSmoothPath(pathD: string, count: number): [number, number][] {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD);
  svg.appendChild(path);
  document.body.appendChild(svg);

  const points: [number, number][] = [];
  const length = path.getTotalLength();

  for (let i = 0; i <= count; i++) {
    const pt = path.getPointAtLength((i / count) * length);
    points.push([pt.x, pt.y]);
  }

  document.body.removeChild(svg);
  return points;
}

function findIntersectedNode(
  point: [number, number],
  nodes: ReturnType<typeof useReactFlow>['getNodes']
) {
  return nodes().find(({ position, width = 0, height = 0 }) => {
    const [x, y] = point;
    return (
      x > position.x &&
      x < position.x + width &&
      y > position.y &&
      y < position.y + height
    );
  });
}

function getAvoidancePoint(
  entry: [number, number],
  prev: [number, number],
  margin: number
): [number, number] {
  const dx = entry[0] - prev[0];
  const dy = entry[1] - prev[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  const scale = (len - margin) / len;
  return [prev[0] + dx * scale, prev[1] + dy * scale];
}

function recursiveAvoidantPath({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  centerX,
  nodes,
  depth = 0,
}: {
  sourceX: number;
  sourceY: number;
  sourcePosition: Position;
  targetX: number;
  targetY: number;
  targetPosition: Position;
  centerX: number;
  nodes: ReturnType<typeof useReactFlow>['getNodes'];
  depth?: number;
}): string {
  const pathD = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 10,
    centerX,
  })[0];

  const samples = sampleSmoothPath(pathD, SAMPLES);

  for (let i = 1; i < samples.length; i++) {
    const point = samples[i];
    const prev = samples[i - 1];
    const intersected = findIntersectedNode(point, nodes);

    if (intersected) {
      if (depth >= MAX_DEPTH) break;

      const bend = getAvoidancePoint(point, prev, AVOID_MARGIN);

      const firstHalf = recursiveAvoidantPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX: bend[0],
        targetY: bend[1],
        targetPosition: Position.Top,
        centerX: (sourceX + bend[0]) / 2,
        nodes,
        depth: depth + 1,
      });

      const secondHalf = recursiveAvoidantPath({
        sourceX: bend[0],
        sourceY: bend[1],
        sourcePosition: Position.Bottom,
        targetX,
        targetY,
        targetPosition,
        centerX: (bend[0] + targetX) / 2,
        nodes,
        depth: depth + 1,
      });

      return `${firstHalf} ${secondHalf}`;
    }
  }

  return pathD;
}

export const AvoidantEdge: React.FC<EdgeProps<Edge<AvoidantEdgeProps>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  data,
}) => {
  const { getNodes } = useReactFlow();
  const ingredientIndex = data?.ingredientIndex || 0;
  const productIndex = data?.productIndex || 0;

  const offsetX = 0.2 * ingredientIndex * 100 - 0.1 * productIndex * 100;
  const centerX = (sourceX + targetX) / 2 + offsetX;

  const path = recursiveAvoidantPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    centerX,
    nodes: getNodes,
  });

  return (
    <g>
      <path
        id={id}
        d={path}
        fill="none"
        stroke="gold"
        strokeWidth={2}
        markerEnd="url(#react-flow__arrowhead)"
      />
    </g>
  );
};
