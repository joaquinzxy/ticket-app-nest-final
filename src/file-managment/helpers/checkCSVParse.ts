import { BadRequestException } from "@nestjs/common"
import { validCSV } from "../interfaces/valid-csv"
import { ValidFilesExtensions } from "../interfaces/valid-extensions"

export const checkCSVParse = (csvParsed: validCSV): boolean => {

    const csvKeys = Object.keys(csvParsed)

    if (csvKeys.length !== 3) {
        return false;
    }

    const csvProvidedString = csvKeys
        .sort()
        .toString()
        .toLocaleLowerCase()
    const csvModelString = ValidFilesExtensions.csvFile.columns
        .sort()
        .toString()
        .toLocaleLowerCase()

    return csvProvidedString === csvModelString;
}