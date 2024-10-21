Features

    Sign Up & Sign In: Toggles between signup and login.
    Form Validation: Checks for valid email input and matching passwords.
    Show/Hide Passwords: Eye icon to toggle password visibility.
    Responsive Design: Adjusts to different screen sizes.
    Loading Spinner: ClipLoader displayed while waiting for requests.
    API Integration: Uses axios to communicate with the backend.
    Context-Driven User State: Stores user data using UserContext.
    Toast Notifications: Provides user feedback for errors and success messages.

How It Works

    State Management:
        signup: Boolean to toggle between Sign In and Sign Up forms.
        loading: Tracks form submission status.
        showPass & showConfirmPass: Toggles password visibility.
        email, password, confirmpass: Controlled inputs.

    Form Validation:
        Email validation uses a regular expression.
        Password match check ensures that both password fields are identical in signup mode.

    API Requests:
        Sign Up: Sends an email and password to /auth/signup.
        Sign In: Sends credentials to /auth/signin.
        On success, stores the JWT token and user details in localStorage and navigates to /home.

    User Feedback:
        Toast notifications for success and error messages.
        Loading spinner using ClipLoader during form submission.

Dependencies

    React Router: For navigation between routes.
    Chakra UI: For UI components and styling.
    Axios: For API requests.
    ClipLoader: To indicate loading state.
    React Context: useUser to manage global user state.
    Toast Notifications: Provided by useToast from Chakra UI.