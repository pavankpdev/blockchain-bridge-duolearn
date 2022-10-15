pragma solidity 0.8.2;

interface IPolygonToken {
    function deposit(address user, bytes calldata depositData) external;
}