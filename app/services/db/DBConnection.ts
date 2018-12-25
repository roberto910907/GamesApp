
var Sqlite = require("nativescript-sqlite");

export class DBConnection {
    private database: any;

    public constructor() {
        if (!Sqlite.exists("gamesApp.db")) {
            Sqlite.copyDatabase("gamesApp.db");
        }

        (new Sqlite("gamesApp.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)").then(id => {
                this.database = db;

                return db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });

        return this.database;
    }

    public insert() {
        this.database.execSQL("INSERT INTO games (name, description) VALUES (?, ?)", ["Nic", "Raboy"]).then(id => {
            console.log("INSERT RESULT", id);
            this.fetch();
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    public fetch() {
        this.database.all("SELECT * FROM games").then(rows => {
            return rows;
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

}