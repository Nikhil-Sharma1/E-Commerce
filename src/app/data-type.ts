export interface SignUp{
    f_name:string,
    l_name:string,
    email:string,
    phone:string,
    password:string
}
export interface SignIn{
    email:string,
    password:string
}
export interface Product{
    name:string,
    price:string,
    color:string,
    category:string,
    description:string,
    image_url:string,
    id?:number,
    quantity?:undefined|number
}
export interface Cart{
    name:string,
    price:string,
    color:string,
    category:string,
    description:string,
    image_url:string,
    id?:number,
    quantity?:undefined|number,
    userId:number,
    productId:undefined|number
}