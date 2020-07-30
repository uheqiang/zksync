import { utils } from "ethers";

// 0x-prefixed, hex encoded, ethereum account address
export type Address = string;
// sync:-prefixed, hex encoded, hash of the account public key
export type PubKeyHash = string;

// Symbol like "ETH" or "FAU" or token contract address(zero address is implied for "ETH").
export type TokenLike = TokenSymbol | TokenAddress;
// Token symbol (e.g. "ETH", "FAU", etc.)
export type TokenSymbol = string;
// Token address (e.g. 0xde..ad for ERC20, or 0x00.00 for "ETH")
export type TokenAddress = string;

export type Nonce = number | "committed";

export interface AccountState {
    address: Address;
    id?: number;
    depositing: {
        balances: {
            // Token are indexed by their symbol (e.g. "ETH")
            [token: string]: {
                // Sum of pending deposits for the token.
                amount: utils.BigNumberish;
                // Value denoting the block number when the funds are expected
                // to be received by zkSync network.
                expectedAcceptBlock: number;
            };
        };
    };
    committed: {
        balances: {
            // Token are indexed by their symbol (e.g. "ETH")
            [token: string]: utils.BigNumberish;
        };
        nonce: number;
        pubKeyHash: PubKeyHash;
    };
    verified: {
        balances: {
            // Token are indexed by their symbol (e.g. "ETH")
            [token: string]: utils.BigNumberish;
        };
        nonce: number;
        pubKeyHash: PubKeyHash;
    };
}

export type EthSignerType = {
    verificationMethod: "ECDSA" | "ERC-1271";
    // Indicates if signer adds `\x19Ethereum Signed Message\n${msg.length}` prefix before signing message.
    // i.e. if false, we should add this prefix manually before asking to sign message
    isSignedMsgPrefixed: boolean;
};

export interface TxEthSignature {
    type: "EthereumSignature" | "EIP1271Signature";
    signature: string;
}

export interface Signature {
    pubKey: string;
    signature: string;
}

export interface Transfer {
    type: "Transfer";
    accountId: number;
    from: Address;
    to: Address;
    token: number;
    amount: utils.BigNumberish;
    fee: utils.BigNumberish;
    nonce: number;
    signature: Signature;
}

export interface TransferFrom {
    type: "TransferFrom";
    toAccountId: number;
    from: Address;
    to: Address;
    token: number;
    amount: utils.BigNumberish;
    fee: utils.BigNumberish;
    toNonce: number;
    validFrom: number,
    validUntil: number,
    fromSignature: Signature;
    toSignature: Signature;
}

export interface Withdraw {
    type: "Withdraw";
    accountId: number;
    from: Address;
    to: Address;
    token: number;
    amount: utils.BigNumberish;
    fee: utils.BigNumberish;
    nonce: number;
    signature: Signature;
}

export interface ChangePubKey {
    type: "ChangePubKey";
    account: Address;
    newPkHash: PubKeyHash;
    nonce: number;
    ethSignature: string;
}

export interface CloseAccount {
    type: "Close";
    account: Address;
    nonce: number;
    signature: Signature;
}

export interface BlockInfo {
    blockNumber: number;
    committed: boolean;
    verified: boolean;
}

export interface TransactionReceipt {
    executed: boolean;
    success?: boolean;
    failReason?: string;
    block?: BlockInfo;
}

export interface PriorityOperationReceipt {
    executed: boolean;
    block?: BlockInfo;
}

export interface ContractAddress {
    mainContract: string;
    govContract: string;
}

export interface Tokens {
    // Tokens are indexed by their symbol (e.g. "ETH")
    [token: string]: {
        address: string;
        id: number;
        symbol: string;
        decimals: number;
    };
}

export interface Fee {
    // Operation type (amount of chunks in operation differs and impacts the total fee).
    feeType: "Withdraw" | "Transfer" | "TransferToNew" | "TransferFrom";
    // Amount of gas used by transaction
    gasTxAmount: utils.BigNumber;
    // Gas price (in wei)
    gasPriceWei: utils.BigNumber;
    // Ethereum gas part of fee (in wei)
    gasFee: utils.BigNumber;
    // Zero-knowledge proof part of fee (in wei)
    zkpFee: utils.BigNumber;
    // Total fee amount (in wei)
    totalFee: utils.BigNumber;
}

export interface SubscriptionTx {
    transferToSub: TransferFrom;
    burnTx: Transfer;
    butnTxEthSignature: TxEthSignature;
}
