import { useState } from "react";
import { Button } from "./components/Button";
import { Raffle } from "./API";
import { generateClient } from "aws-amplify/api";
import { createRaffleEntry } from "./graphql/mutations";
import { listRaffleEntries } from "./graphql/queries";

const client = generateClient();

export const RaffleForm = ({ raffle }: { raffle: Raffle }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [existingUser, setExistingUser] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitting form", { name, email, raffle });
        // handleSubmit(name, email);
        const entry = {
            name,
            email,
            raffleID: raffle.id,
            raffle_id: raffle.pid,
            patreon: raffle.patreon,
        };

        const existingUser = await client.graphql({
            query: listRaffleEntries,
            variables: {
                filter: {
                    and: [{ email: { eq: email } }, { raffleID: { eq: raffle.id } }],
                },
            },
        });

        if (existingUser.data.listRaffleEntries.items.length > 0) {
            setExistingUser(true);
            return;
        }

        const { data } = await client.graphql({
            query: createRaffleEntry,
            variables: { input: entry },
        });

        if (data.createRaffleEntry) {
            setSubmitted(true);
        }
    };

    if (submitted) {
        return <p>Thank you for entering the raffle!</p>;
    }

    if (existingUser) {
        return (
            <div className='max-w-96 mx-auto text-center'>
                <p>You already entered this raffle!</p>
                <img src='https://media.giphy.com/media/3oKIPznTgmcQGOlqyA/giphy.gif?cid=790b76115qr3btt0qcjixyg7tgxcnt6lo6q51xjj02z636x1&ep=v1_gifs_search&rid=giphy.gif&ct=g' />
            </div>
        );
    }

    return (
        <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name' className='block text-sm font-medium'>
                    Name
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    id='name'
                    name='name'
                    className='bg-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    required
                />
            </div>
            <div>
                <label htmlFor='email' className='block text-sm font-medium'>
                    Email
                </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    id='email'
                    name='email'
                    className='bg-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    required
                />
            </div>
            <Button type='submit' title='Submit' />
        </form>
    );
};
