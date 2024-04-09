import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';

import { Container, Content, Icon } from './styles';
import { groupCreate } from '@storage/group/groupCreate';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      await groupCreate(group);
      navigation.navigate('players', { group });  
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight 
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input 
          placeholder="Nome da turma" 
          onChangeText={setGroup}
        />

        <Button 
          onPress={handleNewGroup}
          title="Criar"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  )
}