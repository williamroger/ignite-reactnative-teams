import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';

export function NewGroup() {
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
          title="Criar"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  )
}