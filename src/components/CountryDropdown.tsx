import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type Init = {
    [key: string]: {
        name: string
    }
}

const init: Init = {
    AU: { name: "Australia" },
    CA: { name: "Canada" },
    CL: { name: "Chile" },
    FR: { name: "France" },
    IT: { name: "Italy" },
    NZ: { name: "New Zealand" },
    NO: { name: "Norway" },
    TW: { name: "Taiwan" },
    UK: { name: "United Kingdom" },
    US: { name: "United States" }
}

type DropdownProps = {
    onChange: any;
    value: string | object;
    label: string;
    id: string;
}

const CountryDropdown = (props: DropdownProps) => {
    const { onChange, value, label, id } = props;

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id={id}>Country</InputLabel>
            <Select
                onChange={onChange}
                value={value}
                labelId="country"
                id={id}
                name={id}
                label={label}
                defaultValue={init.NZ.name}
            >
                {Object.entries(init).map(([k, v]: any) =>
                    <MenuItem key={k} value={v.name}>{v.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}
export default CountryDropdown;