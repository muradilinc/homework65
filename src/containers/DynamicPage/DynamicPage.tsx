import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Typography} from '@mui/material';

const DynamicPage = () => {
  const {page} = useParams();

  useEffect(() => {

  }, []);

  return (
    <Box>
      <Typography>
        Page: {page}
      </Typography>
    </Box>
  );
};

export default DynamicPage;