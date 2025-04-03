<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Preluare și curățare date din formular
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Verificare câmpuri obligatorii
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Te rog completează corect toate câmpurile formularului.";
        exit;
    }

    // Adresa destinatarului (poate fi adresa ta sau a administratorului)
    $recipient = "sebicosma95@gmail.com";

    // Subiectul email-ului
    $subject = "Mesaj de contact de la $name";

    // Conținutul email-ului
    $email_content = "Nume: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mesaj:\n$message\n";

    // Header-ele email-ului
    $email_headers = "From: $name <$email>";

    // Trimiterea email-ului
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "Mesajul a fost trimis cu succes. Mulțumim!";
    } else {
        echo "Ne pare rău, a apărut o eroare la trimiterea mesajului.";
    }
} else {
    // Dacă nu este o cerere POST
    echo "Ceva nu a funcționat corect.";
}
?>