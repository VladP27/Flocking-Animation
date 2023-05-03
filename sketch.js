const flock = [];

let ShapeTypes = [1, 2, 3];   // 1 = square; 2 = circle; 3 = triangle 
let boidsCount = 120;
let diversity;                // [0 -> 1] [least diverse -> most diverse]
let BoidSize = 55; 
let inputlang, inputethn, inputmigr, inputspayg, inputpov, inputpsex, inputpsoc, inputpmigr, inputcrime, inputpeace;
let inputlangtitle, inputethntitle, inputmigrtitle, inputspaygtitle, inputpovtitle, inputpsextitle, inputpsoctitle, inputpmigrtitle, inputcrimetitle, inputpeacetitle;
let PosXDelta = 30;
let PosYDelta = 80;
let inputPosX = 1090;
let inputPosY = 15;
let submitbutton;

function setup() {
  createCanvas(1080, 1920);
  
  // Eingabefelder plus Buttons für die Daten

  // Formen
  inputlang = createInput();
  inputlang.position(inputPosX + PosXDelta / 3, inputPosY);
  inputlang.size(width / 8, height / 40);
  inputlang.style('font-size', '35px');
  inputlangtitle = createElement('h2', 'Anzahl gesprochener Sprachen (Mehr als 1% der Bevölkerung)');
  inputlangtitle.position(inputPosX + inputlang.width + PosXDelta, inputPosY)

  inputethn = createInput();
  inputethn.position(inputPosX + PosXDelta / 3, inputPosY + 1* PosYDelta);
  inputethn.size(width / 8, height / 40);
  inputethn.style('font-size', '35px');
  inputethntitle = createElement('h2', 'Anzahl ethnischer Gruppen ((Mehr als 1% der Bevölkerung))');
  inputethntitle.position(inputPosX + inputlang.width + PosXDelta, inputethn.y)

  inputmigr = createInput();
  inputmigr.position(inputPosX + PosXDelta / 3, inputPosY + 2* PosYDelta);
  inputmigr.size(width / 8, height / 40);
  inputmigr.style('font-size', '35px');
  inputmigrtitle = createElement('h2', 'Faktor Migration (Prozentanteil mit Kommazahl)');
  inputmigrtitle.position(inputPosX + inputlang.width + PosXDelta, inputmigr.y);

  // Bewegung
  inputspayg = createInput();
  inputspayg.position(inputPosX + PosXDelta / 3, inputPosY + 4* PosYDelta);
  inputspayg.size(width / 8, height / 40);
  inputspayg.style('font-size', '35px');
  inputspaygtitle = createElement('h2', 'Faktor Pay Gap Geschlecht (Prozentanteil mit Kommazahl)');
  inputspaygtitle.position(inputPosX + inputlang.width + PosXDelta, inputspayg.y);

  inputpov = createInput();
  inputpov.position(inputPosX + PosXDelta / 3, inputPosY + 5* PosYDelta);
  inputpov.size(width / 8, height / 40);
  inputpov.style('font-size', '35px');
  inputpovtitle = createElement('h2', 'Faktor Armutsrate (Prozentanteil mit Kommazahl)');
  inputpovtitle.position(inputPosX + inputlang.width + PosXDelta, inputpov.y);

  inputpsex = createInput();
  inputpsex.position(inputPosX + PosXDelta / 3, inputPosY + 6* PosYDelta);
  inputpsex.size(width / 8, height / 40);
  inputpsex.style('font-size', '35px');
  inputpsextitle = createElement('h2', 'PISA Studie Chancengleichheit Geschlecht (0 = Unterdurchschnittlich; 1 = Überdurchschnittlich)');
  inputpsextitle.position(inputPosX + inputlang.width + PosXDelta, inputpsex.y - 17);

  inputpsoc = createInput();
  inputpsoc.position(inputPosX + PosXDelta / 3, inputPosY + 7* PosYDelta);
  inputpsoc.size(width / 8, height / 40);
  inputpsoc.style('font-size', '35px');
  inputpsoctitle = createElement('h2', 'PISA Studie Chancengleichheit Sozialer Hintergrund (0 = Unterdurchschnittlich; 1 = Überdurchschnittlich)');
  inputpsoctitle.position(inputPosX + inputlang.width + PosXDelta, inputpsoc.y - 17);

  inputpmigr = createInput();
  inputpmigr.position(inputPosX + PosXDelta / 3, inputPosY + 8* PosYDelta);
  inputpmigr.size(width / 8, height / 40);
  inputpmigr.style('font-size', '35px');
  inputpmigrtitle = createElement('h2', 'PISA Studie Chancengleichheit Migrationshintergrund (0 = Unterdurchschnittlich; 1 = Überdurchschnittlich)');
  inputpmigrtitle.position(inputPosX + inputlang.width + PosXDelta, inputpmigr.y - 17);

  // Verhalten
  inputcrime = createInput();
  inputcrime.position(inputPosX + PosXDelta / 3, inputPosY + 10* PosYDelta);
  inputcrime.size(width / 8, height / 40);
  inputcrime.style('font-size', '35px');
  inputcrimetitle = createElement('h2', 'Kriminalitätsindex (Index)');
  inputcrimetitle.position(inputPosX + inputlang.width + PosXDelta, inputcrime.y);

  inputpeace = createInput();
  inputpeace.position(inputPosX + PosXDelta / 3, inputPosY + 11* PosYDelta);
  inputpeace.size(width / 8, height / 40);
  inputpeace.style('font-size', '35px');
  inputpeacetitle = createElement('h2', 'Friedensindex (Landesrankingposition)');
  inputpeacetitle.position(inputPosX + inputlang.width + PosXDelta, inputpeace.y);

  // Submit
  submitbutton = createButton ('submit');
  submitbutton.position(inputPosX , inputPosY + 22.5 * PosYDelta);
  submitbutton.size(200,100);
  submitbutton.style('font-size', '35px');
  submitbutton.mousePressed(generateNewShapes);
}

