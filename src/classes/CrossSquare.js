function CrossSquare(props){
    return(
        <button className='crossSquare' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default CrossSquare