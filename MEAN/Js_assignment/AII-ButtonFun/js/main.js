$('document').ready(function() {
    $(document).keypress(function(e) {
        if(e.which == 13) {
            // alert('You pressed enter!');
            var $button = $('<button>enter!!!!</button>');

            $button.appendTo('body');

            $button.on('click', toggleRed);

            $button.hover(addGreen, removeGreen);
        }
    });

    var toggleRed = function() {
        $(this).toggleClass('red');
    }

    var addGreen = function() {
        $(this).addClass('green');
    }

    var removeGreen = function() {
        $(this).removeClass('green');
    }

    $('button').on('click', toggleRed);

    $('button').hover(addGreen, removeGreen);
})
