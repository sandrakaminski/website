import React from "react";
import Card from "@mui/material/Card";


const Summary = ({ content }: any) => {
    return (
        <Card>
            {content &&
                <p>
                    {content.fields.name}
                </p>
            }
        </Card>
    )
}
export default Summary; 