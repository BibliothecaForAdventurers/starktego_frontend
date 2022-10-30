import axios from 'axios';
import { number } from 'starknet';
import internal from 'stream';

const SERVER_URL = "http://ec2-3-253-6-99.eu-west-1.compute.amazonaws.com:8000/"

//
// GETTERS
//

export async function getLocation(
  game_id: number,
  player_id: number,
): Promise<string> {
  const response = await axios.get(SERVER_URL + "get_location", {
    params: {
      game_id: game_id,
      player_id: player_id,
    }
  })
  return response.data
}

interface validLocations {
  x: number;
  y: number;
  hash: string;
}

export async function getMoveableLocations(
  game_id: number,
  player_id: number,
): Promise<validLocations[]> {
  const response = await axios.get(SERVER_URL + "get_moveable_locations", {
    params: {
      game_id: game_id,
      player_id: player_id,
    }
  })
  console.log(response)
  return response.data
}

//
// SETTERS
//

export async function setLocation(
  game_id: number,
  player_id: number,
  location: number[],
) {
  await axios.post(SERVER_URL + "set_location", {
    game_id: game_id,
    player_id: player_id,
    location: {
      x: location[0],
      y: location[1],
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function setPlayerData(
  game_id: number,
  random_number: number,
  location: number[]
): Promise<number> {
  const response = await axios.post(SERVER_URL + "set_player_data", {
    game_id: game_id,
    random_number: random_number,
    location: {
      x: location[0],
      y: location[1],
    },
    unit_id: 0,
  })
  console.log(response)
  return response.data
}
