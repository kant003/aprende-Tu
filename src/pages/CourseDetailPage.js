import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getCourseRef } from "../services/coursesFirestore";
// import Comments from '../components/Commnets';
import Comments from '../components/Commnets';
import Themes from '../components/Themes';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Followers from '../components/Followers';
import { onSnapshot } from '@firebase/firestore';

function CourseDetailPage() {
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const [course, setCourse] = useState(null)
  const { idCourse } = useParams();

  //useEffect(() => console.log(idCourse), []);

  useEffect(() => {
    const unsub = onSnapshot(getCourseRef(idCourse), u => setCourse({ ...u.data(), id: u.id }));
    return () => unsub();

  }, [idCourse])

  const itsMyCourse = () => course && authUser.uid === course.userRef.id
  //const iAmFollower= () => course && course.followers && course.followers[authUser.uid] != null
  const iAmColaborator= () => course && course.followers && course.followers[authUser.uid]


  return (
    <>
      <Typography variant="h2" component="h1">
        {course && course.title}
      </Typography>
      <Typography variant="h4" component="h2">
        {course && course.description}
      </Typography>
      <hr />
      { (itsMyCourse() || iAmColaborator()) && <Link to={'addTheme'}>Añade tema</Link> }
      <Typography variant="h5" component="h3">
        Lista de temas
      </Typography>
      {course && <Themes idCourse={course.id} authUser={authUser} itsMyCourse={itsMyCourse} iAmColaborator={iAmColaborator}/>}

      <hr />
      <div>Comentarios:</div>
      {course && <Comments idExp={idCourse} authUser={authUser} />}

      {course && itsMyCourse() && <Followers  idCourse={course.id} userMap={course.followers}/>}
    </>
  );
}
export default CourseDetailPage;
