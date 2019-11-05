import React from "react";
import classnames from 'classnames';

import "components/DayListItem.scss";
import { render } from "@testing-library/react";


export default function DayListItem(props) {

  const formatSpots = function () {
    if(props.spots === 0 ){
       return (
       "no spots remaining"
        )
    }
    if (props.spots === 1){
       return (
       `${props.spots} spot remaining`
        ) 
    }
    if (props.spots > 1) {
      return (
        `${props.spots} spots remaining`
      )
    }
  }
  
  let dayListClasses = classnames('day-list__item',{
  ' day-list__item--selected' : props.selected,
  'day-list__item--full': props.spots === 0
  });

  return (
    <li className={dayListClasses} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}


