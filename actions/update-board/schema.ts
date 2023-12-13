import {z} from "zod"

export const UpdateBoard = z.object({
    title:z.string({
        required_error:"Title is Required!",
        invalid_type_error:"Invalid Title type!"
    }).min(3,"Title is too short!"),
    id : z.string()
})