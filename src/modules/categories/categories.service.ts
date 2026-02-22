import { prisma } from "../../lib/prisma"

const getCategory =async ()=>{
        const result = await prisma.category.findMany({
               include : {
                _count : {
                        select : {
                                tutors : true
                        }
                }
               }
        })
        return result
}


const postCategory =async (payload:{name: string, description : string})=>{
      


        const result = await prisma.category.create({
                data  : {
                        name : payload.name,
                        description : payload.description
                },
                
        })
        
        return result ;
}


const deleteCategory = async (id: string) => {
        const result = await prisma.category.delete({
                where : {
                        id
                }
        })
        return result ;
}

export const CategoriesService = {
        getCategory,
        postCategory,
        deleteCategory
} 