import axios from "../data/axios";

class BlogService {

     fetchBlogs = async ()=>{
        console.log("posts");
        const promise = new Promise((resolve, reject) =>{
            axios.get('posts')
                .then((res) =>{
                    return resolve(res)
                }).catch((error) =>{
                return resolve(error)
            })
        })
        return await promise
    }

     fetchPosts = async (id)=>{
        const promise = new Promise((resolve, reject) =>{
            axios.get('photos'+"/"+id)
                .then((res) =>{
                    return resolve(res)
                }).catch((error) =>{
                return resolve(error)
            })
        })
        return await promise
    }

}

export default new BlogService;