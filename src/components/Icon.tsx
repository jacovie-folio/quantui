import { Avatar } from '@mui/material';
import React from 'react';
import { IconIndex } from '../assets/icons';

export const ICON_SIZE = 64;
export interface IconProps {
  name: string;
  children?: React.ReactNode;
  scale?: number;
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ name, children, scale }, ref) => (
    <Avatar
      ref={ref}
      variant="rounded"
      alt={name}
      src={
        name in IconIndex
          ? IconIndex[name as keyof typeof IconIndex]
          : IconIndex['py-logo-15tiles']
      }
      sx={{
        width: ICON_SIZE * (scale || 1),
        height: ICON_SIZE * (scale || 1),
      }}
    >
      {children}
    </Avatar>
  )
);
