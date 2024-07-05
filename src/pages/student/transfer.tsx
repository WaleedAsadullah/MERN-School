import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllDocuments, addDocument, deleteDocument } from '../../config/FirebaseMethods';

interface Student {
  id: string;
  name: string;
}

interface Class {
  id: string;
  name: string;
  section: string;
}

interface Transfer {
  id?: string;
  studentId: string;
  classId: string;
}

const StudentTransfer: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [transferData, setTransferData] = useState({ studentId: '', classId: '' });

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchTransfers();
  }, []);

  const fetchStudents = async () => {
    const data = await getAllDocuments<Student>('students');
    setStudents(data);
  };

  const fetchClasses = async () => {
    const data = await getAllDocuments<Class>('classes');
    setClasses(data);
  };

  const fetchTransfers = async () => {
    const data = await getAllDocuments<Transfer>('transfers');
    setTransfers(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDocument('transfers', transferData);
    setTransferData({ studentId: '', classId: '' });
    fetchTransfers();
  };

  const handleDelete = async (id: string) => {
    await deleteDocument('transfers', id);
    fetchTransfers();
  };

  const getStudentName = (id: string) => {
    const student = students.find(student => student.id === id);
    return student ? student.name : 'Unknown';
  };

  const getClassInfo = (id: string) => {
    const cls = classes.find(cls => cls.id === id);
    return cls ? `${cls.name} - ${cls.section}` : 'Unknown';
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Transfer Student
        </Typography>
        <TextField
          select
          label="Student"
          name="studentId"
          value={transferData.studentId}
          onChange={handleChange}
          required
        >
          {students.map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Class"
          name="classId"
          value={transferData.classId}
          onChange={handleChange}
          required
        >
          {classes.map((cls) => (
            <MenuItem key={cls.id} value={cls.id}>
              {cls.name} - {cls.section}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Transfer
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfers.map((transfer) => (
              <TableRow key={transfer.id}>
                <TableCell>{getStudentName(transfer.studentId)}</TableCell>
                <TableCell>{getClassInfo(transfer.classId)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(transfer.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentTransfer;
