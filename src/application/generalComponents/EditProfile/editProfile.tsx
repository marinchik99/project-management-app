import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import theme from '../../../utils/themeSettings';
import '../../../css/editProfile.css';
import { useAppDispatch, useAppSelector } from '../../../store';
import { SubmitHandler, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { setModalDeleteState } from '../../../store/reducers/usersReducer';
import { Container, Avatar, Button } from '@mui/material';
import { IUserBody, updateUserById } from '../../../store/reducers/usersReducer';
import { ModalState } from '../../../.d';
import { selectCurrentUser } from '../../../store/reducers/authSlice';
import DeleteUserConfirmation from './modalDeleteUser';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  name: string;
  login: string;
  password: string;
};

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const { modalDeleteUser, users } = useAppSelector(({ usersReducer }) => usersReducer);
  const { login } = useAppSelector(selectCurrentUser);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    users.map((item) => {
      if (item.login == login) {
        setTimeout(() => setId(item.id), 0);
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (user: IUserBody) => {
    const { name, login, password } = user;
    setTimeout(() => dispatch(updateUserById({ id, name, login, password })), 300);
    navigate('/Boards');
  };

  const deleteUser = () => {
    const modalDeleteState: ModalState = {
      isOpen: true,
      type: 'column',
    };
    dispatch(setModalDeleteState(modalDeleteState));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="edit-profile" maxWidth="xs">
        <Box
          sx={{
            marginTop: 3,
            marginBottom: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
            <PersonIcon></PersonIcon>
          </Avatar>
          <Typography component="h1" variant="h5">
            Редактировать профиль
          </Typography>
          <Container sx={{ mt: 2 }}>
            <form className="form form-edit" onSubmit={handleSubmit(onSubmit)}>
              <input
                placeholder="Имя пользователя"
                id="form-title-input"
                className="form__input-text"
                {...register('name', { required: true, pattern: /^[A-Za-z]+$/i, minLength: 2 })}
              />
              {errors.name && (
                <span className="form__error-text">
                  Имя должно содержать латинские буквы и длина не менее 2 символов
                </span>
              )}
              <input
                id="form-title-input"
                placeholder="Логин"
                className="form__input-text"
                {...register('login', { required: true, pattern: /^[A-Za-z0-9]+$/i, minLength: 3 })}
              />
              {errors.login && (
                <span className="form__error-text">
                  Логин должен содержать латинские буквы и цифры и длина не менее 3 символов
                </span>
              )}
              <input
                id="form-title-input"
                placeholder="Пароль"
                className="form__input-text"
                {...register('password', { required: true, minLength: 4 })}
              />
              {errors.password && (
                <span className="form__error-text">Минимальная длина пароля - 4 символа</span>
              )}
              <div className="edit-buttons">
                <Button variant="outlined" className="edit-button save" type="submit">
                  Сохранить
                </Button>
                <Button variant="outlined" className="edit-button delete" onClick={deleteUser}>
                  Удалить
                </Button>
              </div>
              {modalDeleteUser.isOpen && <DeleteUserConfirmation id={id} />}
            </form>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
