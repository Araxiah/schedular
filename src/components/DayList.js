import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList (props) {

  console.log('PROPS:::::::', props.days[0] ? props.days[0].appointments : props.days)

    const daysList = props.days.map(day => {
      return (
        <DayListItem 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  />
            );
    });
  
    return <ul>{daysList}</ul>;
}
