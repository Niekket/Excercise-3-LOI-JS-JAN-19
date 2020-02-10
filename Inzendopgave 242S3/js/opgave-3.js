function allID(id) {
  return document.getElementById(id);
}

var geboortedatum = allID("geboortedatum");
var bedrag = allID("bedrag");
var rente = allID("rentepercentage");
var uitvoer = allID("uitvoer");
var error = allID("uitvoer");

function allEvents() {
  allID("btn").onclick = function() {
    if (datumCheck(geboortedatum.value) == true) {
      if (bedragCheck(bedrag) == true) {
        if (renteCheck(rente.value) == true) {
          saldoJaar();
        }
      }
    }
  };
}

allEvents();

function datumCheck(datumCheck) {
  var patternDatum = /^\d{2}-\d{2}-\d{4}$/;
  error.style.color = "black";
  var resultDatum = false;

  if (patternDatum.test(datumCheck) == false) {
    error.style.color = "red";
    error.innerHTML = "Vorm van geboortedatum is onjuist";
  } else {
    resultDatum = true;
  }
  return resultDatum;
}

function bedragCheck(bedragCheck) {
  error.style.color = "black";
  var resultBedrag = false;

  if (isNaN(bedragCheck.value) || bedragCheck.value == 0) {
    if (isNaN(bedragCheck.value)) {
      error.style.color = "red";
      error.innerHTML = "Voer een geldig getal in a.u.b.";
      bedrag.value = 0;
    } else if (bedragCheck.value == 0) {
      error.style.color = "red";
      error.innerHTML = "Voer een getal hoger dan 0 in a.u.b";
      bedrag.value = 0;
    }
  } else {
    resultBedrag = true;
  }
  return resultBedrag;
}

function renteCheck(renteCheck) {
  error.style.color = "black";
  var patternRente = /^\d{1,2},?\d{0,2}$/;
  var resultRente = false;

  if (rente.value == 0 || patternRente.test(renteCheck) == false) {
    if (rente.value == 0) {
      error.style.color = "red";
      error.innerHTML = "Voer een getal hoger dan 0 in a.u.b";
      rente.value = 0;
    } else if (patternRente.test(renteCheck) === false) {
      error.style.color = "red";
      error.innerHTML = "Voer een geldig percentage in. bv. (1,75 of 0,25)";
      rente.value = 0;
    }
  } else {
    resultRente = true;
  }
  return resultRente;
}

function saldoJaar() {
  var bedragInvoer = parseInt(bedrag.value);
  var renteInvoer = parseFloat(rente.value.replace(",", ".").replace(" ", ""));

  var verdubbelBedrag = bedragInvoer * 2;
  var optelRente = (renteInvoer + 100) / 100;
  var rentePerJaar = bedragInvoer * optelRente;

  var saldo = "";
  var i = 1;

  while (rentePerJaar < verdubbelBedrag) {
    saldo += " saldo op de bank na " + i + " jaar rente = ";
    saldo += rentePerJaar.toFixed(2) + "<br>";
    rentePerJaar *= optelRente;
    i++;
  }
  uitvoer.innerHTML = saldo;
}
