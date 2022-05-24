import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ThemeProvider } from '@mui/material/styles';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PersonIcon from '@mui/icons-material/Person';
import theme from '../../../utils/themeSettings';
import { UserType } from '../../../types/types';
import { useLoginMutation } from '../../../store/services/usersApi';
import { useNavigate } from 'react-router-dom';
import ModalCreateTask from '../../generalComponents/ModalCreateTask/ModalCreateTask';
import { useAppDispatch } from '../../../store';
import { getUsers } from '../../../store/reducers/usersReducer';

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const [login, { data, isError, isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  // /// for example
  // const [openModal, setOpenModal] = useState(false);
  // const handleOpenModal = () => setOpenModal(true);
  // const handleCloseModal = () => setOpenModal(false);
  // /// delete after implementaion

  useEffect(() => {
    if (!isError && data) {
      navigate('/');
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setOpen(true);
    }
  }, [isError]);

  const onSubmit = async (data: Partial<UserType>) => {
    await login(data);
    dispatch(getUsers());
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
            <PersonIcon></PersonIcon>
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти в аккаунт
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Controller
              name="login"
              control={control}
              rules={{
                required: { value: true, message: 'Заполните поле' },
                minLength: { value: 3, message: 'Минимальная длина логина 3 символа' },
                pattern: {
                  value: /^[A-Za-z0-9]+$/i,
                  message: 'Логин может содержать только латинские буквы и цифры',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputProps={{ 'data-testid': 'loginL' }}
                  margin="normal"
                  fullWidth
                  label="Введите логин"
                  autoFocus
                  error={!!errors.login}
                  helperText={errors.login?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: { value: true, message: 'Заполните поле' },
                minLength: { value: 4, message: 'Минимальная длина пароля 4 символа' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  inputProps={{ 'data-testid': 'passwordL' }}
                  label="Введите пароль"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <LoadingButton
              data-testid="submitL"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
            >
              Войти
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {'Зарегистрироваться'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%' }}
            variant="filled"
            color="error"
          >
            Неверный логин или пароль!
          </Alert>
        </Snackbar>
        {/* <Button variant="contained" onClick={() => setOpenModal(true)}>
          Create Task
        </Button> */}
        {/* <ModalCreateTask
          boardID="sadsad"
          columnID="sadsad"
          open={openModal}
          handleClose={handleCloseModal}
        /> */}
      </Container>
    </ThemeProvider>
  );
}
