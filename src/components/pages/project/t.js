import React, { useState } from "react";
import api from "../../../utils/api";
import { useSnackbar } from "notistack";
import { Container, Form, StyledTextField, StyledButton, FileInput, FileInputLabel } from './ts';

const CreateProjectTeste = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    images: [],
    link: '',
    value: '',
    docs: null
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleFileChange = (event) => {
    const fieldName = event.target.name;
    const files = event.target.files;

    if (fieldName === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else if (fieldName === 'images') {
      setFormData({ ...formData, images: files });
    } else if (fieldName === 'docs') {
      setFormData({ ...formData, docs: files[0] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newdata = new FormData();
    newdata.append('name', formData.name);
    newdata.append('image', formData.image);
    Array.from(formData.images).forEach((img, index) => {
      newdata.append('images', img);
    });
    newdata.append('link', formData.link);
    newdata.append('value', formData.value);
    newdata.append('docs', formData.docs);

    console.log(newdata)
      return

    try {
      const response = await api.post('projects/create', newdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      
      enqueueSnackbar(error.data.message, { variant: 'error' });
      
    }
  };

  return (
    <Container>
      <h3>Criar Novo Projeto</h3>
      <Form onSubmit={handleSubmit}>
        <StyledTextField
          label="Nome do Projeto"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <FileInputLabel htmlFor="image">Escolha uma imagem principal</FileInputLabel>
        <FileInput
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />

        <FileInputLabel htmlFor="images">Escolha múltiplas imagens</FileInputLabel>
        <FileInput
          id="images"
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        <StyledTextField
          label="Link"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
        />

        <StyledTextField
          label="Valor"
          name="value"
          value={formData.value}
          onChange={handleInputChange}
        />

        <FileInputLabel htmlFor="docs">Escolha um arquivo de documento</FileInputLabel>
        <FileInput
          id="docs"
          type="file"
          name="docs"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        <StyledButton type="submit" variant="contained">Criar Projeto</StyledButton>
      </Form>
    </Container>
  );
};

export default CreateProjectTeste;
