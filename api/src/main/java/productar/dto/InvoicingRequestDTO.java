package productar.dto;

import java.util.ArrayList;

public class InvoicingRequestDTO {
    Integer total;
    String client;
    String branch;
    String seller;
    String number;
    String dniOrCuil;
    String saleCondition;
    Long businessUnitId;
    ArrayList<InvoicingProductRequestDTO> products;

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

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
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

    public ArrayList<InvoicingProductRequestDTO> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<InvoicingProductRequestDTO> products) {
        this.products = products;
    }

    public Long getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Long businessUnitId) {
        this.businessUnitId = businessUnitId;
    }

}
