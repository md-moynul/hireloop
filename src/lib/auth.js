// dns for server error
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import { betterAuth } from "better-auth"; // Change back to standard import
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('hireloop-db');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                defaultValue: 'candidate'
            }
        }
    }
});