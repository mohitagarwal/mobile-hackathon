package fk.hackday.buyer.helpers;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.IOException;
import java.util.List;

import fk.hackday.buyer.orderclient.OrderResponse;

/**
 * Created with IntelliJ IDEA. User: sudeep.km Date: 08/08/14 Time: 3:43 AM To change this template
 * use File | Settings | File Templates.
 */
public class JSONConverter {

  private static ObjectMapper mapper;

  public String getJSONString(OrderResponse response) throws IOException {
    mapper = new ObjectMapper();
    String body = mapper.writeValueAsString(response);
    return body;
  }

  public String getJSONString(List<OrderResponse> allOrders) throws IOException {
    mapper = new ObjectMapper();
    String body = mapper.writeValueAsString(allOrders);
    return body;
  }

}
