import { IsString } from "class-validator";

export class validCSV {

    @IsString()
    Fecha_compra: string;

    @IsString()
    Nro_Factura: string;

    @IsString()
    Cod_prod: string;

}