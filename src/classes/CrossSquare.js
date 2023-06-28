import Token from 'classes/Token'

function CrossSquare(props){
    return(
        <button className="cross_square" onClick={props.onClick}>
            <div
                className={props.value === Token.black() ? 'c_square_black' : props.value === Token.white() ? 'c_square_white' : 'c_square_empty' }
            />
        </button>
    );
}

export default CrossSquare