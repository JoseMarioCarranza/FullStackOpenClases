const Hello = ({ name, age }) => {
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/JoseMarioCarranza">Aperta</a>
    </div>
  )
}

function App() {

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='José' age={11 + 19} />
      <Footer />
    </div>
  )
}

export default App
