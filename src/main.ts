import './lib/logger'
import App from './App.svelte'

if (location.hostname !== 'localhost') {
  window['fathom'] = {
    q: [
      ['set', 'siteId', 'NEQTU'],
      ['trackPageview']
    ]
  }

  let o = document.createElement('script')
  o.async = true;
  o.src = '//ss.featherbear.cc/tracker.js';
  o.id = 'fathom-script';
  
  let m = document.getElementsByTagName('script')[0];
  m.parentNode.insertBefore(o, m)
}

const app = new App({
  target: document.getElementById('app')
})

export default app
