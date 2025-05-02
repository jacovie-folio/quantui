export {};
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { RecipeByCategoryDictionary, RecipeDictionary } from '../../../data';
import { formatNumberForDisplay } from '../../../formatters/numeric';
import { isSearchMatch } from '../../../formatters/string';
import { Icon, ICON_SIZE } from '../../Icon';
import { useFactoryLayout } from '../hooks/useFactoryLayout';

export const RecipeSelectorDialog: React.FC = () => {
  const {
    currentDialog,
    onCloseDialog,
    dialogSearchTerm,
    onChangeDialogSearchTerm,
    onSetMachineRecipe,
  } = useFactoryLayout();

  const recipeSelector =
    currentDialog && currentDialog.type === 'recipe-selector'
      ? currentDialog
      : null;

  const open = Boolean(recipeSelector);

  const filteredRecipes = React.useMemo(() => {
    if (recipeSelector) {
      const recipes = [...recipeSelector.categories]
        .flatMap((category) => RecipeByCategoryDictionary[category] || [])
        .map((recipeName) => RecipeDictionary[recipeName]);
      if (!dialogSearchTerm) return recipes;

      return recipes.filter(
        (recipe) =>
          isSearchMatch(dialogSearchTerm, recipe.name) ||
          isSearchMatch(dialogSearchTerm, recipe.display)
      );
    }
    return [];
  }, [currentDialog, dialogSearchTerm]);

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle>
        <TextField
          fullWidth
          label="Search Recipes"
          placeholder={`(e.g. "Automation science pack")`}
          variant="filled"
          value={dialogSearchTerm}
          onChange={(e) => onChangeDialogSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </DialogTitle>
      <DialogContent sx={{ height: '50vh' }}>
        <Stack
          flexWrap={'wrap'}
          direction={'row'}
          rowGap={1}
          justifyContent={'space-between'}
        >
          {filteredRecipes.map((recipe) => (
            <Tooltip
              key={recipe.name}
              slotProps={{
                tooltip: {
                  sx: {
                    p: 0,
                    maxWidth: '50vw',
                  },
                },
              }}
              title={
                <Box
                  sx={{
                    fontFamily: 'monospace',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ backgroundColor: 'primary.light', px: 1 }}>
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
                  <Stack direction="row" spacing={1}>
                    <Stack spacing={0} py={2} px={1}>
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
                                  ingredient.getRate(recipe.duration).rate
                                    .amountPerSecond
                                )}
                              </Typography>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar variant="rounded">
                                <Icon name={ingredient.getIcon()} scale={0.5} />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                              {ingredient.getDisplay()}
                            </ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                    <Stack spacing={0} py={2} px={1}>
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
                                  product.getRate(recipe.duration).rate
                                    .amountPerSecond
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
                  </Stack>
                </Box>
              }
            >
              <Button
                variant="outlined"
                onClick={() => {
                  onSetMachineRecipe(recipeSelector!.id, recipe.name);
                  onCloseDialog();
                }}
                sx={{ p: 0, width: ICON_SIZE, height: ICON_SIZE }}
              >
                <Icon name={recipe.icon} scale={0.65} />
              </Button>
            </Tooltip>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
