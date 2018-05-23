// Initialise. If the database doesn't exist, it is created
const DB = new localStorageDB("scrumb_board", localStorage);

/**
 *
 * Migration
 *
 */

// Check if the database was just created. Useful for initial database setup
if (DB.isNew()) {


    /**
     * Migration For Users
     */
    // create the "books" table
    DB.createTable("users", ["ID", "name_surname", "email", "password", "created_at"]);

    // insert some data
    DB.insert("users", {ID: 1, title: "Aydın Bulut", author: "ab@aydinbulut.com", created_at: 1526976782950});
    DB.insert("users", {ID: 2, title: "Cengiz Cebeci", author: "cc@cengizcebeci.com", created_at: 1526978850847});


    /**
     * Migration For Boards
     */
    // create the "boards" table
    DB.createTable("boards", ["ID", "title", "description", "created_by", "created_at"]);

    // insert some data
    DB.insert("boards", {
        ID: 1,
        title: "Lorem Ipsum Sed Aliquam",
        description: "The standard Lorem Ipsum passage, used since the 1500s",
        created_by: 1,
        created_at: 1526979782950
    });
    DB.insert("boards", {
        ID: 2,
        title: "But I Must Explain To",
        description: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC",
        created_by: 2,
        created_at: 1526979850847
    });


    /**
     * Migration For Stories
     */
    // create the "stories" table
    DB.createTable("stories", ["ID", "board_ID", "title", "description", "priority", "created_by", "created_at"]);

    // insert some data
    DB.insert("stories", {
        ID: 1,
        board_ID: 1,
        title: "Authetication",
        description: "",
        priority: "high",
        created_by: 1,
        created_at: 1526979782950
    });
    DB.insert("stories", {
        ID: 2,
        board_ID: 1,
        title: "But I Must Explain To",
        description: "",
        priority: "medium",
        created_by: 2,
        created_at: 1526979850847
    });


    /**
     * Migration For Tasks
     */
    // create the "tasks" table
    DB.createTable("tasks", ["ID", "story_ID", "title", "description", "tag", "created_by", "created_at"]);

    // insert some data
    DB.insert("tasks", {
        ID: 1,
        story_ID: 1,
        title: "Authetication",
        description: "",
        tag: "planning",
        created_by: 1,
        created_at: 1526979782950
    });
    DB.insert("tasks", {
        ID: 2,
        story_ID: 1,
        title: "But I Must Explain To",
        description: "",
        tag: "in_progres",
        created_by: 2,
        created_at: 1526979850847
    });

    // commit the database to localStorage
    // all create/drop/insert/update/delete operations should be committed
    DB.commit();
}