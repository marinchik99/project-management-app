import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Box,
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
import { Trans, useTranslation } from 'react-i18next';

export default function SignupPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  const [register, { data, isError, isLoading }] = useRegisterMutation();
  const [isAgree, setAgree] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            <Trans i18nKey="signupPage.title">Регистрация</Trans>
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: { value: true, message: t('signupPage.fieldErrRequired') },
                minLength: { value: 2, message: t('signupPage.nameErrLength') },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: t('signupPage.nameErrSymbols'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  inputProps={{ 'data-testid': 'name' }}
                  label={t('signupPage.nameLabel')}
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
                required: { value: true, message: t('signupPage.fieldErrRequired') },
                minLength: { value: 3, message: t('signupPage.loginErrLength') },
                pattern: {
                  value: /^[A-Za-z0-9]+$/i,
                  message: t('signupPage.loginErrSymbols'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  inputProps={{ 'data-testid': 'loginS' }}
                  label={t('signupPage.loginLabel')}
                  error={!!errors.login}
                  helperText={errors.login?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: { value: true, message: t('signupPage.fieldErrRequired') },
                minLength: { value: 4, message: t('signupPage.passwordErrLength') },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label={t('signupPage.passwordLabel')}
                  type="password"
                  inputProps={{ 'data-testid': 'passwordS' }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <FormControlLabel
              control={
                <Checkbox
                  inputProps={{ role: 'checkbox' }}
                  checked={isAgree}
                  color="default"
                  onChange={checkboxChange}
                />
              }
              label={t('signupPage.agreePolicy')}
            />
            <LoadingButton
              type="submit"
              data-testid="submitS"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isAgree}
              loading={isLoading}
            >
              <Trans i18nKey="signupPage.signupBtn">Зарегистрироваться</Trans>
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  <Trans i18nKey="signupPage.loginLink">Уже есть аккаунт? Войти</Trans>
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
            <Trans i18nKey="signupPage.alert">Аккаунт с таким логином существует.</Trans>
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
