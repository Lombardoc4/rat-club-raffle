import { generateClient } from "aws-amplify/api";
import { Button } from "../components/Button";
import { handleSignOut } from "./utils";
import { useState, useEffect } from "react";
import { Raffle, Winner } from "../API";
import { RaffleGroupContainer, RaffleContainer } from "../components/RaffleContainers";
import { listRafflesDetailed } from "../graphql/custom-queries";
import moment from "moment";
import { deleteRaffle } from "../graphql/mutations";
import { Link } from "react-router";

const client = generateClient();


export const Dashboard = () => {
    const [raffles, setRaffles] = useState<Raffle[]>([]);
    const [upcomingRaffles, setUpcomingRaffles] = useState<Raffle[]>([]);
    const [winnerlessRaffles, setWinnerlessRaffles] = useState<Raffle[]>([]);
    const [activeRaffles, setActiveRaffles] = useState<Raffle[]>([]);
    const [oldRaffles, setOldRaffles] = useState<Raffle[]>([]);

    const removeRaffle = async (raffle: Raffle) => {
        try {

            const { data } = await client.graphql({
                query: deleteRaffle,
                variables: { input: { id: raffle.id } },
            });

            if (data) {
                setRaffles((prev) => prev.filter((r) => r.pid !== raffle.pid));
                setUpcomingRaffles((prev) => prev.filter((r) => r.pid !== raffle.pid));


            }
        } catch (err) {
            console.log("Error deleting raffle", err);
        }
    }

    const sortRaffles = () => {
        const now = moment();
        raffles.map((r) => {
            // Sort by old and active raffles
            if (moment(r.start_date).isAfter(now)) {
                setUpcomingRaffles((prev) => [...prev, r]);
            } else if (moment(r.end_date).isBefore(now)) {
                // Check if raffle has no winners
                if ((r.Winners?.items as Winner[]).length <= 0) {
                    setWinnerlessRaffles((prev) => [...prev, r]);
                    return;
                }

                setOldRaffles((prev) => [...prev, r]);
            } else {
                setActiveRaffles((prev) => [...prev, r]);
            }
        });
    }

    useEffect(() => {
        const fetchRafflesData = async () => {
            const { data } = await client.graphql({ query: listRafflesDetailed });
            setRaffles(data.listRaffles.items as Raffle[]);
        };

        fetchRafflesData();
    }, []);

    useEffect(() => {
        raffles.length > 0 && sortRaffles();

    }, [raffles]);


    return (
        <main className='pt-4'>
            <div className='fixed top-4 right-4 flex gap-4'>
                <Link to='/admin/create'>
                    <Button title='Create' />
                </Link>

                <Button title='Logout' onClick={handleSignOut} />
            </div>
            <h1 className='text-4xl'>Admin Home</h1>

            {/* // Add need Container for raffles that new to declare winner */}

            {/* Upcming Raffles */}
            {upcomingRaffles.length > 0 && (
                <RaffleGroupContainer title={"Upcoming"}>
                    {upcomingRaffles.map((r) => (
                        <RaffleContainer key={r.name} raffle={r} removeRaffle={removeRaffle} />
                    ))}
                </RaffleGroupContainer>
            )}

            {/* Winnerless Raffles */}
            {winnerlessRaffles.length > 0 && (
                <RaffleGroupContainer title={"Waiting for Winner"}>
                    {winnerlessRaffles.map((r) => (
                        <RaffleContainer key={r.name} raffle={r} detailed />
                    ))}
                </RaffleGroupContainer>
            )}

            {/* Active Raffles */}
            {activeRaffles.length > 0 && (
                <RaffleGroupContainer title={"Current Raffle" + (activeRaffles.length > 1 ? "s" : "")}>
                    {activeRaffles.map((r) => (
                        <RaffleContainer key={r.name} raffle={r} active detailed />
                    ))}
                </RaffleGroupContainer>
            )}

            {/* Old Raffles */}
            <RaffleGroupContainer title='Past Raffles'>
                {oldRaffles.map((r) => (
                    <RaffleContainer key={r.name} raffle={r} detailed />
                ))}
            </RaffleGroupContainer>
        </main>
    );
}