import { type subscription } from "../subscription";

export const subs = [{
            name: "netflix",
            // color: "#ffAAaa"
            color : "#ff1b18",
            nextPay:[24],
            cost: 5
        } as subscription,
        {
            name: "prime video",
            nextPay: [1,2],
            color: "#aaff00",
            cost: 3.45
        } as subscription,
        {
            name: "azuza",
            nextPay: [1,18],
            color: "#ffAAaa",
            cost: 7.32
        } as subscription
    ]