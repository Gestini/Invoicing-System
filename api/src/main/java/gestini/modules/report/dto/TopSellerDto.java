package gestini.modules.report.dto;

public class TopSellerDto {
    private String username;
    private Long sales;

    public TopSellerDto(String username, Long sales) {
        this.username = username;
        this.sales = sales;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getSales() {
        return sales;
    }

    public void setSales(Long sales) {
        this.sales = sales;
    }

}