function generateNewShapes() {
  let exit = false;
  
  // Formeninput Prüfen
  if (isNaN(inputethn.value())){exit = true; alert('Anzahl ethnischer Gruppen muss eine Zahl sein!')}
  if (inputethn.value() < 0) {exit = true; alert('Anzahl ethnischer Gruppen muss größer als 0 sein!')}
  if (isNaN(inputlang.value())){exit = true; alert('Anzahl gesprochener Sprachen muss eine Zahl sein!')}
  if (inputlang.value() < 0) {exit = true; alert('Anzahl  gesprochener Sprachen muss größer als 0 sein!')}
  if (isNaN(inputmigr.value())){exit = true; alert('Migrationsanteil muss eine Zahl sein!')}
  if (inputmigr.value() < 0 || inputmigr.value() > 1) {exit = true; alert('Migrationsanteil muss zwischen 0 und 1 liegen!')}

  // Bewegunginput Prüfen
  if (isNaN(inputspayg.value())){exit = true; alert('Pay Gap Geschlecht muss eine Zahl sein!')}
  if (inputspayg.value() < 0 || inputspayg.value() > 1) {exit = true; alert('Pay Gap Geschlecht muss zwischen 0 und 1 liegen!')}
  if (isNaN(inputpov.value())){exit = true; alert('Armutsrate muss eine Zahl sein!')}
  if (inputpov.value() < 0 || inputpov.value() > 1) {exit = true; alert('Armutsrate muss zwischen 0 und 1 liegen!')}
  if (isNaN(inputpsex.value())){exit = true; alert('PISA Studie Chancengleichheit Geschlecht muss eine Zahl sein!')}
  if (inputpsex.value() < 0 || inputpsex.value() > 1) {exit = true; alert('PISA Studie Chancengleichheit Geschlecht muss zwischen 0 und 1 liegen!')}
  if (isNaN(inputpsoc.value())){exit = true; alert('PISA Studie Chancengleichheit Sozialer Hintergrund muss eine Zahl sein!')}
  if (inputpsoc.value() < 0 || inputpsoc.value() > 1) {exit = true; alert('PISA Studie Sozialer Hintergrund muss zwischen 0 und 1 liegen!')}
  if (isNaN(inputpmigr.value())){exit = true; alert('PISA Studie Chancengleichheit Migrationshintergrund muss eine Zahl sein!')}
  if (inputpmigr.value() < 0 || inputpmigr.value() > 1) {exit = true; alert('PISA Studie Migrationshintergrund muss zwischen 0 und 1 liegen!')}

  // Verhalteninput Prüfem
  if (isNaN(inputcrime.value())){exit = true; alert('Kriminalitätsrate muss eine Zahl sein!')}
  if (inputcrime.value() < 0 || inputcrime.value() > 1) {exit = true; alert('Kriminalitätsrate muss zwischen 0 und 1 liegen!')}
  if (isNaN(inputpeace.value())){exit = true; alert('Friedensindex muss eine Zahl sein!')}
  if (inputpeace.value() < 1 || inputpeace.value() > 163) {exit = true; alert('Friedensindex muss zwischen 1 und 163 liegen!')}

  if (exit == false) {
    flock.length = 0;
    diversity = getDiversity(inputethn.value(), inputlang.value(), inputmigr.value());
    let TypePercentage = ShapeTypesArray(diversity);
    console.log(TypePercentage);
    for (let i = 0; i < boidsCount; i++) {
      flock.push(new Boid(BoidSize, 1, random(TypePercentage), 
      getEquality(inputspayg.value(), inputpov.value(), inputpsex.value(), inputpsoc.value(), inputpmigr.value()),
      getTensions(inputcrime.value(), inputpeace.value())));
    }
  }
}

