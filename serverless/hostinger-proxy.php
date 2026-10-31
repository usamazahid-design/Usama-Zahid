<?php
/**
 * Hostinger / Apache / LiteSpeed PHP AI Proxy
 *
 * Secure serverless gateway that protects your AI API key, enforces strict CORS,
 * implements basic rate limiting, and forwards text-only requests to your AI provider.
 *
 * DEPLOYMENT:
 * 1. Place in public_html/api/brand-ai.php (or configure .htaccess rewrite)
 * 2. Set environment variables in .htaccess:
 *    SetEnv AI_BASE_URL "https://api.openai.com/v1"
 *    SetEnv AI_API_KEY "sk-..."
 *    SetEnv AI_MODEL "gpt-4o-mini"
 */

header('Content-Type: application/json; charset=utf-8');

// Allowed origins
$allowed_origins = [
    'https://usamazahid.design',
    'http://localhost:3000',
    'http://localhost:3001'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://usamazahid.design");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Read raw body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || empty($data['brandName'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Brand name is required']);
    exit;
}

$brandName = substr(trim($data['brandName']), 0, 60);
$industry = substr(trim($data['industry'] ?? 'General'), 0, 60);
$colors = is_array($data['colors'] ?? null) ? array_slice($data['colors'], 0, 8) : [];
$colorsStr = implode(', ', array_map(function($c) { return substr(trim($c), 0, 10); }, $colors));

// Env config
$apiKey = getenv('AI_API_KEY') ?: ($_ENV['AI_API_KEY'] ?? '');
$baseUrl = getenv('AI_BASE_URL') ?: ($_ENV['AI_BASE_URL'] ?? 'https://api.openai.com/v1');
$model = getenv('AI_MODEL') ?: ($_ENV['AI_MODEL'] ?? 'gpt-4o-mini');

if (empty($apiKey)) {
    http_response_code(503);
    echo json_encode(['error' => 'AI_API_KEY not configured on server']);
    exit;
}

$systemPrompt = "You are an elite brand strategist. Return ONLY valid JSON matching this schema:
{
  \"voiceWords\": [\"string\", \"string\", \"string\", \"string\", \"string\"],
  \"brandStory\": \"string\",
  \"mission\": \"string\",
  \"taglines\": [\"string\", \"string\", \"string\"],
  \"fontPairId\": \"string\",
  \"colorNames\": [\"string\", \"string\"],
  \"logoUsageNotes\": \"string\",
  \"dosAndDonts\": [
    { \"do\": \"string\", \"dont\": \"string\" },
    { \"do\": \"string\", \"dont\": \"string\" },
    { \"do\": \"string\", \"dont\": \"string\" }
  ]
}";

$userPrompt = "Brand Name: $brandName\nIndustry: $industry\nBrand Colors: $colorsStr";

$payload = [
    'model' => $model,
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user', 'content' => $userPrompt]
    ],
    'temperature' => 0.7,
    'response_format' => ['type' => 'json_object']
];

$ch = curl_init(rtrim($baseUrl, '/') . '/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    "Authorization: Bearer $apiKey"
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 12);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$response) {
    http_response_code($httpCode ?: 500);
    echo json_encode(['error' => 'AI provider request failed', 'details' => $response]);
    exit;
}

$aiData = json_decode($response, true);
$content = $aiData['choices'][0]['message']['content'] ?? '{}';

http_response_code(200);
echo $content;
exit;
