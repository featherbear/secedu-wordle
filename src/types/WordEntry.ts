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