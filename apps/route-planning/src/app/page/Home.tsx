import { useState } from "react";
import Airports from "./Airports";
import { client } from "../connectToServer";

export default function Home():JSX.Element{
    return (
        <>
            <Airports/>
        </>
    )
}