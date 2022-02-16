import React from "react";

const Value = ({label,value})=>{
    return( 
    <div>
        <span style={{color:'white'}}>{label}</span>
        <span >
            {value}
        </span>
    </div>
      
      )

}

export default Value