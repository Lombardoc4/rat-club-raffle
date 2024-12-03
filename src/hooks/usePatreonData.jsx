import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { listRaffleEntries } from '../graphql/queries';
import { conf } from '../conf';

const client = generateClient();


export const usePatreonData = () => {
    const [patreons, setPatreons] = useState([]);
    const [nextToken, setNextToken] = useState(null);

    useEffect(() => {
        fetchPatreons();
    }, [nextToken])


    async function fetchPatreons() {
        try {
            // Bug some reason need 10000000 to show full results
            const patreonData = await client.graphql({
                query: listRaffleEntries,
                variables: {
                    filter: {
                        patreon: {eq: true},
                        raffle_id: {eq: conf.raffle_id}
                    },
                    limit: 1000,
                    nextToken: nextToken
                }
            });

            // Get DB Entries
            const patreonEntries = patreonData.data.listRaffleEntries.items.filter((value, index, self) =>
                index === self.findIndex((t) => (t.email === value.email))
            )


           if ( patreonData.data.listRaffleEntries.nextToken )
                setNextToken(nextToken);


            // Seperate Patreons
            setPatreons(patreonEntries);

        } catch (err) { console.log('error fetching patreons') }
    }

    return patreons

}
