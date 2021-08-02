export class Color {
    static red = 1;
    static yellow = 2;
    static blue = 4;

    static orange = 3;
    static purple = 5;
    static green = 6;

    static grey = 0;
    static goop = 7;

    static mix(color1, color2) {
        return color1 | color2;
    }
}