//import Experiences from '../components/Experiences';
//import Search from '../components/Search';
import { Divider, Fab, IconButton, InputBase, Paper, Tooltip } from '@mui/material';
import { useParams } from 'react-router';
//import { useExperiences } from '../hooks/useExperiences';
import Courses from '../components/Courses';
import { useCourses } from '../hooks/useCourses';
//import { notify } from '../services/Utils';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router";

function CoursesPage() {
  const { search } = useParams();
  //const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const { loading, courses } = useCourses({ keyword: search })
  //const navigate = useNavigate();
  //const location = useLocation();
  const navigate = useNavigate();


  return (
    <>

    <Tooltip title="Nuevo curso">
        <Fab color="primary" aria-label="add" onClick={e => navigate('/addcourse/')}>
          <AddIcon />
        </Fab>
      </Tooltip>
      
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar curso"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>

      </Paper>

      



      <h1 className="title">Listado de cursos</h1>

      {/* {location.pathname !== "/home/" && <Search onSubmit={handleSubmit} />}
     */}
      {loading ? <div>Cargando</div> : <Courses courses={courses} />}

    </>
  );
}

export default CoursesPage;
