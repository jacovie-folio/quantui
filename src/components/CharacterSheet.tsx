import {
  BatteryChargingFull,
  Build,
  EmojiEvents,
  Favorite,
  LocalFireDepartment,
  Person,
  Psychology,
  Security,
  Shield,
  Speed,
  TrendingUp,
  Visibility,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';

interface StatBarProps {
  label: string;
  current: number;
  max: number;
  color: 'error' | 'primary' | 'warning';
  icon: React.ReactNode;
}

function StatBar({ label, current, max, color, icon }: StatBarProps) {
  const percentage = (current / max) * 100;

  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Box sx={{ color: '#06b6d4', display: 'flex' }}>{icon}</Box>
        <Typography variant="body2" sx={{ color: '#a5f3fc' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ ml: 'auto', color: '#e2e8f0' }}>
          {current}/{max}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        color={color}
        sx={{
          height: 8,
          borderRadius: 1,
          backgroundColor: 'rgba(51, 65, 85, 0.5)',
        }}
      />
    </Box>
  );
}

const equipmentSlots = [
  {
    id: 'helmet',
    icon: <Security />,
    label: 'Neural Interface',
    equipped: 'Mk-VII Cortex Enhancer',
  },
  {
    id: 'armor',
    icon: <Shield />,
    label: 'Body Armor',
    equipped: 'Titanium Weave Vest',
  },
  {
    id: 'weapon',
    icon: <LocalFireDepartment />,
    label: 'Primary Weapon',
    equipped: 'Plasma Rifle',
  },
  {
    id: 'gloves',
    icon: <Build />,
    label: 'Gauntlets',
    equipped: 'Power Gauntlets',
  },
  { id: 'boots', icon: <Speed />, label: 'Boots', equipped: 'Mag-Lev Boots' },
  {
    id: 'accessory',
    icon: <Visibility />,
    label: 'Optic Mod',
    equipped: 'Thermal Scope',
  },
];

const statusEffects = [
  { name: 'Cyber Enhanced', type: 'primary', duration: '5:30' },
  { name: 'Neural Link', type: 'default', duration: 'Permanent' },
  { name: 'Energy Shield', type: 'primary', duration: '2:15' },
];

export function CharacterSheet() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 2,
        overflowY: 'auto',
      }}
    >
      {/* Character Avatar & Name */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                border: '2px solid rgba(6, 182, 212, 0.5)',
                backgroundColor: 'rgba(8, 145, 178, 0.5)',
              }}
            >
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: '#e2e8f0' }}>
                Zara-7
              </Typography>
              <Typography variant="body2" sx={{ color: '#06b6d4' }}>
                Cyber-Mage • Level 15
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Health, Mana, Energy */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <StatBar
            label="Health"
            current={245}
            max={280}
            color="error"
            icon={<Favorite />}
          />
          <StatBar
            label="Mana"
            current={180}
            max={200}
            color="primary"
            icon={<Psychology />}
          />
          <StatBar
            label="Energy"
            current={95}
            max={100}
            color="warning"
            icon={<BatteryChargingFull />}
          />
        </CardContent>
      </Card>

      {/* Core Stats */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <TrendingUp sx={{ color: '#06b6d4' }} />
            <Typography variant="h6" sx={{ color: '#a5f3fc' }}>
              Core Stats
            </Typography>
          </Box>
          <Grid container spacing={1}>
            {[
              { label: 'STR', value: 16 },
              { label: 'DEX', value: 22 },
              { label: 'INT', value: 28 },
              { label: 'WIS', value: 19 },
              { label: 'CON', value: 18 },
              { label: 'CHA', value: 14 },
            ].map((stat) => (
              <Grid size={6} key={stat.label}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#67e8f9' }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                    {stat.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Equipment */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Build sx={{ color: '#06b6d4' }} />
            <Typography variant="h6" sx={{ color: '#a5f3fc' }}>
              Equipment
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {equipmentSlots.map((slot) => (
              <Box
                key={slot.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: 'rgba(51, 65, 85, 0.3)',
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <Box sx={{ color: '#06b6d4', display: 'flex' }}>
                  {slot.icon}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: '#67e8f9', display: 'block' }}
                  >
                    {slot.label}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: '#e2e8f0', display: 'block' }}
                  >
                    {slot.equipped}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Status Effects */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <EmojiEvents sx={{ color: '#06b6d4' }} />
            <Typography variant="h6" sx={{ color: '#a5f3fc' }}>
              Status Effects
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {statusEffects.map((effect, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Chip
                  label={effect.name}
                  size="small"
                  color={effect.type === 'primary' ? 'primary' : 'default'}
                  sx={{ fontSize: '0.75rem' }}
                />
                <Typography variant="caption" sx={{ color: '#06b6d4' }}>
                  {effect.duration}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
