const User = require('../models/User');

async function createUser(username, hashedPassword) {
    const user = new User({username, hashedPassword});
    await user.save();
    return user;
}


async function getUserByUsername(username) {
    const match = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: { $regex: match } });
    return user;
}

// async function getUserByEmail(email) {
//     const match = new RegExp(`^${email}$`);
//     const user = await User.findOne({ email: { $regex: match } });
//     return user;
// }

async function getUserCourses(id) {
    const user = await User.findById(id).populate({path:'courses',select:'title'}).lean();
    return user;
}

async function editUser(userId,tripId) {
    const user = await User.findById(userId);
    user.trips.push(tripId);
    await user.save();
    return user;
}


module.exports = {
    createUser,
    getUserByUsername,
    // getUserByEmail,
    editUser,
    getUserCourses
}