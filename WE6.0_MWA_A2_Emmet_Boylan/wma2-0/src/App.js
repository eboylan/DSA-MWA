/*

Assignment: BSc Mobile Web Applications, Digital Skills Academy
Student ID: WE60-1022
File created: 2018/06/08
Reference Sources: image source: http://dpti.sa.gov.au/__data/assets/image/0014/127121/bus-stop.png

@author: Emmet Boylan
@version: v1.0
-
Changelog:
(if any)

*/
import React, { Component } from 'react';
/*import component files*/
import Modal from './Modal';
import EnterForm from './EnterForm';

class App extends Component {
  constructor(props) {
    super(props);
    /*changed to true. In example this was set to false and the modal was opened and closed by
    button press. The modal now opens automatically on first entry*/
    this.state = { isOpen: true };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
      {/*small cartoon image for appearence. Webpack needs the require flag to process images*/}
        <img src={require('./bus-stop.png')} alt="bus-stop" />
        {/*render the form*/}
        <EnterForm />
        {/*display a result paragraph*/}
        <p> Result </p>
        {/*show modal on first entry*/}
        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          This simple app tells you when the next bus is due, what number it is, plus its origin and destination. Simply enter the bus stop number and hit submit.
        </Modal>
      </div>
    );
  }
}

export default App;