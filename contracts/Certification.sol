// SPDX-License-Identifier: GPL-3.0
// 0xA7E0897BAaFf48b859f14798c3003e1cCFd5D3b8
pragma solidity >=0.7.0 <0.9.0;

contract Certification {

    address owner;
    
    struct Certificate {
        uint id;
        string name;
        string certName;
        uint graduateYear;
    }
   
    mapping(uint => Certificate) public certs;
    
    uint public certCount;    

    constructor() {

        owner = msg.sender;

    }

    function setCertificate(string memory _name, string memory _certName, uint _graduateYear) public {

        require(msg.sender==owner,"Only the owner of this smart contract is allowed to add certification record!");
        certCount++;
        certs[certCount] = Certificate(certCount,_name, _certName, _graduateYear);

    }

    function getCertificate(uint _certId) public view returns (uint, string memory, string memory, uint) {

        return (certs[_certId].id, certs[_certId].name, certs[_certId].certName, certs[_certId].graduateYear);

    }

    function getcertCount() public view returns (uint) {

        return certCount;
    }

    /*
   
    function getName(uint _certId) public view returns (string memory) {

        return certs[_certId].name;

    }

    function getCertName(uint _certId) public view returns (string memory) {

        return certs[_certId].certName;

    }

    function getGraduateYear(uint _certId) public view returns (uint) {

        return certs[_certId].graduateYear;

    }

    */
}