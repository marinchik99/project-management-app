import React, { useEffect } from 'react';
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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import theme from '../../../utils/themeSettings';
import { useRegisterMutation } from '../../../store/services/usersApi';

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

  const [register, { data, isError, error }] = useRegisterMutation();
  const [isAgree, setAgree] = useState(false);

  useEffect(() => {
    if (!isError) {
      setAgree(false);
      reset();
    }
  }, [data]);

  const onSubmit = async (inputs: unknown) => {
    await register(inputs);
  };

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked);
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isAgree}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  {'Уже есть аккаунт? Войти'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
