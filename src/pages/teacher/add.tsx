import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box
} from '@mui/material';
import { addDocument } from '../../config/FirebaseMethods';

interface Teacher {
  name: string;
  subject: string;
}

const TeacherAdd: React.FC = () => {
  const [teacherData, setTeacherData] = useState<Teacher>({ name: '', subject: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDocument('teachers', teacherData);
    setTeacherData({ name: '', subject: '' });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Add Teacher
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={teacherData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Subject"
          name="subject"
          value={teacherData.subject}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Teacher
        </Button>
      </Box>
    </Container>
  );
};

export default TeacherAdd;
