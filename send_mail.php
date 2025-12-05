<?php
// Einfache Mailweiterleitung für das Kontaktformular
// Hinweis: Funktioniert nur, wenn Ihr Hosting-Paket den PHP-Befehl mail() unterstützt.

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html#contact');
    exit;
}

function field($name) {
    return isset($_POST[$name]) ? trim($_POST[$name]) : '';
}

$name    = field('name');
$email   = field('email');
$phone   = field('phone');
$message = field('message');

if ($name === '' || $email === '' || $message === '') {
    header('Location: index.html#contact');
    exit;
}

$to      = 'info@kbn-bau.de';
$subject = 'Neue Kontaktanfrage über die Website';
$body    = "Name: {$name}\nE-Mail: {$email}\nTelefon: {$phone}\n\nNachricht:\n{$message}\n\n---\nGesendet über das Kontaktformular auf kbn-bau.de";
$headers = "From: noreply@kbn-bau.de\r\n" .
           "Reply-To: {$email}\r\n" .
           'X-Mailer: PHP/' . phpversion();

// @ unterdrückt Fehlermeldungen, falls der Server nicht korrekt konfiguriert ist
@mail($to, $subject, $body, $headers);

// Nach dem Versand auf Dankeseite leiten
header('Location: danke.html');
exit;
?>
