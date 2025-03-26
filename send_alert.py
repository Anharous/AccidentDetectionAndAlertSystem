import smtplib

def send_email_alert():
    sender_email = "amirtha.0726@gmail.com"
    receiver_email = "sathyasree3107@gmail.com"
    password = "amirtha.bts26"
    
    subject = "🚨 Traffic Alert: Accident Detected"
    body = "An accident has been detected at XYZ location. Immediate response required!"

    message = f"Subject: {subject}\n\n{body}"

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)

    print("🚀 Alert Sent to Authorities!")

send_email_alert()
