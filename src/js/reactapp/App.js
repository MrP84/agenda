import React, {Component} from "react";

import Calendar from "./components/Calendar";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <div id="logo">
                        <span>Agenda</span>
                    </div>
                </header>
                <main>
                    <Calendar />
                </main>
            </div>
        );
    }
}

export default App;