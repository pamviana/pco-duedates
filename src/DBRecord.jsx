import { useEffect, useState } from "react";
import './dbrecord.css'

export default function DBRecord({ duedate, store, index }) {
  return (
    <div className="record-wrapper">
      <p>Title {index}</p>
      <p>{duedate}</p>
      <p>store: {store}</p>
    </div>
  );
}
