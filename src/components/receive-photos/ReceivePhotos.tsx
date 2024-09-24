import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
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
    <div className="flex justify-center bg-neutral-900">
      <div className="bg-neutral-800 m-3 py-8 px-3 w-full max-w-3xl rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-4">Zatraži slike</h2>
          <p className="text-xl text-neutral-300 mb-6 text-center">
            Ako želite da dobijete link do svih fotografija, ostavite svoj mail
          </p>
          <div className="w-full mb-4">
            <input
              // type="email"
              placeholder="Vaš email"
              value={inputEmail}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setInputEmail(event.target.value)}
              disabled={isSubmitted}
              className={`w-full p-3 bg-neutral-700 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSubmitted ? 'opacity-50 cursor-not-allowed' : 'border-neutral-600'
              } ${errorMessage ? 'border-red-500' : ''}`}
            />
            {errorMessage && (
              <p className="mt-2 text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>
          {isSubmitted ? (
            <p className="text-green-400 font-semibold mb-4">
              Link će vam stići tokom naredne nedelje.
            </p>
          ) : (
            <button
              disabled={inputEmail.length === 0}
              type="submit"
              className="w-full py-3 px-4 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-900 focus:ring-offset-2 focus:ring-offset-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prijavi se
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReceivePhotos;
