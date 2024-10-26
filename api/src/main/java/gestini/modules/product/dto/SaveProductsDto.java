package gestini.modules.product.dto;

import java.util.ArrayList;

import gestini.modules.product.models.ProductModel;

public class SaveProductsDto {
    ArrayList<ProductModel> products;

    public ArrayList<ProductModel> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<ProductModel> products) {
        this.products = products;
    }

}
