import words from "./WordParser"
import log from './logger'

function chooseWord(ignore?: string[]) {
    let choices = ignore ? words.filter(({ word }) => !ignore.includes(word)) : words
    if (choices.length === 0) throw new Error("No words left to choose")

    return choices[Math.floor(Math.random() * choices.length)]
}

const controller = (new class {
    currentWord: string
    #usedWords: string[]

    constructor() {
        this.currentWord = null
        this.#usedWords = localStorage.getItem('secedu-worldle.usedWords')?.split(";") ?? []
    }

    newGame() {
        let word = chooseWord(this.#usedWords)
        log.info("Selected word", word.word)
        this.currentWord = word.word
    }

})

export default controller

globalThis.GiveMeTheAnswer = function () {
    return controller.currentWord
}