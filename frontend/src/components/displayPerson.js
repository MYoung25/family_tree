import { useState, useEffect } from "react";
import { Dialog, DialogActions, TextField, Button, makeStyles } from "@material-ui/core";
import Axios from "axios";
import RelationshipPicker from "./RelationshipPicker";

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        maxWidth: "80%",
        margin: "auto",
    }
}));

function ShowPerson({ _id, saved, ...props }) {
    const classes = useStyles();
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
    <Dialog
        open={!!_id}
        onClose={saved}
    >
        <div className={classes.container}>
            <TextField
                id="firstName"
                label="First Name"
                value={person.firstName}
                onChange={event => updatePerson({ firstName: event.target.value })}
                fullWidth
            />
            <TextField
                id="lastName"
                label="Last Name"
                value={person.lastName}
                onChange={event => updatePerson({ lastName: event.target.value })}
                fullWidth
            />
            <RelationshipPicker
                field="spouse"
                self={person}
                onChange={ updatePerson }
            />  
            <RelationshipPicker
                field="parents"
                self={person}
                multiple
                onChange={ updatePerson }
            />
            <RelationshipPicker
                field="children"
                self={person}
                multiple
                onChange={ updatePerson }
            />
            <DialogActions>
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
                    variant="outlined"
                    onClick={() => {
                        saved()
                    }}
                >
                    Cancel
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
            </DialogActions>
        </div>
    </Dialog>
  );
}

export default ShowPerson;