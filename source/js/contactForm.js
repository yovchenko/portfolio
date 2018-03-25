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
const $contactForm = $('#gform');
const button = document.getElementById('submit');
$contactForm.validate();
$contactForm.submit(function (event) {
    if ($contactForm.valid()) {
        event.preventDefault();
        // get all data in form and return object
        function getFormData() {
            var form = document.getElementById("gform");
            var elements = form.elements; // all form elements
            var fields = Object.keys(elements).filter(function (k) {
                // the filtering logic is simple, only keep fields that are not the honeypot
                return (elements[k].name !== "honeypot");
            }).map(function (k) {
                if (elements[k].name !== undefined) {
                    return elements[k].name;
                    // special case for Edge's html collection
                } else if (elements[k].length > 0) {
                    return elements[k].item(0).name;
                }
            }).filter(function (item, pos, self) {
                return self.indexOf(item) == pos && item;
            });
            var data = {};
            fields.forEach(function (k) {
                data[k] = elements[k].value;
                var str = ""; // declare empty string outside of loop to allow
                // it to be appended to for each item in the loop
                if (elements[k].type === "checkbox") { // special case for Edge's html collection
                    str = str + elements[k].checked + ", "; // take the string and append 
                    // the current checked value to 
                    // the end of it, along with 
                    // a comma and a space
                    data[k] = str.slice(0, -2); // remove the last comma and space 
                    // from the  string to make the output 
                    // prettier in the spreadsheet
                } else if (elements[k].length) {
                    for (var i = 0; i < elements[k].length; i++) {
                        if (elements[k].item(i).checked) {
                            str = str + elements[k].item(i).value + ", "; // same as above
                            data[k] = str.slice(0, -2);
                        }
                    }
                }
            });
            // add form-specific values into the data
            data.formDataNameOrder = JSON.stringify(fields);
            data.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
            data.formGoogleSendEmail = form.dataset.email || ""; // no email by default
            return data;
        }
        (function handleFormSubmit() { // handles form submit withtout any jquery
            var data = getFormData(); // get the values submitted in the form
            var url = event.target.action; //
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) button.value = 'Message sent!'
                    else button.value = 'Ops, there was an error.'
                }
                return;
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function (k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
            }).join('&')
            xhr.send(encoded);
        })();
    }
});
$(document.getElementById('message')).add(document.getElementById('email'))
    .add(document.getElementById('name')).focus(function () {
        document.getElementsByClassName('envelope-container')[0].classList.add('form-is--scaled');
    });
$(document.getElementById('message')).add(document.getElementById('email'))
    .add(document.getElementById('name')).focusout(function () {
        document.getElementsByClassName('envelope-container')[0].classList.remove('form-is--scaled');
    });