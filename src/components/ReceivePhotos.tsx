import Box from '@mui/material/Box';
import Typography from '../views/mui/Typography';
import Snackbar from '../views/mui/Snackbar';
import Button from '../views/mui/Button';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import TextField from '../views/mui/TextField';

const ReceivePhotos = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [inputEmail, setInputEmail] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    if (inputEmail && !validateEmail(inputEmail)) {
      setNotificationMessage('Molim vas unesite validnu email adresu.');
    } else {
      setNotificationMessage('Link će vam stići tokom naredne nedelje.');
    }

    event.preventDefault();
    setIsNotificationOpen(true);
  }, [inputEmail]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'warning.main',
          m: 3,
          py: 8,
          px: 3,
          width: '100%',
          maxWidth: 750
        }}
      >
        <Box component="form" onSubmit={handleSubmit} >
          <Typography variant="h2" component="h2" gutterBottom>
            Zatraži slike
          </Typography>
          <Typography variant="h5">
            Ako želite da dobijete link do svih fotografija, ostavite svoj mail
          </Typography>
          <TextField
            noBorder
            placeholder="Vaš email"
            variant="standard"
            value={inputEmail}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInputEmail(event.target.value)}
            sx={{ width: '100%', mt: 3, mb: 2 }}
          />
          <Button
            disabled={inputEmail === null || inputEmail.length === 0}
            type="submit"
            color="primary"
            variant="contained"
            size={'large'}
            sx={{ width: '100%' }}
          >
            Pretplati se
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={isNotificationOpen}
        closeFunc={() => setIsNotificationOpen(false)}
        message={notificationMessage}
      />
    </Box>
  );
}

export default ReceivePhotos;
