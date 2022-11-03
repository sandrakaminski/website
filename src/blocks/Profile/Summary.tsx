import React from "react";
import Card from "@mui/material/Card";


const Summary = ({ content }: any) => {
    return (
        <Card>
            {content &&
                "Hello world"
            }
        </Card>
    )
}
export default Summary; 