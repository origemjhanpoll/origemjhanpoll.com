<?php
// Permite requisições de qualquer origem (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// Obtém o caminho da query string
$path = isset($_GET['path']) ? $_GET['path'] : '';

if (empty($path)) {
    http_response_code(400);
    echo "Erro: Parâmetro 'path' é obrigatório.";
    exit;
}

// Constrói a URL do GitHub
// Remove barras iniciais para evitar duplicação
$targetUrl = 'https://github.com/' . ltrim($path, '/');

// Inicializa o cURL
$ch = curl_init();

// Configurações do cURL
curl_setopt($ch, CURLOPT_URL, $targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Segue redirecionamentos
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Ignora verificação SSL (opcional, mas útil em alguns ambientes de hospedagem)
// GitHub exige um User-Agent
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

// Executa a requisição
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

// Verifica se houve erro no cURL
if ($response === false) {
    http_response_code(500);
    echo "Erro ao conectar com o GitHub: " . $curlError;
    exit;
}

// Retorna o código HTTP e a resposta
http_response_code($httpCode);
echo $response;
?>
