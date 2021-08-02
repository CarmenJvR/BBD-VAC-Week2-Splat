// import { Command } from "./models/Command.js";
// import * as Command from "../models/command.js"
/*
Blockly.defineBlocksWithJsonArray([

    {
        "type": "movement",
        "message0": "Play %1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
              ["Walk", "new Command(Command.walk)"],
              
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 355,
    }
]);

// BLOCK GENERATORS
Blockly.JavaScript['movement'] = function(block) {
    let value = '\''+ block.getFieldValue('VALUE') + '\'';
    return 'new Command(Command.walk);';
};*/
Blockly.defineBlocksWithJsonArray([
	{
	"type": "start",
	"message0": "START %1",
	"args0": [
	  {
		"type": "input_statement",
		"name": "code",
		"align": "CENTRE"
	  }
	],
	"inputsInline": false,
	"colour": 270,
	"tooltip": "Begin",
	"helpUrl": ""
  },
  {
	"type": "walk",
	"message0": "walk",
	"previousStatement": null,
	"nextStatement": null,
	"colour": 135,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "turn",
	"message0": "Turn %1",
	"args0": [
	  {
		"type": "field_dropdown",
		"name": "turn",
		"options": [
		  [
			"Left",
			"Turn.left"
		  ],
		  [
			"Right",
			"Turn.right"
		  ],
		  [
			"Back",
			"Turn.back"
		  ]
		]
	  }
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": 135,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "deposit",
	"message0": "Deposit %1",
	"args0": [
	  {
		"type": "field_input",
		"name": "value",
		"text": ""
	  }
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": 135,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "if_do_else",
	"message0": "If %1 then %2 else %3",
	"args0": [
	  {
		"type": "input_value",
		"name": "condition"
	  },
	  {
		"type": "input_statement",
		"name": "do_code"
	  },
	  {
		"type": "input_statement",
		"name": "else_code"
	  }
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": 0,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "repeat_until",
	"message0": "Repeat Until %1 do %2",
	"args0": [
	  {
		"type": "input_value",
		"name": "condition"
	  },
	  {
		"type": "input_statement",
		"name": "code"
	  }
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": 0,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "not",
	"message0": "Not %1",
	"args0": [
	  {
		"type": "input_value",
		"name": "condition"
	  }
	],
	"output": null,
	"colour": 230,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "and",
	"message0": "%1 And %2",
	"args0": [
	  {
		"type": "input_value",
		"name": "condition1"
	  },
	  {
		"type": "input_value",
		"name": "condition2"
	  }
	],
	"inputsInline": true,
	"output": null,
	"colour": 230,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "or",
	"message0": "%1 Or %2",
	"args0": [
	  {
		"type": "input_value",
		"name": "condition1"
	  },
	  {
		"type": "input_value",
		"name": "condition2"
	  }
	],
	"inputsInline": true,
	"output": null,
	"colour": 230,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "is_color",
	"message0": "Is player color %1 ?",
	"args0": [
	  {
		"type": "field_dropdown",
		"name": "value",
		"options": [
		  [
			"Red",
			"1"
		  ],
		  [
			"Yellow",
			"2"
		  ],
		  [
			"Blue",
			"4"
		  ],
		  [
			"Orange",
			"3"
		  ],
		  [
			"Purple",
			"5"
		  ],
		  [
			"Green",
			"6"
		  ],
		  [
			"Grey",
			"0"
		  ],
		  [
			"Goop",
			"7"
		  ]
		]
	  }
	],
	"output": "CONDITION",
	"colour": 315,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "is_tile_ahead",
	"message0": "Is Tile %1 Ahead?",
	"args0": [
	  {
		"type": "field_dropdown",
		"name": "value",
		"options": [
		  [
			"Empty",
			"Empty"
		  ],
		  [
			"Wall",
			"Wall"
		  ],
		  [
			"Splat",
			"Splat"
		  ],
		  [
			"Mixer",
			"Mixer"
		  ],
		  [
			"Bank",
			"Bank"
		  ],
		  [
			"Junction",
			"Junction"
		  ],
		  [
			"Gate",
			"Gate"
		  ]
		]
	  }
	],
	"output": "CONDITION",
	"colour": 315,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "is_tile_current",
	"message0": "Is Current Tile %1 ?",
	"args0": [
	  {
		"type": "field_dropdown",
		"name": "value",
		"options": [
		  [
			"Empty",
			"Empty"
		  ],
		  [
			"Wall",
			"Wall"
		  ],
		  [
			"Splat",
			"Splat"
		  ],
		  [
			"Mixer",
			"Mixer"
		  ],
		  [
			"Bank",
			"Bank"
		  ],
		  [
			"Junction",
			"Junction"
		  ],
		  [
			"Gate",
			"Gate"
		  ]
		]
	  }
	],
	"output": "CONDITION",
	"colour": 315,
	"tooltip": "",
	"helpUrl": ""
  },
  {
	"type": "reached_end",
	"message0": "Reached End",
	"output": "CONDITION",
	"colour": 315,
	"tooltip": "",
	"helpUrl": ""
  }]);
  
Blockly.JavaScript["start"] = function(block) {

	let code = Blockly.JavaScript.statementToCode(block, "code", Blockly.JavaScript.ORDER_NONE);
	let output = `[${code}]`;
	
	return output;
}

Blockly.JavaScript["walk"] = function(block) {

	return `new Command(Command.walk), `;
}

Blockly.JavaScript["turn"] = function(block) {

	let value = block.getFieldValue("turn");

	return `new Command(Command.turn, ${value}), `;
}

Blockly.JavaScript["if_do_else"] = function(block) {

	let condition = Blockly.JavaScript.statementToCode(block, "condition", Blockly.JavaScript.ORDER_NONE);
	let do_code = Blockly.JavaScript.statementToCode(block, "do_code", Blockly.JavaScript.ORDER_NONE);
	let else_code = Blockly.JavaScript.statementToCode(block, "else_code", Blockly.JavaScript.ORDER_NONE);

	if (else_code === "") {
		return `new Command(Command.if_do_else, ${condition}, [${do_code}]), `;

	} else {
		return `new Command(Command.if_do_else, ${condition}, [${do_code}], [${else_code}]), `;
	}
}

Blockly.JavaScript["repeat_until"] = function(block) {

	let condition = Blockly.JavaScript.statementToCode(block, "condition", Blockly.JavaScript.ORDER_NONE);
	let code = Blockly.JavaScript.statementToCode(block, "code", Blockly.JavaScript.ORDER_NONE);

	return `new Command(Command.repeat_until, ${condition}, [${code}]), `;
}

Blockly.JavaScript["reached_end"] = function(block) {

	return `new Command(Command.reached_end)`;
}

Blockly.JavaScript["is_color"] = function(block) {

	let value = block.getFieldValue("value");
	return `new Command(Command.is_color, ${value})`;
}

Blockly.JavaScript["not"] = function(block) {

	let condition = Blockly.JavaScript.statementToCode(block, "condition", Blockly.JavaScript.ORDER_NONE);

	return `new Command(Command.not, ${condition})`;
}

Blockly.JavaScript["and"] = function(block) {

	let condition1 = Blockly.JavaScript.statementToCode(block, "condition1", Blockly.JavaScript.ORDER_NONE);
	let condition2 = Blockly.JavaScript.statementToCode(block, "condition2", Blockly.JavaScript.ORDER_NONE);

	return `new Command(Command.and, ${condition1}, [${condition2}])`;
}

Blockly.JavaScript["or"] = function(block) {

	let condition1 = Blockly.JavaScript.statementToCode(block, "condition1", Blockly.JavaScript.ORDER_NONE);
	let condition2 = Blockly.JavaScript.statementToCode(block, "condition2", Blockly.JavaScript.ORDER_NONE);

	return `new Command(Command.or, ${condition1}, [${condition2}])`;
}

Blockly.JavaScript["is_tile_ahead"] = function(block) {

	let value = block.getFieldValue("value");
	return `new Command(Command.is_tile_ahead, "${value}")`;
}

Blockly.JavaScript["is_tile_current"] = function(block) {

	let value = block.getFieldValue("value");
	return `new Command(Command.is_tile_current, "${value}")`;
}

Blockly.JavaScript["deposit"] = function(block) {

	let value = block.getFieldValue("value");
	return `new Command(Command.deposit, ${value}), `;
}