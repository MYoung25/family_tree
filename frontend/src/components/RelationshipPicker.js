import { useState, useEffect } from 'react';
import Axios from 'axios'
import {
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';

function RelationshipPicker ({ field, self, multiple, ...props }) {
    const [values, setValues] = useState([]);
    const [valueSelected, setValueSelected] = useState((self && self[field] && self[field]._id) || (multiple ? [] : ''));

    useEffect(() => {
        async function fetchData() {
            const response = await Axios.get(`/person/exclude/${self._id}`);
            setValues(response.data);
            const selected = await Axios.get(`/person/${self._id}`);
            if (selected.data[field]) {
                setValueSelected(selected.data[field]._id ? selected.data[field]._id : selected.data[field].map(item => item._id));
            }
        }

        if (self._id) {
            fetchData();
        }
    }, [self._id, field])

    return (
        values.length === 0 ? ''
        : <div>
            <InputLabel style={{ textTransform: 'capitalize' }}>{field}</InputLabel>
            <Select
                {...props}
                label={field}
                value={valueSelected}
                onChange={event => {
                    setValueSelected(event.target.value)
                    props.onChange({ [field] : event.target.value})
                }}
                multiple={multiple}
                fullWidth
            >
                {
                    values.map(v => (
                        <MenuItem key={v._id} value={v._id}>
                            { `${v.firstName} ${v.lastName}` }
                        </MenuItem>
                    ))
                }
            </Select>
        </div>
    );


}

export default RelationshipPicker;