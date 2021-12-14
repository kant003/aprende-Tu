import { addCourse, updateCourse, getUserRef } from "../services/coursesFirestore";
import { useEffect, useState } from "react";
import { uploadFile } from "../services/filestorage";
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router";
import { useSnackbar } from 'notistack';

// https://react-hook-form.com/get-started
// podemos usar yup para la validación



import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, Input, TextField } from "@mui/material";

export default function FormCourse({ idCourse, course }) {
  const { handleSubmit, setValue, control } = useForm();
  const [progress, setProgress] = useState(null);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (idCourse !== undefined) {
      course && setValue("title", course.title);
      course && setValue("description", course.description);
    }

  }, [idCourse, course,setValue]);

  const onSubmit = async data => {
    setLoading(true);
    const authUser = await JSON.parse(localStorage.getItem('authUser'))
    data.userRef = getUserRef(authUser.uid)
    if(image) data.img = image
    try {
      if (idCourse!==undefined) {
        await updateCourse(idCourse, data)
        enqueueSnackbar('Curso editado correctamente', {variant:'success'} )
        navigate('/courses/' + course.id)
      }
      else {
        await addCourse(data)
        enqueueSnackbar('Nuevo curso guardado correctamente', {variant:'success'} )
        navigate('/courses/')
      }

    } catch (error) {
      console.log('err',error)
      setLoading(false);
      enqueueSnackbar('Fallo al guardar', {variant:'error'} )
    }
  }



  const setUploading = (progress) => {
    console.log('uploading', progress)
    if (progress.isUploading) {
      setProgress(progress.progress)
    } else {
      setProgress(null)
      setImage(progress.uploadURL)
      enqueueSnackbar('Imagen subida correctamente', {variant:'success'} )

    }
  }

  function onSubmitFile(e) {
    e.preventDefault();
    uploadFile('courses' + course.id, e.target.files[0], setUploading, 0)
  }

  const divStyle = {
    display: 'none'
  };

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      autoComplete="off"
    >
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
        {course && <img src={course.img} alt=""/> }


        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}

        {/* <label className="label">Selecciona la imagen a subir</label>
        <input id="uploadBtn" type="file" className="upload" onChange={e => onSubmitFile(e)} /> {progress} */}

        <FormControl sx={{ m: 1 }} variant="filled">

          <label htmlFor="contained-button-file">
            <Input style={divStyle} accept="image/*" id="contained-button-file" type="file" onChange={e => onSubmitFile(e)} />
            <Button variant="contained" component="span">
              Subir imagen
            </Button>
          </label>
          {progress}
        </FormControl>


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
</Box>
  );
}