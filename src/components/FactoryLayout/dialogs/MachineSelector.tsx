import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  CraftingEntity,
  CraftingEntityDictionary,
  CraftingEntityName,
} from '../../../data';
import { isSearchMatch } from '../../../formatters/string';
import { Icon, ICON_SIZE } from '../../Icon';
import { useFactoryLayout } from '../hooks/useFactoryLayout';

const craftingEntities = Object.entries(CraftingEntityDictionary) as Array<
  [CraftingEntityName, CraftingEntity]
>;

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

  const filteredEntities = React.useMemo(() => {
    if (!dialogSearchTerm) return craftingEntities;

    return craftingEntities.filter(
      ([machine, entity]) =>
        isSearchMatch(dialogSearchTerm, machine) ||
        isSearchMatch(dialogSearchTerm, entity.display)
    );
  }, [dialogSearchTerm]);

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle>
        <TextField
          fullWidth
          label="Search Machines"
          placeholder={`(e.g. "Assembling machine")`}
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
          {filteredEntities.map(([machine, entity]) => {
            return (
              <Tooltip
                key={machine}
                id={machine}
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
                    <Box sx={{ backgroundColor: 'primary.light', px: 1 }}>
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
                        {[...entity.craftingCategories].join(', ')}
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
                  sx={{ p: 0, width: ICON_SIZE, height: ICON_SIZE }}
                >
                  <Icon name={entity.icon} scale={0.65} />
                </Button>
              </Tooltip>
            );
          })}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
