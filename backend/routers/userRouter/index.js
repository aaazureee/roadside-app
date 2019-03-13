import express from 'express';

const userRouter = express.Router();

userRouter.get('/current-user', (req, res) => {
  res.json({currentUser: null})
})


export default userRouter;