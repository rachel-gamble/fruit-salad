import { appState } from "../AppState.js";
import { Player } from "../Models/Player.js";
import { saveState } from "../Utils/Store.js";


function _endGame() {
    appState.activeFruit = ''
    appState.gameRunning = false
    appState.activePlayer.score = 0
    appState.activePlayer = null
    appState.emit('players')
    saveState('players', appState.players)
}

class PlayersService {
    constructor() {
        console.log('player service is working')

    }

    addPlayer(name) {
        let player = ''
        let duplicate = appState.players.find(p => p.name == name)
        if (duplicate != undefined) {
            player = duplicate
        } else {
            player = new Player({ name })
            appState.players = [...appState.players, player]
        }
        console.log(player);
        appState.activePlayer = player
        this.startGame()
    }

    submitWord(word) {
        if (appState.gameRunning) {
            if (word == appState.activeFruit) {
                appState.activeFruit = appState.fruits.at(Math.floor(Math.random() * appState.fruits.length))
                appState.activePlayer.score++
                if (appState.activePlayer.highScore <= appState.activePlayer.score) {
                    appState.activePlayer.highScore = appState.activePlayer.score
                }
                appState.emit("activePlayer")
                appState.emit('players')
            }
        }
    }


    startGame() {

        appState.gameRunning = true
        let timer = document.getElementById("timerProgress")
        let label = document.getElementById("timeLeftLabel")
        document.getElementById("wordEntry").focus()
        let roundTime = 15000
        appState.activeFruit = appState.fruits.at(Math.floor(Math.random() * appState.fruits.length))
        let interval = setInterval(() => {
            roundTime -= 1000
            label.innerText = `Time Left: ${roundTime / 1000}`
            let percentage = Math.floor((roundTime / 15000) * 100)
            timer.setAttribute("value", percentage)
            if (roundTime <= 0) {
                clearInterval(interval)
                _endGame()
            }
        }, 1000)
    }


}

export const playersService = new PlayersService()