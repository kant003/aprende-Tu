import { followingUser } from '../services/usersFirestore';
import { followCourse } from '../services/coursesFirestore';
import UserAvatar from "./UserAvatar";
import { useSnackbar } from 'notistack';

const divStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '1rem',
  marginBottom: '1rem'
};

function Followers({ idCourse, userMap }) {
  const { enqueueSnackbar } = useSnackbar();

  const onFollow = async (keyy, value) => {
    //TODO: usar transacciones
    try {
      await followCourse(idCourse, keyy, value)
      await followingUser(keyy, idCourse, value)
      value ? enqueueSnackbar('Aceptada colaboración con usuario', { variant: 'success' })
        : enqueueSnackbar('Colaboración con usuario eliminada', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error al gestionar la colaboración con usuario', { variant: 'error' })

    }
  }

  return (
    <>
      <div>Seguidores:</div>
      {userMap != null && Object.entries(userMap).sort().map(([keyy, value]) =>
        <div key={keyy + idCourse} style={divStyle}>
          <div>{value === true ? 'si' : 'no'}</div>
          <div>{keyy}</div>
          {/* <UserCardSimple key={keyy} uid={keyy} active={!!value} /> */}
          <UserAvatar idUser={keyy} />
          {value === true ? <button className="button is-small is-danger" onClick={() => onFollow(keyy, false)}>Anular su colaboracion</button>
            :
            <button className="button is-small is-link" onClick={() => onFollow(keyy, true)}>Acepta su colaboración</button>}
        </div>
      )
      }
    </>
  )
}
export default Followers;
