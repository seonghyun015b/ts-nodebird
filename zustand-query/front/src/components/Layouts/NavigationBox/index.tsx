'use client';

import { List, Avatar, ListItem, ListItemButton, ListItemAvatar, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';

function NavigationBox() {
  const router = useRouter();

  return (
    <List sx={{ minWidth: '12.5rem', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemButton sx={{ padding: '1rem' }}>
          <Typography
            variant='h5'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
            component='div'
          >
            노드버드
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => router.push('/profile')}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <Typography variant='h6' color='inherit' noWrap sx={{ flexFlow: 1 }} component='div'>
            프로필
          </Typography>
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default NavigationBox;
