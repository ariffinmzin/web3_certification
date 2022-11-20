window.Buffer = require('buffer/').Buffer;

const Tx = require('ethereumjs-tx')

const Web3 = require("web3")

//const web3 = new Web3('https://goerli.infura.io/v3/8c872481bb2149cb809038d5d7c76e54');
const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/176bfe18e46a44ffad02e020bc617e45"))
//const web3 = new Web3('https://goerli.infura.io/v3/176bfe18e46a44ffad02e020bc617e45');

web3.eth.getBlockNumber().then((result) => {
  console.log("Latest Ethereum Block is ",result);
});

//const address = "0xd389F76AeE66B7b94D5Cec2FAf623A9dB3E6473D"; //wallet
// update this contract address with your contract address
const address = "0x9F526359cB2eF81b65C8B0898fB343D8dBEdACA6";
//const address = "0x3d9298E773A1898B3Ca56a872402c06A8722Dac8";
//const address = "0xA7E0897BAaFf48b859f14798c3003e1cCFd5D3b8";

//web3.eth.defaultAccount = web3.eth.accounts[0];

var ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "certCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "certs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "certName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "graduateYear",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_certName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_graduateYear",
        "type": "uint256"
      }
    ],
    "name": "setCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_certId",
        "type": "uint256"
      }
    ],
    "name": "getCertificate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getcertCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
    
var certificationContract = new web3.eth.Contract(ABI, address);

async function initContractLogic() {

  

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    //web3.eth.wallet.add('e9f79d11f48c68b19ea2e1e9db852e7770ceb265547bb8f0af01698d9a358445');

    console.log("Account : " + account)
     window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        console.log(accounts[0])
       });


    const privateKey1 = Buffer.from('e9f79d11f48c68b19ea2e1e9db852e7770ceb265547bb8f0af01698d9a358445', 'hex');
    
    //const myData = CoursetroContract.methods.setInstructor("abu",12).encodeABI();

    //const contract_Address = '0xB6b5847eA6f7608537acE3a56F8a29BbB8F7a6A4';
    $(document).ready(function(){

    $('#button').on('click', function() { 

      //$("#myForm").submit(function() {

        console.log('Name is ' + $('#formName').val().trim());
        console.log('Certificate is ' + $('#formCertificateName').val().trim());
        console.log('Graduate year is ' + $('#formGraduateYear').val().trim());

        const myData = certificationContract.methods.setCertificate($('#formName').val().trim(), $('#formCertificateName').val().trim(), $('#formGraduateYear').val().trim()).encodeABI();

        //console.log('Account is ', account);

        web3.eth.getTransactionCount(account, (err, txCount) => {
        // Build the transaction
    
        const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       address,
        value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
        gasLimit: web3.utils.toHex(2100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
        data: myData  
        } //txObject

        console.log("Error : " + err);

        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey1);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        // Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
        console.log("Transaction : " + tx);

        }); //const transaction

      //}); //submit

    }); //on

  //updateHtmlData();

  });  //click button


  }); //document ready
} //initContractLogic

initContractLogic();

function updateHtmlData() {  

                                 //call function
  certificationContract.methods.getCertificate(1).call(function(error, result){
      if (error) {
          console.log(error, 'error')
      } else {
          console.log(result, 'result');
          //$('#name').val(result[0]);
          //$('#age').val(result[1]);
          //$('#certificate').html(`${result[0]} ${result[1]} ${result[2]} ${result[3]}`);
          $('#certificate').html(result[0] + ' ' + result[1] + ' ' + result[2] + ' ' + result[3]);
      }
  });
}

