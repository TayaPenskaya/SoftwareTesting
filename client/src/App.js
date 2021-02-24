import React, {useEffect} from 'react';
import MissionList from "./mission/MissionList";

function App() {
  const [missions, setMissions] = React.useState([]);

  useEffect(() => {
      fetch('https://raw.githubusercontent.com/denissokolov/tc-internship-task/master/launches.json')
      .then(response => response.json())
          .then(missions => {
              setMissions(missions)
          })
  }, []);

    return (
      <div className='wrapper'>
          <span className='flex'>
              <h2>Current time:</h2>
              <h2 id='now'>
                { setInterval(() => {
                  let now = new Date();
                  document.getElementById("now").innerHTML = now.toLocaleString();}, 0)
                }
              </h2>
          </span>
          <span className='flex'>
              <h1 className='header'>Space</h1>
              <h1 className='header'>X Missions</h1>
          </span>
        <MissionList missions={missions}/>
      </div>
  )
}

export default App;
