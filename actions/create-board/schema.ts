import {z} from "zod"
export const CreateBoard = z.object({
    title:z.string({
        required_error:"Title is required!",
        invalid_type_error:"Invalid Title!"
    }).min(3,"Title is too short!"),
    image:z.string({
        required_error:"Image is required!",
        invalid_type_error:"Invalid Image type! "
    })
})