import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js"

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1d";

export const signup = async (req ,res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already registered" });


        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hash, role });

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })

        res.status(201).json({
            message: "User created successfully!!",
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token
        })
    } catch (err) {
        console.log(error)
        res.status(500).json({ message: err.message });

    }

}

export const signin = async (req ,res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({ message: "Please fill all the fields" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });



        const match = await bcrypt.compare(password, user.password);
         if (!match) return res.status(400).json({ message: "Invalid credentials" });


        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })

        res.status(201).json({
            message: "User Logged in successfully!!",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });

    };

};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};





