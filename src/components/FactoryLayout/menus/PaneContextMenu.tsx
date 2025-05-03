import FactoryIcon from '@mui/icons-material/Factory';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useReactFlow, XYPosition } from '@xyflow/react';
import React from 'react';
import { useFactoryLayout } from '../hooks/useFactoryLayout';

export const PaneContextMenu: React.FC<{
  mousePos: XYPosition | null;
  onClose: () => void;
}> = ({ mousePos, onClose }) => {
  const { onOpenDialog } = useFactoryLayout();
  const { fitView } = useReactFlow();

  return (
    <Menu
      open={mousePos !== null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        mousePos !== null ? { top: mousePos.y, left: mousePos.x } : undefined
      }
    >
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          onClose();
          onOpenDialog({
            type: 'machine-selector',
            initialPosition: mousePos!,
          });
        }}
      >
        <ListItemIcon>
          <FactoryIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Add Machine</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          onClose();
          fitView({ duration: 200 });
        }}
      >
        <ListItemIcon>
          <ZoomOutMapIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Zoom to Fit</ListItemText>
      </MenuItem>
    </Menu>
  );
};
