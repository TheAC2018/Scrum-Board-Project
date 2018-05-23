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
    $(document).on("click", "button[data-target='#taskCreatorModal']", function () {
        let story_id = parseInt($(this).attr("data-id"));

        $("#taskCreatorModal input[name='story_id']").val(story_id);
    });

    // Creating New Task
    $(document).on("submit", "form#create-new-task", function (e) {
        e.preventDefault();

        let data = {};

        data['story_id'] = $("form#create-new-task input[name='story_id']").val();
        data['title'] = $("form#create-new-task input[name='title']").val();
        data['description'] = $("form#create-new-task textarea[name='description']").val();

        if (board_controller.create_task(data)) {
            $("#taskCreatorModal").modal('hide');

            $('#taskCreatorModal').on('hidden.bs.modal', function (e) {
                router.load("board", $("form#create-new-story input[name='board_id']").val());
            });

        }

        return false;

    });

    // Showing Detail
    $(document).on("click", "button[data-target='#detailModal']", function () {
        let description = $(this).attr("data-description");

        $("#detailModal .modal-body p.lead").text(description);
    });

});