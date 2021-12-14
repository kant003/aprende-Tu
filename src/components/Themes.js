//import { useState } from 'react';
import { useThemes } from '../hooks/useThemes';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { ButtonGroup, ListItemButton } from '@mui/material';
import DialogConfirm from './DialogConfirm';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

function Themes({ idCourse, authUser }) {

    //const [title] = useState("");
    const { loading, themes/*, addTheme*/, deleteTheme } = useThemes({ idCourse })
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [themeToDelete, setThemeToDelete] = useState(null);
    const { enqueueSnackbar } = useSnackbar();


    /*const handleSubmit = (event) => {
        event.preventDefault();
        const theme = { title }
        addTheme(theme)
        //notify('Comentario añadido')

    }*/


    const handleRemove = (event, idTheme) => {
        event.preventDefault();
        setThemeToDelete(idTheme)
        //deleteTheme(idCourse, idTheme)
        //notify('Com   entario eliminado')
        setOpen(true);
    }

    const handleClose = (option, idTheme) => {
        setOpen(false);
        if (option === true) {
            deleteTheme(idCourse, themeToDelete)
            enqueueSnackbar('Tema eliminado correctamente', { variant: 'success' })

        }
        setThemeToDelete(null);
    }


  
   /* const handleEdit = (event, id) => {
        event.preventDefault();
        //notify('Comentario eliminado')
    }*/


    const list = () => loading ?
        <div>Cargando...</div>
        :



        themes.map((theme) =>
            <div key={theme.id}>
                <List dense={true}>
                    <ListItem href="#simple-list"

                        secondaryAction={
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <IconButton edge="end" aria-label="delete">
                                    <EditIcon onClick={(e) => navigate('/courses/' + idCourse + '/addTheme/' + theme.id)} />
                                </IconButton>
                                <IconButton aria-label="edit">
                                    <DeleteIcon onClick={(e) => handleRemove(e, theme.id)} />
                                </IconButton>
                            </ButtonGroup>

                        }
                    >

                        <ListItemButton onClick={(e) => navigate('/courses/' + idCourse + '/themes/' + theme.id)}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary={theme.title} secondary={theme.description} />
                        </ListItemButton>

                    </ListItem>
                </List>
                <DialogConfirm msg="¿Estas seguro que quieres borrar el tema y todos sus elementos?" open={open} close={e => handleClose(e,theme.id)}></DialogConfirm>

            </div>
        )

    return (
        <div>
            {list()}
        </div>
    )
}
export default Themes;