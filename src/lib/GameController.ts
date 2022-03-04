import words from "./WordParser"
import log from './logger'
import type WordEntry from "src/types/WordEntry"
import type { Readable, Subscriber } from "svelte/store"
import { readable, get } from 'svelte/store'

function chooseWord(ignore?: string[]) {
    let choices = ignore ? words.filter(({ word }) => !ignore.includes(word)) : words
    if (choices.length === 0) throw new Error("No words left to choose")

    return choices[Math.floor(Math.random() * choices.length)]
}

const controller = (new class {
    currentWord: Readable<WordEntry>
    #updateCurrentWord: Subscriber<WordEntry>

    #usedWords: string[]

    constructor() {
        this.currentWord = readable<WordEntry>(null, (update) => {
            this.#updateCurrentWord = update
        })
        this.#usedWords = localStorage.getItem('secedu-worldle.usedWords')?.split(";") ?? []
    }

    newGame() {
        let entry = chooseWord(this.#usedWords)
        log.info("Selected word", entry.word)
        this.#updateCurrentWord(entry)
    }
})

export default controller

globalThis.GiveMeTheAnswer = function () {
    return get(controller.currentWord)?.word
}