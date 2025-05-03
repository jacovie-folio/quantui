export {};
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { RecipeByCategoryDictionary, RecipeDictionary } from '../../../data';
import { isSearchMatch } from '../../../formatters/string';
import { Icon, ICON_SIZE } from '../../Icon';
import { RecipeCard } from '../cards';
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
              title={<RecipeCard recipe={recipe} />}
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
