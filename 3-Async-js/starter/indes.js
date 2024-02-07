const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  //executor function -- resolve -- success , reject---fail
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject("file doesn't found");
      //result of promise
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("couldnt save file");
      resolve("success");
    });
  });
};

const getDocPic = async () => {
  //autmatically gets data if there will be data
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    await writeFilePro("dog-img.txt", res.body.message);
    console.log("image saved to file");
  } catch (err) {
    console.log("err", err);
  }
};

getDocPic();

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(data);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("dog image saved");
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });

//callback hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`breed${data}`)

//     //begin as pending promise
//     //return result promise(fulfilled) or reject promise(Failed)
//     // superagent
//     //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     //     .then(res => {
//     //         console.log(res.body.message);

//     //         fs.writeFile('dog-img.txt', res.body.message, err => {
//     //             if (err) return console.log(err.message)

//     //             console.log('random dog imagefile saved')
//     //         })
//     //     }).catch(err => {
//     //         console.log(err.message)
//     //     })
// })
