package gestini.modules.report.dto;

public class DailySalesDto {
    private String time;
    private int value;

    public DailySalesDto(String time, int value) {
        this.time = time;
        this.value = value;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}