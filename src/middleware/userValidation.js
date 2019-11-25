const pool = require('../models/db');
/**
 * Class representing User Validations
 * @class UserValidator
 */
class UserValidator {
  /**
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @param {function} next - Calls the next function
    * @returns {object} JSON representing the failure message
    */
  static createEmployeeValidation(req, res, next) {
    /* eslint-disable prefer-const */
    let { username, firstname, lastname, email, password, gender, jobrole, department, address } = req.body;
    if (email === undefined) {
      return res.status(400).json({
        status: 'Bad Requst',
        message: 'email cannot be undefined'
      });
    }
    if (typeof email !== 'string') {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'email should be a string'
      });
    }
    email = email.toLowerCase().trim();
    if (email === '') {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'email field cannot be empty'
      });
    }
    /* eslint-disable no-useless-escape */
    const emailVerifier = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
    if (!emailVerifier.test(email)) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'email format is invalid'
      });

    }
    if (email.length < 10 || email.length > 30) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'email should be 10 to 30 characters long'
      });
    }
    const findByEmail = 'SELECT * FROM employees WHERE email = $1';
    const value = [email];
    pool.query(findByEmail, value)
      .then((result) => {
        if (result.rowCount !== 0) {
          return res.status(409).json({
            status: 'Fail',
            message: 'email already exists!'
          });
        }
        // Password Validations
        if (password === undefined) {
          return res.status(400).json({
            status: 'Bad Request',
            message: 'password cannot be undefined'
          });
        }
        if (typeof password !== 'string') {
          return res.status(400).json({
            status: 'Bad Request',
            message: 'password should be a string'
          });
        }
        password = password.trim();
        if (password === '') {
          return res.status(400).json({
            status: 'Bad Request',
            message: 'password field cannot be empty'
          });
        }
        if (typeof password !== 'string') {
          return res.status(400).json({
            status: 'Bad Request',
            message: 'password should be a string'
          });
        }
        if (password.length < 8 || password.length > 20) {
          return res.status(400).json({
            status: 'Bad Request',
            message: 'password should be 8 to 20 characters long'
          });
        }

        //username
    if (username === undefined) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'username cannot be undefined'
      });
    }
    if (typeof username !== 'string') {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'username should be a string'
      });
    }
    username = username.toLowerCase().trim();
    if (username === '') {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'username field cannot be empty'
      });
    }

// firstname
if (firstname === undefined) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'firstname cannot be undefined'
    });
  }
  if (typeof firstname !== 'string') {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'firstname should be a string'
    });
  }
  firstname = firstname.toLowerCase().trim();
  if (firstname === '') {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'firstname field cannot be empty'
    });
  }

  // Lastname
  if (lastname === undefined) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'lastname cannot be undefined'
    });
  }
  if (typeof lastname !== 'string') {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'lastname should be a string'
    });
  }
  lastname = lastname.toLowerCase().trim();
  if (lastname === '') {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'lastname field cannot be empty'
    });
  }

// Gender

if (gender === undefined) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'gender cannot be undefined'
    });
  }
  if (typeof gender !== 'string') {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'gender should be a string'
    });
  }
  gender = gender.toLowerCase().trim();
  if (gender === '') {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'gender field cannot be empty'
    });
  }

//Job Role

if (jobrole === undefined) {
  return res.status(400).json({
    status: 'Bad Request',
    message: 'jobrole cannot be undefined'
  });
}
if (typeof jobrole !== 'string') {
  return res.status(400).json({
    status: 'Bad Request',
    message: 'jobrole should be a string'
  });
}
jobrole = jobrole.toLowerCase().trim();
if (jobrole === '') {
  return res.status(400).json({
    status: 'Bad Request',
    message: 'jobrole field cannot be empty'
  });
}

// Department

if (department === undefined) {
  return res.status(400).json({
    status: 'Bad Request',
    message: 'department cannot be undefined'
  });
}
if (typeof department !== 'string') {
  return res.status(400).json({
    status: 'Bad Request',
    message: 'department should be a string'
  });
}
department = department.toLowerCase().trim();
if (department === '') {
  return res.status(400).json({
    status: 'Bad Request',
    message: 'department field cannot be empty'
  });
}

//  Address

if (address === undefined) {
  return res.status(400).json({
    status: 'Bad Request',
    message: 'address cannot be undefined'
  });
}
if (typeof address !== 'string') {
  return res.status(400).json({
    status: 'Bad Request',
    message: 'address should be a string'
  });
}
address = address.toLowerCase().trim();
if (address === '') {
  return res.status(400).json({
    status: 'Bad Request',
    message: 'address field cannot be empty'
  });
}
        req.body.username = username;
        req.body.firstname = firstname;
        req.body.lastname = lastname;
        req.body.email = email;
        req.body.password = password;
        req.body.gender = gender;
        req.body.jobrole = jobrole;
        req.body.department = department;
        req.body.address = address;
        return next();
      }).catch(error => res.status(500).json({
        status: 'Fail',
        message: error.message
      }));
  }

  /**
   * login User to the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  static createEmployeeLoginValidation(req, res, next) {
    let { email, password } = req.body;
    if (email === undefined) {
      return res.status(400).json({
        status: 'Fail',
        message: 'email cannot be undefined'
      });
    }
    if (typeof email !== 'string') {
      return res.status(400).json({
        status: 'Fail',
        message: 'email should be a string'
      });
    }
    email = email.toLowerCase().trim();
    if (email === '') {
      return res.status(400).json({
        status: 'Fail',
        message: 'Please supply your email'
      });
    }
    db.query(queryUsersByEmail, [email])
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(401).json({
            status: 'Fail',
            message: 'Authentication failed'
          });
        }
        if (password === undefined) {
          return res.status(401).json({
            status: 'Fail',
            message: 'password cannot be undefined'
          });
        }
        if (typeof password !== 'string') {
          return res.status(400).json({
            status: 'Fail',
            message: 'password should be a string'
          });
        }
        password = password.trim();
        if (password === '') {
          return res.status(401).json({
            status: 'Fail',
            message: 'password cannot be empty'
          });
        }
        
        req.body.email = email;
        req.body.password = password;
        return next();
      })
      .catch(error => res.status(500).json({
        message: error.message
      }));
  }
}

module.exports = UserValidator;