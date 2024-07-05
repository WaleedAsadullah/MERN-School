import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { addDocument } from '../../config/FirebaseMethods'; // Assuming you have a file named firebaseService.ts containing the CRUD functions

interface Subject {
  name: string;
  description: string;
}

const SubjectAdd: React.FC = () => {
  const [subject, setSubject] = useState<Subject>({ name: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDocument<Subject>('subjects', subject); // Assuming you have a collection named 'subjects' in Firestore
    setSubject({ name: '', description: '' });
    alert('Subject added successfully!');
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Add Subject
        </Typography>
        <TextField
          label="Subject Name"
          name="name"
          value={subject.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Subject Description"
          name="description"
          value={subject.description}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Subject
        </Button>
      </Box>
    </Container>
  );
};

export default SubjectAdd;
