package fk.hackday.buyer.order;

import com.yammer.dropwizard.json.JsonSnakeCase;

import java.util.List;

import lombok.Data;

/**
 * Created with IntelliJ IDEA. User: sudeep.km Date: 08/08/14 Time: 1:59 AM To change this template
 * use File | Settings | File Templates.
 */
@JsonSnakeCase
@Data
public class OrderRequest {

  String sellerId;
  List<String> probableSellers;
  String customerId;
  Address customerAddress;
  double billingPrice;
  List<OrderItem> orderItems;

  public OrderRequest() {

  }

}
