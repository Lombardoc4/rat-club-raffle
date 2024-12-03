import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';


import Logo from './imgs/Will-Ramos-Saint-Candle.png'
import './drawing.css'
import { listWinners } from './graphql/queries';
import { createWinner } from './graphql/mutations';
import { conf } from './conf';
import { usePatreonData } from './hooks/usePatreonData';
import { useEntriesData } from './hooks/useEntriesData';

const client = generateClient();

export default function Winners() {
    const [winners, setWinners] = useState([]);
    const [winner, setWinner] = useState(' ');

    const [nextToken, setNextToken] = useState(null);

    const patreons = usePatreonData();
    const entries = useEntriesData();

    const raffleParams = new URLSearchParams(window.location.search.slice(0));
    const raffleID = raffleParams.get('raffle') || conf.raffle_id;


    useEffect(() => {
        fetchWinners();
    }, [nextToken])



    async function addWinner(winningEntry) {
        try {
            const newWinner = {
            "name": winningEntry.name,
            "email": winningEntry.email,
            "raffle_id": conf.raffle_id,
            }

            const addedData = await client.graphql({
                query: createWinner,
                variables: { input: newWinner }
              });

            setWinner(addedData.data.createWinner);

        } catch (err) {
            console.log('error creating winner:', err)
        }
    }


    async function fetchWinners() {
        try {
            const winnerData = await client.graphql({
                query: listWinners,
                variables: {
                    filter: {raffle_id: {eq: raffleID}},
                    limit: 1000,
                    nextToken: nextToken
                }
            })

            setWinners([...winners, ...winnerData.data.listWinners.items])

            if (winnerData.data.listWinners.nextToken) {
                setNextToken(winnerData.data.listWinners.nextToken);
            }
        } catch (err) { console.log('error fetching todos') }
    }


    const generateRandomWinner = () => {
        const allEntries = [...entries, ...patreons];

        const newWinner = allEntries[Math.floor(Math.random()*allEntries.length)];

        setWinners([...winners, newWinner])

        addWinner(newWinner)
    }


    return (
        <div className='drawing'>
            <img src={Logo} alt='The Rat Club' />

            <h2>{winner.name}</h2>
            <p style={{ fontSize: "0.66rem" }}>{winner.id}</p>

            {window.location.pathname.includes("will") && (
                <button onClick={() => generateRandomWinner()}>Generate Winner</button>
            )}

            <div className='entry-list'>
                <p>Total Winners: {winners.length}</p>
                {winners.map((winner, index) => (
                    <p key={winner.id + index}>
                        {winner.name}

                        {window.location.pathname.includes("will") && window.location.pathname.includes("emails") && <span> - {winner.email}</span>}
                    </p>
                ))}
            </div>
        </div>
    );
}
