// Sources flattened with hardhat v2.22.6 https://hardhat.org

// SPDX-License-Identifier: MIT

// File @openzeppelin/contracts/token/ERC20/IERC20.sol@v5.0.2

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.20;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}


// File @openzeppelin/contracts/utils/ReentrancyGuard.sol@v5.0.2

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (utils/ReentrancyGuard.sol)

pragma solidity ^0.8.20;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant NOT_ENTERED = 1;
    uint256 private constant ENTERED = 2;

    uint256 private _status;

    /**
     * @dev Unauthorized reentrant call.
     */
    error ReentrancyGuardReentrantCall();

    constructor() {
        _status = NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be NOT_ENTERED
        if (_status == ENTERED) {
            revert ReentrancyGuardReentrantCall();
        }

        // Any calls to nonReentrant after this point will fail
        _status = ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == ENTERED;
    }
}


// File contracts/math/SafeMath.sol

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts v4.3.2 (utils/math/SafeMath.sol)

pragma solidity >=0.4.22 <0.9.0;

// CAUTION
// This version of SafeMath should only be used with Solidity 0.8 or later,
// because it relies on the compiler's built in overflow checks.

/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SafeMath` is generally not needed starting with Solidity 0.8, since the compiler
 * now has built in overflow checking.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked{
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the substraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}


// File contracts/math/SafeDecimalMath.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Libraries

// https://docs.synthetix.io/contracts/source/libraries/safedecimalmath
library SafeDecimalMath {
    using SafeMath for uint;

    /* Number of decimal places in the representations. */
    uint8 public constant decimals = 18;
    uint8 public constant highPrecisionDecimals = 27;

    /* The number representing 1.0. */
    uint public constant UNIT = 10**uint(decimals);

    /* The number representing 1.0 for higher fidelity numbers. */
    uint public constant PRECISE_UNIT = 10**uint(highPrecisionDecimals);
    uint private constant UNIT_TO_HIGH_PRECISION_CONVERSION_FACTOR = 10**uint(highPrecisionDecimals - decimals);

    /**
     * @return Provides an interface to UNIT.
     */
    function unit() external pure returns (uint) {
        return UNIT;
    }

    /**
     * @return Provides an interface to PRECISE_UNIT.
     */
    function preciseUnit() external pure returns (uint) {
        return PRECISE_UNIT;
    }

    /**
     * @return The result of multiplying x and y, interpreting the operands as fixed-point
     * decimals.
     *
     * @dev A unit factor is divided out after the product of x and y is evaluated,
     * so that product must be less than 2**256. As this is an integer division,
     * the internal division always rounds down. This helps save on gas. Rounding
     * is more expensive on gas.
     */
    function multiplyDecimal(uint x, uint y) internal pure returns (uint) {
        /* Divide by UNIT to remove the extra factor introduced by the product. */
        return x.mul(y) / UNIT;
    }

    /**
     * @return The result of safely multiplying x and y, interpreting the operands
     * as fixed-point decimals of the specified precision unit.
     *
     * @dev The operands should be in the form of a the specified unit factor which will be
     * divided out after the product of x and y is evaluated, so that product must be
     * less than 2**256.
     *
     * Unlike multiplyDecimal, this function rounds the result to the nearest increment.
     * Rounding is useful when you need to retain fidelity for small decimal numbers
     * (eg. small fractions or percentages).
     */
    function _multiplyDecimalRound(
        uint x,
        uint y,
        uint precisionUnit
    ) private pure returns (uint) {
        /* Divide by UNIT to remove the extra factor introduced by the product. */
        uint quotientTimesTen = x.mul(y) / (precisionUnit / 10);

        if (quotientTimesTen % 10 >= 5) {
            quotientTimesTen += 10;
        }

        return quotientTimesTen / 10;
    }

    /**
     * @return The result of safely multiplying x and y, interpreting the operands
     * as fixed-point decimals of a precise unit.
     *
     * @dev The operands should be in the precise unit factor which will be
     * divided out after the product of x and y is evaluated, so that product must be
     * less than 2**256.
     *
     * Unlike multiplyDecimal, this function rounds the result to the nearest increment.
     * Rounding is useful when you need to retain fidelity for small decimal numbers
     * (eg. small fractions or percentages).
     */
    function multiplyDecimalRoundPrecise(uint x, uint y) internal pure returns (uint) {
        return _multiplyDecimalRound(x, y, PRECISE_UNIT);
    }

    /**
     * @return The result of safely multiplying x and y, interpreting the operands
     * as fixed-point decimals of a standard unit.
     *
     * @dev The operands should be in the standard unit factor which will be
     * divided out after the product of x and y is evaluated, so that product must be
     * less than 2**256.
     *
     * Unlike multiplyDecimal, this function rounds the result to the nearest increment.
     * Rounding is useful when you need to retain fidelity for small decimal numbers
     * (eg. small fractions or percentages).
     */
    function multiplyDecimalRound(uint x, uint y) internal pure returns (uint) {
        return _multiplyDecimalRound(x, y, UNIT);
    }

    /**
     * @return The result of safely dividing x and y. The return value is a high
     * precision decimal.
     *
     * @dev y is divided after the product of x and the standard precision unit
     * is evaluated, so the product of x and UNIT must be less than 2**256. As
     * this is an integer division, the result is always rounded down.
     * This helps save on gas. Rounding is more expensive on gas.
     */
    function divideDecimal(uint x, uint y) internal pure returns (uint) {
        /* Reintroduce the UNIT factor that will be divided out by y. */
        return x.mul(UNIT).div(y);
    }

    /**
     * @return The result of safely dividing x and y. The return value is as a rounded
     * decimal in the precision unit specified in the parameter.
     *
     * @dev y is divided after the product of x and the specified precision unit
     * is evaluated, so the product of x and the specified precision unit must
     * be less than 2**256. The result is rounded to the nearest increment.
     */
    function _divideDecimalRound(
        uint x,
        uint y,
        uint precisionUnit
    ) private pure returns (uint) {
        uint resultTimesTen = x.mul(precisionUnit * 10).div(y);

        if (resultTimesTen % 10 >= 5) {
            resultTimesTen += 10;
        }

        return resultTimesTen / 10;
    }

    /**
     * @return The result of safely dividing x and y. The return value is as a rounded
     * standard precision decimal.
     *
     * @dev y is divided after the product of x and the standard precision unit
     * is evaluated, so the product of x and the standard precision unit must
     * be less than 2**256. The result is rounded to the nearest increment.
     */
    function divideDecimalRound(uint x, uint y) internal pure returns (uint) {
        return _divideDecimalRound(x, y, UNIT);
    }

    /**
     * @return The result of safely dividing x and y. The return value is as a rounded
     * high precision decimal.
     *
     * @dev y is divided after the product of x and the high precision unit
     * is evaluated, so the product of x and the high precision unit must
     * be less than 2**256. The result is rounded to the nearest increment.
     */
    function divideDecimalRoundPrecise(uint x, uint y) internal pure returns (uint) {
        return _divideDecimalRound(x, y, PRECISE_UNIT);
    }

    /**
     * @dev Convert a standard decimal representation to a high precision one.
     */
    function decimalToPreciseDecimal(uint i) internal pure returns (uint) {
        return i.mul(UNIT_TO_HIGH_PRECISION_CONVERSION_FACTOR);
    }

    /**
     * @dev Convert a high precision decimal to a standard decimal representation.
     */
    function preciseDecimalToDecimal(uint i) internal pure returns (uint) {
        uint quotientTimesTen = i / (UNIT_TO_HIGH_PRECISION_CONVERSION_FACTOR / 10);

        if (quotientTimesTen % 10 >= 5) {
            quotientTimesTen += 10;
        }

        return quotientTimesTen / 10;
    }

    // Computes `a - b`, setting the value to 0 if b > a.
    function floorsub(uint a, uint b) internal pure returns (uint) {
        return b >= a ? 0 : a - b;
    }

    /* ---------- Utilities ---------- */
    /*
     * Absolute value of the input, returned as a signed number.
     */
    function signedAbs(int x) internal pure returns (int) {
        return x < 0 ? -x : x;
    }

    /*
     * Absolute value of the input, returned as an unsigned number.
     */
    function abs(int x) internal pure returns (uint) {
        return uint(signedAbs(x));
    }
}


// File contracts/Exchange.sol

// EGOCHAIN EXCHANGE
// Original license: SPDX_License_Identifier: MIT

pragma solidity ^0.8.24;




contract Exchange is ReentrancyGuard{
    enum TradeType {BUY,SELL}
    using SafeDecimalMath for uint;
    using SafeMath for uint256;
    uint256 uniqueOrderID;

    address public owner;
    mapping(address => mapping(address => uint256)) public balances;
    mapping(address => bool) public authorizedTokens;
    //uint256 public fee = 0.001 ether;
    uint256 public fee = 0.001 ether;
  
     struct Order {
        bool isSale;
        address userAddress;
        uint256 value; // price
        uint256 numberOfShares; // amount asset which is the traded token
        uint256 orderId;
        uint256 uniqueOrderID;
        string uuid;
    }
      struct ListOfOrders {
        Order[] list;
    }
    event Fee(string uuid,  string  ticker, uint256 value, address collector,  uint time);
    event OrderPlaced (
        bool isSale,
        address userAddress,
        uint256 value,
        uint256 numberOfShares,
        uint256 orderId,
        string  ticker,
        uint256 uniqueOrderID,
        uint time,
        string uuid
    );
    event OrderCanceled (
        bool isSale,
        address userAddress,
        uint256 value,
        uint256 numberOfShares,
        uint256 orderId,
        string _ticker,
        uint256 uniqueOrderID,
        uint time
    );
    struct Asset {
        string ticker;
        address tokenA;
        address tokenB;
        uint256 initialPrice;
        string tokenAName;
        string tokenBName;
    }
    event AssetRemoved(string ticker, address deletedBy);
    event AssetAdded (
        string ticker,
        address tokenA,
        address tokenB,
        uint256 initialPrice,
        string tokenAName,
        string tokenBName,
        address creator
    );
    address public feeCollector;
    mapping(string => mapping(uint256 => mapping(TradeType => uint256))) internal orderId;
    mapping(string => Asset) public asset;
    mapping(string => mapping(uint256 => mapping(TradeType => ListOfOrders))) internal buyOrSellOrder;

    mapping(string => mapping(TradeType => mapping(uint256 => bool))) internal orderPriceExist;
    
    mapping(string => bool) internal uuidExist;

    mapping(string => mapping(uint256 => uint256)) private saleOrdersMappingByAssets;
    mapping(string => mapping(uint256 => uint256)) private purchasedOrdersMappingByAssets;

    event Deposit(address indexed token, address indexed user, uint256 amount);
    event Withdraw(address indexed token, address indexed user, uint256 amount);
    event Redeem(address indexed token, address indexed user, uint256 amount, address to);
    // event Trade(address indexed token, address indexed buyer, address indexed seller, uint256 price);
       event Trade( 
        TradeType typeOfTrade,
        address indexed seller,
        address indexed buyer,
        string ticker,
        uint256 createdAt,
        uint256 value,
        uint256 numberOfShares,
        uint256 orderId,
        uint256 uniqueOrderID,
        bool isMarketOrder,
        string sellerUuid,
        string buyerUuid
        );





    constructor(address _feeCollector) {
        owner = msg.sender;
        feeCollector = _feeCollector;

    }


function feeCalculator(uint256 amount) internal  view  returns (uint256 netAmount, uint256 _fee) {
        require(amount > 0, "Trade amount must be greater than zero");
        uint256 _tradeFee = amount.multiplyDecimal(fee);
        netAmount = amount.sub(_tradeFee);
        return (netAmount, _tradeFee);
    }



function engine(string memory _ticker, Order memory _order, string memory _uuid) internal   {
  require(msg.sender == _order.userAddress, "Invalid account!");
   TradeType trp = _order.isSale == true ?  TradeType.BUY : TradeType.SELL;
    
    uint assetValue = _order.numberOfShares;

    
        uint staticIndex = 0;
        Order memory orderMemory =  buyOrSellOrder[_ticker][_order.value][trp].list[staticIndex];
        
        uint minusAsset = assetValue; //returnLessValue(assetValue, buyOrSellOrder[_ticker][_order.value][trp].list[staticIndex].numberOfShares);
        buyOrSellOrder[_ticker][_order.value][trp].list[staticIndex].numberOfShares = buyOrSellOrder[_ticker][_order.value][trp].list[staticIndex].numberOfShares.sub(minusAsset);
        assetValue = assetValue.sub(minusAsset);
       
         uint baseValue = minusAsset.multiplyDecimal(_order.value);
        
        if(_order.isSale){
            uint256 _netAmount;
        uint256 _fee;
            (_netAmount, _fee) = feeCalculator(baseValue);
           deduct(minusAsset, asset[_ticker].tokenA, _order.userAddress);
            add(_netAmount, asset[_ticker].tokenB, _order.userAddress);
            add(_fee, asset[_ticker].tokenB, feeCollector);
           add(minusAsset, asset[_ticker].tokenA, buyOrSellOrder[_ticker][_order.value][trp].list[staticIndex].userAddress);
            emit Fee(_uuid, _ticker, _fee, feeCollector,  block.timestamp);
        }else{
           uint256 _netAmount;
        uint256 _fee;
            (_netAmount, _fee) = feeCalculator(minusAsset);
            deduct(baseValue, asset[_ticker].tokenB, _order.userAddress);
            add(_netAmount, asset[_ticker].tokenA, _order.userAddress);
            add(_fee, asset[_ticker].tokenA, feeCollector);
            add(baseValue, asset[_ticker].tokenB, buyOrSellOrder[_ticker][_order.value][trp].list[staticIndex].userAddress);
         emit Fee(_uuid, _ticker, _fee, feeCollector,  block.timestamp);
        }

        if(buyOrSellOrder[_ticker][_order.value][trp].list[staticIndex].numberOfShares == 0){
         deleteTrade(_order.value,trp,_ticker,staticIndex);
         
        }
    address _sellerAddress = msg.sender;
    uint256 _order_id = orderMemory.orderId;
    uint256 _unique_order_id = orderMemory.uniqueOrderID;
    string memory tradeTicker = _ticker;
    string memory sellerUuid;
    string memory buyerUuid;
    address _buyerAddress;
    if(_order.isSale == true){
        _sellerAddress = msg.sender;
        _buyerAddress = orderMemory.userAddress;
        sellerUuid = _uuid;
        buyerUuid = orderMemory.uuid;
    }else{
        _sellerAddress = orderMemory.userAddress;
        _buyerAddress = msg.sender;
        sellerUuid = orderMemory.uuid;
        buyerUuid = _uuid;




    }
        emit Trade( 
        trp,
        _sellerAddress,
        _buyerAddress,
         tradeTicker,
        block.timestamp,
        orderMemory.value,
         minusAsset,
         _order_id,
         _unique_order_id,
        false,
        sellerUuid,
        buyerUuid
        );
     
    } 


function placeOrder(Order memory _order, string memory _ticker, string memory uuid) internal {
    TradeType trp = _order.isSale ? TradeType.SELL : TradeType.BUY;
    updateBalances(_order,_ticker);
    uint length = buyOrSellOrder[_ticker][_order.value][trp].list.length;
    buyOrSellOrder[_ticker][_order.value][trp].list.push(_order);
    
   uniqueOrderID = uniqueOrderID.add(1);
   emit  OrderPlaced(
         _order.isSale,
         _order.userAddress,
         _order.value,
         _order.numberOfShares,
         length,
         _ticker,
         _order.uniqueOrderID,
         block.timestamp,
         uuid
         );
    

}

function updateBalances(Order memory _order, string memory _ticker) internal{
if(_order.isSale){
address _token = asset[_ticker].tokenA;
deduct(_order.numberOfShares,_token, _order.userAddress);
}else{
    address _token = asset[_ticker].tokenB;
    uint256 _amount = _order.value.multiplyDecimal(_order.numberOfShares);
    deduct(_amount,_token, _order.userAddress);
}
}
function deduct(uint amount, address token, address user) internal  {
    require(balances[user][token] >= amount, "Insufficient Funds");
    balances[user][token] = balances[user][token].sub(amount);
}

function getNormalizedBalance(uint amount, bool _isSale, string memory _ticker) internal view returns (uint) {
    uint normalizedAmount = 0;
    if(_isSale){
      uint userBalance = balances[msg.sender][asset[_ticker].tokenA];
      normalizedAmount = returnLessValue(amount,userBalance);
        
    }else{
       uint userBalance = balances[msg.sender][asset[_ticker].tokenB];
      normalizedAmount = returnLessValue(amount,userBalance); 
    }
    return normalizedAmount;
}



function add(uint amount, address token, address user) internal  {
    balances[user][token] = balances[user][token].add(amount);
}
function cancelOrder(string memory _ticker, uint _value, TradeType tradeType, string memory _uuid) external nonReentrant(){
uint length =  buyOrSellOrder[_ticker][_value][tradeType].list.length;
uint _orderId = 0;
for(uint u=0; u<length; u++){
    Order memory _orderInner = buyOrSellOrder[_ticker][_value][tradeType].list[u];
    if(_orderInner.userAddress == msg.sender && areEqual(_orderInner.uuid, _uuid) == true){
        _orderId = u;
        break;
    }
}

  Order memory _order = buyOrSellOrder[_ticker][_value][tradeType].list[_orderId];
  require(_order.userAddress != address(0), "Order does not exist!");
  require(_order.userAddress == msg.sender, "You're not authorized");
  require(asset[_ticker].tokenA != address(0), "Asset does not exist");
   if(_order.isSale){
address _token = asset[_ticker].tokenA;
add(_order.numberOfShares,_token, _order.userAddress);
}else{
    address _token = asset[_ticker].tokenB;
    uint256 _amount = _order.value.multiplyDecimal(_order.numberOfShares);
    add(_amount,_token, _order.userAddress);
}
string memory tradeTicker = _ticker;
   deleteTrade(_value,tradeType,_ticker,_orderId);
 //delete buyOrSellOrder[_ticker][_value][tradeType].list[_orderId];
 emit OrderCanceled (
         _order.isSale,
         _order.userAddress,
         _order.value,
         _order.numberOfShares,
         _orderId,
         tradeTicker,
         _order.uniqueOrderID,
         block.timestamp
         );
}



 function areEqual(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

function returnLessValue(uint a, uint b) internal  pure returns(uint){
    if(a >= b){
        return b;
    }
    return a;
}


 function addAsset(string memory _ticker, string memory _tokenAName, string memory _tokenBName, address _tokenA, address _tokenB, uint256 _initialPrice) external onlyOwner{
        // EGO-EUSG,Egochain,Aj boy token,0x7b96aF9Bd211cBf6BA5b0dd53aa61Dc5806b6AcE, 0x7b96aF9Bd211cBf6BA5b0dd53aa61Dc5806b6AcE,16
        require(asset[_ticker].tokenA == address(0), "Asset already added!");
        Asset memory newAsset = Asset(_ticker, _tokenA, _tokenB, _initialPrice, _tokenAName, _tokenBName);
        asset[_ticker] = newAsset;
       emit AssetAdded (_ticker,_tokenA,_tokenB,_initialPrice,_tokenAName,_tokenBName,msg.sender);
     
}

function removeAsset(string memory _ticker) external  onlyOwner {
    delete  asset[_ticker];
   emit AssetRemoved(_ticker, msg.sender);
}

function returnBalancesByTicker(string memory _ticker,  address _account) external  view returns(uint256 _tokenA, uint256 _tokenB){
return(balances[asset[_ticker].tokenA][_account], balances[asset[_ticker].tokenA][_account]);
}


   


    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

function depositNativeToken() public payable nonReentrant() {
    require(msg.value > 0, "Invalid input");
    uint256 amount = msg.value;
    balances[msg.sender][address(0)] += amount;
    emit Deposit(address(0), msg.sender, amount);
}

function withdrawNativeToken(uint256 amount, address payable _to) external nonReentrant() {
    require(balances[_to][address(0)] >= amount, "Insufficient balance.");
    balances[_to][address(0)] -= amount;
    (bool sent, bytes memory data) = _to.call{value: amount}("");
    require(sent, "Failed to send Ether");
    emit Withdraw(address(0), msg.sender, amount);
}

 function deleteTrade(uint price, TradeType _tradeType, string memory _ticker, uint index)internal {
     if(index < buyOrSellOrder[_ticker][price][_tradeType].list.length){
    for(uint i = index; i < buyOrSellOrder[_ticker][price][_tradeType].list.length - 1; i++){
        buyOrSellOrder[_ticker][price][_tradeType].list[i] = buyOrSellOrder[_ticker][price][_tradeType].list[i + 1];
    }
    buyOrSellOrder[_ticker][price][_tradeType].list.pop();
 }

 }


///Start of new market order


///Start of new market order
function marketOrderTrade(uint[] memory prices, uint _amount, bool _isSale, string memory _ticker, string memory _uuid) public nonReentrant() {
    TradeType _tradeType = _isSale ? TradeType.BUY : TradeType.SELL;
    uint paramAmount = _amount;
    uint lastPrice = prices[0];
    bool isSale = _isSale;
    string memory uuid = _uuid;
    uint[] memory _prices = prices;
    string memory ticker = _ticker;
    for (uint i = 0; i < prices.length; i++) {
         if(paramAmount == 0){
                break;
            }
        uint numberOfTrades = buyOrSellOrder[_ticker][prices[i]][_tradeType].list.length;
        if(numberOfTrades > 0){
            for(uint a = 0; a < numberOfTrades; a++){
            if(paramAmount == 0){
                break;
            }
            uint staticIndex = 0;
            uint priceInTrade = buyOrSellOrder[_ticker][_prices[i]][_tradeType].list[staticIndex].value;
            uint AmountInTrade = buyOrSellOrder[_ticker][_prices[i]][_tradeType].list[staticIndex].numberOfShares;
            uint executableAmount = returnLessValue(paramAmount,AmountInTrade);
            paramAmount = paramAmount.sub(executableAmount);
            uint normalizedBalance = getNormalizedBalance(executableAmount, isSale, ticker);
            Order memory newOrder = Order(isSale, msg.sender, priceInTrade, normalizedBalance, 0,0, uuid);
            engine(ticker, newOrder, uuid);
            lastPrice = _prices[i];

           
        }
        }
        
    }

    if(paramAmount > 0){
        // Order memory newOrder = Order(_isSale, msg.sender, prices[0], paramAmount, 0,0);
        // engine(_ticker, newOrder);
     TradeType _trp = _isSale ? TradeType.SELL : TradeType.BUY; 
      Order memory newOrder = Order(_isSale, msg.sender, lastPrice, paramAmount, orderId[_ticker][lastPrice][_trp], uniqueOrderID.add(1), _uuid);
      orderId[_ticker][lastPrice][_trp] = orderId[_ticker][lastPrice][_trp].add(1);
      placeOrder(newOrder, _ticker, _uuid);
    }
}



    function deposit(address token, uint256 amount) external nonReentrant() {
        require(authorizedTokens[token], "Token is not authorized.");
        require(amount > 0, "Amount must be greater ");
        IERC20 legalTender = IERC20(token);
        require(legalTender.balanceOf(msg.sender) >= amount, "Insufficient amount for the chosen quantity!");
        require(legalTender.allowance(msg.sender, address(this)) >= amount, "Insufficient spend amount!");
        require(legalTender.transferFrom(msg.sender, address(this), amount), "Fund tranfer failed!");
        balances[msg.sender][token] += amount;
        emit Deposit(token, msg.sender, amount);
    }

    function withdraw(address token, uint256 amount) external nonReentrant() {
      require(balances[msg.sender][token] >= amount, "Insufficient balance.");
      balances[msg.sender][token] -= amount;
      IERC20 legalTender = IERC20(token);
      legalTender.transfer(msg.sender, amount);
      emit Withdraw(token, msg.sender, amount);
    }

     function redeem(address token, uint256 amount, address to) external nonReentrant() {
      require(balances[msg.sender][token] >= amount, "Insufficient balance.");
      balances[msg.sender][token] -= amount;
      IERC20 legalTender = IERC20(token);
      legalTender.transfer(to, amount);
      emit Redeem(token, msg.sender, amount, to);
    }


    function authorizeToken(address token) public onlyOwner{
        authorizedTokens[token] = true;
    }

    function revokeToken(address token) public onlyOwner{
        authorizedTokens[token] = false;
    }

    function setFee(uint256 newFee) public onlyOwner {
        fee = newFee;
    }

 function changeFeeCollector(address newFeeCollector) public onlyOwner {
        feeCollector = newFeeCollector;
    }

 

}