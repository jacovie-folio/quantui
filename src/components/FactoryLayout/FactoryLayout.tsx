import { AppBar, Box, Toolbar, Typography } from '@mui/material';
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
  XYPosition,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RecipeDictionary } from '../../data';
import { GRID_SIZE, roundPosition } from './const';
import { MachineSelectorDialog, RecipeSelectorDialog } from './dialogs';
import { FactoryLayoutProvider } from './hooks/useFactoryLayout';
import { PaneContextMenu } from './menus/PaneContextMenu';
import { FactoryLayoutNode, NODE_RENDERERS } from './nodes';

function roundPositionChange(change: NodeChange<FactoryLayoutNode>) {
  if (change.type === 'position' && change.position) {
    change.position = roundPosition(change.position);
  }
}

export const FactoryLayoutFlow = () => {
  const [nodes, setNodes] = React.useState<Array<FactoryLayoutNode>>([]);
  const [edges, setEdges] = React.useState<Array<Edge>>([]);

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
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const [contextMenu, setContextMenu] = React.useState<{
    mousePos: XYPosition | null;
  }>({ mousePos: null });

  const onConnect = React.useCallback(
    (connection: Connection) => {
      const existingEdge = edges.find(
        (edge) =>
          edge.source === connection.source &&
          edge.sourceHandle === connection.sourceHandle &&
          edge.target === connection.target &&
          edge.targetHandle === connection.targetHandle
      );
      if (existingEdge) return;

      let sourceNode = nodes.find((node) => node.id === connection.source);
      let targetNode = nodes.find((node) => node.id === connection.target);

      if (!sourceNode || !targetNode) {
        return;
      }

      sourceNode = { ...sourceNode };
      targetNode = { ...targetNode };

      let save = false;

      if (sourceNode.type === 'machine' && targetNode.type === 'item') {
        setEdges((edges) => [
          ...edges,
          {
            id: `${sourceNode.id}.${connection.sourceHandle}-->${targetNode.id}`,
            ...connection,
          },
        ]);

        const recipe = RecipeDictionary[sourceNode.data.recipe!];
        const product = recipe.products.find(
          (product) => product.name === targetNode.data.item
        );
        if (product) {
          targetNode.data.inputRate += product.getRate(
            recipe.duration
          ).rate.amountPerSecond;
        }
        save = true;
      }

      if (sourceNode.type === 'item' && targetNode.type === 'machine') {
        setEdges((edges) => [
          ...edges,
          {
            id: `${sourceNode.id}-->${targetNode.id}.${connection.targetHandle}`,
            ...connection,
          },
        ]);

        const recipe = RecipeDictionary[targetNode.data.recipe!];
        const ingredient = recipe.ingredients.find(
          (ingredient) => ingredient.name === sourceNode.data.item
        );
        if (ingredient) {
          sourceNode.data.outputRate += ingredient.getRate(
            recipe.duration
          ).rate.amountPerSecond;
        }
        save = true;
      }

      if (save === true) {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === sourceNode.id && node.type === sourceNode.type
              ? { ...sourceNode }
              : node.id === targetNode.id && node.type === targetNode.type
              ? { ...targetNode }
              : node
          )
        );
      }
    },
    [edges, nodes, setNodes, setEdges]
  );

  const onDisconnect = React.useCallback(
    (deletedEdge: Edge) => {
      const existingEdgeIndex = edges.findIndex(
        (edge) => edge.id === deletedEdge.id
      );
      if (existingEdgeIndex >= 0) {
        const existingEdge = edges[existingEdgeIndex];

        let sourceNode = nodes.find((node) => node.id === existingEdge.source);
        let targetNode = nodes.find((node) => node.id === existingEdge.target);

        if (!sourceNode || !targetNode) {
          return;
        }

        sourceNode = { ...sourceNode };
        targetNode = { ...targetNode };

        let save = false;

        if (sourceNode.type === 'machine' && targetNode.type === 'item') {
          const recipe = RecipeDictionary[sourceNode.data.recipe!];
          const product = recipe.products.find(
            (product) => product.name === targetNode.data.item
          );
          if (product) {
            targetNode.data.inputRate -= product.getRate(
              recipe.duration
            ).rate.amountPerSecond;
          }
          save = true;
        }

        if (sourceNode.type === 'item' && targetNode.type === 'machine') {
          const recipe = RecipeDictionary[targetNode.data.recipe!];
          const ingredient = recipe.ingredients.find(
            (ingredient) => ingredient.name === sourceNode.data.item
          );
          if (ingredient) {
            sourceNode.data.outputRate -= ingredient.getRate(
              recipe.duration
            ).rate.amountPerSecond;
          }
          save = true;
        }

        if (save === true) {
          setNodes((nodes) =>
            nodes.map((node) =>
              node.id === sourceNode.id && node.type === sourceNode.type
                ? { ...sourceNode }
                : node.id === targetNode.id && node.type === targetNode.type
                ? { ...targetNode }
                : node
            )
          );
        }

        setEdges((edges) => [
          ...edges.slice(0, existingEdgeIndex),
          ...edges.slice(existingEdgeIndex + 1, edges.length),
        ]);
      }
    },
    [edges, nodes, setEdges, setNodes]
  );

  return (
    <FactoryLayoutProvider setNodes={setNodes}>
      <AppBar>
        <Toolbar>
          <Typography variant="caption" component="div" sx={{ flexGrow: 1 }}>
            Factory
          </Typography>
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
          height: '100vh',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_RENDERERS}
          // edgeTypes={edgeTypes}
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
          onEdgesDelete={(edges: Edge[]) => {
            for (const edge of edges) {
              onDisconnect(edge);
            }
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
            for (const edge of edges) {
              if (
                deletedNodes.some(
                  (node) => node.id === edge.source || node.id === edge.target
                )
              ) {
                onDisconnect(edge);
              }
            }

            setNodes((nodes) =>
              nodes.filter((node) =>
                deletedNodes.every((deletedNode) => deletedNode.id !== node.id)
              )
            );
          }}
          zoomOnPinch
          panOnScroll
          panOnScrollSpeed={1}
          minZoom={0.1}
          maxZoom={3}
          fitView
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
    </FactoryLayoutProvider>
  );
};
