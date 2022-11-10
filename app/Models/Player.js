// import import { generateId } from "../Utils/generateId.js"

import { appState } from "../AppState.js"

export class Player {
	constructor(data) {
		this.name = data.name
		this.score = data.score || 0
		this.highScore = data.highScore || 0
	}

	get ActiveTemplate() {
		return `
        <div>${this.name}</div>
    	<span>Score: ${this.score}</span>
        <span>High Score: ${this.highScore}</span>
        `
	}

	get ListTemplate() {
		if (appState.activePlayer == this) {
			return `
			<div class="player">
				<i class="mdi mdi-star"></i>
				<div class="flex-grow-1">${this.name}</div>
				<div>HighScore: ${this.highScore}</div>
			</div>`
		} else {
			return `
			<div class="player">			
				<div class="flex-grow-1">${this.name}</div>
				<div>HighScore: ${this.highScore}</div>
			</div>`
		}
	}
}