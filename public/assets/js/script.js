const $animalForm = document.querySelector('#animal-form');
const $zookeeperForm = document.querySelector('#zookeeper-form');


const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };
  console.log('animalAdded', animalObject);
  //POST to server

  fetch('/api/animals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObject)
  })
    .then(response => {
      //high level / generic response with additional info
      console.log('fetch response', response);
      if (response.ok) {
        //converting JSON to produce a JavaScript object
        return response.json();
      }
      alert('Error: ' + response.statusText);
      //how to stop execute next then()??
      return;
    })
    .then(postResponse => {
      console.log('response.json()', postResponse);
      alert('Thank you for adding an animal!');
    })
};

const handleZookeeperFormSubmit = event => {
  event.preventDefault();

  //get zookeeper datea and organize it 
  const name = $zookeeperForm.querySelector('[name="zookeeper-name"]').value;
  //string to integer
  const age = parseInt($zookeeperForm.querySelector('[name = "age"]').value);
  const favoriteAnimal = $zookeeperForm.querySelector('[name="favorite-animal"]').value;
//age is a number
  const zookeeperObj = { name, age, favoriteAnimal };
  console.log('stringify', JSON.stringify(zookeeperObj));
  fetch('api/zookeepers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(zookeeperObj)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert('Error: ' + response.statusText);
    })
    .then(postResponse => {
      //age is a number
      console.log(postResponse);
      alert('Thank you for adding a zookeeper!')
    });
};


$zookeeperForm.addEventListener('submit', handleZookeeperFormSubmit);
$animalForm.addEventListener('submit', handleAnimalFormSubmit);
