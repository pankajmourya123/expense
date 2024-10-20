import User from '../models/users.js';
import ErrorHandler from '../middlewares/error.js';
import  catchAsyncError  from '../middlewares/catchAsyncError.js';


export const createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, mobile } = req.body;

  if (!name || !email || !mobile) {
    return next(new ErrorHandler('Please provide name, email, and mobile.', 400));
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return next(new ErrorHandler('Invalid email format.', 400));
  }

  const user = await User.create({ name, email, mobile });

  res.status(201).json({
    success: true,
    user,
  });
});

// Get User by ID with Error Handling
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

