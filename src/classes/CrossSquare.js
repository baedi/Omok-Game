import Token from 'classes/Token'
import 'css/token.css'

function CrossSquare(props){
    return(
        <button className="cross_square" onClick={props.onClick}>
            <div
                className={props.value === Token.black() ? 'c_square_black' : props.value === Token.white() ? 'c_square_white' : 'c_square_empty' }
                id={props.value === Token.empty() ? (props.turn === true ? 'c_square_next_black' : 'c_square_next_white') : 'c_square_already'}
            />
        </button>
    );
}

export default CrossSquare