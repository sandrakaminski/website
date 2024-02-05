import { JSX } from "react";

import { useQuery } from "@tanstack/react-query";
import { Entry } from "contentful";
import { useNavigate } from "react-router-dom";

import Detail from "./Detail";
import Summary from "./Summary";
import type { ProfileType } from "@/types";

export type BlockProps = {
    contentEntry: Entry<ProfileType>;
    detail?: boolean;
};

const Profile = (props: BlockProps): JSX.Element => {
    const { contentEntry, detail } = props;
    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate(`/profile/${contentEntry.fields.slug}`, {
            state: { data: contentEntry.fields.slug },
        });
        return contentEntry.fields.slug;
    };
    useQuery({
        queryKey: [contentEntry.fields.slug],
        queryFn: navigateToProfile,
    });

    return (
        <>
            {detail === true ? (
                <Detail contentEntry={contentEntry} />
            ) : (
                <Summary contentEntry={contentEntry} />
            )}
        </>
    );
};

export default Profile;
