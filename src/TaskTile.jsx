import { useEffect, useState } from "react";
import './tasktile.css'

export default function TaskTile({ time, title }) {
  return (
    <div className="task-container">
      <p style={{fontWeight: 'bold'}}>Title {title}</p>
      <p>due at {time}</p>
    </div>
  );
}
