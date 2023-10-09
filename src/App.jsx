import { useEffect, useState } from "react";
import "./App.css";
import DBRecord from "./DBRecord";
import TaskTile from "./TaskTile";

const database = [
  {
    store: 1,
    dueDate: "2023-10-08T23:59:59+0000",
  },
];

const optionsGuam = {
  timeZone: "Pacific/Guam",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const optionsAtlanta = {
  timeZone: "America/New_York",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

function App() {
  const [datetimeGuam, setDatetimeGuam] = useState(
    new Intl.DateTimeFormat("en-US", optionsGuam).format(new Date())
  );
  const [datetimeAtlanta, setDatetimeAtlanta] = useState(
    new Intl.DateTimeFormat("en-US", optionsAtlanta).format(new Date())
  );
  const [dateGuam, setDateGuam] = useState("");
  const [timeGuam, setTimeGuam] = useState("");
  const [dateAtlanta, setDateAtlanta] = useState("");
  const [timeAtlanta, setTimeAtlanta] = useState("");
  const [database, setDatabase] = useState([
    {
      store: 1,
      dueDate: "2023-10-08T23:59:59+0000",
    },
  ]);
  const [guamTasklist, setGuamTasklist] = useState([]);
  const [atlantaTasklist, setAtlantaTasklist] = useState([]);

  const handlerCreateTask = (store) => {
    if (store === 1) {
      let dateFormatted;
      if (timeGuam !== "") {
        const [month, day, year] = dateGuam.split("/");
        const [hours, minutes] = timeGuam.split(":");
        dateFormatted =
          `${year}-${month}-${day}T${hours}:${minutes}:00` + "+0000";
      }
      setDatabase([...database, { store, dueDate: dateFormatted }]);
    }

    if (store === 2) {
      let dateFormatted;
      const [month, day, year] = dateAtlanta.split("/");
      const [hours, minutes] = timeAtlanta.split(":");
      dateFormatted =
        `${year}-${month}-${day}T${hours}:${minutes}:00` + "+0000";
      setDatabase([...database, { store, dueDate: dateFormatted }]);
    }
    console.log(database);
  };

  const retrieveTask = (store, date) => {
    let [month, day] = date.split("/");
    day = "0" + day;

    const targetDate = `2023-${month}-${day}`;

    const filteredItems = database.filter((item) => {
      const storedDate = item.dueDate.substring(0, 10);

      return item.store === store && targetDate == storedDate;
    });
    if (store === 1) {
      setGuamTasklist(filteredItems);
    } else {
      setAtlantaTasklist(filteredItems);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDatetimeGuam(
        new Intl.DateTimeFormat("en-US", optionsGuam).format(new Date())
      );
      setDatetimeAtlanta(
        new Intl.DateTimeFormat("en-US", optionsAtlanta).format(new Date())
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {}, [guamTasklist]);

  return (
    <div className="wrapper">
      <div className="stores">
        <div className="guam store">
          <p>Guam</p>
          <p>{datetimeGuam}</p>
          <div className="create-task inputs">
            <div className="input-label">
              <label htmlFor="create-date-guam">Due Date</label>
              <input
                id="create-date-guam"
                onChange={(e) => {
                  setDateGuam(e.target.value);
                }}
              />
            </div>
            <div className="input-label">
              <label htmlFor="create-time-guam">Time</label>
              <input
                id="create-time-guam"
                onChange={(e) => {
                  setTimeGuam(e.target.value);
                }}
              />
            </div>
          </div>
          <button onClick={() => handlerCreateTask(1)}>Create Task</button>
          <button
            onClick={() => {
              retrieveTask(1, datetimeGuam.slice(0, 4));
            }}
          >
            Retrieve Tasks
          </button>
          <div className="guam-tasklist tasklist">
            <p>Today {datetimeGuam.slice(0, 4)}</p>
            {guamTasklist.map((item, index) => (
              <TaskTile key={index} time={item.dueDate} />
            ))}
          </div>
        </div>

        <div className="atlanta store">
          <p>Atlanta</p>
          <p>{datetimeAtlanta}</p>
          <div className="create-task inputs">
            <div className="input-label">
              <label htmlFor="create-date-atlanta">Due Date</label>
              <input
                id="create-date-atlanta"
                onChange={(e) => {
                  setDateAtlanta(e.target.value);
                }}
              />
            </div>
            <div className="input-label">
              <label htmlFor="create-time-atlanta">Time</label>
              <input
                id="create-time-atlanta"
                onChange={(e) => {
                  setTimeAtlanta(e.target.value);
                }}
              />
            </div>
          </div>
          <button onClick={() => handlerCreateTask(2)}>Create Task</button>
          <button
            onClick={() => {
              retrieveTask(2, datetimeAtlanta.slice(0, 4));
            }}
          >
            Retrieve Tasks
          </button>
          <div className="atlanta-tasklist tasklist">
            <p>Today {datetimeAtlanta.slice(0, 4)}</p>
            {atlantaTasklist.map((item, index) => (
              <TaskTile key={index} time={item.dueDate} />
            ))}
          </div>
        </div>
      </div>
      <div className="database">
        {database.map((item, index) => (
          <DBRecord
            key={"record" + index}
            index={index}
            duedate={item.dueDate}
            store={item.store}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
