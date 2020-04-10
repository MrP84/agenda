import React, {Component} from "react";

import BookerForm from "./BookerForm";
import students from '../example'

class Booker extends Component {
    state = {
        isDisplayed: false
    }

    render() {
        const {selectedDate, selectedOption} = this.props;
        return (
            <div>
                <BookerForm
                    selectedDate={selectedDate}
                    isDisplayed={this.state.isDisplayed}
                    selectedOption={selectedOption} />
            </div>
        )
    }

}

export default Booker;