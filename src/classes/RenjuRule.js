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
            for(let r=row+plusY, c=col+plusX; 0 <= r && r < maxLen && 0 <= c && c < maxLen; r = r + plusY, c = c + plusX){
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
        let openCnt = 0;
        let blackCnt, emptyCnt;
        let frontRow, frontCol, backRow, backCol, curRow, curCol;
        let isWhite;
        let blockEmptyCnt

        const maxBoardLen = crossSquares.length;
        let isOpen = [false, false, false, false, false, false, false, false];
        let moveRow = [ 0,  0, -1,  1, -1,  1, -1,  1];
        let moveCol = [-1,  1,  0,  0, -1,  1,  1, -1];


        for(let i=0; i<isOpen.length; i++){
            blackCnt = 1;
            emptyCnt = 0;
            isWhite = false;
            blockEmptyCnt = [0, 0];

            backRow = frontRow = row;
            backCol = frontCol = col;

            // Back Check
            curRow = row - moveRow[i];
            curCol = col - moveCol[i];
            if(this.isInRange(curRow, curCol, maxBoardLen)){
                switch (crossSquares[curRow][curCol]){
                    case Token.black():
                        backRow = curRow;
                        backCol = curCol;
                        blackCnt++;
                        break;
                    case Token.white():
                        continue;
                    default:
                }
            }

            // Front Check
            curRow = row + moveRow[i];
            curCol = col + moveCol[i];
            while(this.isInRange(curRow, curCol, maxBoardLen) && emptyCnt < 2){
                switch(crossSquares[curRow][curCol]){
                    case Token.black():
                        frontRow = curRow;
                        frontCol = curCol;
                        blackCnt++;
                        break;
                    case Token.white():
                        isWhite = true;
                        break;
                    default:
                        emptyCnt++;
                }

                curRow = curRow + moveRow[i];
                curCol = curCol + moveCol[i];
            }

            if(blackCnt !== 3 || isWhite)
                continue;

            // Back Check 2
            for(let j=0; j<blockEmptyCnt.length; j++){
                backRow = backRow - moveRow[i];
                backCol = backCol - moveCol[i];

                if(this.isInRange(backRow, backCol, maxBoardLen) && crossSquares[backRow][backCol] === Token.empty()){
                    blockEmptyCnt[j]++;
                }
            }

            // Front Check 2
            for(let j=0; j<blockEmptyCnt.length; j++){
                frontRow = frontRow + moveRow[i];
                frontCol = frontCol + moveCol[i];

                if(this.isInRange(frontRow, frontCol, maxBoardLen) && crossSquares[frontRow][frontCol] === Token.empty()){
                    blockEmptyCnt[j]++;
                }
            }

            // Results
            if(blockEmptyCnt[0] >= 2 && blockEmptyCnt[1] >= 1){
                isOpen[i] = true;
            }
        }

        for(let i=0; i<isOpen.length; i=i+2){
            if(isOpen[i] || isOpen[i+1]) {
                openCnt++;
            }
        }

        return openCnt >= 2 ? true : false;
    }

    static isDoubleOpenFour(crossSquares, row, col){
        // ready
    }

    static isInRange(row, col, maxLen){
        return 0 <= row && row < maxLen && 0 <= col && col < maxLen;
    }
}

export default RenjuRule;