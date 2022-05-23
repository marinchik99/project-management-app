import { Box, Container, CssBaseline, Modal, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import theme from '../../../utils/themeSettings';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ModalCreateTask({ open, handleClose }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Container component="div" maxWidth="xl" sx={{ mb: 4 }}>
            <Typography component="h1" variant="h4" align="center">
              Создание задачи
            </Typography>
          </Container>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
