import { useEffect, useState } from "react";
import { useParams } from "react-router";
//import FormCourse from "../components/FormCourse";
import FormSectionPractice from "../components/FormSectionPractice";
import FormSectionTheory from "../components/FormSectionTheory";
import { getSectionByIdSection } from "../services/sectionFirestore";

function AddSectionPage() {
  //const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  //const { loading, themes } = useOwnExperiences({ uid: authUser.uid })
  const { idCourse } = useParams();
  const { idTheme } = useParams();
  const { idSection } = useParams();
  const { type } = useParams();

  const [section, setSection] = useState(null)

  
  useEffect(() => {

    idSection && getSectionByIdSection(idCourse,idTheme,idSection).then(exp => {
      setSection({ ...exp.data(), id: exp.id })
    })

  }, [idCourse,idTheme,idSection])

  const types = () =>  {
    switch (type) {
      case '1': return 'teoría'
      case '2': return 'practica'
      default: return 'error'
    }
  }


  const titles = () => idSection ? "Edición de sección" : "Añade un nueva sección"


  return (
    <>
          <h1 className="title"> {titles()} {types()} </h1>
          {type==='1' && <FormSectionTheory idCourse={idCourse} idTheme={idTheme} idSection={idSection} section={section}></FormSectionTheory>}
          {type==='2' && <FormSectionPractice idCourse={idCourse} idTheme={idTheme} idSection={idSection} section={section}></FormSectionPractice>}
    </>
  );
}

export default AddSectionPage;

