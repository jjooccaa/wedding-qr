import { supabase } from "../clients/supabase.client";
import { FileData } from "../types/FileData";

export const BUCKET_NAME = 'Wedding Photos';

export class SupabaseService {
  public static async fetchImagePaths(bucketName: string): Promise<FileData[]> {
    const folderPath = 'uploads';

    const { data, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath, {
        limit: 12,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('Error fetching images:', error.message);
      return [];
    }


    return data || [];
  }

  public static async generatePublicUrls(bucketName: string, paths: FileData[]): Promise<string[]> {
    const urls = await Promise.all(paths.map(async (file) => {
      const data: any = supabase.storage
        .from(bucketName)
        .getPublicUrl(`uploads/${file.name}`);

      if (data.data.error) {
        console.error('Error generating URL:', data.data.error);
        return null;
      }

      return data.data.publicUrl || null;
    }));

    return urls.filter(url => url !== null) as string[];
  }

  public static async createEmail(email: string): Promise<void> {
    const { error } = await supabase
      .from('emails')
      .insert([
        { email: email }
      ])
      .select()

    if (error) {
      console.error('Error adding email:', error.message);
      throw new Error(error.message);
    }
  }
}
