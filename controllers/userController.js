const getUser = async (req, res) => {
  res.send("Get user")
}

const updateUser = async (req, res) => {
  res.send("Update user")
}

const loginUser = async (req, res) => {
  res.send("Login user")
}

const deleteUser = async (req, res) => {
  res.send("Delete")
}


module.exports = { getUser, updateUser, loginUser, deleteUser}
