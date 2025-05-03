import { XYPosition } from '@xyflow/react';

export const GRID_SIZE = 32 * 2;

export const roundPosition = (position: XYPosition) => ({
  x: Math.round(position.x / GRID_SIZE) * GRID_SIZE,
  y: Math.round(position.y / GRID_SIZE) * GRID_SIZE,
});

export const NODES_CACHE_KEY = 'factory-layout-cache-nodes';
export const EDGES_CACHE_KEY = 'factory-layout-cache-edges';
