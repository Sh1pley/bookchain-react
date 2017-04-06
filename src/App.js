import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider(
  "http://localhost:8545"));

const bookchainContractABI = [{"constant":true,"inputs":[],"name":"getBookshelfCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"availableBooks","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_isbn","type":"string"}],"name":"createBook","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_bookContract","type":"address"}],"name":"borrowBook","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getBookshelf","outputs":[{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bookshelf","outputs":[{"name":"isbn","type":"string"},{"name":"contractAddress","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"bookContract","type":"address"},{"indexed":false,"name":"isbn","type":"string"},{"indexed":false,"name":"owner","type":"address"}],"name":"bookAddedToShelf","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"isbn","type":"string"},{"indexed":false,"name":"owner","type":"address"}],"name":"bookMadeAvailable","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"isbn","type":"string"},{"indexed":false,"name":"owner","type":"address"}],"name":"bookMadeUnavailable","type":"event"}];

const bookchainContractAddress = '0x492d93988eed63cfdb4b14e2fccf7a2b1aeaa724';
const bookchainContract = ETHEREUM_CLIENT.eth.contract(bookchainContractABI).at(
  bookchainContractAddress);

  // something to listen to the bookchain contract
  // whenever the bookadded to shelf event is triggered
  // update front-end bookshelf with information about book 
  // react will receive isbn from the event
  // use isbn to get book info

class App extends Component {
  debugger;
  constructor(props) {
    super(props);
    this.state = {
      isAvailable: [],
      owner: []
    };
  }
  componentWillMount() {
    let data = bookchainContract;
    debugger;
    this.setState({
      isAvailable: String(data.isAvailable()),
      owner: String(data.owner())
    });
  }
  componentDidMount() {
    window.addEventListener('load', function() {

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof Web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.Web3 = new Web3(Web3.currentProvider);
        console.log("hello");
        debugger;
      } else {
        console.log('No web3? You should consider trying MetaMask!');
          // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
          window.Web3 = new Web3(new Web3.providers.HttpProvider( "http://localhost:8545"));
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>BookCHAIN!!!!!!!!!</h2>
        </div>
        <div className="App-intro">
          <section>
            This should return the availability state of our contract living on
            the local blockchain >> `{ this.state.isAvailable }` this should be true/false
          </section>
          <br/>
          <section>
            ...AND this should be a crazy blockchain address for the contract owner.. { this.state.owner }
          </section>
        </div>
      </div>
    );
  }

}

export default App;
