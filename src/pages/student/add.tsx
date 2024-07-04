import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { addDocument } from '../../config/FirebaseMethods';

interface Student {
  name: string;
  age: number;
  class: string;
}

const StudentForm: React.FC = () => {
  const [student, setStudent] = useState<Student>({ name: '', age: 0, class: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDocument<Student>('students', student);
    setStudent({ name: '', age: 0, class: '' });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Add Student
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={student.age}
          onChange={handleChange}
          required
        />
        <TextField
          label="Class"
          name="class"
          value={student.class}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Student
        </Button>
      </Box>
    </Container>
  );
};

export default StudentForm;
