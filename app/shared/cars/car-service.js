import Car from './car-model';

const editableProperties = [
  'doors',
  'imageUrl',
  'luggage',
  'name',
  'price',
  'seats',
  'transmission',
  'class',
];

function CarService() {
  if (CarService._instance) {
    throw new Error('Use CarService.getInstance() instead of new.');
  }

  this._cars = [];
}
