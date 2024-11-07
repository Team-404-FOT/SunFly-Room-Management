package com.FOT3.SFRMS.dto;

import lombok.Data;
import java.util.Date;

@Data
public class PaymentHistoryDTO {
    private int payId;
    private String cusName;
    private int roomNum;
    private String acType;
    private String type;
    private String paymentMethod;
    private Date checkOut;
    private float amount;
}
