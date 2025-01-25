import { useEffect, useState } from "react";
import { CreateRaffleInput, Raffle, UpdateRaffleInput } from "../../API";
import { Button } from "../../components/Button";
import client from "../../graphql/client";
import { listRaffles } from "../../graphql/queries";
import { Stage1 } from "./stage1";
import { Stage2 } from "./stage2";
import { Stage3 } from "./stage3";
import { RaffleCard } from "../../components/RaffleContainers";
import { createRaffle, updateRaffle } from "../../graphql/mutations";
import { useNavigate, useParams } from "react-router";
import moment from "moment-timezone";

const emptyRaffle: CreateRaffleInput = {
    name: "",
    pid: "",
    images: [],
    start_date: "",
    end_date: "",
    drawing_date: "",
    patreon: false,
};

export const AdminRaffleForm = () => {
    // Set Start for the form
    const [raffle, setRaffle] = useState<UpdateRaffleInput | CreateRaffleInput>(emptyRaffle);
    const [stage, setStage] = useState(1);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { pid } = useParams();

    useEffect(() => {
        const fetchRaffle = async () => {
            try {
                const { data } = await client.graphql({
                    query: listRaffles,
                    variables: {
                        filter: { pid: { eq: pid } },
                    },
                });

                if (data.listRaffles.items.length > 0) {
                    const { id, name, patreon, images, start_date, end_date, drawing_date } = data.listRaffles.items[0];
                    setRaffle({
                        id,
                        name,
                        patreon,
                        images,
                        start_date: moment(start_date).format("YYYY-MM-DDTHH:mm:ss"),
                        end_date: moment(end_date).format("YYYY-MM-DDTHH:mm:ss"),
                        drawing_date: drawing_date ? moment(drawing_date).format("YYYY-MM-DDTHH:mm:ss") : "",
                    });
                }
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };

        if (pid) {
            fetchRaffle();
        }
    }, []);

    if (pid && loading) {
        return (
            <div className='max-w-96 mx-auto'>
                <p>Loading...</p>
            </div>
        );
    }

    if (pid || !raffle) {
        return (
            <div className='max-w-96 mx-auto'>
                <p>No raffle found</p>
            </div>
        );
    }

    const handleStage1 = (values: { name: string; patreon: boolean }) => {
        const data = { ...raffle, ...values };

        // Add pid if necessary
        if (!raffle.id) {
            data.pid = values.name.replace(/\s+/g, "-").toLowerCase();
        }
        setRaffle(data);
        setStage(2);
    };

    const handleStage2 = (images: string[]) => {
        setRaffle({ ...raffle, images });
        setStage(3);
    };

    const handleStage3 = (dates: { start_date: string; end_date: string; drawing_date: string }) => {
        setRaffle({ ...raffle, ...dates });
        setStage(4);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedRaffle = {
            ...raffle,
            start_date: moment(raffle.start_date).toISOString(),
            end_date: moment(raffle.end_date).toISOString(),
            drawing_date: raffle.drawing_date ? moment(raffle.drawing_date).toISOString() : null,
        };

        try {
            if (formattedRaffle.id) {
                await client.graphql({
                    query: updateRaffle,
                    variables: {
                        input: formattedRaffle as UpdateRaffleInput,
                    },
                });
            } else {
                await client.graphql({
                    query: createRaffle,
                    variables: {
                        input: formattedRaffle as CreateRaffleInput,
                    },
                });
            }
            navigate("/admin");
        } catch (error) {
            console.error("error", error);
        }
    };

    const NavButtons = (
        <div className='flex justify-between gap-4 '>
            {stage > 1 && <Button title='Back' onClick={() => setStage(stage - 1)} />}
            {stage <= 3 && <Button type='submit' title='Next' />}
            {stage === 4 && <Button type='submit' title='Submit' />}
        </div>
    );

    return (
        <div className='max-w-96 mx-auto'>
            <h1 className='text-4xl mb-2'>Raffle Form</h1>
            {stage === 1 && (
                <Stage1 updateForm={handleStage1} raffle={raffle}>
                    {NavButtons}
                </Stage1>
            )}
            {stage === 2 && (
                <Stage2 updateForm={handleStage2} raffle={raffle}>
                    {NavButtons}
                </Stage2>
            )}
            {stage === 3 && (
                <Stage3 updateForm={handleStage3} raffle={raffle}>
                    {NavButtons}
                </Stage3>
            )}
            {stage === 4 && (
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <RaffleCard raffle={raffle as Raffle} />
                    {NavButtons}
                </form>
            )}
        </div>
    );
};
