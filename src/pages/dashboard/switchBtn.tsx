import React from 'react';
import { setTheme } from '../../features/app';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';

export default function Switches() {
    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        checkedA: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (state.checkedA){
            setState({ ...state, [event.target.name]: event.target.checked });
            return dispatch(setTheme(true))
        }
        setState({ ...state, [event.target.name]: event.target.checked });
        dispatch(setTheme(false))
    };

    return (
        <div>
            <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </div>
    );
}
