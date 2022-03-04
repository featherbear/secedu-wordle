
import log from './logger'
import type WordEntry from "../types/WordEntry"
import * as WordData from "../data/WordData"

const words: (Omit<WordEntry, 'forceLength'> & { length: number })[] = []
let seen = new Set()
for (let entry of WordData.words) {
    let word = ((typeof entry === 'string') ? entry : entry.word).trim().toUpperCase()

    if (seen.has(word)) {
        log.warn("Ignore repeated word", word)
        continue
    }

    if (!Object.keys(WordData.guesses)
        .map((s) => Number.parseInt(s))
        .includes(word.length) && !entry?.['forceLength']) {
        log.warn(word, 'has an invalid length, or forceLength not set')
        continue
    }


    words.push({
        ...(typeof entry === 'string') ? { word: entry } : { ...entry },
        length: entry?.['forceLength'] ?? word.length
    })

    seen.add(word)
}

export default words