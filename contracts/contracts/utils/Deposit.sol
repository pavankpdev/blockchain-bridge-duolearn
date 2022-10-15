pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import  "@openzeppelin/contracts/security/Pausable.sol";

contract Deposit is Ownable, Pausable {
    address internal _depositAdmin;

    event DepositAdminChanged(address admin);

    modifier onlyDepositAdmin() {
        require(msg.sender == _depositAdmin, "Deposit: caller is not the admin");
        _;
    }

    function setDepositAdmin (address depositAdmin) public onlyOwner {
        _depositAdmin = depositAdmin;
        emit DepositAdminChanged(depositAdmin);
    }

    function getDepositAdmin() public view returns (address) {
        return _depositAdmin;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}