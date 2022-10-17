pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BSCToken is ERC20, Ownable {
    constructor() ERC20("Duo Token", "DUO") {
        uint supply = 10_000_000 ether;
        _mint(msg.sender, supply);
    }

    function getOwner() public view returns (address) {
        return owner();
    }
}