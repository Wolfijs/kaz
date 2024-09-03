<?php
header('Content-Type: application/json');
require_once 'db.php';

class Subscription {
    private $email;
    private $db;

    public function __construct($email) {
        $this->email = filter_var($email, FILTER_SANITIZE_EMAIL);

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email address');
        }

        $this->db = new Database();
    }

    public function subscribe() {
        $conn = $this->db->getConnection();
        $stmt = $conn->prepare("INSERT INTO subscribers (email) VALUES (?)");
        if (!$stmt) {
            throw new Exception('Prepare statement failed: ' . $conn->error);
        }

        $stmt->bind_param("s", $this->email);

        if (!$stmt->execute()) {
            throw new Exception('Execute statement failed: ' . $stmt->error);
        }

        $stmt->close();
    }
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $subscription = new Subscription($_POST['email']);
        $subscription->subscribe();
        echo json_encode(['success' => true, 'message' => 'Subscription successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
