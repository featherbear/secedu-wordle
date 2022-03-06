import type { SvelteComponent } from "svelte"

export interface CallbackContext {
    /**
     * Correct word
     */
    word: string
    /**
     * Function to reveal a word
     */
    revealWord: (word?: string) => void

    /**
     * Add a new component to the current state
     * for garbage collection during new game resets
     */
    attachComponentToCurrentState: (component: SvelteComponent) => void
}

type WordEntry = {
    /**
     * The word
     */
    word: string

    /**
     * Force word length
     */
    forceLength?: number

    /**
     * Callback for when the game is over
     */
    onComplete?: (this: CallbackContext) => void

    /**
     * Callback for when the game is won
     * @returns Should the default routine still be called
     */
    onWin?: (this: CallbackContext) => boolean

    /**
     * Callback for when the game is lost
     * @returns Should the default routine still be called
     */
    onLose?: (this: CallbackContext) => boolean
}
export default WordEntry