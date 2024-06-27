//#region html server
var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Content-Length": data.length,
      });
      res.write(data);
      res.end();
    });
  })
  .listen(8000);
//#endregion

//#region Bring API
const https = require("https");
const url = "https://api.bring.com/booking-api/api/booking";
const data = JSON.stringify({
  consignments: [
    {
      generateQrCodes: true,
      correlationId: "RETURN-123456",
      packages: [
        {
          containerId: null,
          correlationId: "123456",
          dimensions: {
            heightInCm: 0,
            lengthInCm: 0,
            widthInCm: 0,
          },
          goodsDescription: null,
          packageType: null,
          volumeInDm3: 0,
          weightInKg: 0,
        },
      ],
      parties: {
        pickupPoint: null,
        recipient: {
          additionalAddressInfo: null,
          addressLine: "Testveien 10",
          addressLine2: null,
          city: "Oslo",
          contact: {
            email: "norsk.bedrift@example.com",
            name: null,
            phoneNumber: null,
          },
          countryCode: "NO",
          name: "Tore Mottaker",
          postalCode: "0185",
          reference: "R123456",
        },
        sender: {
          additionalAdressInfo: null,
          addressLine: "Industriveien 1",
          addressLine2: null,
          city: "Oslo",
          contact: {
            email: "trond@nordmann.no",
            name: null,
            phoneNumber: null,
          },
          countryCode: "NO",
          name: "Trond Nordmann",
          postalCode: "0010",
          reference: "O582034",
        },
      },
      product: {
        customerNumber: "5",
        id: "9300",
      },
      shippingDateTime: "2023-04-27T13:32:20+02:00",
    },
  ],
  schemaVersion: 1,
  testIndicator: true,
});

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Mybring-API-Key": "0bb53e4f-37c2-44b1-8b53-7f355dc5268b",
    "X-Mybring-API-Uid": "adrian.finstad@hotmail.com",
    "X-Bring-Client-URL": "check.no",
    Accept: "application/json",
    Authorization: "Bearer adrian.finstad@hotmail.com",
  },
};

//lager en HTTPS forespørsel mot Bring API sitt booking endepunkt
const req = https.request(url, options, (res) => {
  let result = "";

  console.log("Status code:", res.statusCode); //logger statuskoden til svaret fra servern

  res.setEncoding("utf8"); //setter oppkodingen til utf-8 for å motta datastykker fra svaret
  res.on("data", (chunk) => {
    //lytter etter "chunks" fra svaret
    result += chunk;
  });

  res.on("end", () => {
    //når hele svaret er motatt, logges responsen
    console.log("Response body:", result);
  });
});

req.on("error", (e) => {
  //håndterer eventuelle feil under HTTPS forespørselen
  console.error("Request error:", e);
});

req.write(data); //skriver dataen til forespørselen
req.end();

//#endregion
