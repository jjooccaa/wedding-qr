import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload, IconPhoto } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { cn } from "../../lib/utils";
import { supabase } from "../../clients/supabase.client";
import { BUCKET_NAME } from "../../services/supabase.service";
import { ExtendedFile } from "../../types/ExtendedFile";
import { Statuses } from "../../enums/Statuses";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const randomString = (length = 5) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const FileUpload = () => {
  const [files, setFiles] = useState<ExtendedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (newFiles: File[]) => {
    const extendedFiles: ExtendedFile[] = newFiles.map((file, index) => {
      const extendedFile = {
        id: Date.now() + index,
        status: Statuses.IDLE,
        url: null,
        file: file
      };

      return extendedFile;
    });

    setFiles(prevFiles => [...prevFiles, ...extendedFiles]);

    for (const file of extendedFiles) {
      try {
        setFiles(prevFiles =>
          prevFiles.map(f => f.id === file.id ? { ...f, status: Statuses.UPLOADING } : f)
        );
        console.log(file.file)
        const fileExt = file.file.name.split('.').pop();
        const fileName = `uploads/${Date.now()}${randomString(5)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, file.file, {
            cacheControl: '3600',
            upsert: false
          });
        console.log(data);

        if (error) {
          throw error;
        }
        setFiles(prevFiles =>
          prevFiles.map(f => f.id === file.id ? { ...f, status: Statuses.SUCCESS } : f)
        );

      } catch (error) {
        console.error('Upload error:', error);
        setFiles(prevFiles =>
          prevFiles.map(f => f.id === file.id ? { ...f, status: Statuses.ERROR } : f)
        );
      }
    }
  };

  const handleFileChange = (newFiles: File[]) => {
    handleUpload(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full mx-auto min-h-96 bg-cream-50 relative overflow-hidden pb-8" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          multiple
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <IconPhoto className="text-olive-600 w-12 h-12 mb-4" />
          <p className="relative z-20 font-sans font-bold text-olive-700 text-xl mb-2">
            Dodaj fotografije
          </p>
          <p className="relative z-20 font-sans text-center font-normal text-olive-800 text-base mt-2">
            Prevuci ili klikni da bi dodao fotografije <br />(Limit je 20 mb po fotografiji)
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-cream-100 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm border border-olive-500/20"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-olive-700 truncate max-w-xs"
                    >
                      {file.file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className={cn(
                        "rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm shadow-input",
                        file.status === Statuses.IDLE && "bg-olive-200 text-olive-800",
                        file.status === Statuses.UPLOADING && "bg-olive-300 text-olive-800",
                        file.status === Statuses.SUCCESS && "bg-olive-600 text-white",
                        file.status === Statuses.ERROR && "bg-red-200 text-red-800"
                      )}
                    >
                      {file.status === Statuses.IDLE && 'Na čekanju'}
                      {file.status === Statuses.UPLOADING && 'Postavlja se...'}
                      {file.status === Statuses.SUCCESS && 'Postavljeno'}
                      {file.status === Statuses.ERROR && 'Greška'}
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-olive-700">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-olive-200"
                    >
                      {file.file.type}
                    </motion.p>
                    <div className="flex flex-row items-center justify-between w-full">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                      >
                        modified {new Date(file.file.lastModified).toLocaleDateString()}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm bg-olive-200 text-olive-800 shadow-input"
                      >
                        {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-cream-100 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)] border border-olive-500/20"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-olive-700 flex flex-col items-center"
                  >
                    Pustite
                    <IconUpload className="h-4 w-4 text-olive-600" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-olive-600" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-olive-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}

            {files.length > 0 && (
              <div className="flex justify-center mt-4">
                <button className="px-4 py-2 backdrop-blur-sm border bg-olive-200 border-olive-500/20 text-olive-700 mx-auto text-center rounded-full relative mt-4">
                  <span>Postavi još</span>
                  <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-olive-600 to-transparent" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FileUpload;

