import { MongoClient } from 'mongodb'

async function handler (req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb://root:example@mongo:27017/meetups?authSource=admin');
        const db = client.db();

        const meetupsCollection = await db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup was successfully created!'});
    }
}

export default handler;