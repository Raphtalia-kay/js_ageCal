const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const arrow = document.getElementById("arrow");

const errorMessageDay = document.getElementById("error_message_day");
const errorMessageMonth = document.getElementById("error_message_month");
const errorMessageYear = document.getElementById("error_message_year");

const yearOuput = document.getElementById("output_year");
const monthOuput = document.getElementById("output_month");
const dayOuput = document.getElementById("output_day");

const data = new Date();

day.addEventListener("input", () => {
  focusNext();
});

month.addEventListener("input", () => {
  focusNext();
});

arrow.addEventListener("click", (e) => {
  errorMessageDay.innerText = "";
  errorMessageMonth.innerText = "";
  errorMessageYear.innerText = "";
  if (day.value == "" || month.value == "" || year.value == "") {
    e.preventDefault();
    if (day.value == "") {
      errorMessageDay.innerText = "this field is required";
    }
    if (month.value == "") {
      errorMessageMonth.innerText = "this field is required";
    }
    if (year.value == "") {
      errorMessageYear.innerText = "this field is required";
    }
  } else if (year.value > data.getFullYear()) {
    e.preventDefault();
    errorMessageYear.innerText = "Must be in the past";
    year.value = "";
  } else if (month.value > 12) {
    e.preventDefault();
    errorMessageMonth.innerText = "Must be a valid Month";
    month.value = "";
  } else if (day.value > 31) {
    e.preventDefault();
    errorMessageDay.innerText = "must be a valid Day";
    day.value = "";
  } else {
    calculaIdade(year.value, month.value, day.value);
  }
});

function calculaIdade(year, month, day) {
  if (month > data.getMonth() + 1) {
    yearOuput.textContent = data.getFullYear() - year - 1;
  } else if (month == data.getMonth() + 1 && day > data.getDate()) {
    yearOuput.textContent = data.getFullYear() - year - 1;
  } else {
    yearOuput.textContent = data.getFullYear() - year;
  }

  if (month > data.getMonth() + 1) {
    monthOuput.textContent = 12 + (data.getMonth() + 1 - month);
  } else {
    monthOuput.textContent = data.getMonth() + 1 - month;
  }

  if ((day > data.getDate() && month % 2 !== 0) || data.getMonth() + 1 == 8) {
    dayOuput.textContent = 31 - (day - data.getDate());
  } else if (
    (day < data.getDate() && month % 2 !== 0) ||
    data.getMonth() + 1 == 8
  ) {
    dayOuput.textContent = 31 + (day - data.getDate());
  } else if (
    day > data.getDate() &&
    month % 2 == 0 &&
    data.getMonth() + 1 !== 8
  ) {
    dayOuput.textContent = 30 - (day - data.getDate());
  } else if (
    day < data.getDate() &&
    month % 2 == 0 &&
    data.getMonth() + 1 !== 8
  ) {
    dayOuput.textContent = -(day - data.getDate());
  }
}

function focusNext() {
  if (day.value.length === day.maxLength) {
    month.focus();
  }

  if (month.value.length === month.maxLength) {
    year.focus();
  }
}
