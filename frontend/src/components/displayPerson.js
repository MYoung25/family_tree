import { useState, useEffect } from "react";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import Axios from "axios";

function ShowPerson({ _id, saved, ...props }) {
  const [person, setPerson] = useState({
    firstName: '',
    lastName: '',
  });

  function updatePerson (update) {
    setPerson({...person, ...update});
  }

  useEffect(() => {
    Axios.get(`/person/${_id}`)
      .then(response => setPerson(response.data))

  }, [_id]);

  return (
    <Paper>
        <Typography>
            Editing Person
        </Typography>
        <TextField
            id="firstName"
            label="First Name"
            value={person.firstName}
            onChange={event => updatePerson({ firstName: event.target.value })}
        />
        <TextField
            id="lastName"
            label="Last Name"
            value={person.lastName}
            onChange={event => updatePerson({ lastName: event.target.value })}
        />
        <br/>
        <Button
            variant="contained"
            color="secondary"
            onClick={() => {
                Axios.delete(`/person/${_id}`, person)
                .then(response => {
                    saved();
                }).catch(error => {
                    console.error(error);
                })
            }}
        >
            Delete
        </Button>
        <Button
            variant="contained"
            color="primary"
            onClick={() => {
                Axios.put(`/person/${_id}`, person)
                .then(response => {
                    saved();
                }).catch(error => {
                    console.error(error);
                })
            }}
        >
            Save
        </Button>
    </Paper>
  );
}

export default ShowPerson;