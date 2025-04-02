import smtplib

def send_email_alert():
    sender_email = "Sender Email"
    receiver_email = "receiver Email"
    password = "mail pwd"
    
    subject = "🚨 Traffic Alert: Accident Detected"
    body = "An accident has been detected at XYZ location. Immediate response required!"

    message = f"Subject: {subject}\n\n{body}"

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)

    print("🚀 Alert Sent to Authorities!")

send_email_alert()
