export interface CallbackContext {
    /**
     * Correct word
     */
    word: string
    /**
     * Function to reveal a word
     */
    revealWord: (word?: string) => void
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
     * @returns Should the default routine still be called
     */
    onComplete?: (this: CallbackContext) => boolean
    
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