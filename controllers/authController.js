const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validateEmail = require("../utils/validateEmail");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(401).json({ error: "Fill all the fields." });
  }
  if (!validateEmail(email)) {
    return res.status(401).json({ error: "Please use a proper email." });
  }
  if (password.length < 7) {
    return res
      .status(401)
      .json({ error: "Password must be at least 7 characters" });
  }
  if (name.length < 4) {
    return res
      .status(401)
      .json({ error: "Name must be at least 7 characters" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).json({ error: "User already exist!" });
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    const { user_id, user_name, user_email } = newUser.rows[0];

    return res.json({ jwtToken, user_id, user_name, user_email });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Fill all the fields" });
  }
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    const { user_id, user_name, user_email } = user.rows[0];

    return res.json({ jwtToken, user_id, user_name, user_email });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
};
