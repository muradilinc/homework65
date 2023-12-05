import React, {useState} from 'react';
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
import axiosApi from '../../axiosApi';

const AdminPage = () => {
  const [editPage, setEditPage] = useState({
    selectPage: '',
    titlePage: '',
    descriptionPage: ''
  });

  const changeEditPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const {name, value} = event.target;

    setEditPage(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveContent = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axiosApi.put('/pages.json', editPage);
    } catch (error) {
      alert('Error ' + error);
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="selectPage"
            value={editPage.selectPage}
            label="page"
            onChange={changeEditPage}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{
          width: '100%'
        }}>
          <TextField
            value={editPage.titlePage}
            onChange={changeEditPage}
            name="titlePage"
            label="Outlined"
            variant="outlined"
          />
        </FormControl>
        <FormControl
          sx={{
            width: '100%'
          }}
        >
          <TextField
            variant="outlined"
            value={editPage.descriptionPage}
            onChange={changeEditPage}
            name="descriptionPage"
            label="Content"
            multiline={true}
            rows={5}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="success">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default AdminPage;