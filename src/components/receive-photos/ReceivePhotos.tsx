import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SupabaseService } from '../../services/supabase.service';
import Spinner from '../spinner/Spinner';

const ReceivePhotos: React.FC = () => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInputEmail(input);
    setIsButtonDisabled(input.length <= 0);
    setErrorMessage('');
  };

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateEmail(inputEmail)) {
      setErrorMessage('Molim vas unesite validnu email adresu.');
      setIsButtonDisabled(true);
      setIsLoading(false);

      return;
    }

    try {
      await SupabaseService.createEmail(inputEmail);
      setErrorMessage('');
      setIsSubmitted(true);
    } catch (error: any) {
      const errorMessage = error.message as string ?? 'Nešto se desilo, pokušajte opet!';
      setErrorMessage(errorMessage.includes('duplicate') ? 'Već postoji ovaj mail' : errorMessage);
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(true);
    }
  }, [inputEmail]);

  return (
    <div className="flex justify-center bg-gradient-to-b from-neutral-800 to-neutral-900 py-11">
      <div className="bg-neutral-800 mx-3 py-7 px-6 w-full max-w-3xl rounded-lg shadow-2xl border border-purple-500/20">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <h2 className="text-4xl font-script text-purple-300 mb-4">Zatraži slike</h2>
          <p className="text-xl text-neutral-300 mb-8 text-center">
            Ako želite da dobijete link do svih fotografija, ostavite svoj email
          </p>
          <div className="w-full mb-6 relative">
            <input
              placeholder="Vaša email adresa"
              value={inputEmail}
              onChange={handleOnInputChange}
              disabled={isSubmitted}
              className={`w-full p-4 bg-neutral-700 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                isSubmitted ? 'opacity-50 cursor-not-allowed' : 'border-neutral-600'
              } ${errorMessage ? 'border-red-500' : ''}`}
            />
            <AnimatePresence>
              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-red-400 mb-4 text-sm absolute"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-purple-300 font-semibold my-6 text-center"
              >
                Link će vam stići u toku naredne nedelje.
              </motion.p>
            ) : isLoading ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6"
              >
                <Spinner />
              </motion.div>
            ) : (
              <motion.button
                key="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isButtonDisabled || isSubmitted}
                type="submit"
                className="w-full mt-4 py-4 px-6 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Prijavi se
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}

export default ReceivePhotos;