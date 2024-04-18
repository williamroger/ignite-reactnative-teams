import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION  } from '@storage/storageConfig';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { playersGetByGroup } from './playersGetByGroup';
import { AppError } from "@utils/AppError";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storagedPlayers = await playersGetByGroup(group);
    const playerAlreadyExists = storagedPlayers.filter(player => player.name === newPlayer.name);

    if (playerAlreadyExists.length) {
      throw new AppError('Esse jogador já está adicionado em um time aqui.');
    }

    const storage = JSON.stringify([...storagedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
    
  } catch (error) {
    throw error;
  }
}

