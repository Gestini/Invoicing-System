package gestini.modules.invoicing.dto;

import java.util.ArrayList;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import jakarta.validation.Valid;

public class InvoicingRequestDto {

    @Schema(description = "Monto total de la factura", example = "1500")
    private Integer total;

    @Schema(description = "Nombre del cliente", example = "Juan Pérez")
    private String client;

    @Schema(description = "Nombre o código de la sucursal", example = "Sucursal Principal")
    private String branch;

    @Schema(description = "Número de factura", example = "FACT-1001")
    private String number;

    @Schema(description = "DNI o CUIL del cliente", example = "20304050607")
    private String dniOrCuil;

    @Schema(description = "Condición de venta", example = "Contado")
    private String saleCondition;

    @Schema(description = "Id de descuento", example = "1")
    private String discountCode;

    @ArraySchema(schema = @Schema(description = "Lista de productos incluidos en la factura"))
    @Valid
    private ArrayList<InvoicingProductRequestDto> products;

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getDniOrCuil() {
        return dniOrCuil;
    }

    public void setDniOrCuil(String dniOrCuil) {
        this.dniOrCuil = dniOrCuil;
    }

    public String getSaleCondition() {
        return saleCondition;
    }

    public void setSaleCondition(String saleCondition) {
        this.saleCondition = saleCondition;
    }

    public ArrayList<InvoicingProductRequestDto> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<InvoicingProductRequestDto> products) {
        this.products = products;
    }

    public String getDiscountCode() {
        return discountCode;
    }

    public void setDiscountCode(String discountCode) {
        this.discountCode = discountCode;
    }

}
