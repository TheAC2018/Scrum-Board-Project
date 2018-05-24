$(function () {

    // Creating New Board
    $(document).on("submit", "form#create-new-board", function (e) {
        e.preventDefault();

        let data = {};

        data['title'] = $("form#create-new-board input[name='title']").val();
        data['description'] = $("form#create-new-board textarea[name='description']").val();

        if (boards_controller.create(data)) {
            $("#createBoardModal").modal('hide');

            $('#createBoardModal').on('hidden.bs.modal', function (e) {
                router.load("boards");
            });

        }

        return false;

    });

    // Creating New Story
    $(document).on("submit", "form#create-new-story", function (e) {
        e.preventDefault();

        let data = {};

        data['board_id'] = $("form#create-new-story input[name='board_id']").val();
        data['title'] = $("form#create-new-story input[name='title']").val();
        data['description'] = $("form#create-new-story textarea[name='description']").val();
        data['priority'] = $("form#create-new-story select[name='priority'] option:selected").val();

        if (board_controller.create_story(data)) {
            $("#storyCreatorModal").modal('hide');

            $('#storyCreatorModal').on('hidden.bs.modal', function (e) {
                router.load("board", data['board_id']);
            });

        }

        return false;

    });

    // Preparing to Creat New Task
    $(document).on("click", "button:not(.edit-task)[data-target='#taskCreatorModal']", function () {
        let story_id = parseInt($(this).attr("data-id"));

        $("form#create-new-task")[0].reset();
        $("#taskCreatorModal input[name='story_id']").val(story_id);
        $("#taskCreatorModal input[name='task_id']").val(null);
    });

    // Creating New Task
    $(document).on("submit", "form#create-new-task", function (e) {
        e.preventDefault();

        let data = {};

        data['story_id'] = $("form#create-new-task input[name='story_id']").val();
        data['task_id'] = $("form#create-new-task input[name='task_id']").val();
        data['title'] = $("form#create-new-task input[name='title']").val();
        data['description'] = $("form#create-new-task textarea[name='description']").val();
        data['tag'] = $("form#create-new-task select[name='tag'] option:selected").val();

        if (board_controller.create_task(data)) {
            $("#taskCreatorModal").modal('hide');

            $('#taskCreatorModal').on('hidden.bs.modal', function (e) {
                router.load("board", $("form#create-new-story input[name='board_id']").val());
            });

        }

        return false;

    });

    // Edit Detail
    $(document).on("click", "button.edit-task[data-target='#taskCreatorModal']", function () {
        let task_ID = $(this).attr("data-id");

        let task = board_controller.get_task(task_ID)[0];

        $("form#create-new-task input[name='story_id']").val(task.story_ID);
        $("form#create-new-task input[name='task_id']").val(task.ID);
        $("form#create-new-task input[name='title']").val(task.title);
        $("form#create-new-task textarea[name='description']").val(task.description);
        $("form#create-new-task select[name='tag'] option[value='" + task.tag + "']").attr('selected', 'selected');
    });

});