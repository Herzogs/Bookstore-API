import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './public/images',
  filename: (req: any, file: any, cb: any) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});
