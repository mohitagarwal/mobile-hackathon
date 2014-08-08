package fk.hackday.buyer.orderclient;

import com.yammer.dropwizard.json.JsonSnakeCase;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import java.util.List;

import fk.hackday.buyer.order.Address;
import fk.hackday.buyer.order.OrderItem;
import lombok.Data;

/**
 * Created with IntelliJ IDEA. User: sudeep.km Date: 08/08/14 Time: 1:00 AM To change this template
 * use File | Settings | File Templates.
 */
@Data
@JsonSnakeCase
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderResponse {

  @JsonProperty("orderId")
  private String orderId;
  @JsonProperty("createdAt")
  private String createdAt;
  @JsonProperty("sellerId")
  String sellerId;
  @JsonProperty("probableSellers")
  List<String> probableSellers;
  @JsonProperty("customerId")
  String customerId;
  @JsonProperty("customerAddress")
  Address customerAddress;
  @JsonProperty("billingPrice")
  double billingPrice;
  @JsonProperty("orderItems")
  List<OrderItem> orderItems;

}
