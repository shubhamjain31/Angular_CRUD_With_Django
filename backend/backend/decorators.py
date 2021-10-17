from cryptography.fernet import Fernet
from django.conf import settings

def get_ip(request):
    return request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR', '')).split(',')[0].strip()

def encryption_key(val):
    f = Fernet(settings.CRYPTOGRAPHY_KEY)
    encrypted_token = f.encrypt(str(val).encode())
    return encrypted_token

def decryption_key(val):
    f = Fernet(settings.CRYPTOGRAPHY_KEY)
    decrypted_token = f.decrypt(val.encode())
    decoded_token = decrypted_token.decode()
    return decoded_token