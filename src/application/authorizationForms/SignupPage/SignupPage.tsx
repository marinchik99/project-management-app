import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PersonIcon from '@mui/icons-material/Person';
import theme from '../../../utils/themeSettings';
import { useRegisterMutation } from '../../../store/services/usersApi';
import { UserType } from '../../../types/types';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  const [register, { data, isError, isLoading }] = useRegisterMutation();
  const [isAgree, setAgree] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isError && data) {
      setAgree(false);
      navigate('/Login');
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setOpen(true);
    }
  }, [isError]);

  const onSubmit = async (inputs: Partial<UserType>) => {
    await register(inputs);
  };

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked);
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
            Регистрация
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: { value: true, message: 'Заполните поле' },
                minLength: { value: 2, message: 'Минимальная длина имени 2 символа' },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Имя может содержать только латинские буквы',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Введите имя"
                  autoFocus
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
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
            <FormControlLabel
              control={<Checkbox checked={isAgree} color="default" onChange={checkboxChange} />}
              label="Согласен с политикой безопасности"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isAgree}
              loading={isLoading}
            >
              Зарегистрироваться
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  {'Уже есть аккаунт? Войти'}
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
            Аккаунт с таким логином существует
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
