package fk.hackday.buyer.order;

import com.yammer.dropwizard.json.JsonSnakeCase;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import lombok.Data;

/**
 * Created with IntelliJ IDEA. User: sudeep.km Date: 08/08/14 Time: 2:48 AM To change this template
 * use File | Settings | File Templates.
 */
@JsonSnakeCase
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Address {

  @JsonProperty("addressLine")
  private String addressLine;
  @JsonProperty("city")
  private String city;
  @JsonProperty("pincode")
  private String pincode;

}
