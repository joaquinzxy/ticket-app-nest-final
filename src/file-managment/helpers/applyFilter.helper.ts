import { BadRequestException } from "@nestjs/common";
import { ValidFilesExtensions } from "../interfaces/valid-extensions";

export const applyFilter = (fileInputExtension: string, fileKey: string, callbackFn: Function) => {
    const validExtensions = ValidFilesExtensions[fileKey].format;
    if (!validExtensions) {
        throw new BadRequestException('EXTENSIONS_NOT_DEFINED_FOR_KEY')
    }

    if (validExtensions.includes(fileInputExtension)) {
        return callbackFn(null, true)
    } else {
        return callbackFn((new BadRequestException('FILE_NOT_COMPATIBLE')), false)
    }
}