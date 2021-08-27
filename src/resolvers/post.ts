import { error } from "console";
import { Profiler } from "inspector";
import { type } from "os";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entity/post";
import { MyContext } from "../types";

@InputType()
class PostInput{
    @Field()
    name : string; 
    
    @Field()
    text: string; 
}

@Resolver()
export class PostResolver {
    @Query(()=> [Post])
    async posts(): Promise<Post[]> {
        return Post.find();
    }

    @Query(()=> Post, {nullable: true})
    post(@Arg("id") id: number): Promise<Post | undefined>  {
        return Post.findOne(id); 
    }
  
    @Mutation(() => Post)
    async createPost(
      @Arg("input") input: PostInput,
      @Ctx() { req }: MyContext
    ): Promise<Post> {
      return Post.create({
        ...input,
        // creatorId: req.session.userId,
      }).save();
    }
  

    @Mutation(()=>  Post)
    async updatePost(@Arg("name") name : string, @Arg("id") id : number): Promise<Post | null> {
        const post =await Post.findOne(id); 
        if(!post){
            return null ; 
        }
        if(typeof name !== undefined){
            await Post.update({id}, {name}); 
        }
        return post ; 
    }

    @Mutation(()=>Boolean)
    async deletePost(@Arg("id") id : number ): Promise<boolean> 
    {
        const post =await Post.findOne(id) ; 
        if(post){
        await post.remove(); 
        return true;  
        } 
        return true; 
    }

}