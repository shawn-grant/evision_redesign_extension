$(document).ready(() => {

    //navbar
    $.get(chrome.runtime.getURL('html/navbar.html'), (data) => {
        $('form').before(data)

        //set navbar image
        $('#navlogo').attr('src', chrome.runtime.getURL('icons/utechlogo.png'))
    });


    //replace form section with my html
    $.get(chrome.runtime.getURL('html/loginpage.html'), (data) => {
        //insert the form
        $('.sitstableoutline').html(data)

        //remove extra spaces
        $('br')[0].remove()
        $('br')[1].remove()
        $('br')[2].remove()
        $('br')[10].remove()
        $('br')[11].remove()

        //password toggle
        $('#showpasswordcheck, #checkboxlabel').click(() => {
            $('#showpasswordcheck').is(':checked') ?
                $('.newpasswordinput').attr('type', 'text') :
                $('.newpasswordinput').attr('type', 'password')
        })

        //check if there is an error message and replace it with a modal
        if ($('#sitsmessagebox').length) {
            //title
            let title = $('#sitsmessagebox .sitsmessagetitle').html()
            let message = $('#sitsmessagebox .sitsmessagecontent').html()

            $('#errormodal #errortitle').html('Error -'+title)
            $('#errormodal #errormessage').html(message)

            $('#errormodal').modal('show')
            $('#sitsmessagebox').hide()
        }
    });

    

})