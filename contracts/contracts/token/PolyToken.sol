pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../interface/IPolygonToken.sol";
import "../utils/Deposit.sol";

contract PolyToken is ERC20, Ownable, IPolygonToken, Deposit {
    constructor(address _depositAdmin) ERC20("Duo Token", "DUO") {
        setDepositAdmin(_depositAdmin);
    }

    function deposit(
        address user,
        bytes calldata depositData
    )
        external
        override
        onlyDepositAdmin
        whenNotPaused
    {
        uint256 amount = abi.decode(depositData, (uint256));
        _mint(user, amount);
    }


    function burn(uint256 amount) external whenNotPaused {
        _burn(msg.sender, amount);
    }
}