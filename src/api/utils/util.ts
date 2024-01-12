import type {dateString} from "@/api/types/vk";
function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
    let color1 = rgbColor1;
    let color2 = rgbColor2;
    let fade = fadeFraction;

    // Do we have 3 colors for the gradient? Need to adjust the params.
    if (rgbColor3) {
        fade = fade * 2;

        // Find which interval to use and adjust the fade percentage
        if (fade >= 1) {
            fade -= 1;
            color1 = rgbColor2;
            color2 = rgbColor3;
        }
    }

    let diffRed = color2.red - color1.red;
    let diffGreen = color2.green - color1.green;
    let diffBlue = color2.blue - color1.blue;

    let gradient = {
        red: parseInt(String(Math.floor(color1.red + (diffRed * fade))), 10),
        green: parseInt(String(Math.floor(color1.green + (diffGreen * fade))), 10),
        blue: parseInt(String(Math.floor(color1.blue + (diffBlue * fade))), 10),
    };

    return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
}

export function gradRed2Green(fadeFraction) {
    let lowColor = {
        red: 217,
        green: 83,
        blue: 79
    };
    let mediumColor = {
        red: 240,
        green: 173,
        blue: 78
    };
    let highColor = {
        red: 92,
        green: 184,
        blue: 91
    };
    return colorGradient(fadeFraction, lowColor, mediumColor, highColor)
}


export function bdate2Date(bdate: dateString): Date {
    const [d, m, y] = bdate.split('.')
    return  new Date(+y, +m - 1, +d - 1) // нумерация месяцев начинается с нуля

}
export function countAge(bdate: dateString | undefined): number | null {
    if (!bdate) return null
    const date = bdate2Date(bdate)
    const now = new Date()
    return (now.getFullYear() - date.getFullYear())
        + (now >= new Date(now.getFullYear(), date.getMonth(), date.getDate())
            ? 0
            : -1)
}

