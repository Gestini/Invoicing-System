import { Product } from '@renderer/types/Products';
import React from 'react';
import * as XLSX from "xlsx";
import { Button } from "@nextui-org/react";

const ImportExcel = ({ products, setProducts }) => {
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const workbook = XLSX.read(event.target?.result as string, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const importedProducts: Product[] = data.slice(1).map((row: any) => ({
                    id: row[0],
                    name: row[1],
                    category: row[2],
                    price: row[3],
                    stock: row[4],
                    supplier: row[5],
                    status: row[6],
                }));

                setProducts([...products, ...importedProducts]);
                setErrorMessage('');
            } catch (error) {
                console.error("Error importing Excel:", error);
                setErrorMessage("Error al importar el archivo Excel. Por favor, verifica el formato.");
            }
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" onChange={handleImport} />
            <Button color="primary">Importar desde Excel</Button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default ImportExcel;
