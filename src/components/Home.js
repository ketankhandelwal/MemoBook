import React, {useContext} from 'react' // importing useContext.
import noteContext  from '../context/notes/noteContext';
import AddNotes from './AddNotes';
import Notes from './Notes';


const Home = (props) => {
  const {showAlert}= props
  

  return (
    <div>
      
      
      
        <Notes showAlert={showAlert}></Notes>
    </div>
  )
}

export default Home
