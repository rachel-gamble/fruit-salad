import { Player } from "./Models/Player.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"
// import { wordList } from "./WordList.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Player').Player[]} */
  players = loadState('players', [Player])

  activePlayer = null

  gameRunning = false

  fruits = ['pear', 'apple', 'watermelon', 'strawberry', 'banana', 'raspberry', 'grape', 'lemon', 'kiwi', 'mango', 'avocado', 'peach', 'cherry', 'plum', 'orange', 'lychee', 'elderberry', 'guava', 'lime', 'blueberry', 'apricot', 'blackberry', 'grapefruit', 'papaya',]
  activeFruit = null
}


export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
