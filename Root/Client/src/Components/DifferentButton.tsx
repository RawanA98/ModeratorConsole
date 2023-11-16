import React from "react";

interface ActionsListProps {
    refetch: any;
}

export default function DifferenButton({refetch}: ActionsListProps) {

    return <button className="btn btn-outline-secondary" onClick={() =>refetch()}> Skip </button>
}
