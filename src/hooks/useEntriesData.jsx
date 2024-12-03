import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { listRaffleEntries } from '../graphql/queries';
import { conf } from '../conf';

const client = generateClient();


export const useEntriesData = () => {
    const [entries, setEntries] = useState([]);
    const [nextToken, setNextToken] = useState(null);

    useEffect(() => {
        fetchEntries();
    }, [nextToken])


    async function fetchEntries() {
        try {
            const entryData = await client.graphql({
                query: listRaffleEntries,
                variables: {
                    filter: {
                        raffle_id: {eq: conf.raffle_id}
                    },
                    limit: 1000,
                    nextToken: nextToken
                }
            });

            // Get DB Entries
            const dbEntries = entryData.data.listRaffleEntries.items
            // Seperate Patreons

            // Remove duplicates
            const filteredDoubles = [...entries, ...dbEntries].filter((value, index, self) =>
                index === self.findIndex((t) => (t.email === value.email))
            )

            setEntries(filteredDoubles)

            // If next token add token
            if (entryData.data.listRaffleEntries.nextToken) {
                setNextToken(entryData.data.listRaffleEntries.nextToken);
            }

        } catch (err) { console.log('error fetching entries') }
    }

    return entries

}
