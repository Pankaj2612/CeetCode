
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message:"Email is Required"
  }),
  password: z.string().min(8),

  
});
export const RegisterSchema = z.object({
  email: z.string().email({
    message:"Email is Required"
  }),
  password: z.string().min(8 , {
    message : "Password must be alteast 8 Characters long"
  }),
  name : z.string().min(1,{
    message : "Name is Required"
  })
  
});
