import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function DialogConfirm({msg, open, close, onAcept, onDiscard}) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        close(reason)
      };

    return (
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Dialogo de confirmación"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancenar</Button>
        <Button onClick={e=>handleClose(e,true)} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
    );
}
export default DialogConfirm;