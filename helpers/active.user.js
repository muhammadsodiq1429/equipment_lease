module.exports = (model, model_name) => {
  return async (req, res) => {
    const user = await model.findOne({
      where: { activation_link: req.params.link },
    });
    if (!user) {
      return res.status(404).send(`${model_name} not found`);
    }

    user.is_active = true;
    await user.save();

    res.send({
      message: `${model_name} faollashtirildi`,
      status: user.is_active,
    });
  };
};
