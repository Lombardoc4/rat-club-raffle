import { useState, useEffect } from "react";
import moment from "moment-timezone";

import { Raffle } from "./API";
import { RaffleCardContainer, RaffleCard } from "./components/RaffleContainers";
import { listRaffles } from "./graphql/queries";
import client from "./graphql/client";



export const Home = () => {
    const [upcomingRaffles, setUpcomingRaffles] = useState<Raffle[]>([]);
    const [activeRaffles, setActiveRaffles] = useState<Raffle[]>([]);
    const [oldRaffles, setOldRaffles] = useState<Raffle[]>([]);

    useEffect(() => {

        const fetchRafflesData = async () => {
            const { data } = await client.graphql({query: listRaffles});

            // Add Raffles to state
            // Sort by upcoming, old, and active raffles
            data.listRaffles.items.map((r) => {
                // Upcoming
                if (moment(r.start_date).isAfter(moment())) {
                    setUpcomingRaffles((prev) => [...prev, r])
                // Old
                } else if (moment(r.end_date).isBefore(moment())) {
                    setOldRaffles((prev) => [...prev, r]);
                // Active
                } else {
                    setActiveRaffles((prev) => [...prev, r]);
                }
            });
        };

        fetchRafflesData();
    }, []);

    return (
        <>
            <h1 className='text-4xl font-bold mb-4'>Rat Club Raffles</h1>

            {upcomingRaffles.length > 0 && (
                <RaffleCardContainer title={"Upcoming Raffles" + (activeRaffles.length > 1 ? "s" : "")}>
                    {upcomingRaffles.map((r) => (
                        <RaffleCard key={r.name} raffle={r} />
                    ))}
                </RaffleCardContainer>
            )}

            {/* Active Raffles */}
            {activeRaffles.length > 0 && (
                <RaffleCardContainer title={"Current Raffle" + (activeRaffles.length > 1 ? "s" : "")}>
                    {activeRaffles.map((r) => (
                        <RaffleCard key={r.name} raffle={r} active />
                    ))}
                </RaffleCardContainer>
            )}

            {/* Old Raffles */}
            <RaffleCardContainer title='Past Raffles'>
                {oldRaffles.map((r) => (
                    <RaffleCard key={r.name} raffle={r} />
                ))}
            </RaffleCardContainer>
        </>
    );
};
