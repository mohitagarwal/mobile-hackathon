package fk.hackday.buyer;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import fk.hackday.buyer.helpers.JSONConverter;
import fk.hackday.buyer.helpers.OrderFilter;
import fk.hackday.buyer.helpers.OrderObjectMapper;
import fk.hackday.buyer.order.OrderRequest;
import fk.hackday.buyer.orderclient.OrderResponse;

/**
 * Root resource (exposed at "myresource" path)
 */
@Path("/rest")
public class MyResource {

  /**
   * Method handling HTTP GET requests. The returned object will be sent to the client as
   * "text/plain" media type.
   *
   * @return String that will be returned as a text/plain response.
   */
  @GET
  @Produces(MediaType.TEXT_PLAIN)
  public String getIt() {
    return "Got it!";
  }

  @POST
  @Path("/order")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String createOrder(OrderRequest orderRequest) throws IOException {
    System.out.println(orderRequest.toString());
    OrderBuilder orderBuilder = new OrderBuilder();
    orderBuilder.setOrderRequest(orderRequest);
    OrderResponse response =  orderBuilder.buildOrder();
    String responseBody = new JSONConverter().getJSONString(response);
    System.out.println(responseBody);
    orderBuilder.persistOrder(response);
    return responseBody;
  }

  @GET
  @Path("/possibleOrdersForSeller")
  @Produces(MediaType.APPLICATION_JSON)
  public String getPossibleOrders(@QueryParam("sellerId") String sellerId) throws IOException {
    OrderFetcher orderFetcher = new OrderFetcher();
    List<String> allProbableorders = orderFetcher.getAllProbableOrders();
    OrderObjectMapper orderObjectMapper = new OrderObjectMapper();
    orderObjectMapper.setAllOrders(allProbableorders);
    List<OrderResponse> allPossibleOrders = orderObjectMapper.mapAllOrders();
    System.out.println(allPossibleOrders);
    List<OrderResponse> allFilteredOrders = new OrderFilter().filterPossibleSellers(allPossibleOrders);
    return new JSONConverter().getJSONString(allFilteredOrders);
  }
}
