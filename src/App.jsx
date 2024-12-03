import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';

import Logo from './imgs/Will-Ramos-Saint-Candle.png';
import './App.css';

// import {  API, graphqlOperation } from 'aws-amplify'
import { createRaffleEntry } from './graphql/mutations';
import { listRaffleEntries } from './graphql/queries';
import { conf } from './conf';

const validateInput = (name, options) => {
  if (name.length <= options.minLength)
    return false;

  if (options.type && typeof name !== options.type)
    return false;

  if (options.contains && !name.includes(options.contains))
    return false;

  return true;
}

const JoinPatreon = () => {
  return (
    <>
      <p>This raffle is exclusively for Patreons</p>
      <a className='button pink-btn' href="https://www.patreon.com/thewillramos">
          Join The Rat Club
      </a>
    </>
  )
}

const client = generateClient();


function RaffleForm() {
    const [submitted, setSubmitted] = useState(false);
    const [resubmitted, setResubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const raffleParams = (new URLSearchParams(window.location.search.slice(0))).get('raffle');

    const handleSubmit = async (e) => {
        e.preventDefault();


        // validate inputs
        if (!validateInput(name, {minLength: 0, type:"string"})) return;
        if (!validateInput(email, {minLength: 0, type:"string", contains: '@'})) return;

        // Check to see if email is already been used
        const emailExist = await client.graphql({
          query: listRaffleEntries,
          variables: {
            filter: {
              email: {eq: email},
              raffle_id: {eq: conf.raffle_id}
            }
          }
        })

        // const emailPrefix = email.split('@')[0];
        // const existingStore = localStorage.getItem(conf.raffle_id)
        // if (existingStore.includes(emailPrefix)) {
        //   setResubmitted(true)
        //   return;
        // }

        if (!emailExist.data.listRaffleEntries.items || emailExist.data.listRaffleEntries.items.length === 0) {
          await addEntry();

          // Add localStorage value to prevent user from using multiple emails
          // let storeVal = emailPrefix;
          // if (existingStore) {
          //   storeVal += `,${existingStore}`
          // }
          // localStorage.setItem(conf.raffle_id, storeVal);

        } else {
          setResubmitted(true)
          return;
        }

        setSubmitted(true);
    };

    async function addEntry() {
      try {
        const entry = {
          "name": name,
          "email": email,
          "raffle_id": conf.raffle_id,
          "patreon": raffleParams === conf.raffle_id
        }

        await client.graphql({
          query: createRaffleEntry,
          variables: { input: entry }
        });
      } catch (err) {
        console.log('error creating entry:', err)
      }
    }

    if (resubmitted) {
      return (

        <>
          <h1>Good try, only one submission</h1>
          <img src="https://media.giphy.com/media/3oKIPznTgmcQGOlqyA/giphy.gif?cid=790b76115qr3btt0qcjixyg7tgxcnt6lo6q51xjj02z636x1&ep=v1_gifs_search&rid=giphy.gif&ct=g"/>
        </>
      )
    }

    return (
        <form id="raffle-form" onSubmit={handleSubmit}>
          <img src={Logo} alt="The Rat Club" style={{maxHeight: '300px', width: 'unset'}} />

          { submitted && (
            <>
              <h1>Thanks for you submission</h1>
              <p>Drawing is on {conf.raffle_drawing_date}</p>
            </>
          )}
          {!submitted && (
            <>
              {/* <h1>Raffles Closed</h1> */}
              <p>
                  {Date.now() < new Date(conf.raffle_ending_date).getTime() ? 'Enter to Win:' : 'Raffles Closed'}<br/>
                  <i style={{fontSize: '1.5rem'}}>{conf.raffle_item}</i>
              </p>


            {Date.now() < new Date(conf.raffle_ending_date).getTime() &&
              <>
              { Date.now() > new Date(conf.raffle_opening_date).getTime() ?
                <>
                <p>Raffle Closes:<br/> {new Date(conf.raffle_ending_date).toLocaleString()} EST</p>

                { (conf.patreon_only && raffleParams === conf.raffle_id)   ?
                <>
                <input type="text" id="name" placeholder="Name" onChange={e => setName(e.target.value)}/>
                <input type="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <button type="submit">Enter Now</button>
                </>
                :
                <JoinPatreon/>
              }

              </>
              :
              <>
                <p>Raffle Opens:<br/> {new Date(conf.raffle_opening_date).toLocaleString()}</p>
                <JoinPatreon/>
              </>
              }
              </>
            }

            </>
          )}
        </form>
    );
}

export default RaffleForm;
