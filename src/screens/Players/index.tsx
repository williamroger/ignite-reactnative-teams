import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';

import { Container, Form } from './styles';

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome do participante" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </Form>
    </Container>
  )
}