import React from 'react'
import GameBoard from 'classes/GameBoard'
import Token from 'classes/Token'
import RenjuRule from 'classes/RenjuRule'

class GameSystem extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            crossSquares: this.initCrossSquares(),
            isBlackTurn: true,
            isEndGame: false,
            currTurnIdx: 0,
            saveTurn: [],

            ruleBoxOpen: true,
            checkPointBoxOpen: true,
            creditBoxOpen: true,
        };
    }

    initState(){
        this.setState({
            crossSquares: this.initCrossSquares(),
            isBlackTurn: true,
            isEndGame: false,
            currTurnIdx: 0,
            saveTurn: [],

            ruleBoxOpen: true,
            checkPointBoxOpen: true,
            creditBoxOpen: true,
        })
    }

    initCrossSquares(){
        let arr = Array.from({length:15}, () => []);
        for(let i=0; i<arr.length; i++)
            for(let j=0; j<arr.length; j++)
                arr[i].push(Token.empty());

        return arr;
    }

    checkField(row, col){

        let maxConnTokenCnt;
        const crossSquares = this.state.crossSquares.slice();
        let isBlackTurn = this.state.isBlackTurn;
        let isEndGame = this.state.isEndGame;

        let currTurnIdx = this.state.currTurnIdx;
        let saveTurn = this.state.saveTurn;

        if(isEndGame)
            return;

        if(crossSquares[row][col] !== Token.empty()){
            alert("This Square has already token.")
            return;
        }

        maxConnTokenCnt = RenjuRule.maxConnectToken(isBlackTurn, crossSquares, row, col)
        if((!isBlackTurn && maxConnTokenCnt >= 5) || (isBlackTurn && maxConnTokenCnt === 5)){
            alert((isBlackTurn ? "Black" : "White") + " Win!");
            isEndGame = true;
        }
        else{
            // Renju Rule process (Over token, 3-3, 4-4)
            if(isBlackTurn){
                if(isBlackTurn && maxConnTokenCnt > 5){
                    alert("Black tokens cannot make more than six consecutive tokens.");
                    return;
                }

                if(RenjuRule.is3_3(crossSquares, row, col)){
                    alert("Black tokens cannot make open three continuously.");
                    return;
                }

                if(RenjuRule.is4_4(crossSquares, row, col)){
                    alert("Black tokens cannot make open four continuously.");
                    return;
                }
            }
        }

        this.removeTurn(saveTurn, currTurnIdx);
        crossSquares[row][col] = isBlackTurn ? Token.black() : Token.white();
        saveTurn.push(this.deepCopyCrossSquare(crossSquares));

        this.setState({
            crossSquares: crossSquares,
            isBlackTurn: !isBlackTurn,
            isEndGame: isEndGame,
            currTurnIdx: saveTurn.length,
            saveTurn: saveTurn,
        });
    }

    makeLoadGameButton(){
        const handleObj = this;
        return(
          this.state.saveTurn.map(function(obj, idx) {
              return (
                  <button onClick={() => handleObj.loadGame(idx)} key={idx}>save {idx}</button>
              );
          })
        );
    }

    resetGame(){
        this.initState();
    }

    loadGame(idx){
        const saveCrossSquares = this.state.saveTurn[idx].slice();

        this.setState({
            crossSquares: this.deepCopyCrossSquare(saveCrossSquares),
            isBlackTurn: idx % 2 !== 0,
            currTurnIdx: idx + 1
        })
    }

    removeTurn(saveTurn, idx){
        for(let i=saveTurn.length-1; i>=idx; i--){
            saveTurn.pop();
        }
    }

    deepCopyCrossSquare(crossSquares){
        return JSON.parse(JSON.stringify(crossSquares))
    }

    render(){
        return(
            <div className='game_system'>
                <GameBoard
                    crossSquares={this.state.crossSquares}
                    isBlackTurn={this.state.isBlackTurn}
                    maxLength={this.state.crossSquares.length}
                    onClick={(r, c) => this.checkField(r, c)}
                />
                <div className='game_info'>
                    <h1 className='game_title'>Omok Game (Renju-Rule)
                        <button className='reset_btn' onClick={() => this.resetGame()}>Reset</button>
                    </h1>

                    <ul>
                        <div className='sub_title_box' onClick={() => {this.setState({ruleBoxOpen : !this.state.ruleBoxOpen});}}>Rule</div>
                        <div className='text_box' style={{display:!this.state.ruleBoxOpen ? 'none' : ''}}>
                            <li>1. You can place one token anywhere you want on each turn. The progression sequence starts with the black one first, and the white one is the second.</li>
                            <li>2. The first player to make a straight line or diagonal line of five consecutive tokens wins.</li>
                            <li>3. Black Token does not allow straight, diagonal arrangements consisting of Open Three (3-3), Open Four (4-4), and six or more consecutive Tokens. (However, if a straight line or diagonal line consisting of five consecutive tokens is made when placed in a position where Open Three (3-3) or Open Four (4-4) can occur, it will be recognized as a victory regardless of the rule.)</li>
                        </div>
                    </ul>
                    &nbsp;
                    <ul>
                        <div className='sub_title_box' onClick={() => {this.setState({checkPointBoxOpen: !this.state.checkPointBoxOpen});}}>Check Point</div>
                        <div className='text_box' style={{display:!this.state.checkPointBoxOpen ? 'none' : ''}}>
                            {this.makeLoadGameButton()}
                        </div>
                    </ul>
                    &nbsp;
                    <ul>
                        <div className='sub_title_box' onClick={() => {this.setState({creditBoxOpen: !this.state.creditBoxOpen});}}>Credit</div>
                        <div className='text_box' style={{display:!this.state.creditBoxOpen ? 'none' : ''}}>
                            <li>Created by baedi</li>
                            &nbsp;
                            <li>Github : <a href='https://github.com/baedi/Omok-Game'>https://github.com/baedi/Omok-Game</a></li>
                            <li>Reference : <a href='https://ko.legacy.reactjs.org/tutorial/tutorial.html'>https://ko.legacy.reactjs.org/tutorial/tutorial.html</a></li>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }

}

export default GameSystem;