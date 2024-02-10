import { useState, useEffect } from 'react'
import axios from 'axios'
import backEnd from './backEnd'


const DeleteButton = (props) => {
  return (
    <button onClick={() => props.deleteContact(props.id)}>Delete Contact</button>
  )
}

const PhonebookDisplay = (props) => {
  return (
    <>
      <ul>
        {props.searchResults.map(person => {
          return (
            <div key={person.id}>
              <li>{person.name} {person.number}</li><DeleteButton id={person.id} deleteContact={props.deleteContact} />
            </div>
          )
        })}
      </ul>
    </>
  )
}

const AddNewContactForm = (props) => {
  return (
    <form>
      <h2>add a new</h2>
      <div>
        name: <input onChange={props.handleChange} value={props.newName} />
      </div>
      <div>
        number: <input onChange={props.handleAddNewNumber} value={props.newNumber}></input>
      </div>
      <div>
        <button type="submit" onClick={props.handleClick}>add</button>
      </div>
    </form>
  )
}


const SearchBar = (props) => {
  return (
    <div>filter shown with <input onChange={props.handleSearchChange} value={props.newSearch}></input></div>
  )
}


const Header = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}


const Notification = ({ message }) => {
  if (message.type === null) {
    //no alert
    return null;
  } else if (message.type === 'red') {
    //alert that is red
    return (
      <div className="error">This is an error!</div>
    )
  } else if (message.type === 'green') {
    //alert that is green
    return (
      <div className="goodAlert">{message.text}</div>
    )
  }

}


const App = () => {
  const [persons, setPersons] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [regExp, setRegExp] = useState('');
  const [errorMessage, setErrorMessage] = useState({ type: null, text: '' });

  let regExpConversion = new RegExp(regExp, 'i');

  useEffect(() => {
    backEnd
      .getAll()
      .then(response => {
        setPersons(response.data);
      })
  }, [])


  const handleClick = (event) => {
    event.preventDefault();
    //it doesn't do anything if newName is empty;
    if (newName === '') {
      console.log('no entry')
      return null;
    }

    //Returns 'Match Found' if a match is found in the phonebook;
    function checkForRepeats(array) {
      let passed = '';
      array.forEach(person => {
        if (person.name === newName) {
          return passed = 'Match Found';
        }
      })
      return passed;
    }

    if (checkForRepeats(persons) === 'Match Found') {
      if (confirm(`${newName} is already added to the phonebook, do you want to update their number?`)) {
        const updatedEntry = { name: newName, number: newNumber }
        let idOfUpdated = '';
        let phonebookClone = [];
        //This finds the ID of whatever entry is being updated--a necessary parameter for backend.update();
        persons.forEach(person => {
          if (person.name === newName) {
            idOfUpdated = person.id;
          }
        })
        //This catches the rare error :| of not using the second parameter in useEffect. 
        //If the data is already erased from the server, this will create an error notification.
        backEnd
          .update(idOfUpdated, updatedEntry)
          .then(response => {
             persons.forEach(person => {
               if (person.id === response.data.id) {
                 phonebookClone.push(response.data);
               } else {
                 phonebookClone.push(person);
               }
             })
            setPersons(phonebookClone)
            setNewName('');
            setNewNumber('');
          })
          .then(response => {
            setErrorMessage({ type: 'green', text: `Updated ${newName}'s Number` })
            setNewName('');
            setNewNumber('');
            setTimeout(() => {
              setErrorMessage({ type: null, text: '' })
            }, 2500)
          })
          .catch(error => {
            setErrorMessage(
              { type: 'red', text: `${newName}'s data was already removed from the server` }
            )
            setTimeout(() => {
              setErrorMessage({type: null, text: ''})
            }, 5000)
            setNewName('');
            setNewNumber('');
          })

      } else {
        //This is the cancel condition for the confirm modal that pops up whenever a match is found in the Phonebook
        return null;
      }
    } else if (checkForRepeats(persons) === '') {
      //Add new entry condition--checkForRepeats() returning empty string is the 'no matches' condition
      const newEntry = { name: newName, number: newNumber };
      let phonebookClone = [];
      backEnd
        .create(
          newEntry
        ).then(response => {
          phonebookClone = persons.concat(response.data);
          setPersons(phonebookClone)
        })
          .then(response => {
          setErrorMessage({ type: 'green', text: `Added ${newName}` })
          setNewName('');
          setNewNumber('');
          setTimeout(() => {
            setErrorMessage({ type: null, text: '' })
          }, 2500)
          setNewName('');
          setNewNumber('');
        })
    }
  }


  const deleteContact = (id) => {
    backEnd
      .removeContact(id)
      .then(response => {
        let phonebookClone = [];
        persons.forEach(person => {
          if (person.name === response.data.name) {
            return null;
          } else {
            phonebookClone.push(person);
          }
          setPersons(phonebookClone);
        })
      })


  }

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handleAddNewNumber = (event) => {
    setNewNumber(event.target.value);
  }


  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    setRegExp(event.target.value);
  }

  let searchResults = [];
  for (let i = 0; i < persons.length; i++) {
    if (regExpConversion.test(persons[i].name)) {
      searchResults.push(persons[i]);
    }
  }

  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={errorMessage} />
      <SearchBar handleSearchChange={handleSearchChange} newSearch={newSearch} />
      <AddNewContactForm handleChange={handleChange} newName={newName} handleAddNewNumber={handleAddNewNumber} newNumber={newNumber} handleClick={handleClick} />
      <PhonebookDisplay searchResults={searchResults} deleteContact={deleteContact} />
    </div>
  )
}

export default App
