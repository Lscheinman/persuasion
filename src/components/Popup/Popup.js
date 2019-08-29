import React from 'react';
import './Popup.css'

// TODO create resource and run use cases

const popup = (props) => {
        return(
            <div className='popup'>
                <div className='popup_inner'>
                    <h3>Create Resource</h3>
                    <h6>Type (ASCOPE)</h6>
                    <form onSubmit={props.create}>
                        <select name='resource_type'>
                            <option value='Area'>Area</option>
                            <option value='Structure'>Structure</option>
                            <option value='Capability'>Capability</option>
                            <option value='Organization'>Organization</option>
                            <option value='Person'>Person</option>
                            <option value='Event'>Event</option>
                        </select>
                        <h6>Domain (CRIMEFILLED)</h6>
                        <select name='resource_category'>
                            <option value='Cyber'>Cyber</option>
                            <option value='Research'>Research</option>
                            <option value='Information'>Information</option>
                            <option value='Military'>Military</option>
                            <option value='Economic'>Economic</option>
                            <option value='Financial'>Financial</option>
                            <option value='Intelligence'>Information</option>
                            <option value='Legal'>Legal</option>
                            <option value='Law Enforcement'>Law Enforcement</option>
                            <option value='Environmental'>Diplomatic</option>
                            <option value='Diplomatic'>Law Enforcement</option>
                        </select>
                        <h6>Name</h6>
                        <input name='resource_name' type='text'/>
                        <button>Create</button>
                    </form>
                    <button onClick={props.close}>Close</button>

                </div>
            </div>
        )
    };

export default popup;