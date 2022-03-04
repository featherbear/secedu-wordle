import words from "./WordParser"
import log from './logger'
import type WordEntry from "src/types/WordEntry"
import type { Readable, Subscriber } from "svelte/store"
import { readable } from 'svelte/store'

function chooseWord(ignore?: string[]) {
    let choices = ignore ? words.filter(({ word }) => !ignore.includes(word)) : words
    if (choices.length === 0) throw new Error("No words left to choose")

    return choices[Math.floor(Math.random() * choices.length)]
}

const controller = (new class {
    #_currentWord: WordEntry
    #_updateCurrentWordStore: Subscriber<typeof this.currentWord>
    currentWordStore: Readable<typeof this.currentWord>

    #usedWords: string[]

    constructor() {
        this.#_currentWord = null
        this.currentWordStore = readable<typeof this.currentWord>(this.#_currentWord, (update) => {
            this.#_updateCurrentWordStore = update
        })
        this.#usedWords = localStorage.getItem('secedu-worldle.usedWords')?.split(";") ?? []
    }

    newGame() {
        let entry = chooseWord(this.#usedWords)
        log.info("Selected word", entry.word)
        this.currentWord = entry
    }

    get currentWord() {
        return this.#_currentWord
    }
    set currentWord(entry: WordEntry) {
        this.#_currentWord = entry
        this.#_updateCurrentWordStore?.(entry)
    }
})

export default controller

globalThis.GiveMeTheAnswer = function () {
    return controller.currentWord?.word
}