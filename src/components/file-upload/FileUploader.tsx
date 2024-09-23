import { FileUpload } from "./FileUpload";
import { supabase } from "../../clients/supabase.client";

const FileUploader = () => {
  const handleUpload = async (files: File[]) => {
    files.forEach(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `uploads/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('Wedding Photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      console.log('File uploaded:', data);
    })
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border bg-neutral-900 border-neutral-800">
      <FileUpload onChange={handleUpload} />
    </div>
  );
}

export default FileUploader;
