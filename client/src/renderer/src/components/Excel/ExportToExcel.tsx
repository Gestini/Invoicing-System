import { oproducts } from "../Tables/ProductTable/data"; // Ajusta la ruta según tu estructura de archivos
import * as XLSX from "xlsx";
import { Button } from "@nextui-org/react";

const ExportToExcel = ({ data }) => {
    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        XLSX.writeFile(workbook, "products.xlsx");
    };

    return (
        <Button onClick={handleExportToExcel} color="secondary">
            Exportar a Excel
        </Button>
    );
};

export default ExportToExcel