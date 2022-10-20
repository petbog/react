import React, { Suspense } from "react";

export const withSuspens = (Component) => {
    return (props) => {
        return <Suspense fallback={<div>Loading...</div>}>
            <Component{...props}/>
          </Suspense> 
    }
}

