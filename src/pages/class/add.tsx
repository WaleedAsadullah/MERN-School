import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { addDocument } from '../../config/FirebaseMethods';

interface Class {
  name: string;
  section: string;
}

const ClassAdd: React.FC = () => {
  const [classData, setClassData] = useState<Class>({ name: '', section: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClassData({ ...classData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDocument<Class>('classes', classData);
    setClassData({ name: '', section: '' });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Add Class
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={classData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Section"
          name="section"
          value={classData.section}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Class
        </Button>
      </Box>
    </Container>
  );
};

export default ClassAdd;
