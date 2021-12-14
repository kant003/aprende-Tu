import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FormTheme from "../components/FormTheme";
import {getThemeById} from '../services/themesFirestore'
function AddThemePage() {
 // const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  //const { loading, themes } = useOwnExperiences({ uid: authUser.uid })
  const { idCourse } = useParams();
  const { idTheme } = useParams();

  const [theme, setTheme] = useState(null)

  
  useEffect(() => {
    idTheme && getThemeById(idCourse,idTheme).then(exp => {
      setTheme({ ...exp.data(), id: exp.id })
    })
  }, [idCourse,idTheme])


  const titles = () => idTheme ?
    <h1 className="title">Edición de un tema</h1>
    :
    <h1 className="title">Añade nuevo tema</h1>


  return (
    <>
          {titles()}
          <FormTheme idCourse={idCourse} idTheme={idTheme} theme={theme}></FormTheme>
    </>
  );
}

export default AddThemePage;

