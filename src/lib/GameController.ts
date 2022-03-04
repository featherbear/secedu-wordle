import words from "./WordParser"
import log from './logger'
import type { Readable, Subscriber } from "svelte/store"
import { readable, get } from 'svelte/store'
import { attempts } from "../data/WordData"

function chooseWord(ignore?: string[]) {
    let choices = ignore ? words.filter(({ word }) => !ignore.includes(word)) : words
    if (choices.length === 0) throw new Error("No words left to choose")

    return choices[Math.floor(Math.random() * choices.length)]
}

const controller = (new class {
    currentWord: Readable<typeof words[number]>
    #updateCurrentWord: Subscriber<typeof words[number]>

    guesses: Readable<string[]>
    #updateGuesses: Subscriber<string[]>

    #usedWords: string[]

    gameInProgress: Readable<boolean>
    #updateGameInProgress: Subscriber<boolean>

    constructor() {
        this.currentWord = readable<typeof words[number]>(null, (update) => {
            this.#updateCurrentWord = update
        })

        this.guesses = readable<string[]>([], (update) => {
            this.#updateGuesses = update
        })

        this.#usedWords = localStorage.getItem('secedu-worldle.usedWords')?.split(";") ?? []

        this.gameInProgress = readable<boolean>(false, (update) => {
            this.#updateGameInProgress = update
        })
    }

    newGame() {
        this.#updateGuesses?.([])

        let entry = chooseWord(this.#usedWords)
        log.info("Selected word", entry.word)
        this.#updateCurrentWord?.(entry)

        this.#updateGameInProgress(true)
    }

    tryWord(guess: string): boolean | null {
        if (!get(this.gameInProgress)) return

        let currentWord = get(this.currentWord)

        if (currentWord.length != guess.length) return null

        this.#updateGuesses([...get(this.guesses), guess])



        log.info("Tried word", guess)
        if (currentWord.word == guess) {
            this.#updateGameInProgress(false)
            return true
        } else {
            if (attempts[currentWord.length] == get(this.guesses).length) {
                this.#updateGameInProgress(false)
                return false
            }
            return null
        }
    }
})

export default controller

globalThis.GiveMeTheAnswer = function () {
    return get(controller.currentWord)?.word
}