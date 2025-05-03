import {
  Badge,
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useUpdateNodeInternals,
  XYPosition,
} from '@xyflow/react';
import React from 'react';
import {
  CraftingEntityDictionary,
  CraftingEntityName,
  Dimensions,
  Duration,
  Ingredient,
  ItemName,
  Product,
  RecipeDictionary,
  RecipeName,
} from '../../../data';
import { formatNumberForDisplay } from '../../../formatters/numeric';
import { Icon, ICON_SIZE } from '../../Icon';
import NumberInputField from '../../NumberInputField';
import { GRID_SIZE } from '../const';
import { useFactoryLayout } from '../hooks/useFactoryLayout';

export interface MachineNodeData extends Record<string, unknown> {
  machine: CraftingEntityName;
  multiplier: number;
  recipe?: RecipeName;
}

export type MachineNode = Node<MachineNodeData, 'machine'>;

const ItemButton: React.FC<{
  item: Ingredient | Product;
  index: number;
  length: number;
  recipeDuration: Duration;
  nodePosition: XYPosition;
  machine: CraftingEntityName;
  machineDimensions: Dimensions;
  align: 'left' | 'right';
  multiplier?: number;
}> = ({
  item,
  index,
  length,
  recipeDuration,
  nodePosition,
  machine,
  machineDimensions,
  align,
  multiplier = 1,
}) => {
  const { onAddItem } = useFactoryLayout();

  const topOffset =
    ((index + 0.5) * (machineDimensions.height * GRID_SIZE)) / length -
    (1 * GRID_SIZE) / 2;
  return (
    <Box
      sx={{
        position: 'absolute',
        top: topOffset,
        ...(align === 'left' ? { left: 0 } : { right: 0 }),
      }}
    >
      <IconButton
        onClick={() => {
          onAddItem(
            item.name as ItemName,
            align === 'left'
              ? {
                  x: nodePosition.x - GRID_SIZE * 2,
                  y: nodePosition.y + topOffset,
                }
              : {
                  x:
                    nodePosition.x +
                    machineDimensions.width * GRID_SIZE +
                    GRID_SIZE * 2,
                  y: nodePosition.y + topOffset,
                }
          );
        }}
      >
        <Badge
          anchorOrigin={{
            vertical: 'bottom',
            ...(align === 'right' && { horizontal: 'left' }),
          }}
          badgeContent={
            <Typography variant="body2" fontSize={16}>
              {formatNumberForDisplay(
                item.getRate(recipeDuration).rate.amountPerSecond *
                  (CraftingEntityDictionary[machine].craftingSpeed || 1) *
                  multiplier
              )}
            </Typography>
          }
          overlap="circular"
        >
          <Icon name={item.getIcon()} scale={(0.8 * GRID_SIZE) / ICON_SIZE} />
        </Badge>
      </IconButton>
    </Box>
  );
};

export const MachineNodeCard: React.FC<NodeProps<MachineNode>> = ({
  id,
  data,
  selected,
  positionAbsoluteX,
  positionAbsoluteY,
}) => {
  const machine = CraftingEntityDictionary[data.machine];
  const dimensions = machine.dimensions;
  const recipe = data.recipe ? RecipeDictionary[data.recipe] : null;

  const updateNodeInternals = useUpdateNodeInternals();

  React.useEffect(() => {
    updateNodeInternals(id);
  }, [data.recipe, updateNodeInternals]);

  const [hovered, setHovered] = React.useState(false);

  const { onOpenDialog, onUpdateMachineMultiplier } = useFactoryLayout();
  const theme = useTheme();

  return (
    <>
      <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Paper
          elevation={selected ? 12 : hovered ? 3 : 1}
          sx={{
            ...(selected
              ? {
                  border: 'solid 1px white',
                }
              : { border: 'solid 1px transparent' }),
            position: 'relative',
            borderRadius: 4,
            width: dimensions.width * GRID_SIZE,
            height: dimensions.height * GRID_SIZE,
          }}
        >
          {recipe?.ingredients.map((ingredient, index) => (
            <ItemButton
              key={`ingredient:${ingredient.name}`}
              item={ingredient}
              index={index}
              length={recipe.ingredients.length}
              recipeDuration={recipe.duration}
              nodePosition={{ x: positionAbsoluteX, y: positionAbsoluteY }}
              machine={data.machine}
              machineDimensions={dimensions}
              multiplier={data.multiplier ?? 1}
              align="left"
            />
          ))}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onOpenDialog({
                type: 'recipe-selector',
                id,
                categories: machine.craftingCategories,
              });
            }}
            sx={{
              position: 'absolute',
              left: (dimensions.width * GRID_SIZE) / 4,
              top: (dimensions.height * GRID_SIZE) / 4,
              width: (dimensions.width * GRID_SIZE) / 2,
              height: (dimensions.height * GRID_SIZE) / 2,
            }}
          >
            <Icon name={machine.icon} scale={GRID_SIZE / ICON_SIZE} />
          </IconButton>
          {recipe?.products.map((product, index) => (
            <ItemButton
              key={`product:${product.name}`}
              item={product}
              index={index}
              length={recipe.products.length}
              recipeDuration={recipe.duration}
              nodePosition={{ x: positionAbsoluteX, y: positionAbsoluteY }}
              machine={data.machine}
              machineDimensions={dimensions}
              multiplier={data.multiplier ?? 1}
              align="right"
            />
          ))}
          <NumberInputField
            // fullWidth={false}
            startAdornment={'x'}
            value={data.multiplier ?? 1}
            onChange={(newValue) => onUpdateMachineMultiplier(id, newValue)}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              textAlign: 'right',
              px: 1,
            }}
          />
        </Paper>
        {recipe?.ingredients.map((ingredient, index) => (
          <Handle
            key={`ingredient:${ingredient.name}`}
            id={`ingredient:${ingredient.name}`}
            type="target"
            position={Position.Left}
            style={{
              top:
                ((index + 0.5) * (dimensions.height * GRID_SIZE)) /
                recipe.ingredients.length,
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
        ))}
        {recipe?.products.map((product, index) => (
          <Handle
            key={`product:${product.name}`}
            id={`product:${product.name}`}
            type="source"
            position={Position.Right}
            style={{
              top:
                ((index + 0.5) * (dimensions.height * GRID_SIZE)) /
                recipe.products.length,
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
        ))}
      </div>
    </>
  );
};
