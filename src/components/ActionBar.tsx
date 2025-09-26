import {
  AcUnit,
  AutoFixHigh,
  Bolt,
  Explore,
  FlashOn,
  Healing,
  LocalFireDepartment,
  Psychology,
  Security,
  Shield,
  Speed,
  Star,
  Visibility,
  Whatshot,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { CSSProperties } from 'react';
import './styles.css';

const actions = [
  {
    id: 'attack',
    icon: <LocalFireDepartment />,
    label: 'Plasma Blast',
    cooldown: 0,
    cost: { type: 'energy', amount: 15 },
    hotkey: '1',
  },
  {
    id: 'spell1',
    icon: <Bolt />,
    label: 'Neural Storm',
    cooldown: 3,
    cost: { type: 'mana', amount: 25 },
    hotkey: '2',
  },
  {
    id: 'spell2',
    icon: <AcUnit />,
    label: 'Cryo Field',
    cooldown: 0,
    cost: { type: 'mana', amount: 30 },
    hotkey: '3',
  },
  {
    id: 'heal',
    icon: <Healing />,
    label: 'Nano Repair',
    cooldown: 8,
    cost: { type: 'energy', amount: 20 },
    hotkey: '4',
  },
  {
    id: 'shield',
    icon: <Shield />,
    label: 'Energy Shield',
    cooldown: 0,
    cost: { type: 'mana', amount: 40 },
    hotkey: '5',
  },
  {
    id: 'buff1',
    icon: <Speed />,
    label: 'Overdrive',
    cooldown: 15,
    cost: { type: 'energy', amount: 30 },
    hotkey: '6',
  },
  {
    id: 'buff2',
    icon: <Psychology />,
    label: 'Mind Boost',
    cooldown: 0,
    cost: { type: 'mana', amount: 20 },
    hotkey: '7',
  },
  {
    id: 'utility1',
    icon: <Visibility />,
    label: 'Scanner',
    cooldown: 5,
    cost: { type: 'energy', amount: 10 },
    hotkey: '8',
  },
  {
    id: 'ultimate',
    icon: <AutoFixHigh />,
    label: 'System Override',
    cooldown: 45,
    cost: { type: 'ultimate', amount: 1 },
    hotkey: 'R',
  },
];

const consumables = [
  { id: 'stim', icon: <Healing />, label: 'Med Stim', count: 3 },
  { id: 'energy', icon: <FlashOn />, label: 'Energy Cell', count: 5 },
  { id: 'grenade', icon: <Whatshot />, label: 'Plasma Grenade', count: 2 },
  { id: 'hack', icon: <Security />, label: 'Hack Tool', count: 1 },
];

interface ActionButtonProps {
  action: (typeof actions)[0];
  onClick: () => void;
}

function ActionButton({ action, onClick }: ActionButtonProps) {
  const isOnCooldown = action.cooldown > 0;
  const getCostColor = (type: string) => {
    switch (type) {
      case 'mana':
        return '#3b82f6';
      case 'energy':
        return '#eab308';
      case 'ultimate':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const tooltipContent = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
        {action.label}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: getCostColor(action.cost.type) }}
      >
        Cost: {action.cost.amount} {action.cost.type}
      </Typography>
      {isOnCooldown && (
        <Typography
          variant="caption"
          sx={{ color: '#ef4444', display: 'block' }}
        >
          Cooldown: {action.cooldown}s
        </Typography>
      )}
    </Box>
  );

  return (
    <Tooltip title={tooltipContent} placement="top">
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClick}
          disabled={isOnCooldown}
          sx={{
            width: 48,
            height: 48,
            border: '2px solid',
            borderColor: isOnCooldown
              ? 'rgba(239, 68, 68, 0.5)'
              : 'rgba(6, 182, 212, 0.5)',
            backgroundColor: isOnCooldown
              ? 'rgba(30, 41, 59, 0.5)'
              : 'rgba(51, 65, 85, 0.7)',
            color: isOnCooldown ? '#ef4444' : '#a5f3fc',
            '&:hover': {
              backgroundColor: isOnCooldown
                ? 'rgba(30, 41, 59, 0.5)'
                : 'rgba(8, 145, 178, 0.5)',
              borderColor: isOnCooldown ? 'rgba(239, 68, 68, 0.5)' : '#06b6d4',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {action.icon}
        </IconButton>

        {/* Hotkey badge */}
        <Chip
          label={action.hotkey}
          size="small"
          sx={{
            position: 'absolute',
            top: -4,
            right: -4,
            height: 16,
            minWidth: 16,
            fontSize: '0.625rem',
            backgroundColor: '#0891b2',
            color: 'white',
            '& .MuiChip-label': {
              px: 0.5,
            },
          }}
        />

        {/* Cooldown overlay */}
        {isOnCooldown && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#fca5a5' }}>
              {action.cooldown}s
            </Typography>
          </Box>
        )}
      </Box>
    </Tooltip>
  );
}

export function ActionBar() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        background:
          'linear-gradient(90deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
      }}
    >
      {/* Main Actions */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {actions.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            onClick={() => console.log(`Used ${action.label}`)}
          />
        ))}
      </Box>

      {/* Center Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Explore sx={{ color: '#67e8f9' }} />
          <Typography variant="body2" sx={{ color: '#67e8f9' }}>
            Combat Mode
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#06b6d4' }}>
          |
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Star sx={{ color: '#67e8f9' }} />
          <Typography variant="body2" sx={{ color: '#67e8f9' }}>
            XP: 1,247 / 1,500
          </Typography>
        </Box>
      </Box>

      {/* Consumables */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {consumables.map((item) => (
          <Tooltip
            key={item.id}
            title={
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#ddd6fe' }}>
                  {item.label}
                </Typography>
                <Typography variant="caption" sx={{ color: '#a78bfa' }}>
                  Count: {item.count}
                </Typography>
              </Box>
            }
            placement="top"
          >
            <Box sx={{ position: 'relative' }}>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  border: '2px solid rgba(139, 92, 246, 0.5)',
                  backgroundColor: 'rgba(51, 65, 85, 0.7)',
                  color: '#c4b5fd',
                  '&:hover': {
                    backgroundColor: 'rgba(88, 28, 135, 0.5)',
                    borderColor: '#8b5cf6',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {item.icon}
              </IconButton>

              {/* Count badge */}
              <Badge
                badgeContent={item.count}
                color="secondary"
                sx={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  '& .MuiBadge-badge': {
                    fontSize: '0.625rem',
                    height: 16,
                    minWidth: 16,
                    backgroundColor: '#7c3aed',
                    color: 'white',
                  },
                }}
              />
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}

const shineButton: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
};

export function Page() {
  return <Button className="shine-button" />;
}
