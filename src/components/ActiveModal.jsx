import Modal from './Modal';
import {getCourseTerm, getCourseNumber} from './Course.js';

 
const ActiveModal = ({ selected }) => (
  <div>
      {
    selected.length === 0 ?
        (<div>
          <h2>Oops.. It seems that you have not selected a class yet.</h2>
          <p>Please click on any class to select it and double click on it to edit it's details. In order for the edit feature to work you need to be signed in.</p>
        </div>)
      : (<div>
            <p>Please click on any class to select it and double click on it to edit it's details. In order for the edit feature to work you need to be signed in.</p>
            <h2>You selected:</h2>
            { Object.entries(selected).map(([id, course]) => (
                  <div key={id}>
                  <div className = "top"><b style = {{fontSize: "25px"}}>{getCourseTerm(course)} {" CS "} {getCourseNumber(course)}</b></div>
                      <div className = "middle">{course.title}</div> 
                      <div className = "bottom">Meeting Time: {course.meets}</div>
                      <hr></hr>
                </div>
                ))
            }
        </div>)
    }
  </div>
);

export default ActiveModal;

