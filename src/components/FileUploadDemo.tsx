// import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { supabase } from "../clients/supabase.client";

export function FileUploadDemo() {
  // const [files, setFiles] = useState<File[]>([]);
  // const handleFileUpload = (files: File[]) => {
  //   setFiles(files);
  //   console.log(files);
  // };

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
    // setFiles(files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-neutral-900 border-neutral-700 rounded-lg">
      <FileUpload onChange={handleUpload} />
    </div>
  );
}
