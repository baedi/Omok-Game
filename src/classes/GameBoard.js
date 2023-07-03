import React from 'react'
import CrossSquare from 'classes/CrossSquare'

class GameBoard extends React.Component{

    makeColGameBoard(colArr, row){
        const handleObj = this;
        return(
            <div className='game_board_row'>{
                colArr.map(function(obj, col){
                    return(
                        <CrossSquare
                            value={obj}
                            turn={handleObj.props.isBlackTurn}
                            onClick={() => {handleObj.props.onClick(row, col)}}
                            key={row + "r" + col + "c"}/>
                    )
                })
            }
            </div>
        );
    }

    makeRowGameBoard(){
        const handleObj = this;
        return(
            this.props.crossSquares.map(function(obj, idx){
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