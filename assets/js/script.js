// AOS
AOS.init()

// Ambil elemen musik
var music = document.querySelector('.music');

function mulai() {
  // back to top
  window.scrollTo(0, 0);

  // play sound door
  var soundDoor = document.querySelector('.sound-door');
  if (soundDoor) soundDoor.play();

  // door section
  var doorSection = $('#door-section');
  var doors = document.querySelectorAll('.door');

  // animasi pintu
  doors.forEach(function (door, index) {
    var direction = (index === 0) ? -1 : 1;
    door.style.transition = 'transform 0.8s ease';
    door.style.transform = 'rotateY(' + (70 * direction) + 'deg)';
  });

  // setelah pintu terbuka
  setTimeout(function () {
    if (music) music.play(); // play musik
    doorSection.css('transform', 'scale(6)');
  }, 600);

  // setelah transisi selesai
  setTimeout(function () {
    doorSection.css('opacity', '0');
    $('body').removeClass('overflow-hidden');
    $('body').addClass('transition');
    doorSection.css('display', 'none');
  }, 2000);
}


// button music
var isPlaying = true;

function toggleMusic(event) {
  event.preventDefault();

  const musicIcon = document.getElementById('music-icon');
  const musicButton = document.getElementById('music-button');

  if (isPlaying) {
    musicIcon.classList.remove('fa-compact-disc', 'rotate');
    musicIcon.classList.add('fa-pause');
    music.pause();
  } else {
    musicIcon.classList.remove('fa-pause');
    musicIcon.classList.add('fa-compact-disc', 'rotate');
    music.play();
  }

  isPlaying = !isPlaying;
}


// countdown wedding
var countdownDate = new Date("Feb 10, 2026 10:00:00").getTime();

// update UI pertama kali
function renderCountdown() {
  document.getElementById("countdown-wedding").innerHTML = `
    <div class="col-lg-2 col-3">
      <div class="countdown-box"><h5 id="days">0</h5><small>Hari</small></div>
    </div>
    <div class="col-lg-2 col-3">
      <div class="countdown-box"><h5 id="hours">0</h5><small>Jam</small></div>
    </div>
    <div class="col-lg-2 col-3">
      <div class="countdown-box"><h5 id="minutes">0</h5><small>Menit</small></div>
    </div>
    <div class="col-lg-2 col-3">
      <div class="countdown-box"><h5 id="seconds">0</h5><small>Detik</small></div>
    </div>
  `;
}
renderCountdown();

function animateChange(el, newValue) {
  if (el && el.textContent != newValue) {
    el.textContent = newValue;
    el.classList.remove("animate"); // reset dulu
    void el.offsetWidth; // trick biar reflow ulang
    el.classList.add("animate");
  }
}

var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-wedding").innerHTML =
      "<span class='text-center p-3 rounded text-dark m-2'><h2>Sudah dimulai!</h2></span>";
    return;
  }

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  animateChange(document.getElementById("days"), days);
  animateChange(document.getElementById("hours"), hours);
  animateChange(document.getElementById("minutes"), minutes);
  animateChange(document.getElementById("seconds"), seconds);
}, 1000);



// nama sambutan
const urlParams = new URLSearchParams(window.location.search);
const panggilan = urlParams.get('p');
const nama = urlParams.get('n');
const namaSambutan = document.querySelector('#nama-sambutan');
namaSambutan.innerText = `${panggilan} ${nama}`;


// copy text
function copyText(el) {
  var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim();
  var temp = document.createElement("textarea");
  document.body.appendChild(temp);
  temp.value = content.replace(/\s+/g, '');
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);

  jQuery(el).text('Berhasil di copy');
  setTimeout(function () {
    jQuery(el).html('<i class="fas fa-regular fa-copy"></i> Copy');
  }, 2000);
}

// form rsvp

window.addEventListener("load", function () {
  const form = document.getElementById('rsvp-form');
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const status = document.getElementById('status').value;
    const nama = document.getElementById('nama').value.trim();

    if (nama === "") {
      Swal.fire({
        icon: "error",
        text: "Nama harus diisi!"
      });
      return;
    }

    if (status == "0") {
      Swal.fire({
        icon: "error",
        text: "Pilih salah satu status terlebih dahulu!"
      });
      return;
    }

    const data = new FormData(form);
    const action = e.target.action;
    const input = form.querySelectorAll('input, select, button');
    input.forEach(input => {
      input.disabled = true;
    });

    fetch(action, {
      method: 'POST',
      body: data
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Konfirmasi kehadiran Anda berhasil terkirim!"
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error
        });
      })
      .finally(() => {
        input.forEach(input => {
          input.disabled = false;
        });
      });
  });
});

function toggleDoa(button) {
  const doaContent = button.nextElementSibling;
  if (doaContent.style.display === "none" || doaContent.style.display === "") {
    doaContent.style.display = "block";
    button.innerHTML = '<i class="fas fa-book"></i> Tutup Doa';
  } else {
    doaContent.style.display = "none";
    button.innerHTML = '<i class="fas fa-book-open"></i> Lihat Doa';
  }
}

// form komentar

  const sheetName = 'Komentar'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost(e) {
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName(sheetName)

  let nama = ""
  let pesan = ""

  if (e.postData && e.postData.type === "application/json") {
    // kalau kirim JSON
    const data = JSON.parse(e.postData.contents)
    nama = data.nama
    pesan = data.pesan
  } else {
    // kalau kirim FormData
    nama = e.parameter.nama
    pesan = e.parameter.pesan
  }

  sheet.appendRow([new Date(), nama, pesan])

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON)
}

function doGet(e) {
  const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  const sheet = doc.getSheetByName(sheetName)
  const data = sheet.getDataRange().getValues()

  const result = []
  for (let i = 1; i < data.length; i++) {
    result.push({
      nama: data[i][1],
      pesan: data[i][2]
    })
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON)
}
