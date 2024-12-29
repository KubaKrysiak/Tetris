const klocki = {
    klocek1: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 0],
    ],
    klocek2: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
    ],
    klocek3: [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
    ],
    klocek4: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
    ],
    klocek5: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
    ],
    klocek6: [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    klocek7: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
    ],
};

const matrix = document.getElementById("main_js");
const kolory = ['blue','green','orange','purple','yellow','red','blue2'];
kolor = kolory[Math.floor(Math.random()*kolory.length)];


let klocek = klocki['klocek'+Math.ceil(Math.random()*7)];
const rows = 20;
const columns = 10;
let plansza = Array.from({ length: rows }, () => Array(columns).fill(0));

let column = Math.floor(Math.floor(Math.random()*(10-szerokosc(klocek))) );
let row = Math.floor((rows / 4) - (klocek.length / 2));

function dodajKlocekNaPlansze(plansza, klocek, startRow, startCol) { // dodanie klocka na plansze, gdzie zaczyna sie jego pozycja na startRow i startCol
    for (let i = 0; i < klocek.length; i++) {
        for (let j = 0; j < klocek[i].length; j++) {
            if (klocek[i][j] === 1) {
                const row = startRow + i;
                const col = startCol + j;
                if (row >= 0 && row < plansza.length && col >= 0 && col < plansza[0].length) {
                    plansza[row][col] = 1;
                }
            }
        }
    }
}

function usunPelneWiersze(plansza) { // usuwa wiersze gdzie sa same 1 i dodaje z 0 na górze
    const noweWiersze = plansza.filter(row => row.includes(0));
    while (noweWiersze.length < plansza.length) {
        noweWiersze.unshift(Array(plansza[0].length).fill(0));
    }
    return noweWiersze;
}

function szerokosc(T) {
  let left = T[0].length;  // Inicjalizujemy lewe ograniczenie jako liczbę kolumn
  let right = -1;  // Inicjalizujemy prawe ograniczenie jako -1

  // Przechodzimy przez całą tablicę i szukamy pierwszej i ostatniej kolumny z danymi
  for (let i = 0; i < T.length; i++) {
    for (let j = 0; j < T[i].length; j++) {
      if (T[i][j] !== null && T[i][j] !== undefined && T[i][j] !== ''&& T[i][j] !== 0) {
        left = Math.min(left, j); // Pierwsza kolumna z danymi
        right = Math.max(right, j); // Ostatnia kolumna z danymi
      }
    }
  }

  // Jeśli nie znaleziono żadnych danych, zwracamy 0
  if (right === -1) return 0;

  // Liczymy liczbę kolumn między pierwszą a ostatnią kolumną z danymi
  return right - left + 1;
}

function rysujKlocek(klocek, kolor, column, row) {
    const nr = parseInt(Object.values(klocki).indexOf(klocek)) + 1;
    const margin = 5 * column - 15;
    const height = 5* row + 15;
    document.getElementById("main_js").innerHTML =
        `<img style="bottom: ${height}vh; position: relative; left:${margin}vh" 
        class="klocek_menu" src="images/Tetr${nr}_${kolor}.png">`;
}

function przesunKlocek(kierunek) {
    if (kierunek === 'left' && column > 0) column--;
    if (kierunek === 'right' && column < 10 - szerokosc(klocek)) column++;
    if (kierunek === 'down' && row > -11) row--;
    rysujKlocek(klocek, kolor, column, row);
}

function startgame(){

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' || event.key === 'd') przesunKlocek('right');
        else if (event.key === 'ArrowLeft' || event.key === 'a') przesunKlocek('left');
        else if (event.key === 'ArrowDown' || event.key === 's' || event.key === ' ') przesunKlocek('down');
    });

}
