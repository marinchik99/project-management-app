import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  NativeSelect,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectCurrentUser } from '../../../store/reducers/authSlice';
import { createTask } from '../../../store/reducers/tasksReducers';
import { selectUsers } from '../../../store/reducers/usersReducer';
import { Trans, useTranslation } from 'react-i18next';
import { TaskType } from '../../../types/types';
import theme from '../../../utils/themeSettings';

type Props = {
  open: boolean;
  handleClose: () => void;
  boardId: string;
  columnId: string;
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

export default function ModalCreateTask({ open, handleClose, boardId, columnId }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      userId: '',
    },
  });
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { users } = useAppSelector(selectUsers);
  const { login } = useAppSelector(selectCurrentUser);

  const onSubmit = async (data: Pick<TaskType, 'title' | 'description' | 'userId'>) => {
    const { title, description, userId } = data;
    console.log(data);
    // const userId = users.filter((user) => user.login === login)[0].id;
    if (userId) {
      await dispatch(createTask({ boardId, columnId, title, description, userId })).unwrap();
    }
    handleClose();
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
              <Trans i18nKey="createTaskModal.title">Создание задачи</Trans>
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 2 }}>
              <Controller
                name="userId"
                control={control}
                rules={{
                  required: { value: true, message: 'Укажите исполнителя' },
                }}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined" error={!!errors.userId}>
                    <InputLabel id="native-select">Исполнитель</InputLabel>
                    <Select {...field} fullWidth labelId="native-select" label="Исполнитель">
                      {users.map((user) => {
                        return (
                          <MenuItem key={user.id} value={user.id}>
                            {`${user.name} aka ${user.login}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{!!errors.userId ? errors.userId?.message : ''}</FormHelperText>
                  </FormControl>
                )}
              />
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
                    label={t('createTaskModal.titleLabel')}
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
                    label={t('createTaskModal.descriptionLabel')}
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
                  <Trans i18nKey="createBtn">Создать</Trans>
                </LoadingButton>
                <Button onClick={handleClose}>
                  <Trans i18nKey="closeBtn">Закрыть</Trans>
                </Button>
              </ButtonGroup>
            </Box>
          </Container>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
