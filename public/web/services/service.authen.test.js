$(document).ready(function () {

    setInterval(()=>{

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    matching.getUsers('104610665900721852172', 'excitings')
=======
    matching.getUsers('104610665900721852172', 'exciting')
>>>>>>> 645882e50e9bdef17cb9de0ffa54f98d6ffd56d0
=======
    matching.getUsers('104610665900721852172', 'exciting')
>>>>>>> caf1e669bc32baca7e25c62e9ccfc75f67dfe6f2
=======
    matching.getUsers('104610665900721852172', 'exciting')
>>>>>>> caf1e669bc32baca7e25c62e9ccfc75f67dfe6f2
        .then((usersMatch)=>{
            console.log(usersMatch)
=======
    gps.getUsersInArea("101941526219391790665", "A")
        .then((ourLoc)=>{
            console.log("user near you", ourLoc)
            gps.updateGoogleMap('map',ourLoc)
>>>>>>> 5f5cc77ae6fe4a73cf75f138d56c2a873d84615c
        })
        .catch((error)=>{
            console.log("update error", error)
        })
    }, 10000)

    // gps.upSertLocation("101941526219391790667", "A")
    //     .then((users)=>{
    //         console.log("user near you", users)
    //     })
    //     .catch((error)=>{
    //         console.log("update error", error)
    //     })

});