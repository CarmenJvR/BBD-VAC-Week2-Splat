export class Color {
    static red = 1;
    static yellow = 2;
    static blue = 4;

    static orange = 3;
    static purple = 5;
    static green = 6;

    static grey = 0;
    static goop = 7;

    static acid = 9;

    // static mix(color1, color2) {
    //     return color1 | color2;
    // }

    static mix(color1, color2) {
        let mixCol = color1 + color2;
        if (color1 == 0 || color2 == 0) {
            return mixCol;
        }
        else if ((color1 == 9 || color2 == 9)) {
            return 9;
        }
        else if (mixCol == 3 || mixCol == 5 || mixCol == 6) {
            return mixCol;
        }
        else {
            return 7;
        }
        // switch(mixCol) {
        //     case 4: if (color1 != 0 || color2 != 0) {return 7}; break;
        // }
    }

}