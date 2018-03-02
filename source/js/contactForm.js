import _ from 'jquery-validation';
jQuery.extend(jQuery.validator.messages, {
    required: "This field is required.",
    remote: "Please fix this field.",
    email: "Please enter a valid email",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});
const $contactForm = $('#contactForm');
const button = document.getElementById('submit');
$contactForm.validate();
$contactForm.submit(function(e) {
    if ($contactForm.valid()) {
        e.preventDefault();
        $.ajax({
            url: "https://formspree.io/yovchenko.vl@gmail.com",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function() {button.value = 'Sending message…'},
            success: function(data) {button.value = 'Message sent!'},
            error: function(err) {button.value = 'Ops, there was an error.'}
        });
    }
});
$(document.getElementById('message')).add(document.getElementById('email'))	
	.add(document.getElementById('name')).focus(function () {	
		document.getElementsByClassName('containerForm')[0].classList.add('form-is--scaled');	
});	
$(document.getElementById('message')).add(document.getElementById('email'))	
	.add(document.getElementById('name')).focusout(function () {	
		document.getElementsByClassName('containerForm')[0].classList.remove('form-is--scaled');	
});