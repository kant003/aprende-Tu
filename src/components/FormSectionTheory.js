import { saveSection, updateSection } from "../services/sectionFirestore";
import { useEffect, useState } from "react";

import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from "react-router";
import { useSnackbar } from 'notistack';

import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

// https://react-hook-form.com/get-started
// podemos usar yup para la validación


export default function FormSectionTheory({ idCourse, idTheme, idSection, section }) {
  const { handleSubmit, setValue, control/*, formState: { errors } */} = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [valueMd, setValueMD] = useState("");


  useEffect(() => {
    if (section && idSection !== undefined) {
      section && setValue("title", section.title);
      section && setValue("description", section.description);
      section && setValue("text", section.text);
      section && setValueMD(section.text);
    }

  }, [idSection, section, setValue]);


 
  const onSubmit = async data => {
    setLoading(true);
    //const authUser = await JSON.parse(localStorage.getItem('authUser'))

    try {
      data.text = valueMd;
      data.type = "1"
      if (idSection !== undefined) {
        await updateSection(idCourse, idTheme, idSection, data)
        enqueueSnackbar('Sección editada correctamente', { variant: 'success' })
        navigate('/courses/' + idCourse + '/themes/' + idTheme)
      }
      else {
        saveSection(idCourse, idTheme, data)
        enqueueSnackbar('Sección añadida correctamente', { variant: 'success' })
        navigate('/courses/' + idCourse + '/themes/' + idTheme)
      }

    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Fallo al guardar', { variant: 'error' })
    }

  }



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}

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



      <div className="container">
        <MDEditor
          value={valueMd}
          onChange={setValueMD}
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