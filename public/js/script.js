const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    }, (error) => {
        console.error(error);

    },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,

        }
    );
}

const map = L.map("map").setView([0, 0], 16); //muje location do  0,0 mins puri duniya ka center or 10x zoom

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "DhruvGadara"
}).addTo(map)

const markers = {};

socket.on("recevie-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude], 16);
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (id) => {
    console.log(`User disconnected: ${id}`);
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    } else {
        console.log(`Marker for ID ${id} doesn't exist.`);
    }
});