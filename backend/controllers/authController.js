import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "qwerty4321" ;

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    await user.save();

    res.status(200).json({ Message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials email" }); // ✅ return
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials password" }); // ✅ return
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET || "qwerty4321", 
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

