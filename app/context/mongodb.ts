import { MongoClient, MongoClientOptions  } from "mongodb";

if (!process.env.MONGO_URI) {
    throw new Error('missing env variable: mongo_uri')
}

const uri = process.env.MONGO_URI
const options: MongoClientOptions = {}

let client 
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {

    // this is for typescript to make sure there isn't errors
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options)
        globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
} else {

    client = new MongoClient(uri, options) 
    clientPromise = client.connect()
}


export default clientPromise