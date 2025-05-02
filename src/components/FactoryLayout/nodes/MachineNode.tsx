import { Badge, Box, IconButton, Paper } from '@mui/material';
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useUpdateNodeInternals,
} from '@xyflow/react';
import React from 'react';
import {
  CraftingEntityDictionary,
  CraftingEntityName,
  ItemName,
  RecipeDictionary,
  RecipeName,
} from '../../../data';
import { formatNumberForDisplay } from '../../../formatters/numeric';
import { Icon, ICON_SIZE } from '../../Icon';
import { GRID_SIZE } from '../const';
import { useFactoryLayout } from '../hooks/useFactoryLayout';

export interface MachineNodeData extends Record<string, unknown> {
  machine: CraftingEntityName;
  recipe?: RecipeName;
}

export type MachineNode = Node<MachineNodeData, 'machine'>;

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

  const { onOpenDialog, onAddItem } = useFactoryLayout();

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
            <Box
              key={`ingredient:${ingredient.name}`}
              sx={{
                position: 'absolute',
                top:
                  ((index + 0.5) * (dimensions.height * GRID_SIZE)) /
                    recipe.ingredients.length -
                  GRID_SIZE / 4,
                left: GRID_SIZE / 8,
              }}
            >
              <Badge
                badgeContent={formatNumberForDisplay(
                  ingredient.getRate(recipe.duration).rate.amountPerSecond
                )}
                color="secondary"
                slotProps={{
                  root: {
                    style: { fontSize: '1em' },
                  },
                }}
              >
                <IconButton
                  onClick={() =>
                    onAddItem(ingredient.name as ItemName, {
                      x: positionAbsoluteX - GRID_SIZE * 2,
                      y: positionAbsoluteY,
                    })
                  }
                >
                  <Icon
                    name={ingredient.getIcon()}
                    scale={GRID_SIZE / ICON_SIZE / 2}
                  />
                </IconButton>
              </Badge>
            </Box>
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
              top: (dimensions.width * GRID_SIZE) / 2 - GRID_SIZE / 2,
              left: (dimensions.height * GRID_SIZE) / 2 - GRID_SIZE / 2,
            }}
          >
            <Icon name={machine.icon} scale={GRID_SIZE / ICON_SIZE} />
          </IconButton>
          {recipe?.products.map((product, index) => (
            <Box
              key={`product:${product.name}`}
              sx={{
                position: 'absolute',
                top:
                  ((index + 0.5) * (dimensions.height * GRID_SIZE)) /
                    recipe.products.length -
                  GRID_SIZE / 4,
                right: GRID_SIZE / 8,
              }}
            >
              <IconButton
                onClick={() =>
                  onAddItem(product.name as ItemName, {
                    x:
                      positionAbsoluteX +
                      dimensions.width * GRID_SIZE +
                      GRID_SIZE * 2,
                    y: positionAbsoluteY,
                  })
                }
              >
                <Icon
                  name={product.getIcon()}
                  scale={GRID_SIZE / ICON_SIZE / 2}
                />
              </IconButton>
            </Box>
          ))}
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
            }}
          />
        ))}
      </div>
    </>
  );
};
