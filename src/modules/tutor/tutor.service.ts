import { TutorProfile } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";

//  const getTutor = async (
//   search?: string,
//   rating?: number,
//   price?: number,
//   categoryName?: string,
// ) => {

//   const result = await prisma.tutorProfile.findMany({
//     where: {
//       AND: [
//     ...(search ? [{ subjects: { hasSome: [search], },},]: []),
//     ...(price ? [{ hourlyRate: { lte: price, }, }, ] : []),
//     ...(rating ? [ { review: { some: { rating: { gte: rating, } }, }, }, ] : []),
//     ...(categoryName ? [ { category: { name: categoryName, }, }, ] : []), ], },
//       include: {

//           _count : {
//             select : {
//               review : true
//             }
//           },
//           category: true,
//           user : true
//       }

//     },
//   );

//   return result;
// };



const getTutor = async (
  search?: string,
  rating?: number,
  price?: number,
  categoryName?: string,
) => {
  console.log(search);
  const tutors = await prisma.tutorProfile.findMany({
    where: {
      AND: [
        ...(search ? [{ subjects: { hasSome: [search] } }] : []),
        ...(price ? [{ hourlyRate: { lte: price } }] : []),
        ...(rating
          ? [
              {
                review: {
                  some: {
                    rating: { gte: rating },
                  },
                },
              },
            ]
          : []),
        ...(categoryName ? [{ category: { name: categoryName } }] : []),
      ],
    },
    include: {
      availability:true,
      category: true,
      user: true,
      review: {
        select: {
          rating: true,
        },
      },
      _count: {
        select: {
          review: true,
        },
      },
    },
  });

  const result = tutors.map((tutor) => {
    const avg =
      tutor.review.length > 0
        ? tutor.review.reduce((sum, r) => sum + r.rating, 0) /
          tutor.review.length
        : 0;

    return {
      ...tutor,
      avgRating: Number(avg.toFixed(1)),
    };
  });

  return result;
};



const postTutor = async (payload: {bio:string; hourlyRate :number; subjects:string[];categoryName:string;}, id: string) => {
  const userExist = await prisma.tutorProfile.findUnique({
    where : {
      authorId : id
    }
  })
    if(userExist){
      return "user already exist"
    }

  const result = await prisma.tutorProfile.create({
    data: { ...payload, authorId: id },
  });
  return result;
};



const getTutorById = async (id: string) => {
  const tutor = await prisma.tutorProfile.findFirstOrThrow({
    where: {
       id,
    },
    include: {
      availability: true,
      category: true,
      user: true,
      booking:true,
      review: {
        select: {
          rating: true,
        },
      },
      _count: {
        select: {
          review: true,
        },
      },
    },
  });

  const avg =
    (tutor?.review.length as number) > 0
      ? tutor.review.reduce((sum, r) => sum + r.rating, 0) / tutor.review.length
      : 0;

    
  return {
    ...tutor,
    avgRating: Number(avg.toFixed(1)),
 
  };
  // return tutor
};
const getTutorDetailsById = async (id: string) => {
  const tutor = await prisma.tutorProfile.findFirstOrThrow({
    where: {
       authorId:id,
    },
    include: {
      availability: true,
      category: true,
      user: true,
      booking:true,
      review: {
        select: {
          rating: true,
        },
      },
      _count: {
        select: {
          review: true,
        },
      },
    },
  });

  const avg =
    (tutor?.review.length as number) > 0
      ? tutor.review.reduce((sum, r) => sum + r.rating, 0) / tutor.review.length
      : 0;

    
  return {
    ...tutor,
    avgRating: Number(avg.toFixed(1)),
 
  };
  // return tutor
};


const putTutorProfile = async (
  payload: {
   
    bio?: string | null;
    hourlyRate?: number | null;
    subjects?: string[];
    categoryName?: string | null;
  },
  userId: string,
) => {
  const result = await prisma.tutorProfile.update({
    where: {
      authorId: userId,
    },
    data: { ...payload },
  });
  return result;
};



export const tutorService = {
  getTutor,
  getTutorById,
  getTutorDetailsById,
  postTutor,
  putTutorProfile,
};
