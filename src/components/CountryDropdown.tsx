import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type Init = {
    [key: string]: {
        name: string;
        code: number;
    }
}

const init: Init = {
    AU: { name: "Australia", code: 0 },
    CA: { name: "Canada", code: 1 },
    CL: { name: "Chile", code: 2 },
    FR: { name: "France", code: 3 },
    IT: { name: "Italy", code: 4 },
    NZ: { name: "New Zealand", code: 5 },
    NO: { name: "Norway", code: 6 },
    TW: { name: "Taiwan", code: 7 },
    UK: { name: "United Kingdom", code: 8 },
    US: { name: "United States", code: 9 },
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
                defaultValue={init.NZ}
            >
                {Object.entries(init).map(([k, v]: any) =>
                    <MenuItem key={v.code} value={k}>{v.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}
export default CountryDropdown;