const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const otpStore = require('../utils/otpStore')
const sendEmail = require('../utils/sendEmail')
const transporter = require('../controllers/emailController')


 const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
      role
    });
    await transporter.sendMail({
      from:process.env.Email,
      to:email,
      subject:"Test Email",
      html:"<p>hello Email, i am a developer </p>"
    })


const savedUser = await user.save();

    res.status(201).json({
      message: "User Created!"
    });

  } catch (error) {
    console.log("Signup Error:", error);

    return res.status(500).json({
      message: "Error creating user!"
    });
  }
};




const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email Received:", email);

    const user = await User.findOne({ email });
 
    console.log("Found User:", user);

    if (!user) {
      return res.status(400).json({
        message: "Please Signup First"
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    const userData = {
      name: user.name,
      role: user.role
    };

    res.status(200).json({
      message: "Login Successfully",
      token,
      userData
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email not found"
      });
    }

    const otp = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    otpStore.set(email, {
      otp,
      expireAt: Date.now() + 5 * 60 * 1000
    });

    await sendEmail(
      email,
      "Reset Password OTP",
      `
      <h2>Password Reset</h2>
      <p>Your OTP for password reset is <b>${otp}</b></p>
      <p>Valid for 5 minutes only.</p>
      `
    );

    res.status(200).json({
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error sending OTP",
      error: error.message
    });
  }
};

 const resetPassword=async(req,res)=>{
  try{
      const {email,otp,password} = req.body
      console.log("Email:", email);
      console.log("OTP:", otp);
      const data = otpStore.get(email)
  if(!data){
    return res.status(404).json({
      message:"OTP Not Found"
    })
  }
  if(Date.now()>data.expireAt) {
    otpStore.delete(email)
    return res.status(400).json({
      message:"OTP Expired"
    })
  }
  if(data.otp!==otp) {
    return res.status(404).json({
      message:"OTP Invalid"
    })
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate({email},{password:hashPassword})
  otpStore.delete(email)
  res.status(200).json({
    message:"Password Reset Successfull"
  })
  } catch (error) {
    res.status(500).json({
      message:"Server Error"
    })
  }
}

module.exports = {
    registerUser,
    loginUser,
    resetPassword,
    forgotPassword
}