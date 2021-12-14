import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SectionChooseDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Selecciona el tipo de sección a añadir:</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={() => handleListItemClick(1)}>
            Añadir solo teoría
        </ListItem>
        <ListItem button onClick={() => handleListItemClick(2)}>
            Añadir pregunta con respuesta simple
        </ListItem>
        
        <ListItem button onClick={() => handleListItemClick(3)}>
            Añadir pregunta con código
        </ListItem>
        
      </List>
    </Dialog>
  );
}


export default SectionChooseDialog;