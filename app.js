window.onload = function () {
  const imageRandom = document.getElementById("Random_Dog");

  function getRandomImage() {
    const randomImFetchAgeUrl = "https://dog.ceo/api/breeds/image/random";

    // we are using fetch api to make rest api calls. you can use axios use.
    // we are also using promises here.
    fetch(randomImFetchAgeUrl)
      .then(function (response) {
        // we get raw response. need to first convert it into json format so we can use the data easily
        return response.json();
      })
      .then(function (json) {
        // now we got the json . we can use this to update any data in html
        console.log(json);
        var imageUrl = json.message;
        //update the image with new random url
        imageRandom.src = imageUrl;
      })
      .catch(function (error) {
        // if any error occurs like no internet connection then this callback will be called
        console.log(error);
      });
  }

  //call the getRandomImage function whenever page loads
  getRandomImage();

  button = document.getElementById("Submit_Button");

  button.addEventListener("click", function() {
    document.getElementById("DB").innerHTML = '';
    input = document.getElementById("Input_Name").value;
    InputName = input.charAt(0).toUpperCase() + input.slice(1);
    FetchGender = fetch(`https://api.genderize.io?name=${input}`);
    FetchAge = fetch(`https://api.agify.io/?name=${input}`);
    FetchNationality = fetch(`https://api.nationalize.io/?name=${input}`);
    Promise.all([FetchGender,FetchAge,FetchNationality])
    .then((values) => {
      return Promise.all(values.map((value) => {
        return value.json();
      })
      );
    })
    // .then((values) => {
    //   console.log(values);
    // })
    .then((data) => {
      let name = document.createElement('p');
      name.textContent = `Name: ${InputName}`;
      document.getElementById('DB').appendChild(name);
      let gender = document.createElement('p');
      gender.textContent = `Gender: ${data[0].gender}`;
      document.getElementById('DB').appendChild(gender);
      console.log(gender);
      let age = document.createElement('p');
      age.textContent = `Age: ${data[1].age}`;
      document.getElementById('DB').appendChild(age);
      console.log(age);
      let nationality = document.createElement('p');
      nationality.textContent = `Country: ${data[2].country[0].country_id}`;
      document.getElementById('DB').appendChild(nationality);
      console.log(nationality);
    })
    .catch(err=>{
      console.log("ERROR!");
    })
  });
};
