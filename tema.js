//De creat in database-ul tau o propietate noua care se numeste people -done
// de selectat 4 butonae in fisierul de js -done
//cele 4 butoane contin comenzi de create, update, get si delete -done
//cand apas pe butonul de get o sa vad in consola lista de oameni -done
//cand apas pe butonul de create o sa imi creeze un nou om in lista din server
//etc.
//propietatea people o sa fie identica cu cea de tasks numai ca in loc de text o sa avem nume

//ca sa pornesti serverul ai comanda asta npx json-server --watch db.json --port 3000

const Create = document.querySelector(".Create");
const Update = document.querySelector(".Update");
const Get = document.querySelector(".Get");
const Delete = document.querySelector(".Delete");

let people;

Create.addEventListener("click", () => {
  fetch("http://localhost:3000/people", {
    method: "POST",
    body: JSON.stringify({
      nume: "Edi",
      check: true,
    }),
  });
});

Update.addEventListener("click", () => {
  fetch(`http://localhost:3000/people/${"1234"}`, {
    method: "PUT",
    body: JSON.stringify({
      nume: "Marian",
      check: "nu stiuuu",
    }),
  });
});

Get.addEventListener("click", () => {
  fetch("http://localhost:3000/people")
    .then((res) => res.json())
    .then((data) => {
      people = data;
      console.log(people);
    })
    .catch(() => {
      console.log("nu ai scris bine api-ul");
    });
});

Delete.addEventListener("click", () => {
  fetch(`http://localhost:3000/people/${"1234"}`, {
    method: "DELETE",
  });
});
