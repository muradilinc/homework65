import {Box, Typography} from '@mui/material';

const HomePage = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
      >
        Home page
      </Typography>
      <Box my={2}>
        <Typography
          variant="h5"
          component="p"
        >
          A homepage is a page designated to be the main entry point to a website, appearing when a user starts a session. Home pages usually offer a welcome to the Internet user, a text explaining the meaning of the website and a menu with links to other pages.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;