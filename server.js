const http = require("http");

const PORT = 3000;

const buses = [
    {
        id: 1,
        name: "A1 Travels",
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

const server = http.createServer(function (req, res) {

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    const busCards = buses.map(function (bus) {
        return `
            <div class="bus-card">

                <div>
                    <div class="bus-name">${bus.name}</div>
                    <div class="bus-type">${bus.type}</div>
                </div>

                <div>
                    <div class="time">${bus.departure}</div>
                    <div class="small-text">Departure</div>
                </div>

                <div>
                    <div class="time">${bus.arrival}</div>
                    <div class="small-text">Arrival</div>
                </div>

                <div>
                    <div class="duration">${bus.duration}</div>
                    <div class="price">₹${bus.price}</div>
                </div>

                <button class="book-btn"
                    onclick="openBooking(${bus.id})">
                    Book Now
                </button>

            </div>
        `;
    }).join("");

    const seatButtons = Array.from(
        { length: 20 },
        function (_, index) {

            const seatNumber = index + 1;

            const booked =
                [4, 9, 15].includes(seatNumber);

            return `
                <button
                    class="seat ${booked ? "booked" : ""}"
                    ${booked ? "disabled" : ""}
                    onclick="selectSeat(this, ${seatNumber})">
                    ${seatNumber}
                </button>
            `;
        }
    ).join("");

    const busData = JSON.stringify(buses);

    const html = `
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
    font-family: Arial, Helvetica, sans-serif;
    background: #f4f7fb;
    color: #1f2937;
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
    font-size: 28px;
    font-weight: bold;
}

.nav-links {
    display: flex;
    gap: 25px;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-size: 15px;
}

.nav-links a:hover {
    color: #93c5fd;
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
    font-size: 44px;
    margin-bottom: 15px;
}

.hero p {
    font-size: 19px;
    margin-bottom: 35px;
}

/* SEARCH BOX */

.search-box {
    background: white;
    padding: 25px;

    border-radius: 14px;

    max-width: 1050px;
    margin: auto;

    display: grid;

    grid-template-columns:
        repeat(4, 1fr) auto;

    gap: 15px;

    box-shadow:
        0 15px 35px
        rgba(0, 0, 0, 0.18);
}

.input-group {
    text-align: left;
}

.input-group label {
    display: block;
    color: #374151;

    font-size: 13px;

    font-weight: bold;

    margin-bottom: 7px;
}

.input-group input,
.input-group select {

    width: 100%;

    padding: 13px;

    border: 1px solid #d1d5db;

    border-radius: 8px;

    font-size: 14px;

    outline: none;
}

.input-group input:focus,
.input-group select:focus {
    border-color: #2563eb;
}

.search-btn {

    background: #f97316;

    border: none;

    color: white;

    padding: 0 25px;

    border-radius: 8px;

    font-size: 15px;

    font-weight: bold;

    cursor: pointer;
}

.search-btn:hover {
    background: #ea580c;
}

/* CONTENT */

.container {
    max-width: 1100px;

    margin: 55px auto;

    padding: 0 20px;
}

.section-title {
    font-size: 30px;

    margin-bottom: 25px;

    color: #172554;
}

/* BUS CARD */

.bus-card {

    background: white;

    border-radius: 14px;

    padding: 25px;

    margin-bottom: 20px;

    box-shadow:
        0 4px 18px
        rgba(0, 0, 0, 0.08);

    display: grid;

    grid-template-columns:
        1.5fr 1fr 1fr 1fr auto;

    align-items: center;

    gap: 20px;
}

.bus-name {
    font-size: 19px;

    font-weight: bold;

    color: #172554;
}

.bus-type {
    color: #6b7280;

    margin-top: 6px;

    font-size: 14px;
}

.time {
    font-size: 18px;

    font-weight: bold;
}

.small-text {
    color: #6b7280;

    font-size: 13px;

    margin-top: 4px;
}

.duration {
    color: #6b7280;

    margin-bottom: 7px;
}

.price {
    font-size: 21px;

    font-weight: bold;

    color: #16a34a;
}

.book-btn {

    background: #2563eb;

    border: none;

    color: white;

    padding: 11px 20px;

    border-radius: 8px;

    cursor: pointer;

    font-size: 14px;

    font-weight: bold;
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

    background: rgba(0, 0, 0, 0.65);

    align-items: center;

    justify-content: center;
}

.modal-content {

    background: white;

    width: 90%;

    max-width: 550px;

    padding: 30px;

    border-radius: 14px;

    max-height: 90vh;

    overflow-y: auto;
}

.close {

    float: right;

    font-size: 28px;

    cursor: pointer;

    color: #6b7280;
}

.close:hover {
    color: #111827;
}

.modal-content h2 {

    margin-bottom: 10px;

    color: #172554;
}

#selectedBus {

    color: #2563eb;

    margin-bottom: 20px;
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

    height: 40px;

    border: none;

    border-radius: 7px;

    background: #dcfce7;

    color: #166534;

    cursor: pointer;

    font-weight: bold;
}

.seat:hover {
    background: #bbf7d0;
}

.seat.selected {

    background: #2563eb;

    color: white;
}

.seat.booked {

    background: #d1d5db;

    color: #6b7280;

    cursor: not-allowed;
}

/* FORM */

.form-group {

    margin-bottom: 16px;
}

.form-group label {

    display: block;

    margin-bottom: 7px;

    font-weight: bold;
}

.form-group input {

    width: 100%;

    padding: 13px;

    border: 1px solid #d1d5db;

    border-radius: 8px;

    font-size: 14px;
}

.confirm-btn {

    width: 100%;

    background: #16a34a;

    color: white;

    border: none;

    padding: 14px;

    border-radius: 8px;

    cursor: pointer;

    font-size: 16px;

    font-weight: bold;

    margin-top: 10px;
}

.confirm-btn:hover {
    background: #15803d;
}

/* CONFIRMATION */

.confirmation {

    display: none;

    text-align: center;

    padding: 20px;
}

.success {

    font-size: 55px;

    margin-bottom: 15px;
}

.booking-id {

    background: #eff6ff;

    padding: 18px;

    border-radius: 8px;

    margin-top: 20px;

    line-height: 1.8;

    font-weight: bold;

    color: #1d4ed8;
}

/* FOOTER */

footer {

    background: #172554;

    color: white;

    text-align: center;

    padding: 30px;

    margin-top: 70px;

    line-height: 1.8;
}

/* RESPONSIVE */

@media (max-width: 900px) {

    .search-box {
        grid-template-columns: 1fr 1fr;
    }

    .search-btn {
        padding: 14px;
    }

    .bus-card {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 600px) {

    .navbar {
        padding: 16px 5%;
    }

    .nav-links {
        display: none;
    }

    .hero {
        padding: 50px 5% 70px;
    }

    .hero h1 {
        font-size: 32px;
    }

    .search-box {
        grid-template-columns: 1fr;
    }

    .bus-card {
        grid-template-columns: 1fr;
    }

    .container {
        margin-top: 40px;
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

    <h1>
        Book Your Bus Journey
    </h1>

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

                <option value="1">
                    1 Passenger
                </option>

                <option value="2">
                    2 Passengers
                </option>

                <option value="3">
                    3 Passengers
                </option>

                <option value="4">
                    4 Passengers
                </option>

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

        ${busCards}

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

            &times;

        </span>


        <div id="bookingForm">

            <h2>
                Select Your Seat
            </h2>

            <p id="selectedBus"></p>


            <div class="seats">

                ${seatButtons}

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

const busesData = ${busData};

let selectedSeat = null;

let selectedBusData = null;


/* SEARCH */

function searchBuses() {

    const from =
        document.getElementById("from").value.trim();

    const to =
        document.getElementById("to").value.trim();

    const date =
        document.getElementById("date").value;

    if (!from || !to || !date) {

        alert(
            "Please enter From, To and Travel Date."
        );

        return;
    }

    alert(
        "Buses available from " +
        from +
        " to " +
        to +
        " on " +
        date
    );

}


/* OPEN BOOKING */

function openBooking(busId) {

    selectedBusData =
        busesData.find(function (bus) {
            return bus.id === busId;
        });

    if (!selectedBusData) {
        return;
    }

    document.getElementById(
        "selectedBus"
    ).innerHTML =
        "<strong>" +
        selectedBusData.name +
        "</strong> - " +
        selectedBusData.type +
        " - ₹" +
        selectedBusData.price;

    document.getElementById(
        "bookingModal"
    ).style.display = "flex";

}


/* CLOSE BOOKING */

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

    document.getElementById(
        "passengerName"
    ).value = "";

    document.getElementById(
        "mobile"
    ).value = "";

    document
        .querySelectorAll(".seat")
        .forEach(function (seat) {

            seat.classList.remove("selected");

        });

    selectedSeat = null;

}


/* SELECT SEAT */

function selectSeat(button, seatNumber) {

    document
        .querySelectorAll(".seat")
        .forEach(function (seat) {

            seat.classList.remove("selected");
        });

    button.classList.add("selected");

    selectedSeat = seatNumber;

}


    const mobile =
        document.getElementById(
            "mobile"
        ).value.trim();

    const passengers =
        document.getElementById(
            "passengers"
        ).value;

    if (!selectedSeat) {

        alert(
            "Please select a seat."
        );

        return;
    }

    if (!name) {

        alert(
            "Please enter passenger name."
        );

        return;
    }

            "passengerName"
        ).value.trim();

    if (!mobile) {

        alert(
/* CONFIRM BOOKING */
    const name =
        document.getElementById(
            "Please enter mobile number."
        );


function confirmBooking() {

        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }

    const bookingId =
        "BUS" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    const travelDate =
        document.getElementById(
            "date"
        ).value || "Not selected";

    document.getElementById(
        "bookingId"
    ).innerHTML =

        "Booking ID: " +
        bookingId +
        "<br>" +

        "Passenger: " +
        name +
        "<br>" +

        "Mobile: " +
        mobile +
        "<br>" +

        "Bus: " +
        selectedBusData.name +
        "<br>" +

        "Seat: " +
        selectedSeat +
        "<br>" +

        "Passengers: " +
        passengers +
        "<br>" +

        "Travel Date: " +
        travelDate;

    document.getElementById(
        "bookingForm"
    ).style.display = "none";

    document.getElementById(
        "confirmation"
    ).style.display = "block";

}


/* CLOSE MODAL WHEN CLICKING OUTSIDE */

window.onclick = function (event) {

    const modal =
        document.getElementById(
            "bookingModal"
        );

    if (event.target === modal) {
        closeBooking();
    }

};

</script>

</body>

</html>
`;

    res.end(html);

});


server.listen(PORT, function () {

    console.log(
        "BusGo server running on port " + PORT
    );

});
