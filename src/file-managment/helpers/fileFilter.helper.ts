import { applyFilter } from "./applyFilter.helper";

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    if (!file) return callback(new Error('File is empty'), false);

    const fileExtension = file.mimetype.split('/')[1];

    return applyFilter(fileExtension, file.fieldname, callback)
}
