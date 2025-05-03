import DarkModeIcon from '@mui/icons-material/DarkMode';
import SunnyIcon from '@mui/icons-material/Sunny';
import {
  AppBar,
  Box,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  XYPosition,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useThemeSelector } from '../../hooks/useThemeSelector';
import {
  EDGES_CACHE_KEY,
  GRID_SIZE,
  NODES_CACHE_KEY,
  roundPosition,
} from './const';
import { MachineSelectorDialog, RecipeSelectorDialog } from './dialogs';
import { EDGE_RENDERERS, FactoryLayoutEdge } from './edges';
import { FigmaEdge } from './edges/FigmaEdge';
import { FactoryLayoutProvider } from './hooks/useFactoryLayout';
import { PaneContextMenu } from './menus/PaneContextMenu';
import { FactoryLayoutNode, NODE_RENDERERS } from './nodes';

function roundPositionChange(change: NodeChange<FactoryLayoutNode>) {
  if (change.type === 'position' && change.position) {
    change.position = roundPosition(change.position);
  }
}

export const FactoryLayoutFlow = () => {
  const [nodes, setNodes] = React.useState<Array<FactoryLayoutNode>>(() => {
    const cachedNodes = localStorage.getItem(NODES_CACHE_KEY);
    return cachedNodes ? JSON.parse(cachedNodes) : [];
  });
  const [edges, setEdges] = React.useState<Array<FactoryLayoutEdge>>(() => {
    const cachedEdges = localStorage.getItem(EDGES_CACHE_KEY);
    return cachedEdges ? JSON.parse(cachedEdges) : [];
  });

  React.useEffect(() => {
    localStorage.setItem(NODES_CACHE_KEY, JSON.stringify(nodes));
    localStorage.setItem(EDGES_CACHE_KEY, JSON.stringify(edges));
  }, [nodes, edges]);

  const onNodesChange = React.useCallback(
    (changes: NodeChange<FactoryLayoutNode>[]) => {
      for (const change of changes) {
        roundPositionChange(change);
      }
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange = React.useCallback(
    (changes: EdgeChange<FactoryLayoutEdge>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const [contextMenu, setContextMenu] = React.useState<{
    mousePos: XYPosition | null;
  }>({ mousePos: null });

  const onConnect = React.useCallback(
    (connection: Connection) =>
      setEdges((edges) => {
        const existingEdge = edges.find(
          (edge) =>
            edge.source === connection.source &&
            edge.sourceHandle === connection.sourceHandle &&
            edge.target === connection.target &&
            edge.targetHandle === connection.targetHandle
        );
        return [
          ...edges,
          ...(existingEdge
            ? []
            : [
                {
                  ...connection,
                  id: `${connection.source}.${connection.sourceHandle}-->${connection.target}.${connection.targetHandle}`,
                  type: 'figma',
                  data: {},
                } as FigmaEdge,
              ]),
        ];
      }),
    [setEdges]
  );

  const onDisconnect = React.useCallback(
    (deletedEdgeIds: string[]) => {
      setEdges((edges) =>
        edges.filter((edge) => !deletedEdgeIds.includes(edge.id))
      );
    },
    [setEdges]
  );

  const onDeleteNodeEdges = React.useCallback(
    (deletedNodeIds: string[]) =>
      setEdges((edges) =>
        edges.filter(
          (edge) =>
            !deletedNodeIds.includes(edge.source) &&
            !deletedNodeIds.includes(edge.target)
        )
      ),
    [setEdges]
  );

  const { theme: themeVariant, setTheme } = useThemeSelector();

  return (
    <FactoryLayoutProvider setNodes={setNodes} setEdges={setEdges}>
      <ReactFlowProvider>
        <AppBar>
          <Toolbar>
            <Typography variant="caption" component="div" sx={{ flexGrow: 1 }}>
              Factory
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() =>
                setTheme(themeVariant === 'dark' ? 'light' : 'dark')
              }
            >
              <Box sx={{ position: 'relative' }}>
                <Slide in={themeVariant === 'light'}>
                  <SunnyIcon fontSize="large" />
                </Slide>
                <Slide in={themeVariant === 'dark'}>
                  <DarkModeIcon
                    fontSize="large"
                    sx={{ position: 'absolute', left: 0 }}
                  />
                </Slide>
              </Box>
            </IconButton>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen((prev) => !prev)}
          >
            <DifferenceIcon />
          </IconButton> */}
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            position: 'relative',
            width: '100vw',
            height: '95vh',
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_RENDERERS}
            edgeTypes={EDGE_RENDERERS}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onPaneContextMenu={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setContextMenu({
                mousePos: {
                  x: event.clientX + 2,
                  y: event.clientY - 6,
                },
              });
            }}
            onConnect={onConnect}
            onEdgesDelete={(deletedEdges: Edge[]) => {
              onDisconnect(deletedEdges.map((edge) => edge.id));
            }}
            onNodeDoubleClick={(_, node) =>
              setNodes((nodes) => [
                ...nodes,
                {
                  ...node,
                  id: uuidv4(),
                  position: roundPosition({
                    x: node.position.x + 6 * GRID_SIZE,
                    y: node.position.y + 6 * GRID_SIZE,
                  }),
                },
              ])
            }
            onNodesDelete={(deletedNodes) => {
              setNodes((nodes) =>
                nodes.filter((node) =>
                  deletedNodes.every(
                    (deletedNode) => deletedNode.id !== node.id
                  )
                )
              );

              onDeleteNodeEdges(deletedNodes.map((node) => node.id));
            }}
            zoomOnPinch
            panOnScroll
            panOnScrollSpeed={1}
            minZoom={0.1}
            maxZoom={3}
            fitView
            style={{ top: '5vh' }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={GRID_SIZE}
              size={2}
            />
          </ReactFlow>
          <PaneContextMenu
            mousePos={contextMenu.mousePos}
            onClose={() => setContextMenu({ mousePos: null })}
          />
          <MachineSelectorDialog />
          <RecipeSelectorDialog />
        </Box>
      </ReactFlowProvider>
    </FactoryLayoutProvider>
  );
};
