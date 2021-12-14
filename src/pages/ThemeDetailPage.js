import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getThemeById } from "../services/themesFirestore";
// import Comments from '../components/Commnets';
//import Comments from '../components/Commnets';
import Sections from '../components/Sections';
import SectionChooseDialog from '../components/SectionChooseDialog';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

function ThemeDetailPage() {
 // const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const [theme, setTheme] = useState(null)
  const { idTheme } = useParams();
  const { idCourse } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const navigate = useNavigate();

  /*useEffect(() => console.log(id), []);*/

  useEffect(() => {
    console.log(idTheme);
    getThemeById(idCourse, idTheme).then(exp => {
      setTheme({ ...exp.data(), id: exp.id })
    })
  }, [idCourse, idTheme])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    console.log(value)
    navigate('addsection/'+value)
  };


  return (
    <>
      <div>Informacion del Tema</div>
      {theme && theme.id}
      <hr/>
      
      <Button variant="outlined" onClick={handleClickOpen}>
        Añadir sección
      </Button>
      <SectionChooseDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <div>Lista de secciones:</div>
      <Sections idCourse={idCourse} idTheme={idTheme}></Sections>

     
    </>
  );
}
export default ThemeDetailPage;
