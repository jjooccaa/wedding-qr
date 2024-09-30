import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { SupabaseService } from '../../services/supabase.service';

const ReceivePhotos: React.FC = () => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(inputEmail)) {
      setErrorMessage('Molim vas unesite validnu email adresu.');
    } else {
      try {
        await SupabaseService.createEmail(inputEmail);
        setErrorMessage('');
        setIsSubmitted(true);
      } catch (error: any) {
        const errorMessage = error.message as string ?? 'Nesto se desilo, pokusajte opet!';
        setErrorMessage(errorMessage.includes('duplicate') ? 'Vec postoji ovaj mail' : errorMessage);
      }
    }
  }, [inputEmail]);

  return (
    <div className="flex justify-center bg-gradient-to-b from-neutral-800 to-neutral-900 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-neutral-800 m-3 py-7 px-6 w-full max-w-3xl rounded-lg shadow-2xl border border-purple-500/20"
      >
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <h2 className="text-4xl font-script text-purple-300 mb-4">Zatraži slike</h2>
          <p className="text-xl text-neutral-300 mb-8 text-center">
            Ako želite da dobijete link do svih fotografija, ostavite svoj email
          </p>
          <div className="w-full mb-6 relative">
            <input
              placeholder="Vaš email"
              value={inputEmail}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setInputEmail(event.target.value)}
              disabled={isSubmitted}
              className={`w-full p-4 bg-neutral-700 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                isSubmitted ? 'opacity-50 cursor-not-allowed' : 'border-neutral-600'
              } ${errorMessage ? 'border-red-500' : ''}`}
            />
            {errorMessage && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-red-400 text-sm absolute"
              >
                {errorMessage}
              </motion.p>
            )}
          </div>
          {isSubmitted ? (
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-green-400 font-semibold mb-4 text-center"
            >
              Link će vam stići u toku naredne nedelje.
            </motion.p>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={inputEmail.length === 0}
              type="submit"
              className="w-full py-4 px-6 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Prijavi se
            </motion.button>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default ReceivePhotos;