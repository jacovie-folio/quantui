import { Box, Stack, Typography, useTheme } from '@mui/material';
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useNodeConnections,
  useNodesData,
} from '@xyflow/react';
import React from 'react';
import { FactoryLayoutNode } from '.';
import {
  CraftingEntityDictionary,
  FluidDictionary,
  FluidName,
  ItemDictionary,
  ItemName,
  RecipeDictionary,
} from '../../../data';
import { formatNumberForDisplay } from '../../../formatters/numeric';
import { Icon, ICON_SIZE } from '../../Icon';
import { GRID_SIZE, roundPosition } from '../const';
import { useFactoryLayout } from '../hooks/useFactoryLayout';
import { MachineNodeData } from './MachineNode';

export interface ItemNodeData extends Record<string, unknown> {
  item: ItemName;
  // inputRate: number;
  // outputRate: number;
}

export type ItemNode = Node<ItemNodeData, 'item'>;

export const ItemNodeCard: React.FC<NodeProps<ItemNode>> = ({
  id,
  data,
  positionAbsoluteX,
  positionAbsoluteY,
  // selected
}) => {
  const item =
    data.item in ItemDictionary
      ? ItemDictionary[data.item]
      : FluidDictionary[data.item as unknown as FluidName];

  const connections = useNodeConnections({ id });
  const inputs = useNodesData<FactoryLayoutNode>(
    connections.reduce(
      (part, next) => [...part, ...(next.source === id ? [] : [next.source])],
      [] as string[]
    )
  );

  const outputs = useNodesData<FactoryLayoutNode>(
    connections.reduce(
      (part, next) => [...part, ...(next.target === id ? [] : [next.target])],
      [] as string[]
    )
  );

  const inputRate = inputs.reduce((part, next) => {
    let rate = 0;

    const isConnectedAtProductHandle =
      connections.find((conn) => conn.source === next.id)?.sourceHandle ===
      `product:${data.item}`;
    const machine =
      next.type === 'machine' && (next.data as MachineNodeData).machine;
    const recipeName =
      next.type === 'machine' && (next.data as MachineNodeData).recipe;
    const multiplier =
      (next.type === 'machine' && (next.data as MachineNodeData).multiplier) ||
      1;

    if (isConnectedAtProductHandle && machine && recipeName && multiplier) {
      const recipe = RecipeDictionary[recipeName];
      rate =
        (recipe.products
          .find((product) => product.name === data.item)
          ?.getRate(recipe.duration).rate.amountPerSecond || 0) *
        (CraftingEntityDictionary[machine].craftingSpeed || 1) *
        multiplier;
    }

    return part + rate;
  }, 0);

  const outputRate = outputs.reduce((part, next) => {
    let rate = 0;

    const isConnectedAtIngredientHandle =
      connections.find((conn) => conn.target === next.id)?.targetHandle ===
      `ingredient:${data.item}`;
    const machine =
      next.type === 'machine' && (next.data as MachineNodeData).machine;
    const recipeName =
      next.type === 'machine' && (next.data as MachineNodeData).recipe;
    const multiplier =
      (next.type === 'machine' && (next.data as MachineNodeData).multiplier) ||
      1;

    if (isConnectedAtIngredientHandle && machine && recipeName && multiplier) {
      const recipe = RecipeDictionary[recipeName];
      rate =
        (recipe.ingredients
          .find((ingredient) => ingredient.name === data.item)
          ?.getRate(recipe.duration).rate.amountPerSecond || 0) *
        CraftingEntityDictionary[machine].craftingSpeed *
        multiplier;
    }

    return part + rate;
  }, 0);

  const theme = useTheme();

  const { onOpenDialog } = useFactoryLayout();

  const offsetRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    if (offsetRef.current) {
      setOffset(-Math.min(GRID_SIZE - offsetRef.current.clientWidth, 0));
    }
  }, []);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        onOpenDialog(
          {
            type: 'machine-selector',
            initialPosition: roundPosition({
              x: positionAbsoluteX + GRID_SIZE,
              y: positionAbsoluteY,
            }),
            recipesOnly: true,
          },
          data.item
        );
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: GRID_SIZE,
          height: GRID_SIZE,
          borderRight: `solid 1px ${theme.palette.text.secondary}`,
          borderLeft: `solid 1px ${theme.palette.text.secondary}`,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: GRID_SIZE / 2 - (ICON_SIZE * 0.8) / 2,
            left: GRID_SIZE / 2 - (ICON_SIZE * 0.8) / 2,
          }}
        >
          <Icon name={item.name} scale={0.8} />
          <div ref={offsetRef}>
            <Stack
              direction="row"
              divider={
                <Typography variant="body2" fontSize={12}>
                  →
                </Typography>
              }
              alignItems={'center'}
              spacing={0.5}
              justifyContent={'center'}
              sx={{ transform: `translate(-${offset}px,0)` }}
            >
              <Typography variant="body2" color="error" fontSize={12}>
                {formatNumberForDisplay(inputRate)}
              </Typography>
              <Typography variant="body2" color="success" fontSize={12}>
                {formatNumberForDisplay(outputRate)}
              </Typography>
            </Stack>
          </div>
        </Box>
        <Handle
          type="target"
          position={Position.Left}
          style={{
            top: GRID_SIZE / 2,
            left: -GRID_SIZE / 16,
            width: GRID_SIZE / 8,
            height: GRID_SIZE / 2,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            border: 'none',
            backgroundColor: theme.palette.text.secondary,
          }}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{
            top: GRID_SIZE / 2,
            right: -GRID_SIZE / 16,
            width: GRID_SIZE / 8,
            height: GRID_SIZE / 2,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            border: 'none',
            backgroundColor: theme.palette.text.secondary,
          }}
        />
      </Box>
    </div>
  );
};
