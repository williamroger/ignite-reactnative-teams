import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { useNavigation } from '@react-navigation/native';

export function NewGroup() {
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('players', { group: 'Rocket' });  
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

        <Input />

        <Button 
          onPress={handleNewGroup}
          title="Criar"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  )
}