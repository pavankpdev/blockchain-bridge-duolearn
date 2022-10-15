pragma solidity 0.8.2;

import "@openzepplin/contracts/access/Ownable.sol";
import "@openzepplin/contracts/utils/cryptography/SignatureChecker.sol";

contract Signer is Ownable {
    address public approvedSigner;

    string public domain;
    string public version;

    event SetSigner(address indexed signer);

    struct Verification {
        address user;
        uint256 amount;
        string txHash;
        string domain;
        string version;
    }

    constructor(
        string memory _domain,
        string memory _version,
        address _signer
    ) {
        domain = _domain;
        version = _version;
        approvedSigner = _signer;
    }

    function setSigner(address _signer) public onlyOwner {
        approvedSigner = _signer;
        emit SetSigner(_signer);
    }

    function onlyWithSignature(
        address user,
        uint256 amount,
        string memory txHash,
        bytes memory signature
    ) {
        byte32 verificationHash = keccak256(
            abi.encode(txHasVerification(user, amount, txHash, domain, version))
        );

        require(
            SignatureChecker.isValidSignatureNow(
                approvedSigner,
                ECDSA.toEthSignedMessageHash(verificationHash),
                signature
            ) == true,
            "Invalid signature"
        );

    }

}