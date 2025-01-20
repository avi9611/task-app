import React from "react";
import { useGlobalContext } from "@/app/contextApi";
import { MainComp } from "../../TaskManager";

function MainScreen () {
    const { mobileView } = useGlobalContext();
    const { isMobileView } = mobileView;
    return (
        <div className={`flex gap-3 ${isMobileView ? "flex-col" : "flex-row"}`}>
            <div className={`${isMobileView ? " ":"w-full"} border`}>
                <MainComp />
            </div>
        </div>
    );
}

export default MainScreen;