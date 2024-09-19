import area from '../area'
import createModal from '../create-modal'
import region from '../region'

 const location = {
  path: '/location/:locationId',
  name: 'Location',
  component: () => import('@/views/location/LocationPage.vue'),
  children: []
}

location.children.push(createModal([
  {
    ...region,
    to: region.name,
    from: location.name
  },
  {
    ...area,
    to: area.name,
    from: location.name
  },
]))

export default location