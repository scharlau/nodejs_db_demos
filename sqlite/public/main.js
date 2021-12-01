const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')


// using fetch - see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
// to do this with sqlite will need to change queries
// either find 'all' name=darth, or find id of first
// same for delete version
update.addEventListener('click', _ => {
  fetch('/api/quotes', {
      method: 'patch',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          name: 'Darth Vader',
          quote: 'I find your lack of faith disturbing'
      })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
})

deleteButton.addEventListener('click', _ => {
    fetch('/api/quote/:id', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vader'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Darth Vader quote to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })
