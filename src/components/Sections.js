import { Link } from 'react-router-dom';
import { useSections } from '../hooks/useSections';
import SectionTheory from './SectionTheory';
import SectionPractice from './SectionPractice';
import { useSnackbar } from 'notistack';

function Sections({ idCourse, idTheme, authUser }) {
    const { loading, sections, /*addSection,*/ deleteSection } = useSections({ idCourse, idTheme, authUser })
    //const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();


  /*  const handleSubmit = (event) => {
        event.preventDefault();
        const theme = { title } 
        addSection(theme)
        console.log('navegando')
        navigate(`/themes/${idTheme}`)
        enqueueSnackbar('Curso borrado corretamente', { variant: 'success' })

    }*/

    const handleRemove = (event, idSection) => {
        event.preventDefault();
        deleteSection(idCourse, idTheme, idSection)
        enqueueSnackbar('Sección eliminada correctamente', { variant: 'success' })


    }

   /* const handleEdit = (event, id) => {
        event.preventDefault();
        //notify('Comentario eliminado')
    }*/

    //const itsMyCourse = () => course && authUser.uid === course.userRef.id
    //const iAmFollower= () => course && course.followers && course.followers[authUser.uid] != null
    //const iAmColaborator= () => course && course.followers && course.followers[authUser.uid]
  

    const list = () => loading ?
        <div>Cargando...</div>
        :
        sections.map((section) =>
            <div key={section.id}>
                <div>tipo: {section.type}</div>
                {section.type==='1' && <SectionTheory section={section}></SectionTheory>}
                {section.type==='2' && <SectionPractice section={section}></SectionPractice>}
                


                {/* <Link to={'/courses/'+ idCourse + '/themes/' + idTheme + '/sections/' + section.id}> Ver </Link> */}
                <div className="alineadoDerecha">  
                    <Link to={'/courses/'+ idCourse + '/themes/' + idTheme + '/addSection/'+ section.id}> Edit </Link>
                    <button onClick={(e) => handleRemove(e, section.id)} className="delete">X</button>
                </div>

            </div>
        )

    return (
        <div>
            {list()}
        </div>
    )
}
export default Sections;