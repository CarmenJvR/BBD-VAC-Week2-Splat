export class Command {
    type = "";
    param1 = "";
    params2 = [];
    params3 = [];

    constructor(type, param1, params2, params3) {
        this.type = type;
        this.param1 = param1;
        this.params2 = params2;
        this.params3 = params3;
    }

    static walk = 0;
    static turn = 1;
    static if_do_else = 2;
    static repeat_until = 3;
    static not = 4;
    static and = 5;
    static or = 6;
    static is_color = 7;
    static is_tile_ahead = 8;
    static is_tile_current = 9;
    static deposit = 10;
    static reached_end = 11;
    // static function_def_1 = 12;
    // static function_caller_1 = 13;
        
}