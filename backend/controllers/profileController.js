const {
  UserModel,
} = require(
  "../model/UserModel"
);

const getProfile =
  async (req, res) => {
    try {
      const user =
        await UserModel.findById(
          req.params.userId
        ).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch profile",
      });
    }
  };

const updateProfile =
  async (req, res) => {
    try {
      const {
        fullname,
        mobile,
      } = req.body;

      const user =
        await UserModel.findByIdAndUpdate(
          req.params.userId,
          {
            fullname,
            mobile,
          },
          {
            new: true,
          }
        ).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to update profile",
      });
    }
  };

module.exports = {
  getProfile,
  updateProfile,
};