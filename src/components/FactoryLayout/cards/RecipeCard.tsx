export {};
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  CraftingEntityDictionary,
  CraftingEntityName,
  Recipe,
  RecipeCategoryDictionary,
} from '../../../data';
import { formatNumberForDisplay } from '../../../formatters/numeric';
import { Icon, ICON_SIZE } from '../../Icon';

export const RecipeCard: React.FC<{
  recipe: Recipe;
  onClickCrafter?: (crafter: CraftingEntityName) => void;
  gutter?: boolean;
}> = ({ recipe, onClickCrafter, gutter }) => {
  return (
    <Box
      sx={{
        fontFamily: 'monospace',
        overflow: 'hidden',
        width: '100%',
        py: 0,
      }}
    >
      <Box sx={{ backgroundColor: 'primary.light', px: gutter ? 3 : 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            color: 'background.paper',
            whiteSpace: 'nowrap',
          }}
        >
          {recipe.display}
        </Typography>
      </Box>
      <Grid container spacing={1} sx={gutter ? { px: 2 } : {}}>
        <Grid size={4}>
          <Stack spacing={0} pt={2} px={1}>
            <Typography variant="body2">
              <strong>Ingredients:</strong>
            </Typography>
            <List dense>
              {recipe.ingredients.map((ingredient) => (
                <ListItem
                  key={`ingredient:${ingredient.name}`}
                  secondaryAction={
                    <Typography variant="subtitle2">
                      {formatNumberForDisplay(
                        ingredient.getRate(recipe.duration).rate.amountPerSecond
                      )}
                    </Typography>
                  }
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded">
                      <Icon name={ingredient.getIcon()} scale={0.5} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{ingredient.getDisplay()}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Grid>
        <Grid size={4}>
          <Stack spacing={0} pt={2} px={1}>
            <Typography variant="body2">
              <strong>Products:</strong>
            </Typography>
            <List dense>
              {recipe.products.map((product) => (
                <ListItem
                  key={`product:${product.name}`}
                  secondaryAction={
                    <Typography variant="subtitle2">
                      {formatNumberForDisplay(
                        product.getRate(recipe.duration).rate.amountPerSecond
                      )}
                    </Typography>
                  }
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded">
                      <Icon name={product.getIcon()} scale={0.5} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{product.getDisplay()}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Grid>
        <Grid size={4}>
          <Typography variant="body2">
            <strong>Crafters:</strong>
          </Typography>
          <Grid container>
            {RecipeCategoryDictionary[recipe.category].map((machine) => (
              <IconButton
                onClick={() => {
                  onClickCrafter?.(machine);
                  // onAddMachine(machine, initialPosition!);
                  // onCloseDialog();
                }}
                sx={{
                  p: 0,
                  m: 0,

                  width: `${ICON_SIZE * 0.8}px`,
                  height: `${ICON_SIZE * 0.8}px`,
                }}
              >
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                  }}
                  badgeContent={
                    <Typography
                      variant="body2"
                      fontSize={'0.8rem'}
                      textTransform={'lowercase'}
                    >
                      x
                      <strong>
                        {CraftingEntityDictionary[machine].craftingSpeed}
                      </strong>
                    </Typography>
                  }
                  color="info"
                  slotProps={{ root: { style: { padding: 0, margin: 0 } } }}
                >
                  <Icon
                    name={CraftingEntityDictionary[machine].icon}
                    scale={0.5}
                  />
                </Badge>
              </IconButton>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
