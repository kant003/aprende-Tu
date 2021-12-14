import ProfilePhoto from './ProfilePhoto';
import UserSimple from './UserSimple';
import UserInfo from './UserInfo';
import UserDetail from './UserDetail';
import { follow, unMentor, unFollow, followUser } from '../services/usersFirestore';
import { useState } from 'react';
import { notify, notifyError } from '../services/Utils';

export default function User({ user, mode = "complex" }) {
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  const onFollow = async (keyy) => {
    try {
      await follow(authUser.uid, keyy)
      await followUser(keyy, authUser.uid, false)
      notify('Siguiendo al usuario')
    } catch (error) {
      notifyError('Error al seguir al usuario: ' + error)
    }
  }

  const onUnFollow = async (keyy) => {
    try { // usar transaction
      await unFollow(authUser.uid, keyy)
      await unMentor(keyy, authUser.uid)
      notify('Dejando de seguir al usuario')
    } catch (error) {
      notifyError('Error al dejar de seguir al usuario: ' + error)
    }
  }

  const itsMe = () => user && authUser.uid === user.uid
  const iAmYourFollower = () => user && user.followers && user.followers[authUser.uid] != null
  const isMyMentor = () => user && user.followers && user.followers[authUser.uid]

  return (
    <>
      {mode === "complex" ?
      <>
        <div className="profile-container">
          <ProfilePhoto user={user} />
          <UserInfo user={user} />
        </div>
        <div className="user-detail-container">
          <UserDetail authUser={authUser} user={user} onFollow={onFollow} onUnFollow={onUnFollow} itsMe={itsMe} iAmYourFollower={iAmYourFollower} isMyMentor={isMyMentor} />
        </div>
        </>
      :
        <UserSimple user={user} onFollow={onFollow} onUnFollow={onUnFollow} itsMe={itsMe} iAmYourFollower={iAmYourFollower} isMyMentor={isMyMentor} />
      }
      </>
  )
}
