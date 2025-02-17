require("dotenv").config({});
const bcrypt = require("bcrypt");
const User = require("../model/users.model");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudnary");

const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(
      fileUri.content
      // ,
      // function (error, result) {
      //   if (error) {
      //     console.error("Cloudinary upload error:", error);
      //   } else {
      //     console.log("Cloudinary upload result:", result);
      //   }
      // }
    );
    const profilePhotoUrl = cloudResponse.secure_url;

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log("error message", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {

    const users = await User.find();

    if (!users) {
      return res.status(401).json({
        message: "Users not found",
        success: false,
      });
    }

    return res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User is not registered with this email",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: '30m',
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: false, 
      })
      .json({
        message: `Welcome Back ${user.fullName}`,
        user,
        success: true,
      })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// const logout = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logout Succussfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const update = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    let userId = req.query.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    let skillArray;
    if(skills)
    {
      if (skills.includes(",")) {
        // console.log(", separate ==",skills)
        skillArray = skills.toString().split(",").map(item => item.trim());
      }
      else
      {
        skillsConverted = skills.toString()
        skillArray = skillsConverted.split()
      }
    }

    if(req.file)
      {
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(
          fileUri.content,
          // function (error, result) {
          //   if (error) {
          //     console.error("Cloudinary upload error:", error);
          //   } else {
          //     console.log("Cloudinary upload result:", result);
          //   }
          // }
        );
        if (cloudResponse) {
          user.profile.resume = cloudResponse.secure_url;
          user.profile.resumeOriginalName = file.originalname;
        }
      }

    // const hashPassword = await bcrypt.hash(password, 10);

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    // if (password) user.password = hashPassword;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillArray;

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const pictureUpdate = async(req, res) => {

  const userId = req.query.id
  let user = await User.findById(userId)

  if(!user)
  {
    return res.status(400).json({
      message: 'User does not exists.'
    })
  }

  const file = req.file
  const fileURI = getDataUri(file)
  const cloudResponse = await cloudinary.uploader.upload(fileURI.content)

  if(cloudResponse)
  {
    user.profile.profilePhoto = cloudResponse.secure_url
    user.profile.profilePhotoOriginalName = file.originalname;
  }

  await user.save()

  user = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res.status(200).json({
    message: "User profile picture successfully updated.",
    user,
    success: true
  })
}

module.exports = { register, getAllUser, login, update, pictureUpdate};
