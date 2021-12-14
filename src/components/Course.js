import { Link } from "react-router-dom";
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { AvatarGroup, Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from "react-router";
import portada from '../assets/portada.jpeg'; // Tell webpack this JS file uses this image
import DialogConfirm from './DialogConfirm';
import { useState } from "react";
import UserAvatar from "./UserAvatar";
import { followingCourse} from '../services/usersFirestore';
import { removeCourse, unFollowCourse } from "../services/coursesFirestore";
import { followCourse,unFollow } from '../services/coursesFirestore';
import { useSnackbar } from 'notistack';




function Course({ course }) {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
const { enqueueSnackbar } = useSnackbar();


    const handleRemove = (event, idCourse) => {
        event.preventDefault();
        //removeCourse(idCourse)
        //notify('Com   entario eliminado')
        setOpen(true);
    }

    const handleClose = (option) => {
        setOpen(false);
        if (option === true) removeCourse(course.id)
        enqueueSnackbar('Curso borrado corretamente', { variant: 'success' })

    }

    const itsMyCourse = () => course && authUser.uid === course.userRef.id
    const iAmFollower= () => course && course.followers && course.followers[authUser.uid] != null
    const iAmColaborator= () => course && course.followers && course.followers[authUser.uid]
  
    const onFollow = async (keyy) => {
        try {
            //el curso pondra como follower a false el usuario x
            await followCourse(course.id, authUser.uid, false)
            //el usuario tendra como following a false el curso x
            await followingCourse( authUser.uid, course.id, false)
         // await followUser(keyy, authUser.uid, false)
         enqueueSnackbar('Solicitud de colaboración enviada corretamente', { variant: 'success' })

        } catch (error) {
            enqueueSnackbar('Error al enviar la solicitud de colaboración', { variant: 'error' })

        }
      }
    
      const onUnFollow = async (keyy) => {
        try { // usar transaction

          await unFollow(course.id, authUser.uid)
          await unFollowCourse(course.id, authUser.uid)
          enqueueSnackbar('Solicitud de fin de colaboración enviada correctamente', { variant: 'success' })
        } catch (error) {
            enqueueSnackbar('Error al enviar la solicitud de no-colaboración', { variant: 'error' })
        }
      }

      
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={e => navigate('/courses/' + course.id)}>
                    <CardMedia component="img" height="140" image={course.img || portada} alt="portada curso" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {course.description}
                        </Typography>
                    </CardContent>
                    <CardContent>

                        <AvatarGroup max={4}>
                        {course && course.followers!==undefined&& Object.entries(course.followers).sort().map(([keyy, value]) =>
                                
                              value===true ? <UserAvatar key={keyy} idUser={keyy} />:null
                            )}
                            {course.followers===undefined && <div>No tiene ningun colaborador</div>}
                        </AvatarGroup>   

                        {itsMyCourse() ? <div>Es tu curso</div>:<div>Es un curso de otro usuario</div>}
                    {iAmFollower() ? <div>Soy seguidor</div>:<div>No soy seguidor</div>}
                    {iAmColaborator() ? <div>Soy colaborador</div>:<div>No colaborador</div>}
                 
                    </CardContent>

                </CardActionArea>
                <CardActions>

                    {itsMyCourse() && <Button size="small" color="primary">
                        <Link to={'/addCourse/' + course.id}> Editar </Link>
                    </Button>}

                    {!itsMyCourse() && !iAmColaborator() && iAmFollower() && <Button size="small" color="primary" onClick={e=>onUnFollow()}>
                         anular petición de colaboracion
                    </Button>}
                    {!itsMyCourse() && (!iAmColaborator() && !iAmFollower()) && <Button size="small" color="primary" onClick={e=>onFollow()}>
                         Solicitar ser colaborador
                    </Button>}
                    {!itsMyCourse() && (iAmColaborator()) && <Button size="small" color="primary" onClick={e=>onUnFollow()}>
                         Dejar de ser colaborador
                    </Button>}
                    {itsMyCourse() && <Button size="small" color="primary" onClick={e => handleRemove(e, course.id)}>
                        Borrar
                    </Button>}
                    
                   

                </CardActions>
            </Card>
            <DialogConfirm msg="¿Estas seguro que quieres borrar el curso y todos sus elementos?" open={open} close={e => handleClose(e)}></DialogConfirm>
        </>
    )
}
export default Course;
