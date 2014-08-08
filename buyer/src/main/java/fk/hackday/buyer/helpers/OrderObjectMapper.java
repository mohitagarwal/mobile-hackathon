package fk.hackday.buyer.helpers;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import fk.hackday.buyer.orderclient.OrderResponse;
import lombok.Data;

/**
 * Created with IntelliJ IDEA. User: sudeep.km Date: 08/08/14 Time: 5:48 AM To change this template
 * use File | Settings | File Templates.
 */
@Data
public class OrderObjectMapper {

  List<String> allOrders;

  public List<OrderResponse> mapAllOrders() throws IOException {
    List<OrderResponse> allSellerOrders = new ArrayList<OrderResponse>();
    for (String val: allOrders) {
      OrderResponse response = new OrderResponse();
      response = new ObjectMapper().readValue(val, OrderResponse.class);
      allSellerOrders.add(response);
    }
    return allSellerOrders;
  }

}
