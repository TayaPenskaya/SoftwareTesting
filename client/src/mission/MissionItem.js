import React from "react";
import LaunchDate from './launch/LaunchDate.js'
import Timer from "./timer/Timer";

function MissionItem({ mission, index }){
    return (
        <div className='grid'>
            <strong>{index+1}</strong>
            <p>{mission['mission']}</p>
            <p>{mission['vehicle']}</p>
            <p>{mission['location']}</p>
            <LaunchDate launch={mission['launch']} />
            <Timer launch={mission['launch']} index={index}/>
        </div>
    )
}

export default MissionItem