import React from 'react'
import GameBoard from 'classes/GameBoard'

class GameSystem extends React.Component{

    render(){
        return(
            <div className='game_system'>
                <GameBoard/>
                <div>Omok Game (Renju-rule) Test Version!</div>
                <div>Coming Soon...</div>
            </div>
        )
    }

}

export default GameSystem;