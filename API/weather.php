<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Get region from query, default to Tunis
$region = $_GET['region'] ?? 'Tunis'; 

// Encode region + country
$query = urlencode($region . ', Tunisia');

// Nominatim URL
$geocode_url = "https://nominatim.openstreetmap.org/search?q={$query}&format=json&limit=1";

// Initialize cURL for geocoding
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $geocode_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0'); // Required by Nominatim
$response = curl_exec($ch);
$curlError = curl_error($ch);
curl_close($ch);
$data = json_decode($response, true);
if(empty($data) || !isset($data[0]['lat']) || !isset($data[0]['lon'])) {
    http_response_code(400);
    echo json_encode(["error" => "Region not found or invalid", "curl_error" => $curlError]);
    exit;
}
$lat = $data[0]['lat'];
$lon = $data[0]['lon'];
$apiKey = "za2ziwkkypmyt429p4po7k6t40qonsjis5gnzt8t";
$weather_url = "https://www.meteosource.com/api/v1/free/point?lat=$lat&lon=$lon&sections=current&key=$apiKey&timezone=Africa/Tunis";
$ch = curl_init($weather_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$weather_response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);
if ($weather_response===false || $httpCode != 200) {
    http_response_code(500);
    echo json_encode(["error" => "Unable to fetch weather data", "curl_error" => $curlError, "http_code" => $httpCode]);
    exit;
}

echo $weather_response;
?>
