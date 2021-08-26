$(document).ready(() => {

    //navbar
    $.get(chrome.runtime.getURL('html/navbar.html'), (data) => {
        $('form').before(data)

        //set navbar image
        $('#navlogo').attr('src', chrome.runtime.getURL('icons/utechlogo.png'))
    });

    $('form').attr('autocomplete', 'on')

    /// BOTH LOGIN AND SECURITY QUESTION PAGE SHARE THE SAME URL SO DIFFERENT LOGIC IS 
    /// NEEDED BASED ON WHICH SECTION WE ARE
    /// Here we try determine the page by the title of it

    if (document.title == "Security Questions and Answers") { //security question section
        // leave page as is

        //get the hidden inputs
        let hiddeninputs = $('.bgformsub')
        let submitBtn = $('input.formsubfree')

        $.get(chrome.runtime.getURL('html/login_security.html'), (data) => {
            //insert the form
            $('form').append(data)

            //check if there is an error message and replace it with a modal
            if ($('#sitsmessagebox').length) {
                //title
                let title = $('#sitsmessagebox .sitsmessagetitle').html()
                let message = $('#sitsmessagebox .sitsmessagecontent').html()

                $('#errormodal #errortitle').html('Error -' + title)
                $('#errormodal #errormessage').html(message)

                $('#errormodal').modal('show')
                $('#sitsmessagebox').hide()
            }
        })
    }
    else { //regular login section "Login to the portal"

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

                $('#errormodal #errortitle').html('Error -' + title)
                $('#errormodal #errormessage').html(message)

                $('#errormodal').modal('show')
                $('#sitsmessagebox').hide()
            }
        });
    }
    

})