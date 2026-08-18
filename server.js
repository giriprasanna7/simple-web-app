const http = require("http");

const PORT = 3000;

const buses = [
    {
        id: 1,
        name: "Express Travels",
        type: "AC Sleeper",
        departure: "06:30 AM",
        arrival: "12:30 PM",
        duration: "6h",
        price: 650
    },
    {
        id: 2,
        name: "GreenLine Travels",
        type: "AC Seater",
        departure: "09:00 AM",
        arrival: "03:30 PM",
        duration: "6h 30m",
        price: 550
    },
    {
        id: 3,
        name: "Royal Roadways",
        type: "Non-AC Seater",
        departure: "02:00 PM",
        arrival: "08:30 PM",
        duration: "6h 30m",
        price: 400
    },
    {
        id: 4,
        name: "City Connect",
        type: "AC Sleeper",
        departure: "10:30 PM",
        arrival: "05:30 AM",
        duration: "7h",
        price: 750
    }
];

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(`
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>BusGo - Bus Ticket Booking</title>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f4f7fb;
    color: #222;
}

/* NAVBAR */

.navbar {
    background: #172554;
    color: white;
    padding: 18px 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 26px;
    font-weight: bold;
}

.nav-links {
    display: flex;
    gap: 25px;
}

.nav-links a {
    color: white;
    text-decoration: none;
}

/* HERO */

.hero {
    background: linear-gradient(
        135deg,
        #1d4ed8,
        #2563eb
    );

    color: white;

    padding: 70px 8% 100px;

    text-align: center;
}

.hero h1 {
    font-size: 42px;
    margin-bottom: 15px;
}

.hero p {
    font-size: 18px;
    margin-bottom: 35px;
}

/* SEARCH */

.search-box {
    background: white;
    padding: 25px;
    border-radius: 12px;

    max-width: 1000px;
    margin: auto;

    display: grid;
    grid-template-columns:
        repeat(4, 1fr) auto;

    gap: 15px;

    box-shadow:
        0 10px 30px
        rgba(0,0,0,0.15);
}

.input-group {
    text-align: left;
}

.input-group label {
    display: block;
    color: #555;
    font-size: 13px;
    margin-bottom: 6px;
}

.input-group input,
.input-group select {

    width: 100%;

    padding: 12px;

    border: 1px solid #ddd;

    border-radius: 7px;

    font-size: 14px;
}

.search-btn {

    background: #f97316;

    border: none;

    color: white;

    padding: 0 25px;

    border-radius: 7px;

    font-size: 16px;

    cursor: pointer;
}

.search-btn:hover {
    background: #ea580c;
}

/* BUS SECTION */

.container {

    max-width: 1100px;

    margin: 50px auto;

    padding: 0 20px;
}

.section-title {

    font-size: 28px;

    margin-bottom: 25px;
}

/* BUS CARD */

.bus-card {

    background: white;

    border-radius: 12px;

    padding: 25px;

    margin-bottom: 20px;

    box-shadow:
        0 3px 15px
        rgba(0,0,0,0.08);

    display: grid;

    grid-template-columns:
        1.5fr 1fr 1fr 1fr auto;

    align-items: center;

    gap: 20px;
}

.bus-name {
    font-size: 18px;
    font-weight: bold;
}

.bus-type {
    color: #777;
    margin-top: 5px;
}

.time {
    font-size: 18px;
    font-weight: bold;
}

.duration {
    color: #777;
}

.price {
    font-size: 20px;
    font-weight: bold;
    color: #16a34a;
}

.book-btn {

    background: #2563eb;

    border: none;

    color: white;

    padding: 11px 20px;

    border-radius: 7px;

    cursor: pointer;

    font-size: 14px;
}

.book-btn:hover {
    background: #1d4ed8;
}

/* MODAL */

.modal {

    display: none;

    position: fixed;

    z-index: 1000;

    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    justify-content: center;
}


    width: 90%;

    max-width: 550px;

    padding: 30px;

    border-radius: 12px;

    max-height: 90vh;

    overflow-y: auto;
}

.close {

    float: right;

    font-size: 25px;

    cursor: pointer;

    color: #555;
}

.modal-content h2 {

    margin-bottom: 20px;

    color: #172554;
}

/* SEATS */

.seats {

    display: grid;

    grid-template-columns:
        repeat(4, 50px);

    gap: 10px;

    margin: 20px 0;
}

.seat {

    width: 50px;


.seat.selected {

    background: #2563eb;

    color: white;
}

.seat.booked {
    margin-bottom: 15px;

    display: block;

    margin-bottom: 6px;

    font-weight: bold;
}

.form-group input {

    width: 100%;

    padding: 12px;

    border: 1px solid #ddd;

    border-radius: 7px;
}

.confirm-btn {

    width: 100%;

    background: #16a34a;

    color: white;

    border: none;

    padding: 14px;

    border-radius: 7px;

    cursor: pointer;

    font-size: 16px;

    margin-top: 10px;
}

/* CONFIRMATION */

.confirmation {

    display: none;

    text-align: center;

    padding: 20px;
}

.success {

    font-size: 50px;

    margin-bottom: 15px;
}

.booking-id {

    background: #eff6ff;

    padding: 15px;

    border-radius: 7px;

}

.form-group label {
    margin-top: 15px;

    font-weight: bold;

    background: #d1d5db;



    color: #6b7280;
.form-group {
    color: #1d4ed8;

/* FORM */

}
    cursor: not-allowed;
}



    cursor: pointer;
}
/* FOOTER */

footer {

    background: #172554;

    color: white;

    text-align: center;

    padding: 30px;

    margin-top: 70px;
    height: 40px;

    color: #166534;
}
    border: none;
    background: #dcfce7;



    border-radius: 6px;

/* RESPONSIVE */

.modal-content {

    background: white;
@media(max-width: 800px) {
    background:
        rgba(0,0,0,0.6);


    .search-box {

        grid-template-columns: 1fr;
    }

    .bus-card {

        grid-template-columns: 1fr;
    }

    .hero h1 {

        font-size: 30px;
    }


    .nav-links {


        display: none;
    }
}


</style>

</head>

<body>

<!-- NAVBAR -->

<nav class="navbar">

<div class="logo">
🚌 BusGo

</div>


<div class="nav-links">


<a href="#">Home</a>

<a href="#">My Bookings</a>
<a href="#">Offers</a>
<a href="#">Contact</a>


</div>

</nav>


<!-- HERO -->

<section class="hero">

<h1>Book Your Bus Journey</h1>

<p>
Travel comfortably. Book easily.

</p>


<div class="search-box">

<div class="input-group">

<label>From</label>

<input
type="text"
id="from"
placeholder="Chennai">

</div>

<div class="input-group">

<label>To</label>

<input
type="text"
id="to"
placeholder="Bangalore">

</div>

<div class="input-group">

<label>Travel Date</label>

<input
type="date"
id="date">

</div>

<div class="input-group">

<label>Passengers</label>

<select id="passengers">

<option value="1">1 Passenger</option>
<option value="2">2 Passengers</option>
<option value="3">3 Passengers</option>
<option value="4">4 Passengers</option>

</select>

</div>

<button
class="search-btn"
onclick="searchBuses()">

Search Buses

</button>

</div>

</section>


<!-- BUS LIST -->

<div class="container">

<h2 class="section-title">
Available Buses
</h2>

<div id="busList">

${buses.map(bus => `

<div class="bus-card">

<div>

<div class="bus-name">
${bus.name}
</div>

<div class="bus-type">
${bus.type}
</div>

</div>

<div>

<div class="time">
${bus.departure}
</div>

<div>
Departure
</div>

</div>

<div>

<div class="time">
${bus.arrival}
</div>

<div>
Arrival
</div>

</div>

<div>

<div class="duration">
${bus.duration}
</div>

<div class="price">
₹${bus.price}
</div>

</div>

<button
class="book-btn"
onclick="openBooking(${bus.id})">

Book Now

</button>

</div>

`).join("")}

</div>

</div>


<!-- BOOKING MODAL -->

<div
class="modal"
id="bookingModal">

<div class="modal-content">

<span
class="close"
onclick="closeBooking()">

×
</span>

<div id="bookingForm">

<h2>
Select Your Seat
</h2>

<p id="selectedBus"></p>

<div class="seats">

${Array.from({length: 20}, (_, i) => `

<button
class="seat ${[3,8,14].includes(i) ? "booked" : ""}"
${[3,8,14].includes(i) ? "disabled" : ""}
onclick="selectSeat(this, ${i + 1})">

${i + 1}

</button>

`).join("")}

</div>

<div class="form-group">

<label>
Passenger Name
</label>

<input
type="text"
id="passengerName"
placeholder="Enter passenger name">

</div>

<div class="form-group">

<label>
Mobile Number
</label>

<input
type="tel"
id="mobile"
placeholder="Enter mobile number">

</div>

<button
class="confirm-btn"
onclick="confirmBooking()">

Confirm Booking

</button>

</div>


<div
class="confirmation"
id="confirmation">

<div class="success">
✅
</div>

<h2>
Booking Confirmed!
</h2>

<p>
Your bus ticket has been booked successfully.
</p>

<div
class="booking-id"
id="bookingId">
</div>

<br>

<button
class="book-btn"
onclick="closeBooking()">

Done

</button>

</div>

</div>

</div>


<!-- FOOTER -->

<footer>

<p>
© 2026 BusGo - Bus Ticket Booking
</p>

<p>
Safe • Fast • Reliable
</p>

</footer>


<script>

let selectedSeat = null;

let selectedBusData = null;


function searchBuses() {

    const from =
        document.getElementById("from").value;

    const to =
        document.getElementById("to").value;

    const date =
        document.getElementById("date").value;

    if (!from || !to || !date) {

        alert(
            "Please enter From, To and Travel Date"
        );

        return;
    }

    alert(
        "Buses available from " +
        from +
        " to " +
        to
    );
}


function openBooking(busId) {

    selectedBusData =
        ${JSON.stringify(buses)}.find(
            bus => bus.id === busId
        );

    document.getElementById(
        "selectedBus"
    ).innerHTML =

        "<strong>" +
        selectedBusData.name +
        "</strong> - ₹" +
        selectedBusData.price;

    document.getElementById(
        "bookingModal"
    ).style.display = "flex";

}


function closeBooking() {

    document.getElementById(
        "bookingModal"
    ).style.display = "none";

    document.getElementById(
        "bookingForm"
    ).style.display = "block";

    document.getElementById(
        "confirmation"
    ).style.display = "none";

    selectedSeat = null;

}


function selectSeat(button, seatNumber) {

    document
        .querySelectorAll(".seat")
        .forEach(seat => {

            seat.classList.remove(
                "selected"
            );

        });

    button.classList.add("selected");

    selectedSeat = seatNumber;

}


function confirmBooking() {

    const name =
        document.getElementById(
            "passengerName"
        ).value;

    const mobile =
        document.getElementById(
            "mobile"
        ).value;

    if (!selectedSeat) {

        alert(
            "Please select a seat"
        );

        return;
    }

    if (!name || !mobile) {

        alert(
            "Please enter passenger details"
        );

        return;
    }

    const bookingId =
        "BUS" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    document.getElementById(
        "bookingId"
    ).innerHTML =

        "Booking ID: " +
        bookingId +
        "<br>" +

        "Passenger: " +
        name +
        "<br>" +

        "Seat: " +
        selectedSeat +
        "<br>" +

        "Bus: " +
        selectedBusData.name;

    document.getElementById(
        "bookingForm"
    ).style.display = "none";

    document.getElementById(
        "confirmation"
    ).style.display = "block";

}

</script>

</body>

</html>
    `);
});


server.listen(PORT, () => {

    console.log(
        \`BusGo server running on port \${PORT}\`
    );

});
