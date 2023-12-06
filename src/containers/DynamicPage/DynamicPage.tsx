import {useCallback, useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {Page} from '../../types';
import {DYNAMIC_PAGE} from '../../constansts/routes';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import {Box, Button, Typography} from '@mui/material';

const DynamicPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {page} = useParams();
  const [singlePage, setSinglePage] = useState<Page>({
    title: '',
    content: '',
    pageName: ''
  });

  const getSinglePage = useCallback(async () => {
    try {
      const pageResponse = await axiosApi.get<Page | null>(`/pages/${page}.json`);
      const singlePage = pageResponse.data;

      if (!singlePage) {
        return;
      }

      const contentSinglePage = Object.values(singlePage)[0];
      setSinglePage(contentSinglePage);
    } catch (error) {
      alert('Error!' + error);
    }
  }, [page]);


  useEffect(() => {
    if (location.pathname.includes(page ? page : '')) {
      void getSinglePage();
    }
  }, [getSinglePage, location.pathname, page]);

  return (
    <>
      {
        location.pathname.includes('edit') ?
          <Outlet/>
          :
          <>
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              sx={{
                textTransform: 'capitalize'
              }}
            >
              {singlePage.title}
            </Typography>
            <Box my="1rem">
              <FroalaEditorView
                model={singlePage.content}
              />
              <Box
                sx={{
                  my: "1rem",
                  display: "flex",
                  justifyContent: "end"
                }}
              >
                <Button onClick={() => navigate(`${DYNAMIC_PAGE}/${page}/edit`)} variant="outlined">Edit</Button>
              </Box>
            </Box>
          </>
      }
    </>
  );
};

export default DynamicPage;