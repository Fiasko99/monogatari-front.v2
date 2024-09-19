import area from '../area'
import createModal from '../create-modal'
import region from '../region'

const character = {
  path: '/character/:characterId',
  name: 'Character',
  component: () => import('@/views/character/CharacterPage.vue'),
  children: []
}

character.children.push(createModal([
  {
    ...region,
    to: region.name,
    from: character.name
  },
  {
    ...area,
    to: area.name,
    from: character.name
  },
]))

export default character