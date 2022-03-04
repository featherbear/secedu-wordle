import App from './App.svelte'
import './lib/logger'

const app = new App({
  target: document.getElementById('app')
})

export default app
