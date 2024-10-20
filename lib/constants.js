export const status = [
    // not started
    { text: "Not started", color: "neutral" },
    // ongoing
    { text: "Ongoing", color: "blue" },
    // complete
    { text: "Finished", color: "green" },
    // halted
    { text: "Halted", color: "red" }

]
export function statusColor(st) {
    for (let i = 0; i < 4; i++) {
        if (status[i].text === st) {
            return status[i].color
        }
    }
}

export const ROLES = {
    0: "ADMIN",
    1: "MEMBER",
    2: "VIEWER"
}

export const PROD = "https://16.171.140.223:3000"
export const LOCAL = "http://192.168.1.8:3000"