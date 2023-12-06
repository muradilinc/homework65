import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {Page, PageApi, PageMutation} from '../../types';
import {DYNAMIC_PAGE} from '../../constansts/routes';
import {validateSlug} from '../../utils/validateSlug';
import FroalaEditor from 'react-froala-wysiwyg';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';


interface Props {
  pages: PageApi[];
  updateData: () => void;
}

const AdminPage: React.FC<Props> = ({pages, updateData}) => {
  const location = useLocation();
  const editStatus = location.pathname.includes('edit');
  const navigate = useNavigate();
  const {page} = useParams();
  const [editPage, setEditPage] = useState<PageMutation>({
    id: '',
    selectPage: '',
    titlePage: '',
  });
  const [description, setDescription] = useState<FroalaEditor>();
  const [slug, setSlug] = useState<string>('');

  const getSinglePage = useCallback(async (selectPage: string) => {
    try {
      const pageResponse = await axiosApi.get<Page | null>(`/pages/${page ? page : selectPage}.json`);
      const singlePage = pageResponse.data;

      if (!singlePage) {
        return;
      }

      const contentSinglePage = Object.values(singlePage)[0];
      setEditPage(prevState => ({
        ...prevState,
        id: Object.keys(singlePage)[0],
        selectPage: contentSinglePage.pageName,
        titlePage: contentSinglePage.title,
      }));
      setDescription(contentSinglePage.content);
    } catch (error) {
      alert('Error!' + error);
    }
  }, [page]);

  useEffect(() => {
    if (location.pathname.includes('edit') || editPage.selectPage !== '') {
      void getSinglePage(editPage.selectPage);
    }
  }, [getSinglePage, location.pathname, editPage.selectPage]);

  const changeEditPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const {name, value} = event.target;

    setEditPage(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const changeSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(event.target.value);
  };
  const changeDescription = (event: FroalaEditor) => {
      setDescription(event);
  };

  const saveContent = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (editPage.selectPage.includes('new')) {
        if (validateSlug(slug)) {
          await axiosApi.post(`/pages/${slug}.json`, {
            content: description,
            title: editPage.titlePage,
            pageName: editPage.titlePage
          });
          updateData();
          navigate(`${DYNAMIC_PAGE}/${page ? page : slug}`);
        }
      } else {
        await axiosApi.put(`/pages/${page ? page : editPage.selectPage}/${editPage.id}.json`, {
          content: description,
          title: editPage.titlePage,
          pageName: editPage.titlePage
        });
        updateData();
        navigate(`${DYNAMIC_PAGE}/${page ? page : editPage.selectPage}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('Error ' + error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h4"
      >
        Edit page
      </Typography>
      <form onSubmit={saveContent}>
        {
          !editStatus ?
            <FormControl
              fullWidth
              sx={{
                my: '1rem'
              }}
            >
              <InputLabel id="demo-simple-select-label">Page</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="selectPage"
                required
                value={editPage.selectPage}
                label="page"
                onChange={changeEditPage}
              >
                {
                  !editStatus ?
                    <MenuItem value="new-page">New Page</MenuItem>
                    :
                    null
                }
                {
                  pages.map((page) =>
                    <MenuItem key={page.page} value={page.page}>{page.page}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            :
            null
        }
        <FormControl sx={{
          width: '100%',
          my: '1rem'
        }}>
          <TextField
            value={editPage.titlePage}
            onChange={changeEditPage}
            name="titlePage"
            label="Title"
            variant="outlined"
            required
          />
        </FormControl>
        {
          editPage.selectPage.includes('new') ?
            <FormControl sx={{
              width: '100%',
              my: '1rem'
            }}>
              <TextField
                value={slug}
                onChange={changeSlug}
                name="slug"
                label="ID slug"
                variant="outlined"
                required
              />
            </FormControl>
            :
            null
        }
        <FormControl
          sx={{
            width: '100%',
            my: '1rem'
          }}
        >
          <FroalaEditor
            tag='textarea'
            model={description}
            onModelChange={changeDescription}
            />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="success"
        >
          Save
        </Button>
        {
          editStatus ?
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{
                marginLeft: '10px'
              }}
              onClick={() => navigate(`${DYNAMIC_PAGE}/${page}`)}
            >
              Cancel
            </Button>
            :
            null
        }
      </form>
    </Box>
  );
};

export default AdminPage;