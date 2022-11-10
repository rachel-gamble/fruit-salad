import { appState } from "../AppState.js"
import { Player } from "../Models/Player.js"
import { playersService } from "../Services/PlayersService.js"
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";

function _drawPlayers() {
	let template = ''
	appState.players.sort((a, b) => b.highScore - a.highScore)
	appState.players.forEach(p => template += p.ListTemplate)
	setHTML("playerList", template)
}

function _drawActivePlayer() {
	setHTML("currPlayer", appState.activePlayer.ActiveTemplate)
}

function _drawActiveFruit() {
	setText("activeFruit", appState.activeFruit)
}



export class PlayersController {

	constructor() {
		appState.on('players', _drawPlayers)
		appState.on('activePlayer', _drawActivePlayer)
		appState.on('activeFruit', _drawActiveFruit)
		_drawPlayers()
	}


	submitWord() {
		window.event.preventDefault()
		let word = window.event.target.wordEntry.value
		playersService.submitWord(word)
		window.event.target.reset()
	}

	submitPlayer() {
		window.event.preventDefault()
		let name = window.event.target.nameEntry.value
		console.log(name);
		playersService.addPlayer(name)
		window.event.target.reset()
	}

	setActivePlayer() {
		playersService.setActivePlayer(Name)
	}
}