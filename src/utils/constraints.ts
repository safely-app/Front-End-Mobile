export const constraints = {
    username: {
        presence: {
            allowEmpty: false,
            message: "^Please enter a username"
        }
    },
    emailAddress: {
      presence: {
        allowEmpty: false,
        message: "^Please enter an email address"
      },
      email: {
        message: "^Please enter a valid email address"
      }
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Please enter a password"
      },
      length: {
        minimum: 3,
        message: 'Your password is too short'
      }
    }
  };