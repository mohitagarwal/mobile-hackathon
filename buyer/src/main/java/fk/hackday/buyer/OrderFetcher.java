package fk.hackday.buyer;

import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.client.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

/**
 * Created with IntelliJ IDEA. User: sudeep.km Date: 08/08/14 Time: 4:39 AM To change this template
 * use File | Settings | File Templates.
 */
@Data
public class OrderFetcher {

  private String sellerId;

  public List<String> getAllProbableOrders() {
    Firebase postsRef = new Firebase("https://luminous-fire-8360.firebaseio.com/");
    final List<String> allPossibleOrders = new ArrayList<String>();
    postsRef.addValueEventListener(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot snapshot) {
        Iterable<DataSnapshot> snapshots = snapshot.child("orders").getChildren();
        while(snapshots.iterator().hasNext()){
          allPossibleOrders.add(
              snapshots.iterator().next().getChildren().iterator().next().getValue().toString());
        }
      }

      @Override
      public void onCancelled(FirebaseError firebaseError) {
        System.out.println("The read failed: " + firebaseError.getMessage());
      }
    });
    return allPossibleOrders;
  }

}
