const getHedgehogs = () => {
  $('#hedgehog-info').html('');

  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
  //makes call to api 
    .then(response => response.json())
    // turns the response into json 
    .then(hedgehogs => appendHedgehogs(hedgehogs))
    //passes above json formatted object to function below, allows us to get resonse how we want it formatted in html
    .catch(error => console.error({ error }));
    // catch is the error failswitch, will display error code to console log
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

const addNewHedgehog = () => {
  var name = getElementById("name").value
  var hogCount = getElementById("hoglets").value
  var allergies = getElementById("allergies").value
  
  fetch('https://hedgehog-party.herokuapp.com/api/v1/invites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      hoglets: hogCount,
      allergies: allergies
    })
  })
  .then(response => response.json())
  .then(hedgehogs => appendHedgehogs(hedgehogs))
  .catch(error => console.error({ error }));  
};

const unInviteHedgehog = () => {
  
};

getHedgehogs();

$('#invite-btn').on('click', addNewHedgehog);

$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
