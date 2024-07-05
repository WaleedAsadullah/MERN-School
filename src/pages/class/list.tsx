import React, { useState, useEffect } from 'react';
import { getAllDocuments, deleteDocument } from '../../config/FirebaseMethods';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Class {
  id?: string;
  name: string;
  section: string;
}

const ClassTable: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const data = await getAllDocuments<Class>('classes');
    setClasses(data);
  };

  const handleDelete = async (id: string) => {
    await deleteDocument('classes', id);
    fetchClasses();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((classData) => (
            <TableRow key={classData.id}>
              <TableCell>{classData.name}</TableCell>
              <TableCell>{classData.section}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(classData.id!)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassTable;
