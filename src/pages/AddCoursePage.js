import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FormCourse from "../components/FormCourse";
import { getCourse } from "../services/coursesFirestore";

function AddCoursePage() {
  //const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  //const { loading, themes } = useOwnExperiences({ uid: authUser.uid })
  const { idCourse } = useParams();

  const [course, setCourse] = useState(null)

  
  useEffect(() => {

    idCourse && getCourse(idCourse).then(exp => {
      setCourse({ ...exp.data(), id: exp.id })
    })

  }, [idCourse])


  const titles = () => idCourse ?
    <h1 className="title">Edición de curso</h1>
    :
    <h1 className="title">Añade un nuevo curso</h1>


  return (
    <>
          {titles()}
          <FormCourse idCourse={idCourse} course={course}></FormCourse>
    </>
  );
}

export default AddCoursePage;

