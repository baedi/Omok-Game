import React from 'react'
import CrossSquare from 'classes/CrossSquare'
import Token from 'classes/Token'
import RenjuRule from "./RenjuRule";

class GameBoard extends React.Component{
    constructor(props) {
        super(props);

        let arr = Array.from({length: 15}, () => []);
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr.length; j++){
                arr[i].push(Token.empty())
            }
        }

        this.state = {
            crossSquares: arr,
            isBlackTurn: true,
            isEndGame: false
        }
    }
    handleClick(row, col){
        let maxConnTokenCnt;
        const crossSquares = this.state.crossSquares.slice();
        let isBlackTurn = this.state.isBlackTurn;
        let isEndGame = this.state.isEndGame;

        if(isEndGame)
            return;

        // 이미 말이 놓여있는지 확인
        if(crossSquares[row][col] !== Token.empty()){
            alert("This Square has already token.")
            return;
        }

        // 말 5개 완성 여부
        maxConnTokenCnt = RenjuRule.maxConnectToken(isBlackTurn, crossSquares, row, col)
        if(maxConnTokenCnt >= 5){
            alert((isBlackTurn ? "Black" : "White") + " Win!");
            isEndGame = true;
        }

        // 렌주룰 적용 코드
        if(isBlackTurn){
            if(RenjuRule.check33(crossSquares, row, col)){
                alert("");
                return;
            }

            if(RenjuRule.check44(crossSquares, row, col)){
                alert("");
                return;
            }
        }

        crossSquares[row][col] = isBlackTurn ? Token.black() : Token.white();

        this.setState({
            crossSquares: crossSquares,
            isBlackTurn: !isBlackTurn,
            isEndGame: isEndGame,
        });
    }

    makeColGameBoard(colArr, row){
        const handleObj = this;
        return(
            <div className='game_board_row'>{
                colArr.map(function(obj, col){
                    return(
                        <CrossSquare
                            value={obj}
                            onClick={() => {handleObj.handleClick(row, col)}}
                            key={row + "r" + col + "c"}
                        />
                    )
                })
            }
            </div>
        );
    }

    makeRowGameBoard(){
        const handleObj = this;
        return(
            this.state.crossSquares.map(function(obj, idx){
                return handleObj.makeColGameBoard(obj, idx);
            })
        )
    }

    render(){
        return (
            <div className='game_board'>
                {this.makeRowGameBoard()}
            </div>
        );
    }
}

export default GameBoard