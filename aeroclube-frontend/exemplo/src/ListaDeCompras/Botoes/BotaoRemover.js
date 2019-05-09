import {Icon} from "semantic-ui-react";
import React from "react";
import './BotaoRemover.css';

const BotaoRemover = (props) => {
    return (
            <Icon className={"BotaoRemover"} 
            name={'delete'} onClick={props.onClick} 
            size={'small'} />
    )
};
export default BotaoRemover