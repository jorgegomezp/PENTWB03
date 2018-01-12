$(function() {
    //Tareas Default
    var todos = [
    {
        task: 'Pagar el banco',
        isCompleted: false
    },
    {
        task: 'Pagar Coppel',
        isCompleted: false
    }
    ];

    var app = {
        showTodos: function() {
            var todosListEl = $('#lista-todos');
            //Limpiar html
            todosListEl.html('');
            //Mostrar todos en pantalla 
            todos.forEach(function(todo) {
                //variable para color de estado de la tarea
                var taskClasses = 'todo-task' + (todo.isCompleted ? ' is-completed' : '');

                todosListEl.append('\
                <tr>\
                    <td class="' + taskClasses + '">' + todo.task + '</td>\
                    <td class="btns">\
                        <button class="editar-button myButton">Editar</button>\
                        <button class="borrar-button myButton">Borrar</button>\
                        <button class="guardar-button ">Guardar</button>\
                        <button class="cancelar-button ">Cancelar</button>\
                    </td>\
                </tr>\
                ');
            });
        },

        addTodo: function(event){
            event.preventDefault();
            
            var createInput = $('#crear-input');
            var createInputValue = createInput.val();

            todos.push({
                task: createInputValue,
                isCompleted: false
            });

            createInput.val('');
            app.showTodos();
        },

        toggleTodo: function(){
            todos.forEach(function(todo) {
                if (todo.task === $(this).text()) {
                    todo.isCompleted = !todo.isCompleted;
                }
            }.bind(this));
            app.showTodos();
        },

        enterEditMode: function(){
            var actionsCell = $(this).closest('td');
            var taskCell = actionsCell.prev();

            actionsCell.find('.guardar-button').show();
            actionsCell.find('.cancelar-button').show();
            actionsCell.find('.editar-button').hide();
            actionsCell.find('.borrar-button').hide();

            taskCell.removeClass('todo-task');
            app.currentTask = taskCell.text();
            taskCell.html('<input type="text" class="edit-input" value="' + app.currentTask + '" />');
        },

        exitEditMode: function() {
            var actionsCell = $(this).closest('td');
            var taskCell = actionsCell.prev();

            actionsCell.find('.guardar-button').hide();
            actionsCell.find('.cancelar-button').hide();
            actionsCell.find('.editar-button').show();
            actionsCell.find('.borrar-button').show();

            taskCell.addClass('todo-task');
            taskCell.html(app.currentTask);
        },

        saveTask: function() {
            var newTask = $('.edit-input').val();

            todos.forEach(function(todo) {
                if (app.currentTask === todo.task) {
                    todo.task = newTask;
                }
            });
            app.currentTask = newTask;
            app.exitEditMode.call(this);
        },

        deleteTask: function() {
            var taskToDelete = $(this).parent('td').prev().text();
            var found = false;
            todos.forEach(function(todo, index) {
                if (!found && taskToDelete === todo.task) {
                    todos.splice(index, 1);
                    found = true;
                }
            });
            app.showTodos();
        },

        showError: function(errorMessage) {
            $('.error-message').html(errorMessage).slideDown();
        },

        clearError: function() {
            $('.error-message').fadeOut();
        }
    };


    app.showTodos();

    // Lista de Metodos
    $('#crear-form').on('submit', app.addTodo);
    $('#crear-input').on('keyup', app.clearError);
    $('table').on('click', '.todo-task', app.toggleTodo);
    $('table').on('click', '.editar-button', app.enterEditMode);
    $('table').on('click', '.cancelar-button', app.exitEditMode);
    $('table').on('click', '.guardar-button', app.saveTask);
    $('table').on('click', '.borrar-button', app.deleteTask);
});