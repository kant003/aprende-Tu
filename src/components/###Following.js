import UserCardSimple from './UserCardSimple';
import { unFollow, unMentor } from '../services/usersFirestore';
import { notify, notifyError } from '../services/Utils';

const divStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '1rem',
  marginBottom: '1rem'
};

function Following({ uid, userMap }) {

  const onUnFollow = async (keyy) => {
    try { //TODO: usar transacciones
      await unFollow(uid, keyy)
      await unMentor(keyy, uid)
      notify('Dejando de seguir al usuario')
    } catch (error) {
      notifyError('Error al dejar de seguir: ' + error)
    }
  }

  return (
    userMap != null && Object.entries(userMap).sort().map(([keyy, value]) =>
      <div key={keyy + uid} style={divStyle}>
        <UserCardSimple key={keyy} uid={keyy} active={!!value} />
        {value ? <div>Ya es tu mentor!</div> : <div>Pendiente de contestación</div>}
        {value && <button className="button is-small is-danger" onClick={() => onUnFollow(keyy)}>Dejar de seguir</button>}
      </div>
    )
  );
}
export default Following;
