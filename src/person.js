console.log('person.js is running!');

const isAdult = (x) => x >= 18;

const canDrink = (y) => {
  if(y > 21)
    return true;
  else
    return false;
};

export { isAdult, canDrink };