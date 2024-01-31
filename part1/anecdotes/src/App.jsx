import { useState } from 'react'


const Winner = (props) => {
  if (props.most.votes) {
    return (
      <>
      <h1>Anecdote with the most votes</h1>
      <p>{props.most.quote}</p>
      <p>has {props.most.votes} votes</p>
      </>
    )
  } else {
    return (
      <>
      <h1>Anecdote with the most votes</h1>
      <p>No votes have been cast!</p>
      </>
    )
  }
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [most, setMostVotesQuote] = useState({quote: "", votes: 0});


  const handleSelectClick = () => {
    {/*get random value, 'selected' is used as index of 'anecdotes' array*/}
    const newVal = Math.floor(Math.random()*anecdotes.length)
    setSelected(newVal);
  };

  const handleVoteClick = () => {
    {/*create newVal, copy votes array, change vote value at index of 'selected' in the new array, set state*/}
    const newVal = votes[selected] + 1;
    const newVotesArr = [...votes];
    newVotesArr[selected] = newVal;
    setVotes(newVotesArr);
    {/*set state with setMostVotesQuote*/}
    setMostVotesQuote(findMostVotes(newVotesArr));
  }

  function findMostVotes(arr) {
    {/*returns an object to replace state stored in const 'most'*/}
    {/*highestOfVotesIndex finds the index of the highest vote in 'votes'*/}
    let highestOfVotesIndex = arr.indexOf(Math.max(...arr));
    return { quote: anecdotes[highestOfVotesIndex], votes: Math.max(...arr) };
  }



  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleSelectClick} selected={selected}>select anecdote</button>
      </div>
      <Winner most={most} setMostVotesQuote={setMostVotesQuote}/>
    </div>
  );
}

export default App
