import { useEffect, useState, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (!newPlayerName.trim().length) {
      return Alert.alert('Novo jogador', 'Informe o nome do jogador para adicionar.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef?.current?.blur();
      setNewPlayerName('');
      fecthPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo jogador', error.message);
      } else {
        console.log(error);
        Alert.alert('Novo jogador', 'Não foi possível adicionar o novo jogador')
      }
    }
  }

  async function fecthPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Jogadores', 'Não foi possível carregar os jogadores desse time.')
    }
  }

  useEffect(() => {
    fecthPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input 
          inputRef={newPlayerNameInputRef}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder="Nome do participante" 
          autoCorrect={false} 
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />

        <ButtonIcon 
          icon="add" 
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A','Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={team === item} 
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>
      </HeaderList>
      
      <FlatList 
        data={players}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <PlayerCard name={item.name} onRemove={() => console.log('remove...')} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Não há participantes neste time."
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, !players.length && { flex: 1 }]}
      />

      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  )
}