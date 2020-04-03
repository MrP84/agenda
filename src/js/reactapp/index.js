import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const MyComponent = () => (
  <div>
    <App />
  </div>

)

ReactDOM.render(<MyComponent />, document.getElementById('app'))
