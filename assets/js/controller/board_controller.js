class board_controller {

    static show(board_id) {

        let event = "scrum_board";

        // ask to fetch view and trigger the event
        view.fetch_all(["scrum-board", "scrum-board/row-template", "scrum-board/task-card"], event);

        // listen to event
        $(document).on(event, function () {

            // get templates
            let data = view.get_loaded_view(event);

            let board_template = data[0];
            let row_template = data[1];
            let task_template = data[2];

            let stories = DB.queryAll("stories", {
                query: {
                    board_ID: board_id
                }
            });
            let stories_template = [];

            stories.forEach(function (story) {
                let template = row_template;

                template = template.replace("{priority}", board_controller.priority_class(story.priority));
                template = template.replace("{ID}", story.ID);
                template = template.replace("{title}", story.title);
                template = template.replace("{description}", story.description);
                template = template.replace("{created_at}", Math.ceil((Date.now() - story.created_at) / 8.64e7));

                // get tasks
                let planning = [];
                let in_progress = [];
                let done = [];

                let tasks = DB.queryAll("tasks", {
                    query: {story_ID: story.ID}
                });

                tasks.forEach(function (task) {
                    let template = task_template;

                    template = template.replace("{ID}", task.ID);
                    template = template.replace("{title}", task.title);
                    template = template.replace("{description}", task.description);

                    if (task.tag === "planning")
                        planning.push(template);
                    else if (task.tag === "in-progress")
                        in_progress.push(template);
                    else
                        done.push(template);

                });

                template = template.replace("{planning_tasks}", planning.join(""));
                template = template.replace("{in_progress_tasks}", in_progress.join(""));
                template = template.replace("{done_tasks}", done.join(""));

                stories_template.push(template);
            });

            // prepare priorities options
            let prioties_options = [];
            board_controller.priorities().forEach(function (elm) {
                prioties_options.push(`<option value="${elm}">${elm}</option>`)
            });

            board_template = board_template.replace("{stories}", stories_template.join(""));
            board_template = board_template.replace("{ID}", board_id);
            board_template = board_template.replace("{priorities}", prioties_options.join(""));

            view.replace(null, "Software Construction Captone Project", board_template);

        });

    }

    static priorities() {
        return [
            'high',
            'medium',
            'low'
        ];
    }

    static priority_class(priority) {

        let lookUp = {
            high: 'danger',
            medium: 'primary',
            low: 'info'
        };

        return lookUp[priority];

    }

    static create_story(data) {

        let create_story = DB.insert("stories", {
            board_ID: data.board_id,
            title: data.title,
            description: data.description,
            priority: data.priority,
            created_by: 1,
            created_at: Date.now()
        });

        DB.commit();

        return create_story;

    }

    static create_task(data) {
        let task_id = parseInt(data.task_id) ? parseInt(data.task_id) : undefined;
        let create_task;

        if (task_id === undefined) {
            create_task = DB.insert("tasks", {
                story_ID: data.story_id,
                title: data.title,
                description: data.description,
                tag: data.tag,
                created_by: 1,
                created_at: Date.now()
            });
        } else {
            create_task =DB.update("tasks", {ID: task_id}, function (row) {
                row.title = data.title;
                row.description = data.description;
                row.tag = data.tag;

                // the update callback function returns to the modified record
                return row;
            });
        }

        DB.commit();

        return create_task;

    }

    static get_task(task_ID) {

        return DB.queryAll("tasks", {query: {ID: task_ID}, limit: 1});

    }

}