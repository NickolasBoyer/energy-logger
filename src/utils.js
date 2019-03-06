import localforage from 'localforage'

const emptyDataTemplate = {}

// const emptyDataTemplate = {
//   "2019-03-06": Array(18).fill({}).map((d, i) => ({hour: i+6, energyRating: Math.floor(Math.random()*10)})),
//   "2019-03-05": Array(18).fill({}).map((d, i) => ({hour: i+6, energyRating: Math.floor(Math.random()*10)}))
// }

export function displayNotification() {
  console.log('Permission', Notification.permission)
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      console.log('then callback')
      var options = {
        body: 'Here is a notification body!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now()+1000*5,
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'images/xmark.png'},
        ]
      };
      // var notification = new Notification("Hi there!", options);
      reg.showNotification('Hello world!', options);
      console.log('show called')
    });
  }
}

export function getCurrentDate() {
  return (new Date()).toJSON().slice(0,10)
}

export function getCurrentHour() {
  return (new Date()).getHours()
}

export function getData() {
  return localforage.getItem('data')
    .then(value => (console.log('Got data: ', value), value || emptyDataTemplate))
    .catch(console.error)
}

export function resetData(newValue) {
  return localforage.clear()
}

function setData(newValue) {
  return localforage.setItem('data', newValue)
}

export function storeTimePoint(date, hour, energyRating) {
  console.log(date, hour, energyRating)
  getData()
    .then(function(data) {
      // if the hour already exists modify it
      if(data[date] && data[date].find(e => e.hour === hour)) return (data[date].find(e => e.hour === hour).energyRating = energyRating, setData(data))
      // add the data
      const newData = {
        ...data,
        [date]: [{ hour, energyRating }, ...(data[date] || [])]
      }
      console.log(newData)
      return setData(newData)
    })
    .then(function(value) {
      // Do other things once the value has been saved.
      console.log(value);
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
}