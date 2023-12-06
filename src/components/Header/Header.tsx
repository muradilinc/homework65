import {AppBar, Box, Container, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {ADMIN_PAGE, DYNAMIC_PAGE, HOME_PAGE} from '../../constansts/routes';
import React from 'react';
import {PageApi} from '../../types';

interface Props {
  pages: PageApi[];
}

const Header: React.FC<Props> = ({pages}) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography
            variant="h4"
            component="h1"
          >
            <Link
              to={HOME_PAGE}
              style={{
                textDecoration: 'none',
                color: 'white'
              }}
            >
              SSR-Demo
            </Link>
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Typography mr={2}>
              <Link
                to={`${HOME_PAGE}`}
                style={{
                  textDecoration: 'none',
                  color: 'white'
                }}
              >
                Home
              </Link>
            </Typography>
            {
              pages.map(page => {
                return (
                  <Typography
                    sx={{
                      textTransform: 'capitalize'
                    }}
                    mr={2}
                    key={page.page}
                  >
                    <Link
                      to={`${DYNAMIC_PAGE}/${page.page}`}
                      style={{
                        textDecoration: 'none',
                        color: 'white'
                      }}
                    >
                      {page.page}
                    </Link>
                  </Typography>
                );
              })
            }
            <Typography>
              <Link
                to={`${DYNAMIC_PAGE}${ADMIN_PAGE}`}
                style={{
                  textDecoration: 'none',
                  color: 'white'
                }}
              >
                Admin
              </Link>
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;