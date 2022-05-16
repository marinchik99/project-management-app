import React, { useEffect, useState } from 'react';
import './LoginPage.scss';
import { useForm, Controller } from 'react-hook-form';
import { ThemeProvider } from '@mui/material/styles';
import {
  Alert,
  Avatar,
  Box,
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
    login(data);
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
                  label="Введите пароль"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <LoadingButton
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
      </Container>
    </ThemeProvider>
  );
}
