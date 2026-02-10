const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const CHITKARA_EMAIL = "sujal1518.be23@chitkarauniversity.edu.in";


const STATE_CAPITALS = {
  "andhra pradesh": "Amaravati",
  "arunachal pradesh": "Itanagar",
  "assam": "Dispur",
  "bihar": "Patna",
  "chhattisgarh": "Raipur",
  "goa": "Panaji",
  "gujarat": "Gandhinagar",
  "haryana": "Chandigarh",
  "himachal pradesh": "Shimla",
  "jharkhand": "Ranchi",
  "karnataka": "Bengaluru",
  "kerala": "Thiruvananthapuram",
  "madhya pradesh": "Bhopal",
  "maharashtra": "Mumbai",
  "manipur": "Imphal",
  "meghalaya": "Shillong",
  "mizoram": "Aizawl",
  "nagaland": "Kohima",
  "odisha": "Bhubaneswar",
  "punjab": "Chandigarh",
  "rajasthan": "Jaipur",
  "sikkim": "Gangtok",
  "tamil nadu": "Chennai",
  "telangana": "Hyderabad",
  "tripura": "Agartala",
  "uttar pradesh": "Lucknow",
  "uttarakhand": "Dehradun",
  "west bengal": "Kolkata",

 
  "andaman and nicobar islands": "Port Blair",
  "chandigarh": "Chandigarh",
  "dadra and nagar haveli and daman and diu": "Daman",
  "delhi": "New Delhi",
  "jammu and kashmir": "Srinagar",
  "ladakh": "Leh",
  "lakshadweep": "Kavaratti",
  "puducherry": "Puducherry"
};


const getFibonacci = (n) => {
  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr.slice(0, n);
};

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const findHCF = (arr) => arr.reduce((a, b) => gcd(a, b));
const findLCM = (arr) => arr.reduce((a, b) => (a * b) / gcd(a, b));


app.get("/health", (req, res) => {
  res.json({
    is_success: true,
    official_email: CHITKARA_EMAIL
  });
});

app.post("/bfhl", (req, res) => {
  try {
    const { fibonacci, prime, lcm, hcf, AI } = req.body;
    let data = "Unknown";

    if (fibonacci !== undefined) {
      data = getFibonacci(Number(fibonacci));
    } 
    else if (prime !== undefined && Array.isArray(prime)) {
      data = prime.filter(isPrime);
    } 
    else if (lcm !== undefined && Array.isArray(lcm)) {
      data = findLCM(lcm);
    } 
    else if (hcf !== undefined && Array.isArray(hcf)) {
      data = findHCF(hcf);
    } 
    else if (AI !== undefined) {
      const query = AI.toLowerCase();

      for (const state in STATE_CAPITALS) {
        if (query.includes(state)) {
          data = STATE_CAPITALS[state];
          break;
        }
      }
    }

    res.json({
      is_success: true,
      official_email: CHITKARA_EMAIL,
      data
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      official_email: CHITKARA_EMAIL,
      data: "Internal Server Error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});