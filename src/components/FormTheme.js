import { saveTheme, updateTheme } from "../services/themesFirestore";

// https://react-hook-form.com/get-started
// podemos usar yup para la validación

import { useSnackbar } from 'notistack';

import { useNavigate } from "react-router";

import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, FormControl } from "@material-ui/core";
import SaveIcon from '@mui/icons-material/Save';

export default function FormTheme({idCourse, idTheme, theme}) {
  const { handleSubmit,setValue, control/*, formState: { errors }*/ } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (theme && idTheme !== undefined) {
      theme && setValue("title", theme.title);
      theme && setValue("description", theme.description);
    }
  }, [idTheme, theme,setValue]);


const onSubmit = async data => {
  setLoading(true);

    try {
      if (idTheme !== undefined) {
        updateTheme(idCourse, idTheme, data)
        enqueueSnackbar('Tema editado correctamente', { variant: 'success' })
        navigate('/courses/' + idCourse)
      }
      else {
        saveTheme(idCourse,data)
        enqueueSnackbar('Nuevo tema guardado correctamente', { variant: 'success' })
        navigate('/courses/' + idCourse)
      }

    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Fallo al guardar', { variant: 'error' })
    }
}



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Titulo"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: 'El título es necesario' }}
        />
      </div>

      <div>

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Descripción del curso"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              multiline
              maxRows={4}
            />
          )}
          rules={{ required: 'La descripción es obligatorio' }}
        />

      </div>
      

      <FormControl sx={{ m: 1 }} variant="filled">

        <Button title="Submit" onClick={handleSubmit(onSubmit)}
          disabled={loading}
          color="secondary"
          loading={loading.toString()}
          loadingposition="start"
          startIcon={<SaveIcon />}
          variant="contained">Guardar</Button>
      </FormControl>

    </form>
  );
}