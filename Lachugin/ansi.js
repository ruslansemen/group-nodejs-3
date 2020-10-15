const ansi = require("ansi");

const cursor = ansi(process.stdout);

cursor.red().bg.green().write("yyyooo").reset().bg.reset;
