import area from '../area';
import createModal from '../create-modal';
import region from '../region';
import world from './world';

const regions = {
  path: '',
  name: 'Regions',
  component: () => import('@/views/regions/RegionsPage.vue'),
  children: []
}

regions.children.push(createModal([
  {
    ...region,
    to: region.name,
    from: regions.name
  },
  {
    ...area,
    to: area.name,
    from: regions.name
  }
]))

const active = {
  path: 'active',
  name: 'Active',
  component: () => import('@/views/active/ActivePage.vue'),
  children: []
}

active.children.push(createModal([
  {
    ...region,
    to: region.name,
    from: active.name
  },
  {
    ...area,
    to: area.name,
    from: active.name
  }
]))

const main = {
  path: '',
  component: () => import('@/views/main/MainPage.vue'),
  children: [
    regions,
    active,
    world,
  ]
}

export default main