function draw() {
  background(80);

  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.edges();
    boid.show();
  }
}

function ShapeTypesArray(diversity) {
  let arr = [];
  let rest = [];
  let threshold;

  if (diversity < 0.2) {
    threshold = 100;
  } else if (diversity < 0.6) {
    threshold = 84;
  } else if (diversity < 0.8) {
    threshold = 65;
  } else {
    threshold = 50;
  }

  let element = random(ShapeTypes);
  for (i = 0; i < threshold; i++) {
    arr.push(element);
  } 
  for (i = 1; i < 4; i++) {
    if (i != element) {
      rest.push(i);
    }
  }
  for (i = threshold; i < 100; i ++) {
    arr.push(random(rest))
  }
  return arr;
}

function getDiversity(ethn, lang, migr) {
  let ethnRat = 0.4;
  let langRat = 0.2;
  let migrRat = 0.4;

  if (ethn > 3) {ehtn = 1} else {ethn = 0};
  if (lang > 3) {lang = 1} else {lang = 0};
  if (migr > 0.14) {migr = 1} else {migr = 0};

  return ethn * ethnRat + lang * langRat + migr * migrRat
}

function getEquality(spayg, pov, psex, psoc, pmigr) {
  let spayRat = 0.35;
  let povRat = 0.35;
  let psexRat = 0.1;
  let psocRat = 0.1;
  let pmigrRat = 0.1;

  // 0 no equality, 1 equality
  if (spayg > 0.1) {spayg = 0} else {spayg = 1};
  if (pov > 0.15) {pov = 0} else {pov = 1};
  if (psex > 0.5) {psex = 1} else {psex = 0};
  if (psoc > 0.5) {psoc = 1} else {psoc = 0};
  if (pmigr > 0.5) {pmigr = 1} else {pmigr = 0};

  //console.log(spayg * spayRat + pov * povRat + psex * psexRat + psoc * psocRat + pmigr * pmigrRat);
  return spayg * spayRat + pov * povRat + psex * psexRat + psoc * psocRat + pmigr * pmigrRat;
}

function getTensions(crime, peace) {
  let crimeRat = 0.5;
  let peaceRat = 0.5;

  // 0 no tensions, 1 tensions
  crime = crime / 100;
  peace = peace / 163;

  return crime * crimeRat + peace * peaceRat;

}