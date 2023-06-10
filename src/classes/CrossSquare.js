function CrossSquare(props){
    return(
        <button className='cross_square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default CrossSquare