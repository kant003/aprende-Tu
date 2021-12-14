import { useState } from 'react';
import { useComments } from '../hooks/useComments';
import { useSnackbar } from 'notistack';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  import ReactTimeAgo from 'react-time-ago'


const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    fonts: {
      fontWeight: "bold"
    },
    inline: {
      display: "inline"
    }
  }));
  
function Comments({ idExp, authUser }) {
    const classes = useStyles();

    const [text, setText] = useState("");
    const { loading, comments, addComment, deleteComment } = useComments({ idExp })
    const { enqueueSnackbar } = useSnackbar();


    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = { text, userId: authUser.uid, userDisplayName: authUser.displayName, userPhotoUrl: authUser.photoURL }
        addComment(comment)
        enqueueSnackbar('Comentario añadido corretamente', { variant: 'success' })

    }

    const handleRemove = (event, id) => {
        event.preventDefault();
        deleteComment(idExp, id)
        enqueueSnackbar('Comentario borrado corretamente', { variant: 'success' })
    }

    const form = () =>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Deja aquí tu comentario:
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </label>
            <input type="submit" />
        </form>



    const list = () => loading ?
        <div>Cargando...</div>
        :
        comments.map((comment) =>

       
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="avatar" src={comment.userPhotoUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={classes.fonts}>
                      {comment.userDisplayName}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.email}
                        {comment.createdAt && <ReactTimeAgo date={comment.createdAt.toDate()} locale="es-ES" timeStyle="twitter" />}
                      </Typography>
                      {` - ${comment.text}`}
                      <button onClick={(e) => handleRemove(e, comment.id)} className="delete">X</button>
                    </>
                  }
                />
              </ListItem>
          );

    return (
        <div>
            {form()}
            {list()}
        </div>
    )
}
export default Comments;