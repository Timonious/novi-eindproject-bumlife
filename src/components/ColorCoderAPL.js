import React from "react";

export const ColorCoderAPL = (apl) => {
    console.log('colorcoder wordt uitgevoerd')
    if (apl >= 0 && apl <= 15) {
        return 'green'
    } else if (apl >= 25 && apl <= 30) {
        return 'orange'
    } else if (apl >= 20 && apl <= 25) {
        return 'yellow'
    } else if (apl >= 15 && apl <= 20) {
        return 'yellow-green'
    } else {
        return 'red'
    }
}
