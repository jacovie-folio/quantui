import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useKeyPress } from '@xyflow/react';
import React from 'react';
import {
  CraftingEntity,
  CraftingEntityDictionary,
  CraftingEntityName,
  Recipe,
  RecipeDictionary,
  RecipeName,
} from '../../../data';
import { isSearchMatch } from '../../../formatters/string';
import { Icon, ICON_SIZE } from '../../Icon';
import { RecipeCard } from '../cards';
import { useFactoryLayout } from '../hooks/useFactoryLayout';

const craftingEntities = Object.entries(CraftingEntityDictionary) as Array<
  [CraftingEntityName, CraftingEntity]
>;

const recipes = Object.entries(RecipeDictionary) as Array<[RecipeName, Recipe]>;

const MACHINE_PAGE_SIZE = 8 * 8;
const RECIPE_PAGE_SIZE = 3;

export const MachineSelectorDialog: React.FC = () => {
  const {
    currentDialog,
    onCloseDialog,
    dialogSearchTerm,
    onChangeDialogSearchTerm,
    onAddMachine,
  } = useFactoryLayout();

  const initialPosition =
    currentDialog && currentDialog.type === 'machine-selector'
      ? currentDialog.initialPosition
      : null;

  const open = Boolean(
    currentDialog && currentDialog.type === 'machine-selector'
  );

  const recipesOnly =
    currentDialog &&
    currentDialog.type === 'machine-selector' &&
    currentDialog.recipesOnly;

  const filteredEntities = React.useMemo(() => {
    if (!dialogSearchTerm) return craftingEntities;

    return craftingEntities.filter(
      ([machine, entity]) =>
        isSearchMatch(dialogSearchTerm, machine) ||
        isSearchMatch(dialogSearchTerm, entity.display)
    );
  }, [dialogSearchTerm]);

  const filteredRecipes = React.useMemo(() => {
    if (!dialogSearchTerm) return recipes;

    return recipes.filter(
      ([recipeName, recipe]) =>
        isSearchMatch(dialogSearchTerm, recipeName) ||
        isSearchMatch(dialogSearchTerm, recipe.display) ||
        [...recipe.ingredients, ...recipe.products].some(
          (item) =>
            isSearchMatch(dialogSearchTerm, item.name) ||
            isSearchMatch(dialogSearchTerm, item.getDisplay())
        )
    );
  }, [dialogSearchTerm]);

  const shiftPressed = useKeyPress('Shift');

  const [machinePage, setMachinePage] = React.useState(1);
  const [recipePage, setRecipePage] = React.useState(1);

  return (
    <Dialog open={open} onClose={onCloseDialog} fullWidth maxWidth="xl">
      <DialogTitle sx={{ backgroundColor: 'background.paper' }}>
        <TextField
          fullWidth
          label="Search machines, recipes, or items"
          placeholder={`(e.g. "Assembling machine", "Iron plate")`}
          variant="filled"
          value={dialogSearchTerm}
          onChange={(e) => {
            onChangeDialogSearchTerm(e.target.value);
            setMachinePage(1);
          }}
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
      <DialogContent
        sx={{
          p: 0,
          height: '80vh',
          width: 'xl',
          backgroundColor: 'background.paper',
        }}
      >
        <Grid container spacing={1}>
          {recipesOnly ? null : (
            <Grid size={6}>
              <Typography variant="h6" px={3} py={1}>
                Machines
              </Typography>
              <Box px={3} py={1}>
                <Paper elevation={4} sx={{ py: 3 }}>
                  <Stack
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{ px: 3 }}
                  >
                    <Grid container columns={16} rowSpacing={2}>
                      {filteredEntities
                        .slice(
                          Math.min(
                            filteredEntities.length,
                            (machinePage - 1) * MACHINE_PAGE_SIZE
                          ),
                          Math.min(
                            filteredEntities.length,
                            machinePage * MACHINE_PAGE_SIZE
                          )
                        )
                        .map(([machine, entity]) => {
                          return (
                            <Grid size={2}>
                              <Tooltip
                                key={machine}
                                id={machine}
                                disableInteractive={!shiftPressed}
                                placement="right"
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
                                    id={machine}
                                    sx={{
                                      fontFamily: 'monospace',
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        backgroundColor: 'primary.light',
                                        px: 1,
                                      }}
                                    >
                                      <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{
                                          color: 'background.paper',
                                          whiteSpace: 'nowrap',
                                        }}
                                      >
                                        {entity.display}
                                      </Typography>
                                    </Box>
                                    <Stack spacing={0.5} my={1} px={1}>
                                      <Typography variant="body2">
                                        <strong>Crafting categories:</strong>{' '}
                                        {[...entity.craftingCategories].join(
                                          ', '
                                        )}
                                      </Typography>
                                    </Stack>
                                  </Box>
                                }
                              >
                                <Button
                                  key={machine}
                                  variant="outlined"
                                  onClick={() => {
                                    onAddMachine(machine, initialPosition!);
                                    onCloseDialog();
                                  }}
                                  sx={{
                                    p: 0,
                                    width: ICON_SIZE,
                                    height: ICON_SIZE,
                                  }}
                                >
                                  <Icon name={entity.icon} scale={0.65} />
                                </Button>
                              </Tooltip>
                            </Grid>
                          );
                        })}
                    </Grid>
                    <Pagination
                      count={Math.ceil(
                        filteredEntities.length / MACHINE_PAGE_SIZE
                      )}
                      page={machinePage}
                      onChange={(_, newPage) => setMachinePage(newPage)}
                      sx={{ my: 2 }}
                    />
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}
          <Grid size={6}>
            <Typography variant="h6" px={3} py={1}>
              Recipes
            </Typography>
            <Stack
              direction={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{ width: '100%' }}
            >
              <Stack
                direction={'column'}
                justifyContent={'flex-start'}
                alignItems={'stretch'}
                gap={0.5}
                rowGap={0.5}
                sx={{ width: '100%' }}
              >
                {filteredRecipes
                  .slice(
                    Math.min(
                      filteredRecipes.length,
                      (recipePage - 1) * RECIPE_PAGE_SIZE
                    ),
                    Math.min(
                      filteredRecipes.length,
                      recipePage * RECIPE_PAGE_SIZE
                    )
                  )
                  .map(([recipeName, recipe]) => {
                    return (
                      <Box
                        id={recipeName}
                        sx={{
                          fontFamily: 'monospace',
                          overflow: 'hidden',
                          width: '100%',
                        }}
                      >
                        <RecipeCard
                          recipe={recipe}
                          onClickCrafter={(machine) => {
                            onAddMachine(
                              machine,
                              initialPosition!,
                              recipe.name
                            );
                            onCloseDialog();
                          }}
                          gutter
                        />
                      </Box>
                      //   key={recipeName}
                      //   variant="outlined"
                      //   onClick={() => {
                      //     onAddMachine(machine, initialPosition!);
                      //     onCloseDialog();
                      //   }}
                      //   sx={{ p: 0, width: ICON_SIZE, height: ICON_SIZE }}
                      // >
                      //   <Icon name={entity.icon} scale={0.65} />
                      // </Button>
                    );
                  })}
              </Stack>
              <Pagination
                count={Math.ceil(filteredRecipes.length / RECIPE_PAGE_SIZE)}
                page={recipePage}
                onChange={(_, newPage) => setRecipePage(newPage)}
                sx={{ mt: 2 }}
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
