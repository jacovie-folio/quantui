import { Box, Paper, Typography } from '@mui/material';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import React from 'react';
import { ItemDictionary, ItemName } from '../../../data';
import { Icon, ICON_SIZE } from '../../Icon';
import { GRID_SIZE } from '../const';

export interface ItemNodeData extends Record<string, unknown> {
  item: ItemName;
  inputRate: number;
  outputRate: number;
}

export type ItemNode = Node<ItemNodeData, 'item'>;

export const ItemNodeCard: React.FC<NodeProps<ItemNode>> = ({
  // id,
  data,
  // selected
}) => {
  const item = ItemDictionary[data.item];

  return (
    <Paper
      variant="outlined"
      sx={{
        position: 'relative',
        width: GRID_SIZE,
        height: GRID_SIZE,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: GRID_SIZE / 2 - ICON_SIZE / 2,
          left: GRID_SIZE / 2 - ICON_SIZE / 2,
        }}
      >
        <Icon name={item.name} />
        <Typography variant="body2">{`${data.inputRate} --> ${data.outputRate}`}</Typography>
      </Box>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          top: GRID_SIZE / 2,
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          top: GRID_SIZE / 2,
        }}
      />
    </Paper>
  );
};
