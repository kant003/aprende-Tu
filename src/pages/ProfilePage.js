import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserAvatar from '../components/UserAvatar';
import { getUser } from "../services/usersFirestore";
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { uid } = useParams();
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  
  useEffect(() => {
    setUser(authUser);
    getUser(authUser.uid).then(user => {
        setUser(user.data());
    });
  }, [authUser]);

  return (
    <>

<Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <UserAvatar idUser={uid} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user && user.displayName}
        subheader={user && user.email}
      />
     
      <CardContent>
          <div>Cursos que sigues:</div>
        <Typography variant="body2" color="text.secondary">
            <ul>
            {user && user.following!==undefined&& Object.entries(user.following).sort().map(([keyy, value]) =>
                                
                                <li> <Link to={'/courses/'+keyy}>{keyy}</Link> </li>
                              )
            }
            </ul>
        {user && user.following===undefined && <div>No eres seguidor de ningun curso</div>}
        </Typography>
      </CardContent>
      
      
    </Card>

      </>
  );
}

export default ProfilePage;

