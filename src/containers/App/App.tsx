import Header from '../../components/Header/Header';
import {ADMIN_PAGE, DYNAMIC_PAGE, HOME_PAGE} from '../../constansts/routes';
import {Route, Routes, useLocation} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import {Container} from '@mui/material';
import DynamicPage from '../DynamicPage/DynamicPage';
import AdminPage from '../AdminPage/AdminPage';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {PageApi} from '../../types';

const App = () => {
  const location = useLocation();
  const [pages, setPages] = useState<PageApi[]>([]);

  const getPages = useCallback( async () => {
    try {
      const pageResponse = await axiosApi.get('/pages.json');
      const page = pageResponse.data;
      const newPages = Object.keys(page).map(key => {
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

  useEffect(() => {
    if (location.pathname === HOME_PAGE) {
      void getPages();
    }
  }, [getPages, location.pathname]);

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