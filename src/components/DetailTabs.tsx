import {
  Assignment,
  Build,
  CheckCircle,
  Group,
  Inventory,
  LocalFireDepartment,
  Person,
  Psychology,
  Schedule,
  Shield,
  Star,
  Warning,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';

// Custom TabPanel component for Material UI
function CustomTabPanel(props: {
  children?: React.ReactNode;
  value: number;
  index: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, height: '100%' }}>{children}</Box>}
    </div>
  );
}

const inventory = [
  { name: 'Quantum Core', type: 'Material', rarity: 'legendary', quantity: 1 },
  { name: 'Neural Chips', type: 'Enhancement', rarity: 'rare', quantity: 12 },
  { name: 'Data Shards', type: 'Information', rarity: 'common', quantity: 47 },
  { name: 'Plasma Cells', type: 'Ammo', rarity: 'common', quantity: 250 },
  {
    name: 'Cyber Implant Mk-III',
    type: 'Equipment',
    rarity: 'epic',
    quantity: 1,
  },
  { name: 'Credit Chips', type: 'Currency', rarity: 'common', quantity: 15750 },
];

const quests = [
  {
    title: 'The Digital Heist',
    type: 'Main',
    progress: 75,
    status: 'active',
    description:
      'Infiltrate the corporate mainframe and steal the AI consciousness data.',
  },
  {
    title: 'Lost in the Grid',
    type: 'Side',
    progress: 100,
    status: 'complete',
    description: 'Help the rogue AI escape from virtual prison.',
  },
  {
    title: 'Gang Wars',
    type: 'Side',
    progress: 30,
    status: 'active',
    description: 'Mediate between the tech gangs and cyber-mages.',
  },
  {
    title: 'Ancient Protocols',
    type: 'Main',
    progress: 0,
    status: 'available',
    description: 'Decode the mysterious ancient data fragments.',
  },
];

const partyMembers = [
  { name: 'Jack-9', role: 'Tank', health: 85, status: 'Ready' },
  { name: 'Nova', role: 'Hacker', health: 100, status: 'Ready' },
  { name: 'Bolt', role: 'DPS', health: 60, status: 'Injured' },
];

const skills = [
  { name: 'Cybernetics', level: 8, progress: 65, maxLevel: 10 },
  { name: 'Hacking', level: 10, progress: 0, maxLevel: 10 },
  { name: 'Combat Systems', level: 6, progress: 30, maxLevel: 10 },
  { name: 'Neural Interface', level: 9, progress: 85, maxLevel: 10 },
  { name: 'Data Mining', level: 7, progress: 40, maxLevel: 10 },
];

function getRarityColor(rarity: string) {
  switch (rarity) {
    case 'legendary':
      return '#f97316';
    case 'epic':
      return '#8b5cf6';
    case 'rare':
      return '#3b82f6';
    case 'uncommon':
      return '#22c55e';
    default:
      return '#6b7280';
  }
}

export function DetailTabs() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'rgba(6, 182, 212, 0.3)' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 48,
              color: '#94a3b8',
              '&.Mui-selected': {
                color: '#06b6d4',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#06b6d4',
            },
          }}
        >
          <Tab icon={<Inventory />} iconPosition="top" />
          <Tab icon={<Assignment />} iconPosition="top" />
          <Tab icon={<Group />} iconPosition="top" />
          <Tab icon={<Psychology />} iconPosition="top" />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <CustomTabPanel value={tabValue} index={0}>
          <Card sx={{ height: '100%' }}>
            <CardContent
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <Inventory sx={{ color: '#06b6d4' }} />
                <Typography variant="h6" sx={{ color: '#a5f3fc' }}>
                  Inventory
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {inventory.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1,
                      mb: 1,
                      backgroundColor: 'rgba(51, 65, 85, 0.3)',
                      borderRadius: 1,
                      border: '1px solid rgba(71, 85, 105, 0.3)',
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: getRarityColor(item.rarity),
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                          {item.name}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#06b6d4' }}>
                        {item.type}
                      </Typography>
                    </Box>
                    <Chip
                      label={item.quantity}
                      size="small"
                      color="secondary"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Card sx={{ height: '100%' }}>
            <CardContent
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <Assignment sx={{ color: '#06b6d4' }} />
                <Typography variant="h6" sx={{ color: '#a5f3fc' }}>
                  Quests
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {quests.map((quest, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      mb: 1.5,
                      backgroundColor: 'rgba(51, 65, 85, 0.3)',
                      borderRadius: 1,
                      border: '1px solid rgba(71, 85, 105, 0.3)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        {quest.status === 'complete' ? (
                          <CheckCircle
                            sx={{ fontSize: 16, color: '#22c55e' }}
                          />
                        ) : quest.status === 'active' ? (
                          <Schedule sx={{ fontSize: 16, color: '#eab308' }} />
                        ) : (
                          <Warning sx={{ fontSize: 16, color: '#06b6d4' }} />
                        )}
                        <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                          {quest.title}
                        </Typography>
                      </Box>
                      <Chip
                        label={quest.type}
                        size="small"
                        color={quest.type === 'Main' ? 'primary' : 'secondary'}
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: '#67e8f9', display: 'block', mb: 1 }}
                    >
                      {quest.description}
                    </Typography>
                    {quest.status !== 'available' && (
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: '#06b6d4' }}
                          >
                            Progress
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: '#a5f3fc' }}
                          >
                            {quest.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={quest.progress}
                          color="primary"
                          sx={{ height: 4, borderRadius: 1 }}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <Group sx={{ color: '#06b6d4' }} />
                <Typography variant="h6" sx={{ color: '#a5f3fc' }}>
                  Party
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {partyMembers.map((member, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      backgroundColor: 'rgba(51, 65, 85, 0.3)',
                      borderRadius: 1,
                      border: '1px solid rgba(71, 85, 105, 0.3)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Person sx={{ fontSize: 20, color: '#06b6d4' }} />
                        <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                          {member.name}
                        </Typography>
                      </Box>
                      <Chip
                        label={member.status}
                        size="small"
                        color={member.status === 'Ready' ? 'primary' : 'error'}
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#06b6d4' }}>
                        {member.role}
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        {member.role === 'Tank' ? (
                          <Shield sx={{ fontSize: 16 }} />
                        ) : (
                          <LocalFireDepartment sx={{ fontSize: 16 }} />
                        )}
                        <Typography variant="body2" sx={{ color: '#a5f3fc' }}>
                          {member.health}% HP
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={member.health}
                      color={member.health > 50 ? 'success' : 'error'}
                      sx={{ height: 6, borderRadius: 1 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <Build sx={{ color: '#06b6d4' }} />
                <Typography variant="h6" sx={{ color: '#a5f3fc' }}>
                  Skills
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {skills.map((skill, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      mb: 1.5,
                      backgroundColor: 'rgba(51, 65, 85, 0.3)',
                      borderRadius: 1,
                      border: '1px solid rgba(71, 85, 105, 0.3)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                        {skill.name}
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Star sx={{ fontSize: 16, color: '#eab308' }} />
                        <Typography variant="body2" sx={{ color: '#a5f3fc' }}>
                          {skill.level}/{skill.maxLevel}
                        </Typography>
                      </Box>
                    </Box>
                    {skill.level < skill.maxLevel && (
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: '#06b6d4' }}
                          >
                            Next Level
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: '#a5f3fc' }}
                          >
                            {skill.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={skill.progress}
                          color="primary"
                          sx={{ height: 4, borderRadius: 1 }}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
