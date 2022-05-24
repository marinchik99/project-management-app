import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TaskType } from '../../../types/types';
import theme from '../../../utils/themeSettings';

type Props = {
  open: boolean;
  handleClose: () => void;
  boardID: string;
  columnID: string;
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  width: 500,
  ['@media (max-width:600px)']: {
    width: '95%',
  },
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

export default function ModalCreateTask({ open, handleClose, boardID, columnID }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: Pick<TaskType, 'title' | 'description'>) => {
    console.log(data);
  };

  useEffect(() => {
    reset();
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Container component="div">
            <Typography component="h1" variant="h5" align="center">
              Создание задачи
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 2 }}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: { value: true, message: 'Заполните поле' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputProps={{ 'data-testid': 'taskTitleC' }}
                    margin="normal"
                    fullWidth
                    label="Заголовок"
                    autoFocus
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{
                  required: { value: true, message: 'Заполните поле' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputProps={{ 'data-testid': 'taskDescC' }}
                    margin="normal"
                    fullWidth
                    label="Описание задачи"
                    autoFocus
                    multiline
                    minRows={4}
                    sx={{ mb: 4 }}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
              <ButtonGroup fullWidth variant="contained">
                <LoadingButton data-testid="submitC" type="submit" fullWidth variant="contained">
                  Создать
                </LoadingButton>
                <Button onClick={handleClose}>Закрыть</Button>
              </ButtonGroup>
            </Box>
          </Container>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
