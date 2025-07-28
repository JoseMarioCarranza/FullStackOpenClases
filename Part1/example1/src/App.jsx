const Hello = ({ name, age }) => {
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
    </div>
  )
}

function App() {

  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='José' age={11 + 19} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App
