pragma solidity 0.8.2;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

import "../interface/IPolygonToken.sol";
import "./Signer.sol";

contract PolyDeposit is ReentrancyGuard, Signer {
    IPolygonToken public immutable token;

    mapping (string => bool) public lockTxnHashes;

    event Deposit(
        address user,
        uint256 amount,
        string indexed lockTxnHash
    );

    constructor (
        IPolygonToken _token,
        address _signer
    ) Signer("Poly", "1.0", _signer) {
        token = _token;
    }

    function depositTokens(
        address user,
        uint256 amount,
        string memory lockTxnHash,
        bytes memory signature
    )
    external
    nonReentrant
    onlyWithSignature(user, amount, lockTxnHash, signature)
    {
        require(
            lockTxnHashes[lockTxnHash] == false,
            "Invalid Transaction"
        );

        lockTxnHashes[lockTxnHash] = true;
        bytes memory depositData = abi.encodePacked(amount);
        token.deposit(user, depositData);
        emit Deposit(user, amount, lockTxnHash);
    }

}