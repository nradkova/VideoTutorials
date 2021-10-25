const Course = require('../models/Course');
const User = require('../models/User');

async function createOne(course) {
    const current = new Course({...course});
    await current.save();
    return current;
}

async function getOneById(id) {
    const current = await Course.findById(id)
        // .populate({path:'enrolled',select:'_id'})
        .populate('owner')
        .lean();
    if  (current) {
        const viewModel = {
            _id: current._id,
            title: current.title,
            description: current.description,
            imageUrl: current.imageUrl,
            time: current.time,
            carImage: current.carImage,
            isPublic: current.isPublic,
            ownerId: current.owner._id.toString(),
            // enrolled: current.enrolled
            enrolled: current.enrolled.map(x=>x._id),
        }
        return viewModel;
    }
    return undefined;
}

async function editOne(id, course) {
    const current = await Course.findById(id);
    if (!current) {
        throw new ReferenceError('No such data');
    }
    Object.assign(current, course);
    return await current.save();
}

async function delOne(id) {
    const current = await Course.findById(id);
    if (!current) {
        throw new ReferenceError('No such data');
    }
  return await Course.deleteOne({_id:id});
}

async function getAll() {
    return await Course.find({}).lean();
}

async function enrollCourse(courseId, userId) {
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course||!user) {
        throw new ReferenceError('No such data');
    }
    course.enrolled.push(userId);
    user.courses.push(courseId)
    return Promise.all([course.save(),user.save()]);
}

// async function getTripBuddies(id) {
//     const current = await Trip.findById(id).populate({ path: 'buddies', select: 'email' }).lean();
//     if (!current) {
//         throw new ReferenceError('No such data');
//     }
//     return current.buddies;
// }

// async function getAllHousingsOfType(type) {
//     return await Housing.find().where('type').equals(type).lean();
// }


// async function getLastThreeHousings() {
//     return await Housing.find().sort({ createdAt: -1 }).limit(3).lean();
// }


module.exports = {
    createOne,
    getOneById,
    editOne,
    delOne,
    getAll,
    enrollCourse,
    // getTripBuddies

}