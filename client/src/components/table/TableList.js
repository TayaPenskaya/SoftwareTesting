import React from "react";
import MissionItem from "./MissionItem";

function MissionList(props) {
    return (
        <div>
            <div className="grid">
                <strong>№</strong>
                <strong>Name</strong>
                <strong>Vehicle</strong>
                <strong>Location</strong>
                <strong>Start</strong>
                <strong>Timer</strong>
            </div>
            { props.missions.map((mission, index) => {
                return (
                    <MissionItem
                        mission={mission}
                        key={index}
                        index={index}
                    />
                )
            })}
        </div>
    )
}

export default MissionList