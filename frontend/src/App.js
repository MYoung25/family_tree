import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Chip, Avatar, Fab, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, makeStyles } from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons';
import Axios from 'axios'
import './App.css';

import ShowPerson from './components/displayPerson';


Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  showPerson: {
    margin: 'auto',
    width: '350px',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  card: {
    margin: 'auto',
  }
}));

const emptyPerson = {
  firstName: '',
  lastName: '',
}

function App() {
  const classes = useStyles();
  const [people, setPeople] = useState([]);
  const [showPerson, setShowPerson] = useState();
  const [addModal, setAddModal] = useState(false);
  const [addPerson, setAddPerson] = useState(emptyPerson);

  function updateAddPerson (person) {
    setAddPerson({...person, addPerson});
  }

  async function fetchPeople() {
    const response = await Axios.get('/person');

    setPeople(response.data);
  }

  useEffect(() => { 
    fetchPeople()
  }, [])

  return (
    <div className="App">
      <div>
        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
          { 
            people.map((person, index) => (
              <Grid item key={person._id} xs={3}>
                <Card
                  className={classes.card}
                >
                  <CardContent>
                    <Chip
                      avatar={<Avatar component="span">{person.firstName.slice(0,1)}{person.lastName.slice(0,1)}</Avatar>}
                      label={person.firstName + ' ' + person.lastName}
                    />
                    <IconButton onClick={() => setShowPerson(person._id)}>
                      <Edit/>
                    </IconButton>
                    <div>
                      {
                        person.spouse ? 
                          <Typography variant="body2">Spouse: {person.spouse.firstName} {person.spouse.lastName}</Typography> : ''
                      }
                      {
                        person.parents.length ?
                        <Typography variant="subtitle1">Parent{person.parents.length > 1 && 's'}: {person.parents.map(p => `${p.firstName} ${p.lastName}`).join(', ')}</Typography>
                        : ''
                      }
                      {
                        person.children.length ?
                        <Typography variant="subtitle1">{person.children.length > 1 ? 'Children' : 'Child' }: {person.children.map(p => `${p.firstName} ${p.lastName}`).join(', ')}</Typography>
                        : ''
                      }
                      </div>
                  </CardContent>
                </Card>
              </Grid>
            )) 
          }
        </Grid>

      { showPerson && <div className={classes.showPerson}><ShowPerson _id={showPerson} saved={() => {
        fetchPeople()
        setShowPerson()
      }} /></div> }


      <Fab onClick={() => {
          setAddModal(true);
        }}
        className={classes.fab} color="primary"
      >
        <Add />
      </Fab>

        <Dialog open={addModal} onClose={() => {
          setAddModal(false);
        }}>
          <DialogTitle>Add a new person</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              placeholder="First name"
              name="firstName"
              value={addPerson.firstName}
              onChange={event => updateAddPerson({...addPerson, firstName: event.target.value})}
              />
            <TextField
              fullWidth
              placeholder="Last name"
              name="lastName"
              value={addPerson.lastName}
              onChange={event => updateAddPerson({...addPerson, lastName: event.target.value})}
              />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="outlined" onClick={() => {
              Axios.post("/person", {
                firstName: addPerson.firstName,
                lastName: addPerson.lastName,
              })
                .then(response => {
                  return fetchPeople();
                }).then(() => {
                  setAddPerson(emptyPerson);
                  setAddModal(false);
                }).catch(error => {
                  console.log(error);
                });
            }}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
