import express = require("express");
import "reflect-metadata";
import {createConnection} from "typeorm";

import { ApolloServer} from 'apollo-server-express'; 
import { buildSchema } from "type-graphql";

import { PostResolver } from "./resolvers/post";

import { UserResolver } from "./resolvers/user";

import session = require("express-session");
import connectRedis = require("connect-redis");
import redis = require("redis"); 
import { MyContext } from "./types";

const main= async() => {

  const RedisStore = connectRedis(session); 
  const redisClient = redis.createClient(); 
  
  
  const app = express(); 
  
  app.get("/", (res)=>{
    console.log("hello its working")
  })
  app.listen(3000)


  app.use(
    session({
      name: "qid", 
      store: new RedisStore({client: redisClient, disableTouch: true}),
      cookie:{
        maxAge: 1000*60*60*24*356*10, 
        httpOnly: true, 
        secure: false, 
        sameSite : 'lax', 
        
      } , 
      secret: "keyboard cat", 
      resave: false,
      saveUninitialized: false, 

    })
    
  )
  const apolo = new ApolloServer({
    schema : await buildSchema({
      resolvers: [PostResolver, UserResolver], 
      validate : false 
    })   , 
  
    context: ({req, res}) => ({res,req}) 
  }); 
  await apolo.start(); 
  await apolo.applyMiddleware({app}); 
 
  await  createConnection();
} 




main()

