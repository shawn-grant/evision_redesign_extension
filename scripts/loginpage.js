//navbar image
$('#navlogo').attr('src', chrome.runtime.getURL('icons/utechlogo.png'))

//replace body with my html
$.get(chrome.runtime.getURL('html/loginpage.html'), (data) => {
    
    //$("body").html($('body').html() + data);
    $('.sitstableoutline').html(data)
});

