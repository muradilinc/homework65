import {useCallback, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ADMIN_PAGE, DYNAMIC_PAGE, HOME_PAGE} from '../../constansts/routes';
import axiosApi from '../../axiosApi';
import {PageApi} from '../../types';
import Header from '../../components/Header/Header';
import HomePage from '../HomePage/HomePage';
import DynamicPage from '../DynamicPage/DynamicPage';
import AdminPage from '../AdminPage/AdminPage';
import {Container} from '@mui/material';

const App = () => {
  const [pages, setPages] = useState<PageApi[]>([]);

  const getPages = useCallback(async (): Promise<void> => {
    try {
      const pageResponse = await axiosApi.get('/pages.json');
      const page = pageResponse.data;
      if (!page) {
        return;
      }

      const newPages: PageApi[] = Object.keys(page).map(key => {
        return {
          page: key,
          contentPage: page[key]
        };
      });
      setPages(newPages);
    } catch (error) {
      alert('Error! ' + error);
    }
  }, []);

  console.log(pages);

  useEffect(() => {
    void getPages();
  }, [getPages]);

  const updateData = () => {
    void getPages();
  };

  return (
    <>
      <Header pages={pages}/>
      <Container maxWidth="xl" sx={{my: '1rem'}}>
        <Routes>
          <Route path={HOME_PAGE} element={<HomePage/>}/>
          <Route path={`${DYNAMIC_PAGE}/:page`} element={<DynamicPage/>}>
            <Route path={`${DYNAMIC_PAGE}/:page/edit`} element={
              <AdminPage pages={pages} updateData={updateData}/>
            }/>
          </Route>
          <Route path={`${DYNAMIC_PAGE}${ADMIN_PAGE}`} element={
            <AdminPage pages={pages} updateData={updateData}/>
          }/>
        </Routes>
      </Container>
    </>
  );
};

export default App;