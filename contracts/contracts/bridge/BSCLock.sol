pragma solidity 0.8.2;

import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./Signer.sol";

contract BSCLock is ReentrancyGuard, Signer {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;

    event Lock(address indexed user, uint256 amount);
    event Release(
        address indexed user,
        uint256 amount,
        string indexed burnTxnHash
    );

    mapping (string => bool) public burnTxnHashes;

    constructor(
        IERC20 _token,
        address _signer
    ) Signer("BSC", "1.0", _signer)
    {
        token = _token;
    }

    function lockTokens(uint256 amount) external nonReentrant {
        token.safeTransferFrom(msg.sender, address(this), amount);
        emit Lock(msg.sender, amount);
    }

    function releaseTokens(
        address user,
        uint256 amount,
        string memory burnTxnHash,
        bytes memory signature
    )
    external
    nonReentrant
    onlyWithSignature(user, amount, burnTxnHash, signature)
    {
        require(
            burnTxnHashes[burnTxnHash] == false,
            "Burn txn hash, already exist"
        );

        burnTxnHashes[burnTxnHash] = true;
        token.safeTransfer(user, amount);
        emit Release(user, amount, burnTxnHash);
    }


}