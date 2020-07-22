import multer from 'multer';

import FileUploadController from '../../controller/FileUpload.Controller';

const upload = multer({ storage: multer.memoryStorage() });
const fileUpload = (router: any) => {
  const fileUploadController = new FileUploadController();

  const path = "/file";

  /* fileUpload private route */
  router.post(
    `${path}`,
    upload.single("file"),
    fileUploadController.fileUpload
  );
};
export default fileUpload;
