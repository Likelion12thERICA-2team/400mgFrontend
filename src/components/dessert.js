import React from "react";
import Round26Button from "./round26Button";

const Dessert = () => {

    return (
        <>
            <div className="flex flex-row gap-[8px] mt-[15px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"초콜릿"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"녹차"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"홍차"} />
            </div>
        
            <div className="flex flex-row gap-[8px] mt-[12px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"우롱차"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"콤부차"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"콜라"} />
            </div>
            
            <div className="flex flex-row gap-[8px] mt-[12px] mb-[18px]">
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"아이스크림"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"커피사탕"} />
                <Round26Button backgroundColor={"#EBEBEB"} color={"black"} content={"진통제"} />
            </div>
        </>
    );


};

export default Dessert;