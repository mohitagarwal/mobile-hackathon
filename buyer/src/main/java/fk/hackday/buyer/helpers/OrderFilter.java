package fk.hackday.buyer.helpers;

import java.util.ArrayList;
import java.util.List;

import fk.hackday.buyer.orderclient.OrderResponse;

/**
 * Created with IntelliJ IDEA. User: sudeep.km Date: 08/08/14 Time: 6:03 AM To change this template
 * use File | Settings | File Templates.
 */
public class OrderFilter {

  public List<OrderResponse> filterPossibleSellers(List<OrderResponse> allOrders) {

    List<OrderResponse> filteredOrders = new ArrayList<OrderResponse>();

    for(OrderResponse res: allOrders) {
      if(res.getSellerId().equals("") || res.getSellerId() == null) {
        filteredOrders.add(res);
      }
    }

    return filteredOrders;
  }

}
