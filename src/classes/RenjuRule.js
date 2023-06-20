import Token from "classes/Token";

class RenjuRule{
    static maxConnectToken(isBlackTurn, crossSquares, row, col){

        let maxConnTokenCnt = 0;
        let tokenType = isBlackTurn ? Token.black() : Token.white();
        let plusX, plusY;
        let maxLen = crossSquares.length;
        let token = [1, 0, 1, 0, 1, 0, 1, 0];
        let moveX = [1, -1, 0,  0, 1, -1,  1, -1];
        let moveY = [0,  0, 1, -1, 1, -1, -1,  1];

        for(let i=0; i<token.length; i++){
            plusX = moveX[i];
            plusY = moveY[i];
            for(let r=row+plusX, c=col+plusY; 0 <= r && r < maxLen && 0 <= c && c < maxLen; r = r + plusX, c = c + plusY){
                if(crossSquares[r][c] === tokenType)
                    token[i]++;
                else
                    break;
            }

            if(i % 2 === 1){
                if(maxConnTokenCnt < token[i-1] + token[i]){
                    maxConnTokenCnt = token[i-1] + token[i];
                }
            }
        }

        return maxConnTokenCnt;
    }

    static isDoubleOpenThree(crossSquares, row, col){
        // ready
    }

    static isDoubleOpenFour(crossSquares, row, col){
        // ready
    }
}

export default RenjuRule;