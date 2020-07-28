// An App component under which all other components will be added

function App (props) {
  return (
    <div>
      <Team name="BULLS" logo="https://secure.img1-fg.wfcdn.com/im/72952215/compr-r85/5286/52865438/nba-chicago-bulls-mascot-36-in-x-33-in-non-slip-indoor-only-door-mat.jpg" />
      <Team name="NETS" logo="https://sportsteamhistory.com/wp-content/uploads/2020/03/new_jersey_nets.png" />
    </div>
  )
}
class Team extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shotsTaken: 0,
      score: 0
    }

    // this.shotSound = new Audio(/Users/michaelbartosz/Music/iTunes/iTunes Media/Music/Unknown Artist/Unknown Album/Swish+2.wav)
  }

  shotHandler = () => {
    let score = this.state.score
    // this.shotSound.play()
    if (Math.random() > 0.5) {
      score += 1

      // setTimeout(() => {
      // this.scoreSound.play()
      // }, 200)

    }
    this.setState((state, props) => ({
      shotsTaken: state.shotsTaken + 1,
      score
    }))
  }

  render() {
    let shotPercentageDiv

    if (this.state.shotsTaken) {
      let shotPercentage = Math.round((this.state.score / this.state.shotsTaken) * 100)
      shotPercentageDiv = (
        <div>
          <h3>Shooting %: {shotPercentage}</h3>
        </div>
      )
    }

    return (<div>
      <img src={this.props.logo} width="175px" />
      <h1>{this.props.name}</h1>
      <button onClick={this.shotHandler}>SHOOT !</button>
      <h2>Shots Taken {this.state.shotsTaken}</h2>
      <h2>SCORE  {this.state.score}</h2>
      {shotPercentageDiv}

    </div>)
  }
}



// Render the App
ReactDOM.render(
  <App />,
  document.getElementById('root')

)