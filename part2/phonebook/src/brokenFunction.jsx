const handleClick = (event) => {
  event.preventDefault();
  if (newName === '') {
    return null;
  }
  else {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName && newNumber === '') {
        alert(`${newName} is  already added to the phonebook`);
        setNewName('');
        return null;
      }
      if (persons[i].name === newName && newNumber !== '') {
        if(confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
          const clone = {...persons[i], number: newNumber};
          let phonebookClone = [];
          backEnd
            .update(persons[i].id, clone)
            .catch(error => {
              setErrorMessage(
                {type: 'red', text: 'error caught'}
              )
              setTimeout(() => {
                setErrorMessage({type: null, text: ''})
              }, 5000)
            })
            .then(response => {
              console.log(response)
              if (response === undefined) {
                return null;
              } else {
              persons.forEach(person => {
                if (person.name === persons[i].name) {
                  phonebookClone.push(response.data);
                } else {
                  phonebookClone.push(person);
                }
              })
            }
              setNewName('');
              setNewNumber('');
              setPersons(phonebookClone);
            })
            return null;
        } else {
          return null;
        }
      }
    }
  }
  let newContact = {name: newName, number: newNumber};
  backEnd
    .create(newContact) 
    .then(response => {
      setPersons(persons.concat(response.data));
  })
  setNewName('');
  setNewNumber('');
}
