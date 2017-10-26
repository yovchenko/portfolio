'use strict';
import _ from 'jquery-validation';
let $contactForm = $('#contactForm');
$contactForm.validate();
$contactForm.submit(function(e) {
    if ($contactForm.valid()) {
        e.preventDefault();
        $.ajax({
            url: "https://formspree.io/yovchenko.vl@gmail.com",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function() { $contactForm.append('<div class="alert alert--loading">Sending message…</div>');},
            success: function(data) {$contactForm.find('.alert--loading').hide();
            $contactForm.append('<div class="alert alert--success">Message sent!</div>');},
            error: function(err) { $contactForm.find('.alert--loading').hide();
            $contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>'); }
        });
    }
});