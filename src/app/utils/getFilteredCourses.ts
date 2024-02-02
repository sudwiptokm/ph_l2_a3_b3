// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { Course } from '../modules/Course/course.model';

// export const getFilteredCourses = async (queryParams: any) => {
//   const {
//     page = 1,
//     limit = 10,
//     sortBy = 'createdAt',
//     sortOrder = 'asc',
//     minPrice,
//     maxPrice,
//     tags,
//     startDate,
//     endDate,
//     language,
//     provider,
//     durationInWeeks,
//     level,
//   } = queryParams;

//   const pipeline: any[] = [];

//   // Match stage for filtering based on query parameters
//   const matchStage = {
//     $match: {
//       ...(minPrice && { price: { $gte: parseFloat(minPrice) } }),
//       ...(maxPrice && { price: { $lte: parseFloat(maxPrice) } }),
//       ...(tags && { 'tags.name': { $in: tags.split(',') } }),
//       ...(startDate &&
//         endDate && {
//           startDate: { $gte: new Date(startDate) },
//           endDate: { $lte: new Date(endDate) },
//         }),
//       ...(language && { language }),
//       ...(provider && { provider }),
//       ...(durationInWeeks && { durationInWeeks: parseInt(durationInWeeks) }),
//       ...(level && { 'details.level': level }),
//     },
//   };
//   pipeline.push(matchStage);

//   // Sort stage
//   const sortStage = {
//     $sort: {
//       [sortBy]: sortOrder === 'asc' ? 1 : -1,
//     },
//   };
//   pipeline.push(sortStage);

//   // Skip stage
//   const skipStage = {
//     $skip: (Number(page) - 1) * Number(limit),
//   };
//   pipeline.push(skipStage);

//   // Limit stage
//   const limitStage = {
//     $limit: Number(limit),
//   };
//   pipeline.push(limitStage);

//   pipeline.push({
//     $lookup: {
//       from: 'users',
//       localField: 'createdBy',
//       foreignField: '_id',
//       as: 'createdBy',
//       pipeline: [
//         {
//           $project: {
//             // Exclude the unwanted fields
//             password: 0,
//             passwordHistory: 0,
//             createdAt: 0,
//             updatedAt: 0,
//             __v: 0,
//           },
//         },
//       ],
//     },
//   });

//   // Execute aggregation pipeline
//   const result = await Course.aggregate(pipeline);

//   return result;
// };
