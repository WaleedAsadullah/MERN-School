import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RTreeView from '../component/RTreeView';
import { Route, Routes } from "react-router-dom";
import StudentAdd from './student/add';
import StudentList from './student/list';
import StudentTransfer from './student/transfer';
import TeacherAdd from './teacher/add';
import TeacherList from './teacher/list';
import TeacherAllocation from './teacher/allocation';
import ClassAdd from './class/add';
import ClassList from './class/list';
import SubjectAdd from './subject/add';
import SubjectList from './subject/list';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DashboardScreen() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const treeStructure = [
    {
      modelName : 'Student',
      prefix : '/dashboard/student',
      child : [
          {
              name : 'Add',
              route : '/add'
          },
          {
              name : 'List',
              route : '/list'
          },
          {
            name : 'Transfer',
            route : '/transfer'
        }
      ]
  },
  {
    modelName : 'Teacher',
    prefix : '/dashboard/teacher',
    child : [
        {
            name : 'Add',
            route : '/add'
        },
        {
            name : 'List',
            route : '/list'
        },
        {
          name : 'Allocation',
          route : '/allocation'
      }
    ]
  },
  {
    modelName : 'Subject',
    prefix : '/dashboard/subject',
    child : [
        {
            name : 'Add',
            route : '/add'
        },
        {
            name : 'List',
            route : '/'
        },
    ]
  },
  {
    modelName : 'Subject',
    prefix : '/dashboard/subject',
    child : [
        {
            name : 'Add',
            route : '/add'
        },
        {
            name : 'List',
            route : '/list'
        },
    ]
  },
  {
    modelName : 'School',
    prefix : '/dashboard/school',
    child : [
        {
            name : 'Registration',
            route : '/registration'
        }
    ]
  },
  {
    modelName : 'Syllabus',
    prefix : '/dashboard/syllabus',
    child : [
        {
            name : 'Add',
            route : '/add'
        },
        {
          name : 'List',
          route : '/list'
        }
    ]
  },
  {
    modelName : 'Class',
    prefix : '/dashboard/class',
    child : [
        {
            name : 'Add',
            route : '/add'
        },
        {
          name : 'List',
          route : '/list'
        }
    ]
  },
  {
    modelName : 'Fees',
    prefix : '/dashboard/fees',
    child : [
        {
            name : 'Structure',
            route : '/structure'
        },
        {
          name : 'Submission',
          route : '/submission'
        }
    ]
  },
  {
    modelName : 'Addmission',
    prefix : '/dashboard/addmission',
    child : [
        {
            name : 'Add',
            route : '/add'
        },
    ]
  },
  {
    modelName : 'Exam',
    prefix : '/dashboard/exam',
    child : [
        {
            name : 'Schedule',
            route : '/schedule'
        },
        {
          name : 'Result',
          route : '/result'
      },
    ]
  },
    
  ]
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <RTreeView treeStructure={treeStructure} />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
            <Routes>
                <Route path="/student/add" element={ <StudentAdd/> }/>
                <Route path="/student/list" element={ <StudentList/> }/>
                <Route path="/student/transfer" element={ <StudentTransfer/> }/>

                <Route path="/teacher/add" element={ <TeacherAdd/> }/>
                <Route path="/teacher/list" element={ <TeacherList/> }/>
                <Route path="/allocation/transfer" element={ <TeacherAllocation/> }/>

                <Route path="/class/add" element={ <ClassAdd/> }/>
                <Route path="/class/list" element={ <ClassList/> }/>
                
                <Route path="/subject/add" element={ <SubjectAdd/> }/>
                <Route path="/subject/list" element={ <SubjectList/> }/>
                
            </Routes>
      </Main>
    </Box>
  );
}
