package fk.hackday.buyer;

import com.firebase.client.Firebase;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import fk.hackday.buyer.order.OrderRequest;
import fk.hackday.buyer.orderclient.OrderResponse;
import lombok.Data;

/**
 * Created with IntelliJ IDEA. User: sudeep.km Date: 08/08/14 Time: 1:07 AM To change this template
 * use File | Settings | File Templates.
 */
@Data
public class OrderBuilder {

  private OrderRequest orderRequest = null;
  private SimpleDateFormat dt;
  private Date date;
  private String formatedDate;

  public OrderResponse buildOrder() {
    dt = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    date = new Date();
    formatedDate = dt.format(date);
    OrderResponse orderResponse = new OrderResponse();
    orderResponse.setOrderId("OD" + System.currentTimeMillis());
    orderResponse.setCreatedAt(formatedDate);
    orderResponse.setSellerId(orderRequest.getSellerId());
    orderResponse.setProbableSellers(orderRequest.getProbableSellers());
    orderResponse.setOrderItems(orderRequest.getOrderItems());
    orderResponse.setCustomerId(orderRequest.getCustomerId());
    orderResponse.setBillingPrice(orderRequest.getBillingPrice());
    orderResponse.setCustomerAddress(orderRequest.getCustomerAddress());
    return orderResponse;
  }

  public void persistOrder(OrderResponse response) {
    Firebase myFirebaseRef = new Firebase("https://luminous-fire-8360.firebaseio.com/");
    Map<String, OrderResponse> order = new HashMap<String, OrderResponse>();
    order.put(response.getOrderId(), response);
    Firebase ordersRef = myFirebaseRef.child("orders");
    ordersRef.push().setValue(order);
  }

}
