/*$(document).ready(function(){
    // Form submission handling
    $('#changePasswordForm').submit(function(e){
        e.preventDefault();
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();
        if (newPassword !== confirmPassword) {
            $('#passwordMatchError').text("Passwords do not match. Please enter matching passwords.");
            return;
        }
        $('#passwordMatchError').text(""); // Clear the error message if passwords match
        // Additional form submission handling goes here

        // For demonstration purposes, show success modal and close change password modal
        $('#changePasswordModal').modal('hide');
        $('#successModal').modal('show');

        // Clear the form fields after successful submission
        $('#currentPassword').val('');
        $('#newPassword').val('');
        $('#confirmPassword').val('');
    });
});*/
