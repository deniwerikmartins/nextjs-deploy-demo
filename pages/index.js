import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from 'mongodb';
import Head from "next/head";

function HomePage(props) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active react meetups!" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

/*export async function getServerSideProps(context) {

    const req = context.req;
    const res = context.res;

    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
}*/

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb://root:example@mongo:27017/meetups?authSource=admin');
    const db = client.db();

    const meetupsCollection = await db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1
    };
}

export default HomePage;