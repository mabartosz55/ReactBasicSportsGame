// An App component under which all other components will be added

function ScoreBoard(props) {
  return (
    <div className="ScoreBoard">
      <div className="teamStats">
        <h3>HOME TEAM</h3>
        <h3>{props.homeTeamStats.score}</h3>
      </div>

      <h3>SCOREBOARD</h3>

      <div className="teamStats">
        <h3>VISITORS</h3>
        <h3>{props.visitingTeamStats.score}</h3>
      </div>
    </div>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0
      },

      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }
    this.shotSound = new Audio("./assets/tree.mp3")
    this.scoreSound = new Audio("./assets/Swish+2.mp3")
  }

  shoot = (team) => {
    let teamStatsKey = `${team}TeamStats`
    let score = this.state[teamStatsKey].score
    this.shotSound.play()

    if (Math.random() > 0.5) {
      score += 1

      setTimeout(() => {
        this.scoreSound.play()
      }, 200)

    }
    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score
      }
    }))
  }

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }))

  }

  render() {
    return (
      <div className="Game">

        <ScoreBoard
          visitingTeamStats={this.state.visitingTeamStats}
          homeTeamStats={this.state.homeTeamStats}
        />

        <h1>Welcome to {this.props.venue}</h1>
        <div className="stats">

          <Team name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.shoot("home")} />

          <div className="versus">
            <h1>VS.</h1>
            <div>
              <strong>Resets: </strong> {this.state.resetCount}
              <button onClick={this.resetGame}>Game Resets</button>
            </div>
          </div>

          <Team name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.shoot("visiting")} />
        </div>
      </div>
    )
  }

}

function App(props) {
  let Bulls = {
    name: "Chicago Bulls",
    logoSrc: "https://secure.img1-fg.wfcdn.com/im/72952215/compr-r85/5286/52865438/nba-chicago-bulls-mascot-36-in-x-33-in-non-slip-indoor-only-door-mat.jpg"
  }

  let Nets = {
    name: "New Jersey Nets",
    logoSrc: "https://sportsteamhistory.com/wp-content/uploads/2020/03/new_jersey_nets.png"
  }

  let Knicks = {
    name: "New York Knicks",
    logoSrc: "https://cdn.clipart.email/40ffcdf4821d71c8b9079ffb3bf7e485_fichierny-knicks-logo-2011png-wikipdia_678-560.png"
  }

  let Lakers = {
    name: " Los Angles Lakers",
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/291px-Los_Angeles_Lakers_logo.svg.png"
  }

  return (
    <div className="App" >
      < Game
        venue="the United Center"
        homeTeam={Bulls}
        visitingTeam={Nets} />
      < Game
        venue="the Staples Center"
        homeTeam={Lakers}
        visitingTeam={Knicks} />
    </div >
  )
}

function Team(props) {

  let shotPercentageDiv

  if (props.stats.shots) {
    let shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
    shotPercentageDiv = (
      <div>
        <h3>Shooting %: {shotPercentage}</h3>
      </div>
    )
  }

  return (<div>
    <img src={props.logo} width="400px" />
    <h1>{props.name}</h1>
    <button onClick={props.shotHandler}>SHOOT !</button>
    <h2>Shots Taken {props.stats.shots}</h2>
    <h2>SCORE  {props.stats.score}</h2>
    {shotPercentageDiv}

  </div>)
}


// Render the App
ReactDOM.render(
  <App />,
  document.getElementById('root')

)