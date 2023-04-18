import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import SignupForm from './Signup';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
      <Nav />
        <div className="container">
          { <SignupForm /> }
          {/* <LocationForm /> */}
          {/* { <ConferenceForm /> } */}
          {/* <AttendeesList attendees={props.attendees} /> */}
        </div>
    </>
  );
}

export default App;
