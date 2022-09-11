import React from "react";
import classes from './Card_profile.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false,
        })
    }


    render() {
        return (
            <div className={classes.status__box}>
                {!this.state.editMode &&
                    <div className="">
                        <div className="" onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</div>
                    </div>
                }
                {this.state.editMode &&
                    < div className="">
                        <input autoFocus={true} onBlur={this.deActivateEditMode.bind(this)} type="text" value={this.props.status} />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;