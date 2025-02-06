import React from "react";
import { InfiniteScroll } from "src/shared/infiniteScroll/Infinitescroll";


export const InfiniteScrollExample = () => {
    const numbers = [1,2,3,4,5]

    return (
        <InfiniteScroll
        
        >
            {
                numbers.map((el, index) => <div key={index} style={{width: '300px', height: '400px', "marginBottom": '2rem', backgroundColor: 'azure'}}>
                    {el}
                </div>)
            }
        </InfiniteScroll>
    )
}