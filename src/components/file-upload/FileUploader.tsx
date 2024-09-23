import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { supabase } from "../../clients/supabase.client";
import { BUCKET_NAME } from "../../services/supabase.service";

const FileUploader = () => {
  const [uploadStatus, setUploadStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleUpload = async (files: File[]) => {
    setUploadStatus(null);

    try {
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `uploads/${Date.now()}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          throw error;
        }

        return data;
      });

      const results = await Promise.all(uploadPromises);
      console.log('Files uploaded:', results);
      setUploadStatus({ success: true, message: `Uspesno postavljeno ${files.length} fajlova.` });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({ success: false, message: `Greska prilikom postavljanja fajlova: ${(error as Error).message}` });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 bg-neutral-900">
      <FileUpload onChange={handleUpload} />
      {uploadStatus && (
        <div className={`mt-4 p-3 rounded-md border ${uploadStatus.success
            ? 'bg-purple-900/20 border-purple-500/20 text-purple-300'
            : 'bg-red-900/20 border-red-500/20 text-red-300'
          }`}>
          <p className="text-sm">
            {uploadStatus.success ? '✅ ' : '❌ '}
            {uploadStatus.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
