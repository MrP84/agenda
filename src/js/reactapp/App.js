import React, {Component} from "react";

import View from "./components/View";
import Calendar from "./components/Calendar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption:'',
        }
    }



    render() {
        return (
            <div className="App">
                <header>

                </header>
                <main>
                    <Calendar />
                </main>
            </div>
        );
    }
}

export default App;