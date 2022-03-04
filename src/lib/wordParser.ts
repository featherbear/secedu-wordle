import definitions from '../words'
import WordEntry from '../types/WordEntry'

let words: {
    [word: string]: Omit<WordEntry, 'word' | 'ignoreLengthMismatch'> & { length: number }
} = {}

for (let [length, values] of Object.entries(definitions)) {
    for (let entry of values) {
        let { word, ignoreLengthMismatch, ...data } = entry
        if (!word) {
            log.error("Invalid entry", entry)
            continue
        }
        if (word.length !== (<number><unknown>length) && !ignoreLengthMismatch) {
            log.warn("Word", entry.word, "does not match its assigned length")
            continue
        }
        words[entry.word] = {
            ...data,
            length
        }
    }
}
