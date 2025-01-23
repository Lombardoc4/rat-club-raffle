import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listRaffles } from "./graphql/queries";
import { Raffle } from "./API";
import { RaffleGroupContainer, RaffleContainer } from "./components/RaffleContainers";
import { listRafflesDetailed } from "./graphql/custom-queries";
import moment from "moment";

const client = generateClient();

export const Home = () => {
    const [upcomingRaffles, setUpcomingRaffles] = useState<Raffle[]>([]);
    const [activeRaffles, setActiveRaffles] = useState<Raffle[]>([]);
    const [oldRaffles, setOldRaffles] = useState<Raffle[]>([]);


    useEffect(() => {

        const fetchRafflesData = async () => {
            const { data } = await client.graphql({query: listRaffles});
            const allRaffles = data.listRaffles.items;
            // Add Raffles to state
            allRaffles.map((r) => {
                // Sort by upcoming, old, and active raffles
                if (moment(r.start_date).isAfter(moment())) {
                    setUpcomingRaffles((prev) => [...prev, r])
                } else if (moment(r.end_date).isBefore(moment())) {
                    setOldRaffles((prev) => [...prev, r]);

                } else {
                    setActiveRaffles((prev) => [...prev, r]);
                }
            });
        };
        fetchRafflesData();
    }, []);

    return (
        <main className='pb-12 lg:pb-16 container'>
            <h1 className='text-4xl font-bold mb-4'>Rat Club Raffles</h1>

            {upcomingRaffles.length > 0 && (
                <RaffleGroupContainer title={"Upcoming Raffles" + (activeRaffles.length > 1 ? "s" : "")}>
                    {upcomingRaffles.map((r) => (
                        <RaffleContainer key={r.name} raffle={r} />
                    ))}
                </RaffleGroupContainer>
            )}

            {/* Active Raffles */}
            {activeRaffles.length > 0 && (
                <RaffleGroupContainer title={"Current Raffle" + (activeRaffles.length > 1 ? "s" : "")}>
                    {activeRaffles.map((r) => (
                        <RaffleContainer key={r.name} raffle={r} active />
                    ))}
                </RaffleGroupContainer>
            )}

            {/* Old Raffles */}
            <RaffleGroupContainer title='Past Raffles'>
                {oldRaffles.map((r) => (
                    <RaffleContainer key={r.name} raffle={r} />
                ))}
            </RaffleGroupContainer>
        </main>
    );
};
