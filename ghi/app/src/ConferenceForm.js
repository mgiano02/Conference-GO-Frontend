import React, { useEffect, useState } from 'react';

function ConferenceForm() {

    const [locations, setLocations] = useState([])


    const [name, setName] = useState("");
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const [startDate, setStartDate] = useState("");
    const handleStartDateChange = (event) => {
        const value = event.target.value;
        setStartDate(value);
    }
    const [endDate, setEndDate] = useState("");
    const handleEndDateChange = (event) => {
        const value = event.target.value;
        setEndDate(value);
    }
    const [description, setdescription] = useState("");
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setdescription(value);
    }
    const [maxPresentations, setMaxPresentations] = useState("");
    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
    }
    const [maxAttendees, setMaxAttendees] = useState("");
    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value;
        setMaxAttendees(value);
    }
    const [location, setLocation] = useState("");
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.starts = startDate
        data.ends = endDate;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();

            setName('');
            setStartDate('');
            setEndDate('');
            setdescription('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');
        }
    }


    const fetchData = async () => {
        const url = "http://localhost:8000/api/locations/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }
        useEffect(() => {
            fetchData();
          }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={name} className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStartDateChange} placeholder="Starts" required type="date" name="starts" id="starts" value={startDate} className="form-control"/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEndDateChange} placeholder="Ends" required type="date" name="ends" id="ends" value={endDate} className="form-control"/>
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="form-floating mb-3">
                <textarea onChange={handleDescriptionChange} placeholder="Description" required type="text" name="description" className="form-control" id="description" value={description} rows="3"></textarea>
                <label htmlFor="description">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxPresentationsChange} placeholder="Max presentations" required type="text" name="max_presentations" id="max_presentations" value={maxPresentations} className="form-control"/>
                <label htmlFor="max_presentations">Max Presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxAttendeesChange} placeholder="Maximum attendees" required type="text" name="max_attendees" id="max_attendees" value={maxAttendees} className="form-control"/>
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} required id="location" value={location} name="location" className="form-select">
                  <option value="">Choose a location</option>
                    {locations.map(location => {
                        return (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        );
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ConferenceForm;
