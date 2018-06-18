/*

Assignment: BSc Mobile Web Applications, Digital Skills Academy
Student ID: WE60-1022
File created: 2018/06/08
Reference Sources: based on form example at https://reactjs.org/docs/forms.html

@author: Emmet Boylan
@version: v1.0
-
Changelog:
(if any)

*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery'; 

class EnterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //string to accept input and format for method call
    var stopAddress = "https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=" + this.state.value + "&format=json";
    //getJSON request based on above parameter
    $.getJSON( stopAddress, function( data ) {
      //array to hold string values until ready to update
      var items = [];
      //clear the results paragraph
      $("p").empty();
      //check for error code Note: warning expects '===' however, this results in errors
      if (data.errorcode == 0){
        //take first result
        var bus = data.results[0];
        if(bus.duetime == "Due") {
          //if due, let user know Note: warning expects '===' however, this results in errors
          items.push( "Next bus is due now <br>");
        } else {
          //else let user know how long they have to wait
          items.push( "Next bus is due in " + bus.duetime + " minutes<br>" );
        }
        //add some additional details about the bus
        items.push("It is the number " + bus.route + ", traveling " + bus.direction + " from " + bus.origin + " to " + bus.destination);
      } else {
        //let user know error has occusred, if needed
        items.push("Error: " + data.errormessage);
      }
      //used in development to view return details
      //items.push("<br>" + JSON.stringify(bus)); 
      // create unordered list to store array of string values created above and add to cleared result paragraph
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "p" );
    }); 

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <label>
      {/*some text editted from example*/}
          <h3>Enter stop number:</h3> 
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <EnterForm />,
  document.getElementById('root')
);

export default EnterForm;